// ==========================================================================
// Project:   RforeResources.datasetController
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
RforeResources.datasetController = SC.ObjectController.create({

    // BINDS CONTROLLER TO DATASET MODEL
    contentBinding: 'RforeResources.datasetsController.selection',
    querySuccess: 0,

    populateData: function() {
        // ASYNC CALL TO FETCH JSON - LISTENER BELOW FOR BINDING
        var query = this.get("dataQuery");
        if (query !== undefined)
            query.execute(this.get('dataPoint'));
    },

    // LISTENER FUNCTION FOR END OF ASYNC CALL (USE GET / SET TO MAINTAIN LISTENER)
    bindData: function() {
        var query = this.get("dataQuery");
        var data = query.get('data');

        // CHECK FOR INTIALIZATION
        if (data === undefined)
            return false;

        // UPDATE DATASET MODEL FOR CHARTING
        if (data !== null) {
            this.set("data", data);
            this.notifyPropertyChange('searchObserver');
        } else {
            this.set("data", null);
        }
    }.observes('this.dataQuery.data'),

    // LISTENER FUNCTION TO GENERATE A NEW CHART EVERYTIME A MOCK OBSERVER CHANGES
    generateChart: function() {
        var check = this.get('data');

        // CHECK FOR DATA INITIALIZATION (NOTHING TO CHART)
        if (check === undefined || check === null)
            return false;

        // DATA IS GOOD
        chart = this.get('chart');
        if (chart !== undefined)
            chart.embed('#embed-d3', check, {
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                width: 600,
                height: 400
            });
    }.observes('searchObserver'),

});
