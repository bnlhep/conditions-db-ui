// ==========================================================================
// Project:   RforeResources.loginController
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/

RforeResources.loginController = SC.ObjectController.create({

    userName: null,
    password: null,
    login: function() {
        var username = SC.getPath('RforeResources.loginController.userName');
        var password = SC.getPath('RforeResources.loginController.password');
        var users = RforeResources.UserStore.find(RforeResources.User);

        // INSERT JIRA ACCOUNT LOGIN HOOKING
        // ADD INTERNAL COOKIE TRACKING AND DETECTION?

        return true;
    },

    detect: function() {
        // INSERT JIRA ACCOUNT DETECTION HOOKING
        // JIRA API OR INTERNAL COOKIE DETECTION?

        return false;
    },

    logout: function() {
        // INSERT JIRA ACCOUNT LOGOUT HOOKING
        // CLEAR INTERNAL COOKIE DETECTION?

        return true;    
    }
});
