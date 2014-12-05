// ==========================================================================
// Project:   RforeResources.Group Fixtures
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

sc_require('models/group_model');

RforeResources.Group.FIXTURES = [

    // TODO: Add your data fixtures here.
    // All fixture records must have a unique primary key (default 'guid').  See 
    // the example below.

    {
        guid: 1,
        name: "Group 1",
        datasets: [1, 2, 3, 4]
    },

    {
        guid: 2,
        name: "Group 2",
        datasets: [5]
    },

    {
        guid: 3,
        name: "Group 3",
        datasets: [0]
    },

    {
        guid: 4,
        name: "Group 4",
        datasets: [0]
    },

    {
        guid: 5,
        name: "Group 5",
        datasets: [0]
    }

];
