
// Models
window.GlobalTag = Backbone.Model.extend({
    url:'http://localhost:8080/cellar/rest/wines',
    defaults:{
        "id":null,
        "name":"",
        "type":"",
        "status":"",
        "description":""
    }
});

window.GlobalTagCollection = Backbone.Collection.extend({
    model:GlobalTag ,
    url:'http://localhost:8080/cellar/rest/wines'
//  ,  url:"../api/wines"
});

