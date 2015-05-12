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
//EG MAY BE OBSOLETE var payloadsForGlobalTag;
//EGS MAY BE OBSOLETE payloadsForGlobalTag = new Object();

//
//
//

//
// Payload Tree functions
//

//
//
//


//EGS MAY BE OBSOLETE function payloadsAssignedToGlobalTag(id) {
//EGS MAY BE OBSOLETE  var results;
//EGS MAY BE OBSOLETE  results = new Object();
//EGS MAY BE OBSOLETE  results  = $.parseJSON(
//EGS MAY BE OBSOLETE  $.ajax(
//EGS MAY BE OBSOLETE        {
//EGS MAY BE OBSOLETE           url: server + "/globalTag/" + id + "/payloads",
//EGS MAY BE OBSOLETE           async: false,
//EGS MAY BE OBSOLETE           dataType: 'json'
//EGS MAY BE OBSOLETE        }
//EGS MAY BE OBSOLETE       ).responseText
//EGS MAY BE OBSOLETE  );
//EGS MAY BE OBSOLETE  payloadsForGlobalTag = results;
//EGS MAY BE OBSOLETE}

//EGS MAY BE OBSOLETE function isPayloadAssignedToGlobalTag(id) {
//EGS MAY BE OBSOLETE  var results;
//EGS MAY BE OBSOLETE  results = false;
//EGS MAY BE OBSOLETE  for (var p=0; p < payloadsForGlobalTag.length; p++) {
//EGS MAY BE OBSOLETE      if (id == payloadsForGlobalTag[p].payloadId) {
//EGS MAY BE OBSOLETE         results = true;
//EGS MAY BE OBSOLETE         break;
//EGS MAY BE OBSOLETE      }
//EGS MAY BE OBSOLETE  }
//EGS MAY BE OBSOLETE  return results;
//EGS MAY BE OBSOLETE }


function getGlobalTagPayloadRecords(globalTagId, globalTagName) {
   var results;
   var buildId;
   var buildSortKey;
   var payloadList = new Object();
   var buildString = "[";
 
   results = new Object();
//EGS MAY BE OBSOLETE payloadsAssignedToGlobalTag(1);

   payloadList = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTag/" + globalTagId + "/payloads",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
   if (globalTagName.length == 0) {
       globalTagName = 'null';
   }
   for (var i = 0; i < payloadList.length; i++) {
      buildId = globalTagName 
                + '...'
                + payloadList[i].basf2Module.basf2Package.name
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
                + '","payloadName": "'
                + payloadList[i].payloadUrl
                + '","payloadId": "'
                + payloadList[i].payloadId
//EGS THIS MAY BE OBSOLETE
                + '","hasGlobalTag":false' 
//EGS THIS MAY BE OBSOLETE                + '","hasGlobalTag":' +  isPayloadAssignedToGlobalTag(payloadList[i].payloadId)
                + ' }';
      if (i < (payloadList.length-1)) {
        buildString = buildString + ',';
      }

   }
   buildString = buildString + ']'
   payloadTable = JSON.parse(buildString);
   payloadTable.sort(function(a, b) {
    var textA;
    var textB;
    textA = a.sortKey.toLowerCase();
    textB = b.sortKey.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   });
   results = payloadTable;
   return results;

}

function getAllPayloadRecords() {
   var results;
   var buildId;
   var buildSortKey;
   var payloadList = new Object();
   var buildString = "[";
 
   results = new Object();
//EGS MAY BE OBSOLETE payloadsAssignedToGlobalTag(1);

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
                + '","payloadName": "'
                + payloadList[i].payloadUrl
                + '","payloadId": "'
                + payloadList[i].payloadId
//EGS THIS MAY BE OBSOLETE
                + '","hasGlobalTag":false' 
//EGS THIS MAY BE OBSOLETE                 + '","hasGlobalTag":' +  isPayloadAssignedToGlobalTag(payloadList[i].payloadId)
                + ' }';
      if (i < (payloadList.length-1)) {
        buildString = buildString + ',';
      }

   }
   buildString = buildString + ']'
   payloadTable = JSON.parse(buildString);
   payloadTable.sort(function(a, b) {
    var textA;
    var textB;
    textA = a.sortKey.toLowerCase();
    textB = b.sortKey.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   });
   results = payloadTable;
   return results;

}

function getRelativePath (name) {
    var results;
    var tokens;
    tokens  = new Array();
    results = "";
    tokens = name.split("/");
    results = tokens[tokens.length-1];
    return results; 
}

