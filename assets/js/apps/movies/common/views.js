VideoManager.module(
  'MoviesApp.Common.Views',
  function(Views, VideoManager, Backbone, Marionette, $, _) {
    Views.Form = Marionette.ItemView.extend({
      template: '.js-movie-edit',
      events: {
        'click .js-save-button' : 'saveEdit'
      },
      saveEdit: function (e) {
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger('form:submit', data);
      }
    });
  }
);