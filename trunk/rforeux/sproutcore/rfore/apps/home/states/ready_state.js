Home.ReadyState = SC.State.extend({

    enterState: function() {
        Home.getPath('mainPage.mainPane').append();
    },

    exitState: function() {
        Home.getPath('mainPage.mainPane').remove();
    },

    showLogin: function() {
        window.location.href = "/dashboard";
    },

    // LOGIN USER ON CLICK FROM LOGIN BUTTON
    authenticate: function() {
        if (RforeResources.loginController.login()) {
            //this.gotoState('loggedIn');
        } else {
            SC.AlertPane.error("Login information incorrect!");
        }
    },
});
