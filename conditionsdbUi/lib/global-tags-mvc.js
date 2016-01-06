//
// _Working example: [3.html](../3.html)._
// _[Go to Example 4](4.html)_

//


//REQUIRED FOR DEEP BINDING https://coderwall.com/p/exxahg/simple-nested-attributes-for-backbone-model 
Backbone.Model.prototype.get = function (attr) {
  if (-1 === attr.indexOf('.')) 
    return this.attributes[attr];

  return _.inject(attr.split('.'), function (o, k) {
    return o && o[k];
  }, this.attributes);
};
//REQUIRED FOR DEEP BINDING

(function($){
  // **Item class**: The atomic part of our Model. A model is basically a Javascript object, i.e. key-value pairs, with some helper functions to handle event triggering, persistence, etc.

// Models
    GlobalTag = Backbone.Model.extend({
    url:'http://offshoreweb.pnnl.gov:8080/b2s/rest/v1/globalTag/1',
    defaults:{
           "globalTagId": 1,
           "description": "descdefault",
           "dtmIns": "2015-01-28T14:15:17.395674-08:00",
           "dtmMod": "2015-01-28T14:15:17.395674-08:00",
           "isDefault": true,
           "modifiedBy": "adm_cond",
           "name": "TEST_GT1",
           "globalTagStatus":
           {
               "globalTagStatusId": 1,
               "description": "Valid global tag",
               "dtmIns": "2015-01-28T14:15:17.385796-08:00",
               "dtmMod": "2015-01-28T14:15:17.385796-08:00",
               "name": "VALID"
           },
           "globalTagType":
           {
               "globalTagTypeId": 1,
               "description": "Development global tag",
               "dtmIns": "2015-01-28T14:15:17.390663-08:00",
               "dtmMod": "2015-01-28T14:15:17.390663-08:00",
               "name": "DEV"
           }
    }
});

GlobalTagCollection = Backbone.Collection.extend({
    model:GlobalTag ,
    url:'http://offshoreweb.pnnl.gov:8080/b2s/rest/v1/globalTag/1'
});

console.log("Got the Model and Collection Declared");

  var GlobalTagCollectionView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click button#add': 'addGlobalTag'
//EGS           'click  "#tree"': 'addGlobalTag'
    },
    // `initialize()` now instantiates a Collection, and binds its `add` event to own method `appendItem`. (Recall that Backbone doesn't offer a separate Controller for bindings...).
    initialize: function(){
      _.bindAll(this, 'render', 'addGlobalTag', 'appendGlobalTag'); // remember: every function that uses 'this' as the current object should be in here

      this.collection = new GlobalTagCollection();
      this.collection.fetch();
      this.collection.bind('add', this.appendGlobalTag); // collection event binder

      this.counter = 0;
      this.render();
    },
    render: function(){
      // Save reference to `this` so it can be accessed from within the scope of the callback below
      var self = this;
//EGS      $(this.el).append("#tree.fancytree(source: {url :'http://offshoreweb.pnnl.gov:8080/ajax-tree-gt.json'}");
      $(this.el).append("<button id='add'>Get Global Tag</button>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(GlobalTag){ // in case collection is not empty
        self.appendItem(GlobalTag);
      }, this);
    },
    addGlobalTag: function(){
      this.counter++;
      var globaltag = new GlobalTag();
      globaltag.set({
        description: globaltag.get('description') + this.counter // modify item defaults
      });
        console.log('description');

      console.log("The length of the collection is..." + this.collection.length)
      globaltag = this.collection.at(0);
 //     var globaltagstatus = globaltag.get('globaltagStatus');
      //globaltag = this.collection.get(1);
      document.getElementById('globaltagid').value = globaltag.get('globalTagId');
      document.getElementById('globaltagname').value = globaltag.get('name');
      document.getElementById('globaltagdescription').value = globaltag.get('description');
      document.getElementById('globaltagtype').value = globaltag.get('globalTagType.name');
      document.getElementById('globaltagstatus').value = globaltag.get('globalTagStatus.name');
      console.log("The global tag id is " + globaltag.get('globalTagId'));
      console.log("The global tag name is " + globaltag.get('name'));
      console.log("The global tag description is " + globaltag.get('description'));
      //console.log("The global tag status is " + globaltagstatus.name);
      //console.log("The global tag status is " + globaltag.globalTagType.name);
//      console.dir(globaltagstatus);
      //$('ul', this.el).append("<li>"+globaltag.get('globalTagId')+" "+globaltag.get('name')+" "+globaltag.get('description')+"</li>");
      //this.collection.add(globaltag); // add item to collection; view is updated via event 'add'
    },
    // `appendItem()` is triggered by the collection event `add`, and handles the visual update.
    appendGlobalTag: function(globaltag){
      //$('ul', this.el).append("<li>"+globaltag.get('globalTagId')+" "+globaltag.get('name')+" "+globaltag.get('description')+"</li>");
    }
  });

   console.log("Declaring the View");
  var globaltagcollectionview = new GlobalTagCollectionView();
   console.log("Declared the View");
 
})(jQuery);
