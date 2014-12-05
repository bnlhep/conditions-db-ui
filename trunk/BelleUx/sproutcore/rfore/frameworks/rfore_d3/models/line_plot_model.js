// ==========================================================================
// Project:   RforeD3.LinePlot
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
RforeD3.LinePlot = RforeD3.Chart.extend({

    // TODO: Add your own code here.
    dataFcn: RforeD3.dataFcn.create(),
    name: 'lineplot',

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

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .ticks(8)
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .ticks(8)
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            });

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

        // CREATE CHART
        displayData.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        x.domain(d3.extent(displayData, function(d) {
            return d.x;
        })).nice();
        y.domain(d3.extent(displayData, function(d) {
            return d.y;
        })).nice();


        svg.append("path")
            .datum(displayData)
            .attr("class", "line")
            .attr("d", line);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text(headers.x);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(headers.y);

        var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) {
                return d;
            });
    }
});
