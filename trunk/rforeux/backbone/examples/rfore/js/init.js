$(function() {
    RforeResources.View = Backbone.Model.extend({

        // TODO: Add your own code here.
        name: null,
        type: "scatterplot",
        d3: new RforeD3.Generator({
            type: this.type
        }),

        embed: function(dom, data, align) {

            // FACTORY CREATE CHART BY TYPE
            this.d3.set({
                type: this.type
            });
            this.d3.generate(dom, align);
            view = this.d3.get('view');

            // APPEND TO DOCUMENT MODEL AND ADD D3 CHART
            view.stripDOM();
            view.appendDOM();
            view.chart(data);
            view.tabulate("#d3-data-table-container", data);
        }
    });

    RforeResources.display = new RforeResources.View();

    /* LISTENER FUNCTIONS START */
    /* CALLED ON AJAX SUCCESS RETURN */
    var populate = function(e, data) {
        RforeResources.display.embed('#embed-d3', data, {
            margin: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width: 600,
            height: 400
        });
    };

    /* CALLED ON GRAPH CHANGE (SEE MENU TYPE CALLS) */
    var regen = function(e, type) {
        RforeResources.display.type = type;
        var set = new RforeResources.Dataset();
        set.dataQuery.execute('logger_temp.json');
    };

    $(document).on("populate", populate);
    $(document).on("regen", regen);
    $(document).trigger("regen", "bubbleplot");
});
