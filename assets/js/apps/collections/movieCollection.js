define(function(require) {
  'use strict';

  var Backbone = require('backbone');

  var Model = require('apps/models/movieModel');

  var MovieCollection = Backbone.Collection.extend({
    url: 'movies',
    model: Model,
    comparator: 'title'
  });

  var getMovieEntities = function(movieId) {

    var defer = $.Deferred();
    if (movieId) {
      var user = new Model({
        _id: movieId
      });
      user.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
    } else {
      var users = new MovieCollection();
      users.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
    }
    return defer.promise();
  };

  return getMovieEntities;

});