Dashboard.menuFcn = SC.Object.extend({

    // TODO: Add your own code here.
    wrapId: function(name) {
        return name.toLowerCase();
    },

    callChartState: function(event) {
        alert('hi!');
    },

    anchorWrap: function(context, name, href) {
        return context.begin('a').addAttr({
            "href": href,
            "id": this.wrapId(name)
        }).push(name).end()
    },

    buttonRender: function(context, name, href, active) {
        context = context.begin('li');

        if (active)
            context = context.addClass('active')

        context = this.anchorWrap(context, name, href);;
        context = context.end();
        return context;
    },

    dropdownWrap: function(context, name, href, id) {
        var className = "dropdown-toggle " + id;

        context = context.begin('a').addClass(className).addAttr({
            "href": href,
            "data-toggle": "dropdown"
        }).push(name)
        context = context.begin('b').addClass('caret').end();
        context = context.end();
        return context;
    },
});
