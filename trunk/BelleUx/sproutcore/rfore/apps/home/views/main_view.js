// ==========================================================================
// Project:   Home.Main
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Home */
sc_require('views/footer_view');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Home.Main = SC.View.extend({
    childViews: ['image', 'body', 'footer', 'toolFooter'],

    image: SC.View.design({
        childViews: ['template'],
        layout: {
            top: 0,
            height: 360,
        },

        template: Home.MainImage
    }),

    // TODO: Add your own code here.
    body: SC.View.design({
        layout: {
            top: 361,
            height: 360,
        },
        childViews: ['template'],
        template: Home.MainBody
    }),

    footer: SC.View.design({
        childViews: ['template'],
        backgroundColor: '#eee',
        layout: {
            height: 250,
            top: 721,
        },

        template: Home.Footer
    }),

    toolFooter: SC.View.design({
        childViews: ["copyright"],
        backgroundColor: '#222',
        classNames: ['navbar-inverse'],
        layout: {
            bottom: 0,
            height: 32
        },

        copyright: SC.LabelView.design({
            classNames: ['copyright'],
            layout: {
                top: 7
            },
            value: "U.S. Department of Energy (DOE)  •  Office of Energy Efficiency & Renewable  Energy (EERE)"
        }),

    })
});
