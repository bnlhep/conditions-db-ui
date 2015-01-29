Dashboard.Chart = SC.View.extend({
    layout: {
        centerX: 0,
        top: 10,
        width: 750,
        height: 550
    },

    render: function(context) {
        context = context.begin('div').addClass('container').addAttr({
            id: "embed-d3"
        }).addStyle({
            width: 700,
            height: 400
        }).end();
    }

});
