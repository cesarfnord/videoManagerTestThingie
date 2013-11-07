VideoManager.module(
  'MoviesApp',
  function(MoviesApp, VideoManager, Backbone, Marionette, $, _) {
    MoviesApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'movies' : 'listMovies'/*,
        'movies/:id': 'showMovie',
        'movies/:id/edit': 'editMovie'*/
      }
    });

    var API = {
      listMovies: function () {
        MoviesApp.List.Controller.listMovies();
      },
      showMovies: function (id) {
        MoviesApp.Show.Controller.showMovie(id);
      },
      editMovies: function (id) {
        MoviesApp.Edit.Controller.editMovie(id);
      }
    };

    VideoManager.on('movies:list', function () {
      VideoManager.navigate('movies');
      API.listMovies();
    });
    VideoManager.on('movies:show', function (id) {
      VideoManager.navigate('movies/' + id);
      API.showMovie(id);
    });
    VideoManager.on('movies:edit', function (id) {
      VideoManager.navigate('movies/' + id + '/edit');
      API.editMovie(id);
    });

    VideoManager.addInitializer(function () {
      new MoviesApp.Router({
        controller: API
      });
    });
  }
);