function set_globaltag_iov_tmpl (types) {  
 var experiments;
 var runs;
 var globalTags;
 globalTags = get_global_tag_names();

 experiments = get_experiments();
 runs = "";

 create_globaltag_iov_tmpl =  '   <form role = "form" id="frm_create_globaltag_iov" > '
      +  '   <div class="panel panel-default"> '
      +  '   <div class="panel-heading"> Add Payload IOV</div> '
      +  '   <div class="panel-body" > '
      +  '   <input type="hidden" id="input_gtname" type="text"  placeholder="Enter name" /> '
      +  '   <input type="hidden" id="input_payloadid" type="text"   /> '
      +  '   <label id="label_payloadname" for="input_payloadname" >Payload:</label> '
      +  '   <input id="input_payloadname" class="form-control" type="text" placeholder="Select Payload from Treeview" /> '
      +  '   <div class="panel panel-default"> '
      +  '   <div class="panel-heading">Start IOV</label> '
      +  '   </div> '
      +  '   <div class="panel-body" > '
      +  '   <label id="label_iovexpstart" for="select_iov_exp_start"  >Experiment:</label> '
      +  '  <select class="form-control" id="select_iov_exp_start" onChange="change_run_start(this.options[selectedIndex].value)"> '
      +  experiments 
      +  ' </select> '
      +  '   <label id="label_iovrunstart" for="select_iov_run_start" ">Run:</label> '
      +  '  <select class="form-control" id="select_iov_run_start"> '
      +  runs 
      +  ' </select> '
      +  ' </div> '
      +  '   </div> '
      +  '   <div class="panel panel-default"> '
      +  '   <div class="panel-heading">End IOV</label> '
      +  '   </div> '
      +  '   <div class="panel-body" > '
      +  '   <label id="label_iovexpend" for="select_iov_exp_end" >Experiment:</label> '
      +  '  <select class="form-control" id="select_iov_exp_end" onChange="change_run_end(this.options[selectedIndex].value)"> '
      +  experiments 
      +  ' </select> '
      +  '   <label id="label_iovrunend" for="select_iov_run_end" >Run:</label> '
      +  '  <select class="form-control" id="select_iov_run_end"> '
      +  runs 
      +  ' </select> '
      +  ' </div> '
      +  ' </div> '
      +  '   </div> '
      +  '   </div> '
      +  '   <div class="form-group" > '
      +  '   <button type="submit" class="btn btn-default" '
      +  '   onclick="( add_global_tag_payload_iov (input_gtname.value, '
      +  '                       input_payloadid.value, '
      +  '                       select_iov_exp_start.value , '
      +  '                       select_iov_run_start.value , '
      +  '                       select_iov_exp_end.value , '
      +  '                       select_iov_run_end.value ))"> '
      +  '   Add IOV</button>  '
      +  '   <button type="cancel" class="btn btn-default" onclick="( clear_right_div ())"> '
      +  '   Cancel</button>  '
      +  '   </div> '
      +  '  </form> ';
  }




function add_global_tag_payload_iov(gtname, payloadid, estart, rstart, eend, rend ) {

  //alert("gt=" +gtname + "payload" + payloadid + "payload" + estart + rstart + eend + rend);
  var gtid;
  var rstartid;
  var rendid;
  gtid = get_globaltag_id(gtname);
  if (gtid === "") {
    Alert("Unable to find identifier for Global Tag " + gtname);
    return false;
  } 
  rstartid = get_run_id(estart, rstart);
  rendid = get_run_id(eend, rend);

     var dummy; 
     dummy = "";
     var Success;
     var errorMsg;
     Success = false;
     errorMsg = ""
    //alert(new_tag);
    $.ajax({
    url: server + '/globalTagPayload/' + gtid + ',' + payloadid + '/payloadIov/' + rstartid + ',' + rendid, 
    type: 'POST',
    data:  dummy,
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
      alert ("Failure adding payload IOV");
    } else {
      alert ("Success:  " + errorMsg);
//      $('#frm_create_global_tag_iov' ).each(function(){ this.reset(); }); getTreeData();
//      $("#tree").fancytree("getTree").reload(treeData).done(function(){alert('reloaded'); });
    }
//    $("#tree").fancytree();
    return Success;



}
function get_global_tag_names()
{
  var result;
  result = "";
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
    for (var i = 0; i < gt.length; i++) {
          result = result + "<option>" + gt[i].name + "</option>";
     }
    return result;
}

function get_experiments()
{
  var result;
  result = "<option disabled selected>select experiment<option>";
//
//  Get Global Tags
//

    var ex = $.parseJSON(
    $.ajax(
        {
           url: server + "/experiments",
           async: false,
           dataType: 'json'
        }
       ).responseText
    );
    for (var i = 0; i < ex.length; i++) {
          result = result + "<option>" + ex[i].name + "</option>";
     }
    return result;
}

function change_run_start(expName) {
  var myObj;
  myObj = document.getElementById("select_iov_run_start");
  get_experiment_runs(expName, myObj);
}

function change_run_end(expName) {
  var myObj;
  myObj  = document.getElementById("select_iov_run_end");
  get_experiment_runs(expName, myObj);
}

function get_experiment_runs(expName, elementId)
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
    
    elementId.options.length=0
    if (expName.length > 0){
        for (i=0; i<runs.length; i++)
            elementId.options[elementId.options.length]=new Option(runs[i].name)
    }


}

