  var read_right_textarea_tmpl =  '<form role="form"> '
              + '<div class="form-group" id="visualization" style="overflow:scroll" > '
              +  '   <div class="panel panel-default"> '
              +  '   <div class="panel-heading">Details</div> '
              +  '   <div class="panel-body" > '
              + ' <textarea class="form-control" id="textarea_detail" rows="15" readonly></textarea> '
              + ' </div> '
              + ' </div> '
              + ' </div> '
              + ' </form> ';

 function read_right_textarea () {
   $("#right").html(window.read_right_textarea_tmpl);
 }
