// ==========================================================================
// Project:   Dashboard.Main
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Dashboard */
sc_require('views/lib/menu_functions');
sc_require('views/main_chart_view');

/** @class

  (Document Your View Here)

  @extends SC.View
*/

Dashboard.Main = SC.View.extend({
    childViews: ['header', 'dataModal', 'splitView'],
    header: Dashboard.MainHeader,
    dataModal: Dashboard.DataModal,

    splitView: SC.SplitView.extend({
        childViews: ['groupPane', 'datasetPane', 'chartPane'],
        layout: {
            top: 50
        },

        groupPane: SC.View.extend(SC.SplitChild, {
            childViews: ['list'],
            minimumSize: 100,
            size: 200,

            // SCROLLING GROUPS
            list: SC.ScrollView.extend({
                contentView: SC.ListView.extend({
                    contentValueKey: 'name',
                    contentBinding: 'RforeResources.groupsController.arrangedObjects',
                    selectionBinding: 'RforeResources.groupsController.selection'
                })
            })
        }),

        // SCROLLING DATASETS
        datasetPane: SC.View.extend(SC.SplitChild, {
            childViews: ['list'],
            minimumSize: 100,
            size: 200,

            // SCROLLING GROUPS
            list: SC.ScrollView.extend({
                contentView: SC.ListView.extend({
                    showAlternatingRows: YES,
                    actOnSelect: true,
                    contentValueKey: 'name',
                    contentBinding: 'RforeResources.datasetsController.arrangedObjects',
                    selectionBinding: 'RforeResources.datasetsController.selection',
                    action: 'fetchData' 
                })
            })
        }),

        // CHART PANE
        chartPane: SC.View.extend(SC.SplitChild, {
            childViews: ['charts'],
            autoResizeStyle: SC.RESIZE_AUTOMATIC,
            minimumSize: 600,

            // SCROLLING CHARTS
            charts: SC.View.extend({
                childViews: ["chart"],
                chart: Dashboard.Chart,
            })

        }),
    })
});
