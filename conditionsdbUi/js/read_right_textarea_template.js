  var read_right_textarea_tmpl =  '<form role="form"> '
              + '<div class="form-group" id="visualization"> '
              +  '   <div class="panel panel-default"> '
              +  '   <div class="panel-heading" style="font-weight: bold">Details</div> '
              +  '   <div class="panel-body" style="height:100%"> '
              + ' <textarea class="form-control" id="textarea_detail" style="height:100%" readonly></textarea> '
              + ' </div> '
              + ' </div> '
              + ' </div> '
//              + '<style type="text/css">'
//              + '#textarea_detail {'
//              + 'height: 80%;'
//              + '}'
//              + '</style>'
              + ' </form> ';

 function read_right_textarea () {
   $("#right").html(window.read_right_textarea_tmpl);
 }

 
 