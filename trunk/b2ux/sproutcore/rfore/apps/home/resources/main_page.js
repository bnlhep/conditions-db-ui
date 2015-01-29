// ==========================================================================
// Project:   Home - mainPage
// Copyright: @2014 RFORE, Pacific Northwest National Lab.
// ==========================================================================
/*globals Home */
sc_require('views/tool_header');
sc_require('views/menu_header');
sc_require('views/main_view');

// This page describes the main user interface for your application.
Home.mainPage = SC.Page.design({

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
        //UPDATE - Add view
        childViews: ['toolHeader', 'menuHeader', 'body'],
        defaultResponder: 'Home.statechart',

        toolHeader: Home.ToolHeader,
        menuHeader: Home.MenuHeader,

        //UPDATE - ADD MAIN MENU HEADER PANE W/ TEMPLATES

        body: SC.ScrollView.design({
            backgroundColor: "#FFF",
            hasHorizontalScroller: NO,
            layout: {
                top: 82,
            },

            contentView: SC.View.design({
                layout: {
                    height: 950
                },
                childViews: ['template'],
                template: Home.Main
            })
        }),
    })
})
