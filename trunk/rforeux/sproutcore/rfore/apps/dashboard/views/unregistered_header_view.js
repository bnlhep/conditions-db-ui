// ==========================================================================
// Project:   Dashboard.LoginHeaderView
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */
sc_require('views/lib/menu_functions');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dashboard.UnregisteredHeader = SC.View.extend({
    menuFcn: Dashboard.menuFcn.create(),

    // FIX ME (THIS RENDERS THE CHILD VIEW
    childViews: ['headerLogin'],

    headerLogin: SC.View.extend({
        childViews: ['loginButton'],
        layout: {
            width: 100,
            height: 34,
            top: 8,
        },

        loginButton: SC.ButtonView.design({
            render: function(context) {
                context = context.begin('button')
                    .addClass("btn btn-primary")
                    .addAttr({
                        "type": "button"
                    })
                    .push('Login').end();
            },

            action: 'showLogin'
        })
    }),

    render: function(context) {

        // BEGIN MENU CONTEXT & CONTAINER
        context = context.begin('div').addClass('navbar navbar-default navbar-fixed-top');
        context = context.begin('div').addClass('container');

        // HEADER FOR MENU (RFORE)
        context = context.begin('div').addClass('navbar-header');
        context = context.begin('a')
            .addClass('navbar-brand')
            .addAttr({
                "href": "/home"
            })
            .push('RFORE').end()
        context = context.end();

        // LEFT MAIN BUTTONS CONTAINER
        context = context.begin('div').addClass('navbar-collapse collapse');

        // LEFT CONTEXT MENU
        context = context.begin('ul').addClass('nav navbar-nav');
        context = this.menuFcn.buttonRender(context, 'Dashboard', '#', true);
        context = this.menuFcn.buttonRender(context, 'Search', '/search', false);
        context = context.end();

        // RIGHT CONTEXT DROPDOWN
        context = context.begin('ul').addClass('nav navbar-nav navbar-right');
        context = context.begin('li')
        this.get('headerLogin').renderToContext(context, YES);
        context = context.end();
        context = context.end();

        // END MENU AND CONTEXT CONTAINER
        context = context.end();
        context = context.end();
        context = context.end();
    }
});
