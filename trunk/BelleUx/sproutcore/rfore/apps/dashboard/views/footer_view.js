// ==========================================================================
// Project:   Dashboard.Footer
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dashboard.Footer = SC.View.extend({

    render: function(context) {
        var text = "U.S. Department of Energy (DOE)  •  Office of Energy Efficiency & Renewable Energy (EERE)";

        context = context.begin('div').addClass('footer-container');
        context = context.begin('div').addClass('footer-text-view').push(text).end();
        context = context.end();
    }
});
