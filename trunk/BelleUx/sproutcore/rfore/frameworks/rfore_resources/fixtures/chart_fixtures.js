// ==========================================================================
// Project:   RforeResources.Charts Fixtures
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

sc_require('models/chart_model');

RforeResources.Chart.FIXTURES = [

    // TODO: Add your data fixtures here.
    // All fixture records must have a unique primary key (default 'guid').  See 
    // the example below.

    {
        guid: 1,
        name: "Chart 1",
        type: "scatterplot",
        dataset: 1,
    },

    {
        guid: 2,
        name: "Chart 2",
        type: "areaplot",
        dataset: 2,
    },

    {
        guid: 3,
        name: "Chart 3",
        type: "lineplot",
        dataset: 3,
    },

    {
        guid: 4,
        name: "Chart 4",
        type: "barplot",
        dataset: 4,
    },

    {
        guid: 5,
        name: "Chart 5",
        type: "bubbleplot",
        dataset: 5,
    }

];
