// ==========================================================================
// Project:   RforeResources.User
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeResources.User = SC.Record.extend(
/** @scope RforeResources.User.prototype */ {

  // TODO: Add your own code here.
  login: SC.Record.attr(String),
  password: SC.Record.attr(String),
  firstName: SC.Record.attr(String),
  lastName: SC.Record.attr(String)

});
