// ==========================================================================
// Project:   RforeResources.Charts
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeResources.Chart = SC.Object.extend({

    // TODO: Add your own code here.
    name: null, 
    type: "scatterplot", 
    d3: RforeD3.Generator.create({
        type: this.type
    }),

    embed: function(dom, data, align) {

        // FACTORY CREATE CHART BY TYPE
        this.d3.set({type: this.get("type")});
        this.d3.generate(dom, align);
        view = this.d3.get('view');

        // APPEND TO DOCUMENT MODEL AND ADD D3 CHART
        view.stripDOM();
        view.appendDOM();
        view.chart(data);
        view.tabulate("#d3-data-table-container", data);
    }
});
