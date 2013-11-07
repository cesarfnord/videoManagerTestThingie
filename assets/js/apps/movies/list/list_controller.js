VideoManager.module(
  'MoviesApp.List',
  function(List, VideoManager, Backbone, Marionette, $, _) {
    List.Controller = {
      listMovies: function () {
        var fetchMovies = VideoManager.request('movie:entities');

        var moviesListLayout = new List.Layout();

        $.when(fetchMovies).done(function (movies) {
          var movieListView = new List.Movies({
            collection: movies
          });

          moviesListLayout.on('show', function () {
            moviesListLayout.movieRegion.show(movieListView)
          });
          moviesListLayout.on('movie:new', function() {
            var newMovie = new VideoManager.Entities.Movie();

            var ModalView = VideoManager.MoviesApp.New.Movie.extend({
              className: 'modal fade js-edit-modal'
            });

            var view = new ModalView({
              model: newMovie
            });

            view.on('form:submit', function (data) {
              newMovie.save(
                data,
                {
                  success: function (data) {
                    movies.add(data);
                    view.$el.modal('hide');
                  }
                });
            });

            VideoManager.modalRegion.show(view);
            view.$el.modal('show');

            view.$el.on('hidden.bs.modal', VideoManager.modalRegion.close);

          });

          movieListView.on('itemview:movie:delete', function (childView, model) {
            model.destroy();
          });
          movieListView.on('itemview:movie:show', function (childView, model) {
            VideoManager.trigger('movie:show', model.get('_id'));
          });
          movieListView.on('itemview:movie:edit', function (childView, model) {
            var ModalView = VideoManager.MoviesApp.Edit.Movie.extend({
              className: 'modal fade js-edit-modal'
            });

            var modal = new ModalView({
              model: model
            });


            modal.$el.on('hidden.bs.modal', VideoManager.modalRegion.close);
            modal.on('form:submit', function (data) {
              if(model.save(data)) {
                childView.render();
                modal.$el.modal('hide');
              }
            });

            VideoManager.modalRegion.show(modal);
            modal.$el.modal('show');
          });


          VideoManager.mainRegion.show(moviesListLayout);
        });

      }
    };
  }
);