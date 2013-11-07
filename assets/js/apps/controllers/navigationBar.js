define(function(require) {
  'use strict';

  //collections
  var NavigationCollection = require('apps/collections/navigationCollection');
  //views
  var NavigationView = require('apps/components/NavigationView/index');

  var Marionette = require('marionette');

  var Controller = Marionette.Controller.extend({
    initialize: function(app) {
      this.app = app;
      this.links = NavigationCollection;
    },
    listMenu: function() {
      var links = this.links;
      var app = this.app;
      var navigation = new NavigationView({
        collection: links
      });

      navigation.on('itemview:navigate', function(childView, model) {
        var url = model.get('url');
        app.trigger(url + ':list');
      });

      this.app.menuRegion.show(navigation);
    },
    setActiveLink: function(linkUrl) {
      var links = this.links;
      var linkToSelect = links.find(function(item) {
        return item.get('url') === linkUrl;
      });
      linkToSelect.select();
      this.links.trigger('reset');
    }
  });

  return Controller;

});