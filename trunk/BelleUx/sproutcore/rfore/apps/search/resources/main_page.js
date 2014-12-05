// ==========================================================================
// Project:   Search - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Search */
sc_require('views/main_view');
sc_require('views/footer_view');

// This page describes the main user interface for your application.
Search.mainPage = SC.Page.design({

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
        childViews: ['body', 'footer', 'footerLogout'],
        defaultResponder: 'Search.statechart',

        body: SC.View.design({
            childViews: ['template'],
            backgroundColor: "#FFF",
            layout: {
                top: 0,
                height: 550
            },

            template: Search.Main
        }),

        footer: SC.View.design({
            childViews: ['template'],
            backgroundColor: '#eee',
            layout: {
                top: 551,
            },

            template: Search.Footer
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
