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
treeStringClose =' 	]} ]';
treeString = "";

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
     alert(treeString);
     treeData = JSON.parse(treeString);
     alert("Done getGlobalTagTreeData");
}


function getPayloadTreeData(index) {
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

