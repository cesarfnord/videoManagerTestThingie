define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var MovieItem = Marionette.ItemView.extend({

    tagName: 'tr',
    template: template,

    events: {
      'click': 'highlightName',
      'click .js-delete': 'deleteMovie',
      'click .js-show': 'showMovie',
      'click .js-edit-user': 'editMovie'
    },

    highlightName: function() {
      this.$el.toggleClass('warning');
    },
    deleteMovie: function(e) {
      e.stopPropagation();
      this.trigger('movie:delete', this.model);
    },
    showMovie: function(e) {
      e.stopPropagation();
      this.trigger('movie:show', this.model);
    },
    editMovie: function(e) {
      e.stopPropagation();
      this.trigger('movie:edit', this.model);
    }
  });

  return MovieItem;

});