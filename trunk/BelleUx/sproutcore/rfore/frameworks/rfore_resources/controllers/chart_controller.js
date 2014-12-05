// ==========================================================================
// Project:   RforeResources.chartController
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
RforeResources.chartController = SC.ObjectController.create({

    // TODO: Add your own code here.
    contentBinding: 'RforeResources.datasetController.chart',

    clean: function() {
        var d3 = this.get('d3');
        if (d3 !== undefined) {
            var view = d3.get('view');
            view.stripDOM();
        }
    },
});
