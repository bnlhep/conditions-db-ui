sc_require('views/login_view');
sc_require('views/footer_view');

Search.loginPage = SC.Page.design({
    mainPane: SC.MainPane.design({
        childViews: 'body footer'.w(),
        defaultResponder: 'Search.statechart',

        body: SC.View.design({
            childViews: ['template'],
            backgroundColor: "#FFF",
            layout: {
                top: 0,
                height: 550
            },

            template: Search.Login
        }),

        footer: SC.View.design({
            childViews: ['template'],
            backgroundColor: '#eee',
            layout: {
                top: 551,
            },

            template: Search.Footer
        })
    })
});
