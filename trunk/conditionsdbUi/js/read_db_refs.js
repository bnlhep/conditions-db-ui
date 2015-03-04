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

