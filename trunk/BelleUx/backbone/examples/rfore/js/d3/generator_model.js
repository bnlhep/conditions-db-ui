/** @class

  (Document your Model here)
  @version 0.1
*/
console.log("Created Chart Generator <generator_model.js> ...");
RforeD3.Generator = Backbone.Model.extend({

    default: {
        type: null,
        view: null,
        dom: null,
        align: null
    },

    // TODO: Add your own code here.
    generate: function(dom, align) {
        console.log('Found Type: "' + this.get("type") + '"');
        switch (this.get("type")) {
            case "scatterplot":
                console.log('Found ScatterPlot...');
                render = new RforeD3.ScatterPlot({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "areaplot":
                console.log('Found AreaPlot...');
                render = new RforeD3.AreaPlot({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "barplot":
                console.log('Found BarPlot...');
                render = new RforeD3.BarPlot({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "lineplot":
                console.log('Found LinePlot...');
                render = new RforeD3.LinePlot({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            case "bubbleplot":
                console.log('Found BubblePlot...');
                render = new RforeD3.BubblePlot({
                    dom: dom,
                    margin: align.margin,
                    width: align.width,
                    height: align.height
                });
                break;
            default:
                console.log('Found default...');
                render = new RforeD3.Chart({
                    dom: dom
                });
                break;
        }

        this.set({
            view: render
        });
    }
});
