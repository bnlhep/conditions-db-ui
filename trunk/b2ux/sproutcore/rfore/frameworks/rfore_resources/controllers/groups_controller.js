// ==========================================================================
// Project:   RforeResources.groupsController
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
RforeResources.groupsController = SC.ArrayController.create({
    allowsMultipleSelection: NO,
    querySuccess: 0,
    dataPoint: null,

    // ASYNC QUERY ENGINE
    dataQuery: SC.Object.create({
        value: null,
        data: null,
        execute: function(value) {
            var request = SC.Request.getUrl(RforeResources.AJAX_URL_BASE + 'groups.json')
            
            // ENABLE CORS AJAX CALLS
            request.set('attachIdentifyingHeaders', NO);
            request.header({ 'Accept': 'application/json' })
                .json()
                .notify(this, 'callback')
                .send();

            this.set('value', value);
        },

        //AJAX DONE, DO SOMETHING
        callback: function(response) {
            if (SC.ok(response)) {
                var obj = response.get('body');
                var groups = this.parseData(obj);
                this.set('data', groups);
            } else {
                this.set('data', null);
            }
        },

        //DATA NEEDS PARSED IN STORE
        parseData: function(groups) {
            //CREATES SC.ARRAY (AUTO MIXIN)
            var set = [];

            //ITTERATE OVER RETURNED DATA
            for (var i = 0; i < groups.length; i++) {
                var obj = groups[i];

                // CREATE RECORDS FOR ARRAY CONTROLLER
                var group = RforeResources.GroupStore.createRecord(RforeResources.Group, obj);
                set.pushObject(group);
            }

            return set;
        },
    }),

    // LISTENER FUNCTION FOR END OF ASYNC CALL (USE GET / SET TO MAINTAIN LISTENER)
    bindData: function() {
        var query = this.get("dataQuery");
        var data = query.get('data');

        // CHECK FOR INTIALIZATION
        if (data === undefined)
            return false;

        // UPDATE DATASET MODEL FOR CHARTING
        if (data !== null) {
            // CONTENT IS BINDING VARIABLE FOR AN ARRAY CONTROLLER
            this.set("content", data);
        } else {
            this.set("content", null);
        }
    }.observes('this.dataQuery.data'),

    // TODO: Add your own code here.
    populateData: function() {
        // ASYNC CALL TO FETCH JSON - LISTENER BELOW FOR BINDING
        var query = this.get("dataQuery");
        query.execute(this.get('dataPoint'));
    }
});
