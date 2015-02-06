// ==========================================================================
// Project:   Dashboard.Main
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dashboard.Unregistered = SC.View.extend({
    childViews: ['header'],
    header: Dashboard.UnregisteredHeader,

    render: function(context) {

        context = context.begin('br').end();
        context = context.begin('br').end();
        context = context.begin('br').end();
        context = context.begin('br').end();

        context = context.begin('div').addClass('container theme-showcase');
        context = context.begin('div').addClass('jumbotron');
        context = context.begin('h2').push('Reference Facility for Offshore Renewable Energy').end();
        context = context.begin('p').push('Dashboard Lorem ipsum dolor sit amet, consectetur adipiscing elit. In adipiscing, felis ac bibendum rutrum, libero nisi sollicitudin neque, vel dapibus nulla nunc at mauris. Donec eu ante non massa dictum accumsan. Aenean bibendum, quam sit amet egestas suscipit, purus arcu congue dui, vit....').end();
        context = context.end();
        context = context.end();
    },

    });
