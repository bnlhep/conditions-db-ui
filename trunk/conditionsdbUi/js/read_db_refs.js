//
//  Functions used to read referential information from
//  Conditions Database
//

//
// Global Variables
//

var gt_types = "";

//
//  Functions
//

function get_gt_types () {

   var gt_type_list = new Object();
   var build_string = "";

   gt_type_list = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTagType",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );

   for (var i = 0; i < gt_type_list.length; i++) {
      build_string = build_string + ' <option value="' 
                + gt_type_list[i].name 
                + '">'  
                + gt_type_list[i].name 
                + '</option>' ;
   }
   gt_types = build_string;
}

function dump_gt_types () {

   var gt_type_list = new Object();

   gt_type_list = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTagType",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );

   return gt_type_list; 
}

function get_globaltag_id (globaltagName) {

   var result;
   var gt;
   result = "";
   

   gt = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTags/",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
   for (var i = 0; i < gt.length; i++)
   {
      if (gt[i].name === globaltagName) {
          result = gt[i].globalTagId;
          break;
      } 

   }
   return result;
}

function get_payload_id (payloadName) {

   var result;
   var payloads;
   result = "";


   payloads = $.parseJSON(
    $.ajax(
        {
           url: server + "/payloads" ,
           async: false,
           dataType: 'json'
        }
       ).responseText
    );

   for (var i = 0; i < payloads.length; i++) {
      if (payloadName === payloads[i].name) {
           result = gt[i].globalTagId;
           break;
      }
   }
   return result;
}

function get_run_id(expName, runName)
{
  var result;
  result = "";
//
//  Get Global Tags
//

    var runs = $.parseJSON(
    $.ajax(
        {
           url: server + "/experiment/" + expName + "/runs",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );

    if (expName.length > 0){
        for (i=0; i<runs.length; i++) {
            if (runName === runs[i].name) {    
               result = runs[i].runId;
               break;
            }
        }
     return result;
    }
}


