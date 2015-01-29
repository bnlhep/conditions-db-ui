// ==========================================================================
// Project:   RforeResources.Dataset
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals RforeResources */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RforeResources.Dataset = SC.Record.extend({

    // TODO: Add your own code here.
    name: SC.Record.attr(String),
    data: SC.Record.attr(Object),
    dataPoint: SC.Record.attr(String),
    chart: RforeResources.Chart.create(),

    // ASYNC QUERY ENGINE
    dataQuery: SC.Object.create({
        data: undefined,
        value: null,
        execute: function(value) {
            var request = SC.Request.getUrl(RforeResources.DATA_URL_BASE + value);

            // ENABLE CORS AJAX CALLS
            request.set('attachIdentifyingHeaders', NO);
            request.header({ 'Accept': 'application/json' })
                .json()
                .notify(this, 'callback')
                .send();

            this.set('value', value);
        },
        callback: function(response) {
            console.log('Got Response...');
            if (SC.ok(response)) {
                var obj = response.get('body');
                console.log("Successfully Found Dataset: " + obj.name);
                this.set('data', obj);
            } else {
                this.set('data', null);
            }
        }
    }),

    group: SC.Record.toOne('RforeResources.Group', {
        inverse: 'datasets'
    }),
});
