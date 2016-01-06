//
//  Functions used to read referential information from
//  Conditions Database
//

//
// Global Variables
//


//
//  Functions
//

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
                + '","hasGlobalTag":false }';
      if (i < (payloadList.length-1)) {
        buildString = buildString + ','; 
      }

   }
   buildString = buildString + ']'
   //console.log(buildString);
   payloadTable = JSON.parse(buildString);
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
