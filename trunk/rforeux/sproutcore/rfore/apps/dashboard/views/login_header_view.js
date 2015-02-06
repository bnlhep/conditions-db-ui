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
Dashboard.LoginHeader = SC.View.extend({
    menuFcn: Dashboard.menuFcn.create(),

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
        context = context.end();
        context = context.end();
    }
});
