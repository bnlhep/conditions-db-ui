/** @class

  (Document your Model here)
  @version 0.1
*/
console.log("Loading RforeResource <dataset_model.js> ...");
RforeResources.Dataset = Backbone.Model.extend({

    // TODO: Add your own code here.
    default: {
        name: "",
        data: new Object(),
        dataPoint: "",
        chart: new RforeResources.Chart,
    },

    // ASYNC QUERY MODEL
    dataQuery: new Object({
        data: undefined,
        value: null,

        execute: function(value) {
            this.value = value;
            var container = this;

            $.getJSON(RforeResources.DATA_URL_BASE + value, {
                format: "json"
            })
                .done(function(response) {
                    console.log("Successfully Found Dataset: " + response.name);
                    container.data = response;
                    $(document).trigger("populate", response);
                })
                .fail(function() {
                    container.data = null;
                })
                .always(function() {
                    console.log("AJAX Call to : " + RforeResources.DATA_URL_BASE + value);
                });
        },
    }),
});
