// ==========================================================================
// Project:   Dashboard - unregisteredPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */
sc_require('views/unregistered_view');
sc_require('views/footer_view');

// This page describes the main user interface for your application.
Dashboard.unregisteredPage = SC.Page.design({

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

            template: Dashboard.Unregistered
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

        })
    })
});
