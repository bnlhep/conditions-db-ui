// ==========================================================================
// Project:   RforeD3.Generator
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeD3 */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeD3.Generator = SC.Object.extend({

    type: null,
    view: null,
    dom: null,
    align: null,

    // TODO: Add your own code here.
    generate: function(dom, align) {
        console.log('Found Type: "' + this.get("type") + '"');
        switch (this.get("type")) {
            case "scatterplot":
                console.log('Found ScatterPlot...');
                render = RforeD3.ScatterPlot.create({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "areaplot":
                console.log('Found AreaPlot...');
                render = RforeD3.AreaPlot.create({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "barplot":
                console.log('Found BarPlot...');
                render = RforeD3.BarPlot.create({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "lineplot":
                console.log('Found LinePlot...');
                render = RforeD3.LinePlot.create({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "bubbleplot":
                console.log('Found BubblePlot...');
                render = RforeD3.BubblePlot.create({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            default:
                console.log('Found default...');
                render = RforeD3.Chart.create({
                    dom: dom
                });
                break;
        }

        this.set({
            view: render
        });
    }
});
