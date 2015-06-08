
  function change_global_tag_status(id,status) {
     var Success;
     var errorMsg;
     Success = false;
     errorMsg = ""
    //alert(new_tag);
    $.ajax({
    url: server + '/globalTag/' + id + '/' + status.toUpperCase(),
    type: 'PUT',
    data:  "",
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
      alert ("Failure changing gobal tag status");
    } else {
      alert ("Success:  " + errorMsg);
      getTreeData();
      $("#tree").fancytree("getTree").reload(treeData).done(function(){ });
    }
    $("#tree").fancytree();
    return Success;
  }

