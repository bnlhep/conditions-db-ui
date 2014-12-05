Dashboard.statechart = SC.Statechart.create({
    rootState: SC.State.design({
        initialSubstate: 'loggedOut',

        loggedOut: SC.State.design({
            enterState: function() {

                // CHECK FOR USER ALREADY LOGGED IN
                if (RforeResources.loginController.detect())
                    this.gotoState('loggedIn');

                Dashboard.getPath('unregisteredPage.mainPane').append();
                //this.gotoState('loggedIn');
            },

            exitState: function() {
                Dashboard.getPath('loginPage.mainPane').remove();
            },

            showLogin: function() {
                Dashboard.getPath('unregisteredPage.mainPane').remove();
                Dashboard.getPath('loginPage.mainPane').append();
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

                // GET GROUP DATA ON LOGIN FROM RESROUCE FRAMEWORK
                RforeResources.groupsController.populateData();

                // SHOW POPULATED (QUERY ABOVE) MAIN PAGE
                Dashboard.getPath('mainPage.mainPane').append();

                // EVENT LISTENERS FOR NEW CHARTS
                SC.Event.add(jQuery.find('#scatter')[0], "click", this, this.fetchChart, {
                    "chart": "scatter"
                });
                SC.Event.add(jQuery.find('#area')[0], "click", this, this.fetchChart, {
                    "chart": "area"
                });
                SC.Event.add(jQuery.find('#line')[0], "click", this, this.fetchChart, {
                    "chart": "line"
                });
                SC.Event.add(jQuery.find('#bubble')[0], "click", this, this.fetchChart, {
                    "chart": "bubble"
                });
                SC.Event.add(jQuery.find('#data')[0], "click", this, function() {
                    $('#dataModal').modal({
                        show: true
                    });
                });
            },

            exitState: function() {
                Dashboard.getPath('mainPage.mainPane').remove();
            },

            fetchData: function() {
                RforeResources.datasetController.populateData();
            },

            fetchChart: function(event) {
                SC.RunLoop.begin();
                var chartType = event.data.chart;
                var chart = RforeResources.datasetController.get("chart");

                // CHECK FOR SELECTED DATASET TO REGENERATE
                if (chart != undefined) {

                    //SELECT REGEN TYPE
                    switch (chartType) {
                        case "scatter":
                            chart.set("type", "scatterplot");
                            break;
                        case "area":
                            chart.set("type", "areaplot");
                            break;
                        case "line":
                            chart.set("type", "lineplot");
                            break;
                        case "bubble":
                            chart.set("type", "bubbleplot");
                            break;
                    }

                    //SET NEW CHART TYPE
                    RforeResources.datasetController.set("chart", chart);

                    // REGENERATE DATA
                    RforeResources.datasetController.populateData();
                }

                SC.RunLoop.end();
            },

            logout: function() {
                if (RforeResources.loginController.logout()) {
                    // CLEAR STORES
                    RforeResources.DatasetStore.reset();
                    RforeResources.GroupStore.reset();
                    RforeResources.UserStore.reset();

                    // CLEAR GROUP CONTROLLERS
                    RforeResources.datasetsController.set("content", null);
                    RforeResources.groupsController.set('content', null);
                    RforeResources.chartController.clean();
                    this.gotoState('loggedOut');
                }
            }
        })
    })
});
