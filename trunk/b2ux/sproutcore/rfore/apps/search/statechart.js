Search.statechart = SC.Statechart.create({
    rootState: SC.State.design({
        initialSubstate: 'loggedOut',

        loggedOut: SC.State.design({
            enterState: function() {

                // CHECK FOR USER ALREADY LOGGED IN
                if (RforeResources.loginController.detect())
                    this.gotoState('loggedIn');

                Search.getPath('loginPage.mainPane').append();
            },

            exitState: function() {
                Search.getPath('loginPage.mainPane').remove();
            },

            // LOGIN USER ON CLICK FROM LOGIN BUTTON
            authenticate: function() {
                if (RforeResources.loginController.login()) {
                    this.gotoState('loggedIn');
                } else {
                    SC.AlertPane.error("Login information incorrect!");
                }
            },
        }),

        loggedIn: SC.State.design({
            enterState: function() {
                Search.getPath('mainPage.mainPane').append();
            },

            exitState: function() {
                Search.getPath('mainPage.mainPane').remove();
            },

            logout: function() {
                if (RforeResources.loginController.logout())
                    this.gotoState('loggedOut');
            }
        })
    })
});
