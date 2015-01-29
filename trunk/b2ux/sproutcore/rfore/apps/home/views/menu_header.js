Home.MenuHeader = SC.View.design({
    childViews: ['menu'],
    backgroundColor: '#fff',
    layout: {
        top: 31,
        height: 50
    },
    classNames: ['navbar', 'navbar-default', 'navbar-static-top'],

    menu: SC.View.design({
        anchorWrap: function(context, name, href) {
            return context.begin('a').addAttr({"href": href}).push(name).end()
        },

        buttonRender: function(context, name, href, active) {
            context = context.begin('li');

            if (active)
                context = context.addClass('active')

            context = this.anchorWrap(context, name, href);;
            context = context.end();
            return context;
        },

        render: function(context) {
            var drop = "<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Research <b class=\"caret\"></b></a>";

            // BEGIN MENU CONTEXT & CONTAINER
            context = context.begin('div').addClass('container');

            // HEADER FOR MENU (RFORE)
            context = context.begin('div').addClass('navbar-header');
            context = context.begin('a')
                .addClass('navbar-brand')
                .addAttr({
                    "href": "#"
                })
                .push('RFORE').end()
            context = context.end();

            // CONTAINER
            context = context.begin('div').addClass('navbar-collapse collapse');

            // LEFT CONTEXT MENU
            context = context.begin('ul').addClass('nav navbar-nav');
            context = this.buttonRender(context, 'Home', '#', true);
            context = this.buttonRender(context, 'Dashboard', '/dashboard', false);
            context = this.buttonRender(context, 'About', '#about', false);
            context = this.buttonRender(context, 'Contact', '#contact', false);
            context = context.end();

            // END MENU CONTEXT & CONTAINER
            context = context.end();
            context = context.end();
        }
    })
})
