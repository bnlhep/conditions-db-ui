//
// Global Variables
//
var uxTree  = new Object(); 
var treeString;
var treeStringBegin;
var treeStringClose;
var treeData = new Object();

//
// Initialize everything at startup
//
tree = $("div:tree").data("ui-fancytree");
uxTree  = [{"view":"global_tag","title":"Global Tag"},
             {"view":"payload","title":"Payloads"}]
treeStringBegin = '[{"title": "<strong>' + uxTree[treeIndex].title + '</strong>", "expanded": true, "folder": true, "children": [ ';
treeStringClose ='      ]} ]';
treeString = "";

//
// Payload tree global variables
//
var payloadsForGlobalTag;
payloadsForGlobalTag = new Object();

//
//
//

//
// Payload Tree functions
//

//
//
//


function payloadsAssignedToGlobalTag(id) {
  var results;
  results = new Object();
  results  = $.parseJSON(
  $.ajax(
        {
           url: server + "/globalTag/" + id + "/payloads",
           async: false,
           dataType: 'json'
        }
       ).responseText
  );
  payloadsForGlobalTag = results;

}

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

function getAllPayloadNames() {
   var results;
   var buildId;
   var buildSortKey;
   var payloadList = new Object();
   var buildString = "[";

   payloadsAssignedToGlobalTag(1);

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

function getPayloadTreeData (globaltagId) {

   var payloadTable = new Object();
   var prevPackage;
   var prevModule;
   var currPackage;
   var currModule;
   var addedParentTag;
   var packageIndex;
   var moduleIndex;
   
   var mytree = new Array();
   mytreeEntry = {"title": "<strong>" + uxTree[1].title + "</strong>", 
                    "expanded": true, 
                    "folder": true,
                    "children": new Array()};
    mytree.push(mytreeEntry);

   addedParentTag = false;
   treeString = treeStringBegin;


   payloadTable = JSON.parse(getAllPayloadNames());
   payloadTable.sort(function(a, b) {
    var textA;
    var textB;
    textA = a.sortKey.toLowerCase();
    textB = b.sortKey.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
   prevPackage = "";
   prevModule = "";
   packageIndex = 0;
   moduleIndex = 0;
   console.log(prevPackage);
   console.log("\t"+ prevModule);
   for (var i = 0; i < payloadTable.length; i++) {
      currPackage = payloadTable[i].packageName.toLowerCase();
      currModule = payloadTable[i].moduleName.toLowerCase();
      if ((currPackage == prevPackage) && (currModule == prevModule)) {
          console.log("\t\t"+ payloadTable[i].payloadRev);
          mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"answer"};
          mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      } else if (currPackage == prevPackage)  {
           if (currModule == prevModule) {
               console.log("\t\t"+ payloadTable[i].payloadRev);
               mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"answer"};
               mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
           } else {
               prevModule = payloadTable[i].moduleName.toLowerCase();
               console.log("\t"+ prevModule);
               console.log("\t\t"+ payloadTable[i].payloadRev);
               mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"yes",
                              "children" : new Array() };
               mytree[0].children[packageIndex].children.push(mytreeEntry);
               moduleIndex = mytree[0].children[packageIndex].children.length - 1;
               mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"answer"};
               mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
           }
      } else {
              prevPackage = payloadTable[i].packageName.toLowerCase();
              console.log(prevPackage);
              mytreeEntry = {"title": prevPackage,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"yes",
                              "children" : new Array() };
              mytree[0].children.push(mytreeEntry);
              packageIndex = mytree[0].children.length - 1;
              prevModule = payloadTable[i].moduleName.toLowerCase();
              mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"yes",
                              "children" : new Array() };
              mytree[0].children[packageIndex].children.push(mytreeEntry);
              moduleIndex = mytree[0].children[packageIndex].children.length -1;
              console.log("\t"+ prevModule);
              console.log("\t\t"+ payloadTable[i].payloadRev);
              mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "id": payloadTable[i].recordId,
                              "extraClasses":"answer"};
              mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      }
   }
   treeString = treeString + treeStringClose;
   //console.log(treeString);
   treeData = mytree;
}




