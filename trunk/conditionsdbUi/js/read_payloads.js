//
//  Functions used to read referential information from
//  Conditions Database
//

//
// Global Variables
//

var payloadsForGlobalTag;
payloadsForGlobalTag = new Object();

//
//  Functions
//

//
// get Payloads based on index
//
function getPayloads(index) {

   var payloads = "";
    var payload = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTag/" + index + "/payloads",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
   var payloadid_prefix = "payload_";
   for (var p=0; p < payload.length; p++) {
          if (p == 0) {
             payloads = '[';
          }
          payloads = payloads + '{"title": "' + payload[p].payloadUrl + '", "id": "' + payloadid_prefix + index + '", "extraClasses": "answer"}';
          if (p == (payload.length -1)) {
             payloads = payloads + '] } ';
             break;
          }
          payloads = payloads + ',';
   } 

   return payloads;
}




//EGS THIS MAY BE OBSOLETE function payloadsAssignedToGlobalTag(id) {
//EGS THIS MAY BE OBSOLETE   var results;
//EGS THIS MAY BE OBSOLETE   results = new Object();
//EGS THIS MAY BE OBSOLETE   results  = $.parseJSON(
//EGS THIS MAY BE OBSOLETE   $.ajax(
//EGS THIS MAY BE OBSOLETE         {
//EGS THIS MAY BE OBSOLETE            url: server + "/globalTag/" + id + "/payloads",
//EGS THIS MAY BE OBSOLETE            async: false,
//EGS THIS MAY BE OBSOLETE            dataType: 'json'
//EGS THIS MAY BE OBSOLETE         }
//EGS THIS MAY BE OBSOLETE        ).responseText
//EGS THIS MAY BE OBSOLETE   );
//EGS THIS MAY BE OBSOLETE   payloadsForGlobalTag = results;
  
//EGS THIS MAY BE OBSOLETE }

function isPayloadAssignedToGlobalTag(id) {
  var results;
  results = false;
  for (var p=0; p < payloadsForGlobalTag.length; p++) {
      if (id == payloadsForGlobalTag[p].payloadId) { 
         results = true;
         break;
      }
  }
  return results;
}

function getAllPayloads() {
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

function getPayloadTree () {

   var payloadTable = new Object();
   var prevPackage;
   var prevModule;
   var currPackage;
   var currModule;
   var addedParentTag;
   addedParentTag = false;  
 
   payloadTable = JSON.parse(getAllPayloads());
   payloadTable.sort(function(a, b) {
    var textA;
    var textB;
    textA = a.sortKey.toLowerCase();
    textB = b.sortKey.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
   prevPackage = "";
   prevModule = ""; 
   console.log(prevPackage);
   console.log("\t"+ prevModule);
   for (var i = 0; i < payloadTable.length; i++) {
      currPackage = payloadTable[i].packageName.toLowerCase();
      currModule = payloadTable[i].moduleName.toLowerCase(); 
      if ((currPackage == prevPackage) && (currModule == prevModule)) {
          console.log("\t\t"+ payloadTable[i].payloadRev);
      } else if (currPackage == prevPackage)  {
           if (currModule == prevModule) {
               console.log("\t\t"+ payloadTable[i].payloadRev);
           } else {
               prevModule = payloadTable[i].moduleName.toLowerCase(); 
               console.log("\t"+ prevModule);
               console.log("\t\t"+ payloadTable[i].payloadRev);
           }
      } else {
           prevPackage = payloadTable[i].packageName.toLowerCase(); 
           prevModule = payloadTable[i].moduleName.toLowerCase(); 
           console.log(prevPackage);
           console.log("\t"+ prevModule);
           console.log("\t\t"+ payloadTable[i].payloadRev);
      }
   }
}
