VideoManager.module(
  'Entities',
  function (Entities, VideoManager, Backbone, Marionette, $, _) {
    Entities.Movie = Backbone.Model.extend({
      idAttribute: '_id',
      urlRoot: 'movies',
      defaults: {
        title: '',
        year: '',
        genre: 0
      }
    });

    Entities.MovieCollection = Backbone.Collection.extend({
      url: 'movies',
      model: Entities.Movie,
      comparator: 'title'
    });

    var API = {
      getMovieEntities: function () {
        var movies = new Entities.MovieCollection();
        var defer = $.Deferred();
        movies.fetch({
          success: function (data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      },
      getMovieEntity: function (movieId) {
        var movie = new Entities.Movie({_id: movieId});
        var defer = $.Deferred();
        movie.fetch({
          success: function (data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      }
    };

    VideoManager.reqres.setHandler('movie:entities', function () {
      return API.getMovieEntities();
    });
    VideoManager.reqres.setHandler('movie:entity', function (id) {
      return API.getMovieEntity(id);
    });
  }
);