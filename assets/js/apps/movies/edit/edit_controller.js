VideoManager.module(
  'MoviesApp.Edit',
  function(Edit, VideoManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
      editMovie: function (id) {
        var fetchMovie = VideoManager.request('movie:entity', id);

        $.when(fetchMovie).done(function (movie) {
          var editModal;
          if (movie !== undefined) {
            var editModal = new Edit.Movie({
              model: movie
            });

            editModal.on('form:submit', function (data) {
              movie.save(data);
              VideoManager.trigger('movie:show', movie.get('_id'));
            });

          } else {}

          VideoManager.mainRegion.show(editModal);        
        });

      }
    };
  }
);