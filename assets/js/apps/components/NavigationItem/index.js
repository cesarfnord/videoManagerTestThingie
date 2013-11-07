define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  //var Menu = VideoManager.NavigationApp.Menu;

  var MenuItem = Marionette.ItemView.extend({
    template: template,
    tagName: 'li',

    events: {
      'click a': 'navigate'
    },

    navigate: function(e) {
      e.preventDefault();
      this.trigger('navigate', this.model);
    }
  });

  return MenuItem;

});