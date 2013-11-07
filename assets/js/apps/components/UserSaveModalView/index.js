define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var Backbone = require('backbone');
  var template = require('jst!./_index.html');
  require('syphon');



  var SaveUser = Marionette.ItemView.extend({
      template: template,
      events: {
        'click .js-save-button' : 'saveEdit'
      },
      saveEdit: function (e) {
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      }
    });

  return SaveUser;

});