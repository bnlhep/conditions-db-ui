function set_global_tag_tmpl (types) {  
 create_global_tag_tmpl = ' <div class="col-md-6" id="right" >'
      +  '   <form role = "form" id="frm_create_global_tag" > '
      +  '   <div class="form-horizontal" > '
      +  '   <div class="form-group" > '
      +  '   <label id="label_create_gt_form" >Create Global Tag</label> '
      +  '   </div> '
      +  '   <div class="form-group" > '
      +  '   <label id="label_gtname" for="input_gtname" valign="top">Name:</label> '
      +  '   <input id="input_gtname" placeholder="Enter name"/> '
      +  '   </div> '
      +  '   <div class="form-group" > '
      +  '   <label id="label_gttype" for="select_gttype" valign="top">Type:</label> '
      +  '  <select class="form-control" id="select_gttype"> '
      +  gt_types 
      +  ' </select> '
      +  '   </div> '
      +  '   <div class="form-group" > '
      +  '   <label id="label_gtdesc" for="textarea_gtdesc" valign="top">Description:</label> '
      +  '   <textarea class="form-control" rows="5" id="textarea_gtdesc" placeholder="Description required"></textarea> '
      +  '   </div> '
      +  '   <div class="form-group" > '
      +  '   <button type="submit" class="btn btn-default" onclick="(new_global_tag(input_gtname.value , textarea_gtdesc.value , select_gttype.value ))"> '
      +  '   Create</button>  '
      +  '   <button type="cancel" class="btn btn-default" onclick="( clear_right_div ())"> '
      +  '   Cancel</button>  '
      +  '   </div> '
      +  '  </form> '
      +  '  </div> ';
  }

  function new_global_tag(name,description,type) {
     var new_tag =  ' { '
         + ' "description":"' + description + '", '
         + ' "isDefault":"false", '
         + ' "name":"' + name + '" } ';

    //alert(new_tag); 
    $.ajax({
    url: server + '/globalTag/' + type,
    type: 'POST',
    data:  new_tag,
    contentType: "application/json",
    async: true,
    //success: function(data){alert(data);},
    success: function(data){
            $('#frm_create_global_tag' ).each(function(){ this.reset(); }); getTreeData();
   $("#tree").fancytree("getTree").reload(treeData).done(function(){ });},
    failure: function(errMsg) {
        alert(errMsg);
    }
    });
    //alert(name + ' ' + type + ' ' + description); 
    $("#tree").fancytree();
  }
