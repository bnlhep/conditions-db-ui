// ==========================================================================
// Project:   Dashboard.Main
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */
sc_require('views/lib/menu_functions');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dashboard.MainHeader = SC.View.extend({
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

        // CONTAINER
        context = context.begin('div').addClass('navbar-collapse collapse');

        // LEFT CONTEXT MENU
        context = context.begin('ul').addClass('nav navbar-nav');
        context = this.menuFcn.buttonRender(context, 'Dashboard', '#', true);
        context = this.menuFcn.buttonRender(context, 'Search', '/search', false);

        // TOOL 1 DROPDOWN
        context = context.begin('li').addClass('dropdown');
        context = this.menuFcn.dropdownWrap(context, 'Chart Types', '#', 'dropdown-tools');
        context = context.begin('ul').addClass('dropdown-menu');
        context = this.menuFcn.buttonRender(context, 'Scatter', 'javascript:void(0);', false);
        context = this.menuFcn.buttonRender(context, 'Area', 'javascript:void(0);', false);
        context = this.menuFcn.buttonRender(context, 'Line', 'javascript:void(0);', false);
        context = this.menuFcn.buttonRender(context, 'Bubble', 'javascript:void(0);', false);
        context = context.end();
        context = context.end();

        context = this.menuFcn.buttonRender(context, 'Data', 'javascript:void(0);', false);

        // TOOL 2 DROPDOWN
        /* context = context.begin('li').addClass('dropdown');
        context = this.menuFcn.dropdownWrap(context, 'Tools', '#', 'dropdown-tools2');
        context = context.begin('ul').addClass('dropdown-menu');
        context = this.menuFcn.buttonRender(context, 'Tool 1', '#tool1', false);
        context = this.menuFcn.buttonRender(context, 'Tool 2', '#tool2', false);
        context = context.end();
        context = context.end(); */

        //context = this.menuFcn.buttonRender(context, 'About', '#about', false);
        //context = this.menuFcn.buttonRender(context, 'Contact', '#contact', false);
        context = context.end();

        // RIGHT CONTEXT DROPDOWN
        context = context.begin('ul').addClass('nav navbar-nav navbar-right');
        context = context.begin('li').addClass('dropdown');
        context = this.menuFcn.dropdownWrap(context, 'Username...', '#', 'dropdown-account');
        context = context.begin('ul').addClass('dropdown-menu');
        context = this.menuFcn.buttonRender(context, 'Profile', '#profile', false);

        context = context.end();
        context = context.end();
        context = context.end();

        // END MENU CONTEXT & CONTAINER
        context = context.end();
        context = context.end();
        context = context.end();
    },

});
