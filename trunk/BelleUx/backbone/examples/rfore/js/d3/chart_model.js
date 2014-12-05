/** @class

  (Document your Model here)
  @version 0.2
*/
console.log('Reading chart_model.js...');
RforeD3.Chart = Backbone.Model.extend({

    // TODO: Add your own code here.
    defaults: function() {
        return {
            name: 'default-chart',
            csv: "test/data.csv",
            dom: null,
            svg: null,
            margin: null,
            width: null,
            height: null
        }
    },

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
        var node = d3.select(this.get('dom')).node();
        if (node !== null)
            node.innerHTML = "";

        return true;
    },

    tabulate: function(appendDOM, data) {
        data = this.dataFcn.jsonTableTransform(data);
        this.dataFcn.dataTabulate(appendDOM, data.set, data.headers);
        return true;
    }
});
