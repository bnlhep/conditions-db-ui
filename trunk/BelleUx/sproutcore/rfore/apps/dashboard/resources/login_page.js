sc_require('views/login_view');
sc_require('views/footer_view');

Dashboard.loginPage = SC.Page.design({
    mainPane: SC.MainPane.design({
        childViews: 'body footer'.w(),
        defaultResponder: 'Dashboard.statechart',

        body: SC.View.design({
            childViews: ['template'],
            backgroundColor: "#FFF",
            layout: {
                top: 0,
                height: 550
            },

            template: Dashboard.Login
        }),

        footer: SC.View.design({
            childViews: ['template'],
            backgroundColor: '#eee',
            layout: {
                top: 551,
            },

            template: Dashboard.Footer
        })
    })
});
