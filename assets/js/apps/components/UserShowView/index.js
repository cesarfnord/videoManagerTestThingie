define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var UserView = Marionette.ItemView.extend({
    template: template,
    events: {
      'click .js-edit-user': 'editUser'
    },
    editUser: function(e) {
      e.stopPropagation();
      this.trigger('user:edit', this.model);
    }
  });

  return UserView;

});