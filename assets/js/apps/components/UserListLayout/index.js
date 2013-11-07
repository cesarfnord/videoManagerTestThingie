define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var Layout = Marionette.Layout.extend({
    serializeData: function() {
      return {
        button: 'Add New User'
      };
    },
    template: template,
    regions: {
      userRegion: '.js-table'
    },
    triggers: {
      'click .js-new-button': 'user:new'
    }
  });

  return Layout;

});