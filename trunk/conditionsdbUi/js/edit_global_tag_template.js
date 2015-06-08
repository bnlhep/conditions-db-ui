function set_edit_global_tag_tmpl (types, globalId) {  
 edit_global_tag_tmpl =  '   <form role = "form" id="frm_edit_global_tag" > '
      +  '   <div class="panel panel-default"> '
      +  '   <div class="panel-heading">Edit Global Tag</div> '
      +  '   <div class="panel-body" > '
      +  '   <input type="hidden" name="globaltagid" value="' + globalId + '"/>'
      +  '   <label id="label_gtname" for="input_gtname" valign="top">Name:</label> '
      +  '   <input id="input_gtname" class="form-control" placeholder="Enter name"/> '
      +  '   <label id="label_gttype" for="select_gttype" valign="top">Type:</label> '
      +  '  <select class="form-control" id="select_gttype"> '
      +  gt_types 
      +  ' </select> '
      +  '   <label id="label_gtdesc" for="textarea_gtdesc" valign="top">Description:</label> '
      +  '   <textarea class="form-control" rows="5" id="textarea_gtdesc" placeholder="Description required"></textarea> '
      +  '   <button type="submit" class="btn btn-default" onclick="(modify_global_tag(input_gtname.value , textarea_gtdesc.value , select_gttype.value, globaltagid.value ))"> '
      +  '   Modify</button>  '
      +  '   <button type="cancel" class="btn btn-default" onclick="( clear_right_div ())"> '
      +  '   Cancel</button>  '
      +  '   </div> '
      +  '   </div> '
      +  '  </form> ';
  }

  function modify_global_tag(name,description,type,globalTagId) {
     var gt_type_list = new Object();
     var typeId;
     var typeId = -1;
     gt_type_list = dump_gt_types();
     for (var i = 0; i < gt_type_list.length; i++) {
         if (gt_type_list[i].name === type ) {
             typeId = gt_type_list[i].globalTagTypeId;
             break;
         }
     } 

     var new_tag =  ' { '
         + ' "globalTagId":"' + globalTagId + '",'
         + ' "description":"' + description + '", '
         + ' "isDefault":"false", '
         + ' "globalTagType" : {"globalTagTypeId":"' + typeId + '"},' 
         + ' "name":"' + name + '" } ';

     var Success;
     var errorMsg;
     Success = false;
     errorMsg = ""
    //alert(new_tag); 
    $.ajax({
    url: server + '/globalTag/',
    type: 'PUT',
    data:  new_tag,
    contentType: "application/json",
    async: false,
    success: function(data){
       Success = true;
       errorMsg = "OK";
    },
    failure: function(errMsg) {
       Success = false;
       errorMsg = "Failure: " + errMsg;
    }
    });
    if (Success === false) {
      alert ("Failure modifying global tag");
    } else {
      alert ("Success:  " + errorMsg);
      $('#frm_edit_global_tag' ).each(function(){ this.reset(); }); getTreeData();
      $("#tree").fancytree("getTree").reload(treeData).done(function(){ });
    }
    $("#tree").fancytree();
    return Success;
  }


function clone_global_tag_operation(id) {
     var blankstring;
     var Success;
     var errorMsg;
     blankstring = "";
     Success = false;
     errorMsg = ""
    //alert(new_tag);
    $.ajax({
    url: server + '/globalTags/'+id,
    type: 'POST',
    data:  blankstring,
    contentType: "application/json",
    async: false,
    success: function(data){
       Success = true;
       errorMsg = "OK";
    },
    failure: function(errMsg) {
       Success = false;
       errorMsg = "Failure: " + errMsg;
    }
    });
    if (Success === false) {
      alert ("Failure cloning global tag");
    } else {
      alert ("Success:  " + errorMsg);
      $('#frm_edit_global_tag' ).each(function(){ this.reset(); }); getTreeData();
      $("#tree").fancytree("getTree").reload(treeData).done(function(){ });
    }
    $("#tree").fancytree();
    return Success; 

}

function populate_edit_with_existing_global_tag(name) {
    var gt = $.parseJSON(
    $.ajax(
        {
           url: server + "/globalTags",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
    for (var i = 0; i < gt.length; i++) {
       if (gt[i].name === name) {
          $('#input_gtname').val(name);          
          $('#select_gttype').val(gt[i].globalTagType.name);
          $('#textarea_gtdesc').val(gt[i].description);
          break;
       }
    }

}

