Dashboard.DataModal = SC.View.extend({
    render: function(context) {
        context = context.begin('div')
            .addAttr('data-toggle', 'modal')
            .id('dataModal')
            .addClass('modal');

        context = context.begin('div').addClass('modal-dialog');
        context = context.begin('div').addClass('modal-content');


        context = context.begin('div').addClass('modal-header');

        // CLOSE 'X' IN HEADER
        context = context.begin('button').addClass('close')
            .addAttr('data-dismiss', 'modal')
            .addAttr('aria-hidden', 'true')
            .push('x')
            .end();

        // TITLE
        context = context.begin('h4').addClass('modal-title')
            .push('Chart Data')
            .end();

        // CLOSE MODAL HEADER
        context = context.end();

        // BEGIN MODAL CONTENT
        context = context.begin('div').addClass('modal-body');

        // DATA TABLE
        context = context.begin('div')
            .id('d3-data-table-container')
            .end();

        // CLOSE ALL CONTAINERS
        context = context.end();
        context = context.end();
        context = context.end();

        // FINAL END MODAL
        context = context.end();
    }
});
