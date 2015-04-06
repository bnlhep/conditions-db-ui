//
//  Functions
//

//
// get Payloads based on index
//

function xFormDateTime(datetime) {
  var results;
  var tokens1;
  var tokens2;
  var tokens3;
  var tokens4;
  results = "";
  tokens1 = new Array();
  tokens1 = datetime.split('T');
  results = tokens1[0];
  tokens2 = new Array();
  tokens2 = tokens1[1].split('.');
  results = results + " " + tokens2[0]; 
  return results;
}


function getGlobaltagPayloads(name) {

   
//    {id: 1, content: 'item 1', start: '2014-04-20 00:00:00', end:'2014-04-20 02:00:00', group:1 },
    var startInitialRun;
    var endFinalRun;
    //var globalTagPayloads = new Array();
    var container = new Object();
    container = document.getElementById('visualization');

    // Create a DataSet (allows two way data-binding)
    var items = new Array();

    // Configuration for the Timeline
    var options = new Object();
    options = {};

    // Create a Timeline
    var timeline = new Object();

    // Create groups
    var groups;
    groups = new vis.DataSet();
    
    var globalTagPayload = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTag/" + name + "/globalTagPayloads",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );

   //Populate groups
   for (var p=0; p < globalTagPayload.length; p++) {
     groups.add({id:p, content: globalTagPayload[p].payloadId.basf2Module.basf2Package.name
                              + '-'
                              + globalTagPayload[p].payloadId.basf2Module.name
                              + '-'
                              + globalTagPayload[p].payloadId.revision 
                });
   }
   for (var p=0; p < globalTagPayload.length; p++) {
          startInitialRun = xFormDateTime(globalTagPayload[p].payloadIovs[0].initialRunId.runStart);
          endFinalRun = xFormDateTime(globalTagPayload[p].payloadIovs[0].finalRunId.runEnd);
          items.push({"id":p, 
                                  "group":p,
                                  "title":"Experiment: "
                                  + globalTagPayload[p].payloadIovs[0].initialRunId.experimentId.name
                                  + "\nRun: "
                                  + globalTagPayload[p].payloadIovs[0].initialRunId.name 
                                  + "\nStart: "
                                  + startInitialRun 
                                  + "\nFinish: " 
                                  + endFinalRun, 
                                  "content":globalTagPayload[p].payloadIovs[0].initialRunId.name, 
                                  "start":startInitialRun, 
                                  "end":endFinalRun}); 
   }
  
   options = {
    groupOrder: 'content'  // groupOrder can be a property name or a sorting function
   };

  //timeline = new vis.Timeline(container, items, options);
  timeline = new vis.Timeline(container);
  timeline.setOptions(options);
  timeline.setGroups(groups);
  timeline.setItems(items);
  var properties;
  properties = new Object();
   return timeline;
}

function getGlobaltagPayloadRecords(name) {
   var results;
   var buildId;
   var buildSortKey;
   var payloadList = new Object();
   var buildString = "[";


   payloadList = $.parseJSON(
    $.ajax(
        {
           url: server + "/payloads",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
   for (var i = 0; i < payloadList.length; i++) {
      buildId = payloadList[i].basf2Module.basf2Package.name
                + '...'
                + payloadList[i].basf2Module.name
                + '...'
                + payloadList[i].revision ;
      buildSortKey =  payloadList[i].basf2Module.basf2Package.name
                + '...'
                + payloadList[i].basf2Module.name ;
      buildString = buildString
                + '{"recordId": "'
                + buildId
                + '","sortKey": "'
                + buildSortKey
                + '","packageName": "'
                + payloadList[i].basf2Module.basf2Package.name
                + '","moduleName": "'
                + payloadList[i].basf2Module.name
                + '","payloadRev": "'
                + payloadList[i].revision
                + '","payloadId": "'
                + payloadList[i].payloadId
                + '","hasGlobalTag":' +  isPayloadAssignedToGlobalTag(payloadList[i].payloadId)
                + ' }';
      if (i < (payloadList.length-1)) {
        buildString = buildString + ',';
      }

   }
   buildString = buildString + ']'
   results = buildString;
   console.log(buildString);
   return results;

}
