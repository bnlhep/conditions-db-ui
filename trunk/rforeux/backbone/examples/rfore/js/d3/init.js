var RforeD3 = new Object();
var RforeResources = new Object();

$.when($.getScript("js/d3/lib/data_functions.js"),
    $.getScript("js/d3/chart_model.js"),
    $.getScript("js/d3/area_plot_model.js"),
    $.getScript("js/d3/bar_plot_model.js"),
    $.getScript("js/d3/bubble_plot_model.js"),
    $.getScript("js/d3/line_plot_model.js"),
    $.getScript("js/d3/scatter_plot_model.js"),
    $.getScript("js/d3/generator_model.js"),
    $.Deferred(function(deferred) {
        $(deferred.resolve);
    })).done(function() {
    console.log('Completed Load...');
});
