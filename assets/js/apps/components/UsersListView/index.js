define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var UserItem = Marionette.ItemView.extend({

    tagName: 'tr',
    template: template,

    events: {
      'click': 'highlightName',
      'click .js-delete': 'deleteUser',
      'click .js-show': 'showClicked',
      'click .js-edit-user': 'editUser'
    },

    highlightName: function() {
      this.$el.toggleClass('warning');
    },
    deleteUser: function(e) {
      e.stopPropagation();
      this.trigger('user:delete', this.model);
    },
    showClicked: function(e) {
      e.stopPropagation();
      this.trigger('user:show', this.model);
    },
    editUser: function(e) {
      e.stopPropagation();
      this.trigger('user:edit', this.model);
    }
  });

  return UserItem;

});