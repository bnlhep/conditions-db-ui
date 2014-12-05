// ==========================================================================
// Project:   RforeD3.Chart
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeD3 */
sc_require('models/lib/data_functions.js');

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeD3.Chart = SC.Object.extend({

    // TODO: Add your own code here.
    name: 'default-chart',
    csv: "test/data.csv",
    dom: null,
    svg: null,
    margin: null,
    width: null,
    height: null,

    setAlign: function(margin, width, height) {
        this.margin = {
            top: margin.top,
            right: margin.right,
            bottom: margin.bottom,
            left: margin.left
        },
        this.width = width - this.margin.left - this.margin.right,
        this.height = height - this.margin.top - this.margin.bottom;
    },

    setCSV: function(csv) {
        this.set({
            csv: csv
        });
    },

    stripDOM: function() {
        var node = d3.select(this.dom).node();
        if (node !== null)
            node.innerHTML = "";

        return true;
    },

    tabulate: function(appendDOM, data) {
        data = this.dataFcn.jsonTableTransform(data);
        this.dataFcn.dataTabulate(appendDOM, data.set, data.headers);
        return true;
    },
});
