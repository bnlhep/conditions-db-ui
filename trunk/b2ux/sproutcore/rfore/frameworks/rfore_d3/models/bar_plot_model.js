// ==========================================================================
// Project:   RforeD3.BarPlot
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeD3 */
sc_require('models/chart_model');
sc_require('models/lib/data_functions.js');

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeD3.BarPlot = RforeD3.Chart.extend({

    // TODO: Add your own code here.
    dataFcn: RforeD3.dataFcn.create(),
    name: 'barplot',

    appendDOM: function() {
        console.log("Appending to DOM element: " + this.get('dom'));
        var render = d3.select(this.dom).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        console.log("Render created: " + render);
        this.set({
            svg: render
        });
    },

    // MOST OF THIS FUNCTION IS DEMO
    chart: function(data) {

        // GET PRIVATE VARS
        var width = this.get('width');
        var height = this.get('height');
        var svg = this.get('svg');
        console.log("SVG initialized as: " + svg);

        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };
        width = 660 - margin.left - margin.right;
        height = 450 - margin.top - margin.bottom;

        var color = d3.scale.category10();

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        // CREATE DISPLAY DATA (UNIFIED TRANSFORM FCN)
        data = this.dataFcn.jsonTransform(data);

        // DISPLAY VARIABLES
        var headers = data.headers;
        var set = data.set;
        var name = data.name;
        var displayData = new Array();

        for (var i = 0; i < set.length; i++) {
            var s = set[i];

            displayData.push({
                "x": s.x,
                "y": s.y,
                "name": name
            });
        };

        displayData.forEach(function(d) {
            d.y = +d.y;
        });

        // CREATE CHART
        x.domain(displayData.map(function(d) {
            return d.x;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.y;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(headers.y);

        svg.selectAll(".bar")
            .data(displayData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(d.x);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d.y);
            })
            .attr("height", function(d) {
                return height - y(d.y);
            });
    }
});