function getGlobaltagPayloadTreeData(globalTagId, treeIndex, globalTagName, invalidStatus) {

   var payloadTable = new Object();
   var prevPackage;
   var prevModule;
   var currPackage;
   var currModule;
   var addedParentTag;
   var packageIndex;
   var moduleIndex;
   var mytreeEntry;
   mytreeEntry  = new Object();
   addedParentTag = false;
   payloadTable = getGlobalTagPayloadRecords(globalTagId, globalTagName);
   prevPackage = "";
   prevModule = "";
   packageIndex = 0;
   moduleIndex = 0;
   for (var i = 0; i < payloadTable.length; i++) {
      currPackage = payloadTable[i].packageName.toLowerCase();
      currModule = payloadTable[i].moduleName.toLowerCase();
      if ((currPackage == prevPackage) && (currModule == prevModule)) {
          console.log("\t\t"+ payloadTable[i].payloadName);
          mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
          treeData[0].children[treeIndex].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      } else if (currPackage == prevPackage)  {
           if (currModule == prevModule) {
               console.log("\t\t"+ payloadTable[i].payloadName);
               mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
                              "selected": payloadTable[i].hasGlobalTag,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "extraClasses":"answer"};
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
               treeData[0].children[treeIndex].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
           } else {
               prevModule = payloadTable[i].moduleName.toLowerCase();
               console.log("\t"+ prevModule);
               console.log("\t\t"+ payloadTable[i].payloadName);
               mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "module",
                              "description": "",
                              "extraClasses":"yes",
                              "folder":true,
                              "children" : new Array() };
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
               treeData[0].children[treeIndex].children[packageIndex].children.push(mytreeEntry);
               moduleIndex = treeData[0].children[treeIndex].children[packageIndex].children.length - 1;
               mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
               treeData[0].children[treeIndex].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
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
                              "folder":true,
                              "children" : new Array() };
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
              treeData[0].children[treeIndex].children.push(mytreeEntry);
              packageIndex = treeData[0].children[treeIndex].children.length - 1;
              prevModule = payloadTable[i].moduleName.toLowerCase();
              mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "module",
                              "description": "",
                              "extraClasses":"yes",
                              "folder":true,
                              "children" : new Array() };
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
              treeData[0].children[treeIndex].children[packageIndex].children.push(mytreeEntry);
              moduleIndex = treeData[0].children[treeIndex].children[packageIndex].children.length -1;
              console.log("\t"+ prevModule);
              console.log("\t\t"+ payloadTable[i].payloadName);
              mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
          if (invalidStatus) {
             mytreeEntry.extraClasses = "gtinvalid";
          }
              treeData[0].children[treeIndex].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      }
   }
//EGS THIS MAY BE OBSOLETE  treeString = treeString + treeStringClose;
   //console.log(treeString);
}




//EGS THIS MAY BE OBSOLETE function getPayloadTreeData (globaltagId) {
function getPayloadTreeData () {

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
   payloadTable = getAllPayloadRecords();
   prevPackage = "";
   prevModule = "";
   packageIndex = 0;
   moduleIndex = 0;
   for (var i = 0; i < payloadTable.length; i++) {
      currPackage = payloadTable[i].packageName.toLowerCase();
      currModule = payloadTable[i].moduleName.toLowerCase();
      if ((currPackage == prevPackage) && (currModule == prevModule)) {
          console.log("\t\t"+ payloadTable[i].payloadName);
          mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
          mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      } else if (currPackage == prevPackage)  {
           if (currModule == prevModule) {
               console.log("\t\t"+ payloadTable[i].payloadName);
               mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
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
               console.log("\t\t"+ payloadTable[i].payloadName);
               mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "module",
                              "description": "",
                              "extraClasses":"yes",
                              "folder":true,
                              "children" : new Array() };
               mytree[0].children[packageIndex].children.push(mytreeEntry);
               moduleIndex = mytree[0].children[packageIndex].children.length - 1;
               mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
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
                              "folder":true,
                              "children" : new Array() };
              mytree[0].children.push(mytreeEntry);
              packageIndex = mytree[0].children.length - 1;
              prevModule = payloadTable[i].moduleName.toLowerCase();
              mytreeEntry = {"title": prevModule,
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "module",
                              "description": "",
                              "folder": true,
                              "extraClasses":"yes",
                              "children" : new Array() };
              mytree[0].children[packageIndex].children.push(mytreeEntry);
              moduleIndex = mytree[0].children[packageIndex].children.length -1;
              console.log("\t"+ prevModule);
              console.log("\t\t"+ payloadTable[i].payloadName);
              mytreeEntry = {"title": getRelativePath(payloadTable[i].payloadName),
                              "id": payloadTable[i].recordId,
                              "dbid" : payloadTable[i].payloadId,
                              "type": "payload",
                              "description": "",
                              "selected": payloadTable[i].hasGlobalTag,
                              "extraClasses":"answer"};
              mytree[0].children[packageIndex].children[moduleIndex].children.push(mytreeEntry);
      }
   }
