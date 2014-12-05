// ==========================================================================
// Project:   Home.Footer
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Home */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Home.Footer = SC.View.extend({

    render: function(context) {
        var text = "";

        context = context.begin('div').addClass('footer-container');
        context = context.begin('div').addClass('footer-text-view').push(text).end();
        context = context.end();
    }
});
