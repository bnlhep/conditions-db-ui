// ==========================================================================
// Project:   RforeResources.User Fixtures
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

sc_require('models/user_model');

RforeResources.User.FIXTURES = [

    // TODO: Add your data fixtures here.
    // All fixture records must have a unique primary key (default 'guid').  See 
    // the example below.

    {
        guid: 1,
        login: "mscott",
        password: "1234abcd",
        firstname: "Michael",
        lastName: "Scott"
    },

    {
        guid: 2,
        login: "dschrute",
        password: "1234abcd",
        firstname: "Dwight",
        lastName: "Schrute"
    },

    {
        guid: 3,
        login: "jhalpert",
        password: "1234abcd",
        firstname: "Jim",
        lastName: "Halpert"
    },

    {
        guid: 4,
        login: "pbeesly",
        password: "1234abcd",
        firstname: "Pam",
        lastName: "Beesly"
    },

    {
        guid: 5,
        login: "rhoward",
        password: "1234abcd",
        firstname: "Ryan",
        lastName: "Howard"
    }

];
