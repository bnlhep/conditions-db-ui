Home.MainBody = SC.View.extend ({
    render: function(context) {
        context = context.begin('br').end();
        context = context.begin('div').addClass('container theme-showcase');
        context = context.begin('div').addClass('jumbotron');
        context = context.begin('h2').push('Reference Facility for Offshore Renewable        Energy').end();
        context = context.begin('p').push('We need a message page for the public.  Generally these include a stock graphic, something pertaining to wind energy, with a project motto.  This  page can also include a project news update or a brief overview.').end();
        context = context.end();
        context = context.end();
    }
})
