// ==========================================================================
// Project:   Dashboard.Login
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */
sc_require('views/login_header_view');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dashboard.Login = SC.View.extend({

    childViews: ['header', 'form'],

    header: Dashboard.LoginHeader,
    form: SC.View.design({
        layout: {
            width: 200,
            height: 160,
            centerX: 0,
            centerY: 0
        },

        childViews: ['userName', 'password', 'loginButton'],

        userName: SC.TextFieldView.design({
            layout: {
                width: 150,
                height: 30,
                top: 30,
                centerX: 0
            },
            hint: 'Username',
            valueBinding: 'RforeResources.loginController.userName'
        }),

        password: SC.TextFieldView.design({
            layout: {
                width: 150,
                height: 30,
                top: 80,
                centerX: 0
            },
            hint: 'Password',
            type: 'password',
            valueBinding: 'RforeResources.loginController.password'
        }),

        loginButton: SC.ButtonView.design({
            layout: {
                width: 70,
                height: 34,
                top: 120,
                right: 15
            },

            render: function(context) {
                context = context.begin('button')
                    .addClass("btn btn-primary")
                    .addAttr({
                        "type": "button"
                    })
                    .push('Login').end();
            },

            action: 'authenticate'
        })
    })
});
