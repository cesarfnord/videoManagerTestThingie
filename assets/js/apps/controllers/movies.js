define(function(require) {
  'use strict';

  var Marionette = require('marionette');

  var MovieModel = require('apps/models/movieModel');

  var MovieCollection = require('apps/collections/movieCollection');

  var ListLayout = require('apps/components/MovieListLayout/index');
  var ListMoviesView = require('apps/components/MoviesListCompositeView/index');
  var EditMovieView = require('apps/components/MovieSaveModalView/index');

  var Genres = require('apps/constants/genres')

  require('bootstrap');

  var Controller = Marionette.Controller.extend({
    initialize: function(app) {
      this.app = app;
      var self = this;

      app.on('movies:list', function() {
        app.navigate('movies');
        self.listMovies();
      });
      app.on('movies:show', function(id) {
        app.navigate('movies/' + id);
        self.showMovie(id);
      });
      app.on('movies:edit', function(id) {
        app.navigate('movies/' + id + '/edit');
        self.editMovie(id);
      });
    },
    listMovies: function() {
      var app = this.app;

      var fetchMovies = MovieCollection();

      var moviesListLayout = new ListLayout();

      $.when(fetchMovies).done(function(movies) {
        var movieListView = new ListMoviesView({
          collection: movies
        });

        moviesListLayout.on('show', function() {
          moviesListLayout.movieRegion.show(movieListView)
        });
        moviesListLayout.on('movie:new', function() {
          var newMovie = new MovieModel();

          var ModalView = EditMovieView.extend({
            className: 'modal fade js-edit-modal'
          });

          var view = new ModalView({
            model: newMovie
          });

          view.on('form:submit', function(data) {
            newMovie.save(
              data, {
                success: function(data) {
                  movies.add(data);
                  view.$el.modal('hide');
                }
              });
          });

          app.modalRegion.show(view);
          view.$el.modal('show');

          view.$el.on('hidden.bs.modal', app.modalRegion.close);

        });

        movieListView.on('itemview:movie:delete', function(childView, model) {
          model.destroy();
        });
        movieListView.on('itemview:movie:show', function(childView, model) {
          app.trigger('movie:show', model.get('_id'));
        });
        movieListView.on('itemview:movie:edit', function(childView, model) {
          var ModalView = EditMovieView.extend({
            className: 'modal fade js-edit-modal'
          });

          var modal = new ModalView({
            model: model
          });


          modal.$el.on('hidden.bs.modal', app.modalRegion.close);
          modal.on('form:submit', function(data) {
            if (model.save(data)) {
              childView.render();
              modal.$el.modal('hide');
            }
          });

          app.modalRegion.show(modal);
          modal.$el.modal('show');
        });

        app.mainRegion.show(moviesListLayout);
      });
    }
  });

  return Controller;
});