//EGS THIS MAY BE OBSOLETE  treeString = treeString + treeStringClose;
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
//EGS THIS MAY BE OBSOLUTE
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
       + '", "dbid": "' + payload[p].payloadId 
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

//EGS THIS MAY BE OBSOLETE treeString = treeStringBegin;

   var payloadTable = new Object();
//EGS THIS COULD BE NAI
   var payloads = new Array();
//EGS THIS COULD BE NAI
   treeData  = new Array();
   mytreeEntry = {"title": "<strong>" + uxTree[0].title + "</strong>",
                    "expanded": true,
                    "folder": true,
                    "children": new Array()};
    treeData.push(mytreeEntry);

   addedParentTag = false;



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
    var gtStatusIcon;
    var invalidStatus;

    for (var i = 0; i < gt.length; i++) {

     if (gt[i].globalTagStatus.name.toUpperCase() === "INVALID") {
        gtStatusIcon = "gtinvalid";
     }
     else if (gt[i].globalTagStatus.name.toUpperCase() === "NEW") {
        gtStatusIcon = "gtnew";
     }
     else if (gt[i].globalTagStatus.name.toUpperCase() === "PUBLISHED") {
        gtStatusIcon = "gtpublish";
     } else {
        gtStatusIcon = "NONE";
     }

       payloads = getPayloads(gt[i].globalTagId);
       if (payloads.length > 0 ) {
          if (gtStatusIcon === "NONE") {
             gtStatusIcon = "yes";
          }
          mytreeEntry = {"title":gt[i].name, 
                   "id":gtid_prefix + gt[i].globalTagId,
                   "dbid":gt[i].globalTagId,
                   "type":"globaltag",
                   "description":"",
                   "extraClasses":gtStatusIcon,
                   "folder": true,
                   "children":new Array()};
          treeData[0].children.push(mytreeEntry);
          if (gtStatusIcon === "gtinvalid") {
             invalidStatus = true;
          } else {
             invalidStatus = false;
          }
          getGlobaltagPayloadTreeData(gt[i].globalTagId,i,gt[i].name, invalidStatus);
       } else {
          if (gtStatusIcon === "NONE") {
             gtStatusIcon = "answer";
          }
          mytreeEntry = {"title":gt[i].name, 
                   "id":gtid_prefix + gt[i].globalTagId,
                   "dbid":gt[i].globalTagId,
                   "type":"globaltag",
                   "description":"",
                   "folder":true,
                   "extraClasses":gtStatusIcon};
           treeData[0].children.push(mytreeEntry);
       }
    }
//EGS THIS MAY BE OBSOLETE            treeString = treeString + '{"title": "'
//EGS THIS MAY BE OBSOLETE                         + gt[i].name 
//EGS THIS MAY BE OBSOLETE                         + '", "id": "'
//EGS THIS MAY BE OBSOLETE                         + gtid_prefix
//EGS THIS MAY BE OBSOLETE                         + gt[i].globalTagId 
//EGS THIS MAY BE OBSOLETE                         + '", "dbid": "'
//EGS THIS MAY BE OBSOLETE                         + gt[i].globalTagId 
//EGS THIS MAY BE OBSOLETE                         + '", "type": "globaltag" '
//EGS THIS MAY BE OBSOLETE                         + ', "description": "" '
//EGS THIS MAY BE OBSOLETE                         + ', "extraClasses": "yes", "children":';
//EGS THIS MAY BE OBSOLETE               treeString = treeString + payloads ;
//EGS THIS MAY BE OBSOLETE        } else {
//EGS THIS MAY BE OBSOLETE               treeString = treeString
//EGS THIS MAY BE OBSOLETE                         + '{"title": "' 
//EGS THIS MAY BE OBSOLETE                         + gt[i].name 
//EGS THIS MAY BE OBSOLETE                         + '", "id": "' 
//EGS THIS MAY BE OBSOLETE                         + gtid_prefix
//EGS THIS MAY BE OBSOLETE                         + gt[i].globalTagId 
//EGS THIS MAY BE OBSOLETE                         + '", "dbid": "'
//EGS THIS MAY BE OBSOLETE                         + gt[i].globalTagId 
//EGS THIS MAY BE OBSOLETE                         + '", "type": "globaltag" '
//EGS THIS MAY BE OBSOLETE                         + ', "description": "" '
//EGS THIS MAY BE OBSOLETE                         + ', "extraClasses": "answer"}';
//EGS THIS MAY BE OBSOLETE        }
//EGS THIS MAY BE OBSOLETE        if (i == (gt.length-1)) {
//EGS THIS MAY BE OBSOLETE              treeString = treeString + treeStringClose;
//EGS THIS MAY BE OBSOLETE           break;
//EGS THIS MAY BE OBSOLETE        }
//EGS THIS MAY BE OBSOLETE        treeString = treeString + ',';
//EGS THIS MAY BE OBSOLETE     }
//EGS THIS MAY BE OBSOLETE     treeData = JSON.parse(treeString);
}




