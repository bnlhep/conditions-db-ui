// ==========================================================================
// Project:   RforeResources.groupController
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
RforeResources.groupController = SC.ObjectController.create({

    // TODO: Add your own code here.
    contentBinding: 'RforeResources.groupsController.selection',
    querySuccess: 0,
    dataPoint: null,

    // ASYNC QUERY ENGINE
    dataQuery: SC.Object.create({
        value: null,
        data: null,
        execute: function(value) {
            console.log("Fetching Data for Group: " + value)
            var request = SC.Request.getUrl(RforeResources.AJAX_URL_BASE + 'datasets.json')

            // ENABLE CORS CALLS
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
                var sets = this.parseData(obj);
                this.set('data', sets);
            } else {
                this.set('data', null);
            }
        },

        //DATA NEEDS PARSED IN STORE
        parseData: function(sets) {
            //CREATES SC.RecordArray (AUTO MIXIN)
            RforeResources.DatasetStore.reset();
            var set = [];

            //ITTERATE OVER RETURNED DATA
            for (var i = 0; i < sets.length; i++) {
                var obj = sets[i];
                
                // TEST DATA
                var rand = Math.floor((Math.random() * 10000) + 1);
                obj.guid = rand;
                obj.name = obj.name + ": " + rand;
                console.log("Found set: " + obj.name);

                // CREATE RECORDS FOR ARRAY CONTROLLER
                var data = RforeResources.DatasetStore.createRecord(RforeResources.Dataset, obj);
                set.pushObject(data);
            }

            return set;
        },
    }),

    populateDatasets: function() {
        // ASYNC CALL TO FETCH JSON - LISTENER BELOW FOR BINDING
        if (RforeResources.groupsController.selection().length() > 0) {
            RforeResources.chartController.clean();
            var query = this.get("dataQuery");
            query.execute(this.get("name"));
        }
    }.observes('RforeResources.groupController.dataQuery'),

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
            RforeResources.datasetsController.set("content", data);
        } else {
            RforeResources.datasetsController.set("content", null);
        }
    }.observes('this.dataQuery.data'),

});
