// Models
window.Gt = Backbone.Model.extend({
//    urlRoot:"../api/gts",
    defaults:{
        "id":null,
        "name":"",
        "description":"",
        "tagType":""

    }
});

window.GtCollection = Backbone.Collection.extend({
    model:Gt
//    url:"../api/gts"
});

//alert(JSON.stringify(window.GtCollection));
// Views
window.GtListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (gt) {
            $(self.el).append(new GtListItemView({model:gt}).render().el);
        });
    },

    render:function (eventName) {
        _.each(this.model.models, function (gt) {
            $(this.el).append(new GtListItemView({model:gt}).render().el);
        }, this);
        return this;
    }
});

window.GtListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-gt-list-item').html()),

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});

window.GtView = Backbone.View.extend({

    template:_.template($('#tpl-gt-details').html()),

    initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events:{
        "change input":"change",
        "click .save":"saveGt",
        "click .delete":"deleteGt"
    },

    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        // You could change your model on the spot, like this:
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },

    saveGt:function () {
        this.model.set({
            name:$('#name').val()
        });
        console.log(this.model.toJSON());
        if (this.model.isNew()) {
            var self = this;
            app.gtList.create(this.model, {
                success:function () {
                    app.navigate('gts/' + self.model.id, false);
                }
            });
        } else {
            this.model.save();
        }

        return false;
    },

    deleteGt:function () {
        this.model.destroy({
            success:function () {
                alert('Gt deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }
});

window.HeaderView = Backbone.View.extend({

    template:_.template($('#tpl-header').html()),

    initialize:function () {
        this.render();
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events:{
        "click .new":"newGt"
    },

    newGt:function (event) {
        app.navigate("gts/new", true);
        return false;
    }
});


// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "gts/new":"newGt",
        "gts/:id":"gtDetails"
    },

    initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },

    list:function () {
        this.gtList = new GtCollection();
        var self = this;
        this.gtList.fetch({
            success:function () {
                self.gtListView = new GtListView({model:self.gtList});
                $('#sidebar').html(self.gtListView.render().el);
                if (self.requestedId) self.gtDetails(self.requestedId);
            }
        });
    },

    gtDetails:function (id) {
        if (this.gtList) {
            this.gt = this.gtList.get(id);
            if (this.gtView) this.gtView.close();
            this.gtView = new GtView({model:this.gt});
            $('#content').html(this.gtView.render().el);
        } else {
            this.requestedId = id;
            this.list();
        }
    },

    newGt:function () {
        if (app.gtView) app.gtView.close();
        app.gtView = new GtView({model:new Gt()});
        $('#content').html(app.gtView.render().el);
    }

});

var app = new AppRouter();
Backbone.history.start();