//
//
//

//
// Global Tag Tree functions
//

//
//
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
             payloads = payloads + ']}';
             break;
          }
          payloads = payloads + ',';
   }     
 
   return payloads;
}



function getGlobalTagTreeData() {

treeString = treeStringBegin;
//
//  Get Global Tags
//

    var gt = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTags",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
    var gtid_prefix = "globaltag_";
    for (var i = 0; i < gt.length; i++) {
        payloads = getPayloads(gt[i].globalTagId);
        if (payloads.indexOf("title") != -1 ) {
            treeString = treeString + '{"title": "'
                      + gt[i].name + '", "id": "'
                      + gtid_prefix
                      + gt[i].globalTagId + '", "extraClasses": "yes", "children":';
            treeString = treeString + payloads ;
        } else {
            treeString = treeString
                      + '{"title": "' + gt[i].name + '", "id": "' + gtid_prefix
                      + gt[i].globalTagId + '", "extraClasses": "answer"}';
        }
        if (i == (gt.length-1)) {
           treeString = treeString + treeStringClose;
           console.log(treeString);
           break;
        }
        treeString = treeString + ',';
     }
     treeData = JSON.parse(treeString);
}


function xgetPayloadTreeData(index) {
      treeData =

[
        {"title": "<strong>Global Tags</strong>", "expanded": true, "folder": true, "children": [
                {"title": "TEST_GT1", "extraClasses": "yes", "children": [
                        {"title": "<strong>Payloads</strong>", "extraClasses": "yes", "children": [
                                {"title": "Payload-1", "extraClasses": "yes", "children": [
                                    {"title": "Module-1", "extraClasses": "yes", "children": [
                                        {"title": "IOV-1", "extraClasses": "answer"},
                                        {"title": "IOV-2", "extraClasses": "answer"},
                                        {"title": "IOV-3", "extraClasses": "answer"}
                                   ]}
                                ]}
                        ]}
                ]},
                {"title": "TEST_GT2", "extraClasses": "answer"},
                {"title": "TEST_GT3", "extraClasses": "answer"},
                {"title": "TEST_GT4", "extraClasses": "answer"},
                {"title": "TEST_GT5", "extraClasses": "answer"},
                {"title": "TEST_GT6", "extraClasses": "answer"},
                {"title": "TEST_GT7", "extraClasses": "answer"},
                {"title": "TEST_GT8", "extraClasses": "answer"},
                {"title": "TEST_GT9", "extraClasses": "answer"},
                {"title": "TEST_GT10", "extraClasses": "answer"}
        ]}
]
   treeString = JSON.stringify(treeData);



}



function getTreeData() {
   if (treeIndex == 0) {
      getGlobalTagTreeData();
   }  else {
      getPayloadTreeData(1);
   }
}

getTreeData();

$(function(){
	// using default options
	$("#tree").fancytree({
                 source:treeData,
                 selectMode: 1,
                 checkbox: true,
                 select: function(event, data) {
                 // Display list of selected nodes
                     var s = data.tree.getSelectedNodes().join(", ");
                     var nodes = data.tree.getSelectedNodes();
                     if (nodes[0].getParent()) {
                         var parentnode = nodes[0].getParent();
                         if (!parentnode) {
                            console.log("selected child is root node");
                         } else {
                            var s = parentnode.title;
                            if (s.indexOf("Global Tag") > -1)  {
                                     read_global_tag_details();                            
                                     var gtid =  nodes[0].data.id;
                                     var tokens = gtid.split('_');
                                     var gt_db_id = tokens[1]; 
                                     getval(gt_db_id);
                             } else {
                                     console.log("This is not a global tag");
                                     clear_right_div();
                             }
                         }
                     }
                  }
	});
});

