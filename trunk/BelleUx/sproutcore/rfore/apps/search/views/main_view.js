// ==========================================================================
// Project:   Search.Main
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Search */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Search.Main = SC.View.extend({

    // TODO: Add your own code here.
    anchorWrap: function(context, name, href) {
        return context.begin('a').addAttr({
            "href": href
        }).push(name).end()
    },

    buttonRender: function(context, name, href, active) {
        context = context.begin('li');

        if (active)
            context = context.addClass('active')

        context = this.anchorWrap(context, name, href);;
        context = context.end();
        return context;
    },

    dropdownWrap: function(context, name, href, id) {
        var className = "dropdown-toggle " + id;

        context = context.begin('a').addClass(className).addAttr({
            "href": href,
            "data-toggle": "dropdown"
        }).push(name)
        context = context.begin('b').addClass('caret').end();
        context = context.end();
        return context;
    },

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
        context = this.buttonRender(context, 'Dashboard', '/dashboard', false);
        context = this.buttonRender(context, 'Search', '#', true);

        // TOOL 1 DROPDOWN
        context = context.begin('li').addClass('dropdown');
        context = this.dropdownWrap(context, 'Tools', '#', 'dropdown-tools');
        context = context.begin('ul').addClass('dropdown-menu');
        context = this.buttonRender(context, 'Tool 1', '#tool1', false);
        context = this.buttonRender(context, 'Tool 2', '#tool2', false);
        context = this.buttonRender(context, 'Tool 3', '#tool3', false);
        context = this.buttonRender(context, 'Tool 4', '#tool4', false);
        context = context.end();
        context = context.end();

        // TOOL 2 DROPDOWN
        context = context.begin('li').addClass('dropdown');
        context = this.dropdownWrap(context, 'Tools', '#', 'dropdown-tools2');
        context = context.begin('ul').addClass('dropdown-menu');
        context = this.buttonRender(context, 'Tool 1', '#tool1', false);
        context = this.buttonRender(context, 'Tool 2', '#tool2', false);
        context = context.end();
        context = context.end();

        //context = this.buttonRender(context, 'About', '#about', false);
        //context = this.buttonRender(context, 'Contact', '#contact', false);
        context = context.end();

        // RIGHT CONTEXT DROPDOWN
        context = context.begin('ul').addClass('nav navbar-nav navbar-right');
        context = context.begin('li').addClass('dropdown');
        context = this.dropdownWrap(context, 'Username...', '#', 'dropdown-account');
        context = context.begin('ul').addClass('dropdown-menu');
        context = this.buttonRender(context, 'Profile', '#profile', false);

        context = context.end();
        context = context.end();
        context = context.end();

        // END MENU CONTEXT & CONTAINER
        context = context.end();
        context = context.end();
        context = context.end();

        //CLEAN UP
        context = context.begin('br').end();
        context = context.begin('br').end();
        context = context.begin('br').end();
        context = context.begin('br').end();

        context = context.begin('div').addClass('container theme-showcase');
        context = context.begin('div').addClass('jumbotron');
        context = context.begin('h2').push('Reference Facility for Offshore Renewable Energy').end();
        context = context.begin('p').push('Search Lorem ipsum dolor sit amet, consectetur adipiscing elit. In adipiscing, felis ac bibendum rutrum, libero nisi sollicitudin neque, vel dapibus nulla nunc at mauris. Donec eu ante non massa dictum accumsan. Aenean bibendum, quam sit amet egestas suscipit, purus arcu congue dui, vit....').end();
        context = context.end();
        context = context.end();
    },

});
