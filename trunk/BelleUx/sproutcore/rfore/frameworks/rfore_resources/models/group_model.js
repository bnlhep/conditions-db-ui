// ==========================================================================
// Project:   RforeResources.Group
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeResources.Group = SC.Record.extend({

    // TODO: Add your own code here.
    name: SC.Record.attr(String),
    datasets: SC.Record.toMany('RforeResources.Dataset', {
        inverse: 'group'
    }),
});
