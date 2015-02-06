Home.MainImage = SC.View.extend({
    render: function(context) {
        var image = sc_static('assets/HiRes_wind.jpg');
        image = "url('" + image + "')";

        context = context.begin('div').addStyle({
            "background-image": image,
            "background-size" : "cover",
            "background-position" : "center",
            height: "360px"
        }).end();

    }
})
