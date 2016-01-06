 $(function() {
      $("#tree").contextmenu({
         target: '#context-menu2', 
         onItem: function(e, item) {
           if ($(item).text() === "Create Global Tag") {
               create_global_tag () ;
           }
           else if ($(item).text() === "Add Payloads") {
               switch_payload_tree();
               read_right_textarea();
           }
           else if ($(item).text() === "Publish Global Tag") {
               publish_global_tag();
           }
           else if ($(item).text() === "Switch Treeview") {
               switch_tree_index();
           }
           else if ($(item).text() === "Create Payload IOV") {
               appCurrentActivity = appActivityTypes[2];
               create_globaltag_iov();
           } else {
               alert($(item).text());
           }
         }
      });
 });

