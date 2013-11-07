define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./../UserListLayout/_index.html');

  var Layout = Marionette.Layout.extend({
    serializeData: function() {
      return {
        button: 'Add New Movie'
      };
    },
    template: template,
    regions: {
      movieRegion: '.js-table'
    },
    triggers: {
      'click .js-new-button': 'movie:new'
    }
  });

  return Layout;

});