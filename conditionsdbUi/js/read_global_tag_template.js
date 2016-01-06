var read_global_tag_tmpl = '<div class="col-md-6" id="right" > ' 
           + ' <table> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Details:</label> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Global Tag Id:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagid"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Global Tag Name:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagname"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Status:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagstatus"/> '
           + ' </td> '
           + ' </tr> '
            + ' <tr> '
            + ' <td> '
           + ' <label>Tag Type:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagtype"/> '
           + ' </td> '
           + ' </tr> '
            + ' <tr> '
            + ' <td> '
           + ' <label>Tag Type Description:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagtypedescription"/> '
           + ' </td> '
           + ' </tr> '
            + ' <tr> '
            + ' <td> '
           + ' <label>Tag Type Creation:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagtypecreation"/> '
           + ' </td> '
           + ' </tr> '
            + ' <tr> '
            + ' <td> '
           + ' <label>Tag Type Modification:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagtypemodifydate"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Description:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagdescription"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Creation:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagcreation"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Modification Date:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagmodifydate"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Modified By:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagmodifiedby"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Status Description:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagstatusdescription"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Status Creation:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagstatuscreation"/> '
           + ' </td> '
           + ' </tr> '
           + ' <tr> '
           + ' <td> '
           + ' <label>Modification Status Date:</label> '
           + ' </td> '
           + ' <td> '
           + ' <input id="globaltagstatusmodifydate"/> '
           + ' </td> '
           + ' </tr> '
          + ' </table> '
          + ' </div> ';


         function clearvals(){
           document.getElementById('globaltagid').value = "";
           document.getElementById('globaltagname').value = "";
           document.getElementById('globaltagdescription').value = "";
           document.getElementById('globaltagcreation').value = "";
           document.getElementById('globaltagmodifydate').value = "";
           document.getElementById('globaltagmodifiedby').value = "";
          document.getElementById('globaltagtype').value = "";
          document.getElementById('globaltagtypedescription').value = "";
           document.getElementById('globaltagtypecreation').value = "";
           document.getElementById('globaltagtypemodifydate').value = "";
             document.getElementById('globaltagstatus').value = "";
           document.getElementById('globaltagstatusdescription').value = "";
           document.getElementById('globaltagstatuscreation').value = "";
           document.getElementById('globaltagstatusmodifydate').value = "";

         }

         function getval(index) {
           jQuery.getJSON( server + "/globalTag/"+index, function( response ) {
           //console.dir(response)
           //console.log(response.globalTagId + " " + response.name + " " + response.desc + " " + response.dtmIns);
           document.getElementById('globaltagid').value = response.globalTagId;
           document.getElementById('globaltagname').value = response.name;
           document.getElementById('globaltagdescription').value = response.description;
           document.getElementById('globaltagcreation').value = response.dtmIns;
           document.getElementById('globaltagmodifydate').value = response.dtmMod;
 //          document.getElementById('globaltagisdefault').value = response.isDefault;
           document.getElementById('globaltagmodifiedby').value = response.modifiedBy;
          document.getElementById('globaltagtype').value = response.globalTagType.name;
          document.getElementById('globaltagtypedescription').value = response.globalTagType.description;
           document.getElementById('globaltagtypecreation').value = response.globalTagType.dtmIns;
           document.getElementById('globaltagtypemodifydate').value = response.globalTagType.dtmMod;
             document.getElementById('globaltagstatus').value = response.globalTagStatus.name;
           document.getElementById('globaltagstatusdescription').value = response.globalTagStatus.description;
           document.getElementById('globaltagstatuscreation').value = response.globalTagStatus.dtmIns;
           document.getElementById('globaltagstatusmodifydate').value = response.globalTagStatus.dtmMod;
           response['return'];
           });
          }