function getTreeData() {
   if (treeIndex == 0) {
      getGlobalTagTreeData();
   }  else {
      getPayloadTreeData();
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


function retrieveGlobalTagNameDump(globaltagName) {
// get Global Tag based on global tag name 
//

   var globaltag = new Object();
    var globaltag = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTag/" + globaltagName,
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
  result = result +  "\n\nStatus:" + dumpPropertyStrings(globaltag.globalTagStatus); 
  result = result +  "\n\nType:" + dumpPropertyStrings(globaltag.globalTagType); 
  return result;
}

$(function(){
	// using default options
	$("#tree").fancytree({
                 source:treeData,
                 selectMode: 1,
                 checkbox: false,
                 autoScroll: true,
                 extensions: ["filter"],
                 quicksearch: true,
                 filter: {
                    mode: "hide",
                    autoApply: "true",
                    leavesOnly: "true",
                    autoExpand: "true"
                 },
                focus: function(event, data) {
                    //logEvent(event, data);
                    selectedNode.nodeId = data.node.data.dbid;
                    $("#context-menu2").html(window.nofunction_context_menu_tmpl);
                    selectedNode.nodeType = data.node.data.type;
                    selectedNode.nodeTitle = data.node.title;
                    if (appCurrentActivity === appActivityTypes[0]) { 
                       read_right_textarea();
                       if (selectedNode.nodeType === "globaltag") {
                           document.getElementById('textarea_detail').value = dumpGlobalTag(selectedNode.nodeId);
                           var gttmp = retrieveGlobalTagDump(selectedNode.nodeId);
                           if (gttmp.globalTagStatus.name.toUpperCase() === "PUBLISHED") {
                              $("#context-menu2").html(window.read_published_global_tag_context_menu_tmpl);
                              $("#mainmenu_globaltag").html(window.read_published_global_tag_main_menu_tmpl);
                           } else if (gttmp.globalTagStatus.name.toUpperCase() === "NEW") {
                              $("#context-menu2").html(window.read_new_global_tag_context_menu_tmpl);
                              $("#mainmenu_globaltag").html(window.read_new_global_tag_main_menu_tmpl);
                           } else {
                              $("#context-menu2").html(window.read_invalid_global_tag_context_menu_tmpl);
                              $("#mainmenu_globaltag").html(window.read_invalid_global_tag_main_menu_tmpl);
                           }
                       } else if (selectedNode.nodeType === "payload" ) {
                            document.getElementById('textarea_detail').value = dumpPayload(selectedNode.nodeId);
                       } else if (selectedNode.nodeType === "module" ) {
                            var tmpModuleDump;
                            var tmpGlobalTagName;
                            var idTokens;
                            var timeline;
                            var tmpPayload;
                            var idTokens = new Array();
                            tmpModuleDump = new Object();
                            timeline = new Object();
                            tmpModuleDump = dumpModule(selectedNode.nodeId);
                            document.getElementById('textarea_detail').value = tmpModuleDump;
                            idTokens = data.node.data.id.split('...');
                            tmpGlobalTagName = idTokens[0];
                            tmpPayload = retrievePayloadDump(selectedNode.nodeId); 
                            timeline = getGlobaltagPayloads(tmpGlobalTagName, tmpPayload.basf2Module.name );
                          
                       } else if (selectedNode.nodeType === "package" ) {
                            document.getElementById('textarea_detail').value = dumpPackage(selectedNode.nodeId);
                       } else {
                            document.getElementById('textarea_detail').value = selectedNode.nodeTitle;
                       }
                    } else if (appCurrentActivity === appActivityTypes[2]) {
                         if (selectedNode.nodeType === "payload")  {
                             $('#input_payloadname').val(selectedNode.nodeTitle);
                             $('#input_payloadid').val(data.node.data.dbid);
                         }
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
