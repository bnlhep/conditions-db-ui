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
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
          mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      } else if (currPackage == prevPackage)  {
           if (currModule == prevModule) {
               console.log("\t\t"+ payloadTable[i].payloadRev);
               mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "selected": payloadTable[i].hasGlobalTag,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "extraClasses":"answer"};
               mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
           } else {
               prevModule = payloadTable[i].moduleName.toLowerCase();
               console.log("\t"+ prevModule);
               console.log("\t\t"+ payloadTable[i].payloadRev);
               mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "module",
                              "description": "",
                              "extraClasses":"yes",
                              "children" : new Array() };
               mytree[0].children[packageIndex].children.push(mytreeEntry);
               moduleIndex = mytree[0].children[packageIndex].children.length - 1;
               mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
               mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
           }
      } else {
              prevPackage = payloadTable[i].packageName.toLowerCase();
              console.log(prevPackage);
              mytreeEntry = {"title": prevPackage,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "package",
                              "description": "",
                              "extraClasses":"yes",
                              "children" : new Array() };
              mytree[0].children.push(mytreeEntry);
              packageIndex = mytree[0].children.length - 1;
              prevModule = payloadTable[i].moduleName.toLowerCase();
              mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "module",
                              "description": "",
                              "extraClasses":"yes",
                              "children" : new Array() };
              mytree[0].children[packageIndex].children.push(mytreeEntry);
              moduleIndex = mytree[0].children[packageIndex].children.length -1;
              console.log("\t"+ prevModule);
              console.log("\t\t"+ payloadTable[i].payloadRev);
              mytreeEntry = {"title": payloadTable[i].payloadRev,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
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
          payloads = payloads 
       + '{"title": "' 
       + payload[p].basf2Module.basf2Package.name
       + '-' 
       + payload[p].basf2Module.name  
       + '-' 
       + payload[p].payloadId
       + '", "id": "' 
       + payloadid_prefix 
       + index 
       + '", "dbid": "' + index
       + '", "type": "payload" '
       + ', "description": "" '
       + ', "extraClasses": "answer"}';
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
                      + gt[i].name 
                      + '", "id": "'
                      + gtid_prefix
                      + gt[i].globalTagId 
                      + '", "dbid": "'
                      + gt[i].globalTagId 
                      + '", "type": "globaltag" '
                      + ', "description": "" '
                      + ', "extraClasses": "yes", "children":';
            treeString = treeString + payloads ;
        } else {
            treeString = treeString
                      + '{"title": "' 
                      + gt[i].name 
                      + '", "id": "' 
                      + gtid_prefix
                      + gt[i].globalTagId 
                      + '", "dbid": "'
                      + gt[i].globalTagId 
                      + '", "type": "globaltag" '
                      + ', "description": "" '
                      + ', "extraClasses": "answer"}';
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


function retrievePayloadDump(payloadId) {
// get Payload based on index
//

   var payload = new Object();
    var payload = $.parseJSON(
    $.ajax(
        {
           url: server + "/payload/" + payloadId,
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
   return payload;
}

function retrieveGlobalTagDump(globaltagId) {
// get Global Tag based on index
//

   var globaltag = new Object();
    var globaltag = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTag/" + globaltagId,
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
   return globaltag;
}

function dumpPropertyStrings(objectProps)
{
   var results;
   results = "";
   for (var key in objectProps) {
        if (typeof(objectProps[key]) == "undefined") {
            results = results + "\n" + key + "=undefined";
            console.log("The type of " + key + " is undefined");
        }
        else if (typeof(objectProps[key]) == "string") {
            console.log("The type of " + key + " is string");
            results = results + "\n" + key + "=" + objectProps[key];
            //console.log("The type of " + typeof(key));
            console.log(key + "=" + objectProps[key]);
        }
        else if (typeof(objectProps[key]) == "boolean") {
            console.log("The type of " + key + " is boolean");
            results = results + "\n" + key + "=" + objectProps[key];
        }
        else if (typeof(objectProps[key]) == "object") {
            console.log("The type of " + key + " is object");
            if($.isArray(objectProps[key])) {
                console.log("The type of " +  key + " is array");
            } else {
                console.log("The type of " + key + " is not an array");
            }
        } else if (typeof(objectProps[key]) == "number") {
           results = results + "\n" + key + "=" + objectProps[key];
           console.log("The type of " + key + " is number");
        }
        else {
           console.log("Couldn't find number");
        } // Decision loop
   } // End for loop
   return results;
}

function dumpPayload(payloadId) {
  var result;
  var payload;
  result = "";
  payload = retrievePayloadDump(payloadId);
  //result = JSON.stringify(payload);
  result = dumpPropertyStrings(payload); 
  result = result +  "\n\nStatus:" + dumpPropertyStrings(payload.payloadStatus); 
  result = result +  "\n\nInterval of Validity:" + dumpPropertyStrings(payload.payloadIov); 
  return result;
}

function dumpModule(payloadId) {
  var result;
  var payload;
  result = "";
  payload = retrievePayloadDump(payloadId);
  result = dumpPropertyStrings(payload.basf2Module); 
  return result;
}

function dumpPackage(payloadId) {
  var result;
  var payload;
  result = "";
  payload = retrievePayloadDump(payloadId);
  result = dumpPropertyStrings(payload.basf2Module.basf2Package); 
  return result;
}

function dumpGlobalTag(globalTagId) {
  var result;
  var globaltag;
  result = ""
  globaltag = retrieveGlobalTagDump(globalTagId);
  //result = JSON.stringify(globaltag);
  result = dumpPropertyStrings(globaltag); 
  return result;
}

$(function(){
	// using default options
	$("#tree").fancytree({
                 source:treeData,
                 selectMode: 1,
                 checkbox: true,
                 autoScroll: true,
                focus: function(event, data) {
                    //logEvent(event, data);
                    read_right_textarea();
                    selectedNode.nodeId = data.node.data.dbid;
                    selectedNode.nodeType = data.node.data.type;
                    selectedNode.nodeTitle = data.node.title;
                    //alert ("id " + selectedNode.nodeId + " type " + selectedNode.nodeType + " title " + selectedNode.nodeTitle);
                    if (selectedNode.nodeType === "globaltag") {
                         document.getElementById('textarea_detail').value = dumpGlobalTag(selectedNode.nodeId);
                    } else if (selectedNode.nodeType === "payload" ) {
                         document.getElementById('textarea_detail').value = dumpPayload(selectedNode.nodeId);
                    } else if (selectedNode.nodeType === "module" ) {
                         document.getElementById('textarea_detail').value = dumpModule(selectedNode.nodeId);
                    } else if (selectedNode.nodeType === "package" ) {
                         document.getElementById('textarea_detail').value = dumpPackage(selectedNode.nodeId);
                    } else {
                          document.getElementById('textarea_detail').value = selectedNode.nodeTitle;
                    }
                    // document.getElementById('textarea_detail').value =  
                    //         "id " + selectedNode.nodeId + "\n type " + selectedNode.nodeType + "\n title " + selectedNode.nodeTitle;
                 //   $("#echoFocused").text(data.node.title);
                 },
                 select: function(event, data) {
                 // Display list of selected nodes
                     var s = data.tree.getSelectedNodes().join(", ");
                     var nodes = data.tree.getSelectedNodes();
                     console.log("check node");
                     //Global variable selectedNode = {"nodeId":"","nodeType":""};
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
     $("#tree").contextmenu({
      delegate: "span.fancytree-title",
      menu: "#contextmenu",
//      menu: "#options",
//      menu: [
//          {title: "Add Payloads", cmd: "addPayloads", uiIcon: "ui-icon-copy"},
//	  {title: "Clone", cmd: "cloneGlobalTag",  uiIcon: "ui-icon-copy"}
//          ],
      beforeOpen: function(event, ui) {
        var node = $.ui.fancytree.getNode(ui.target);
                node.setFocus();
        node.setActive();
      },
      select: function(event, ui) {
        var node = $.ui.fancytree.getNode(ui.target);
        alert("select " + ui.cmd + " on " + node);
      }
    });
});

