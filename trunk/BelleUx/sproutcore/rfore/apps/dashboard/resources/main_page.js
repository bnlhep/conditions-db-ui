// ==========================================================================
// Project:   Dashboard - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

// This page describes the main user interface for your application.
Dashboard.mainPage = SC.Page.design({
    test: console.log(sc_static("data/1.json")),

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
        childViews: ['body', 'footer', 'footerLogout'],
        defaultResponder: 'Dashboard.statechart',

        body: SC.View.design({
            childViews: ['template'],
            backgroundColor: "#FFF",
            layout: {
                top: 0,
                height: 550
            },

            template: Dashboard.Main
        }),

        footer: SC.View.design({
            childViews: ['template'],
            backgroundColor: '#eee',
            layout: {
                top: 551,
            },

            template: Dashboard.Footer
        }),

        footerLogout: SC.View.design({
            childViews: ['logoutButton'],
            layout: {
                width: 100,
                height: 34,
                bottom: 20,
                right: 10,
                zIndex: 999
            },

            logoutButton: SC.ButtonView.design({
                render: function(context) {
                    context = context.begin('button')
                        .addClass("btn btn-primary")
                        .addAttr({
                            "type": "button"
                        })
                        .push('Logout').end();
                },

                action: 'logout'
            })
        })
    })
});
