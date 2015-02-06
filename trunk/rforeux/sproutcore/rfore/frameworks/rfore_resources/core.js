// ==========================================================================
// Project:   RforeResources
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @namespace

  My cool new framework.  Describe your framework.

  @extends SC.Object
*/
RforeResources = SC.Object.create({

    NAMESPACE: 'RforeResources',
    VERSION: '0.1.0',
     AJAX_URL_BASE: 'http://localhost:4020/static/dashboard/en/current/resources/data/',
    // AJAX_URL_BASE: 'http://rfore.pnnl.gov/data/',
    // AJAX_URL_BASE: 'http://ui-windy.pnnl.gov/data/',
    // DATA_URL_BASE: 'http://data-windy.pnnl.gov/',
    DATA_URL_BASE: 'http://localhost:4020/static/dashboard/en/current/resources/data/',

    // TODO: Add global constants or singleton objects needed by your app here.
    GroupStore: SC.Store.create(),
    DatasetStore: SC.Store.create(),
    UserStore: SC.Store.create()

});
