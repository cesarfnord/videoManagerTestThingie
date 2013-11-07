define(function(require) {
  'use strict';

  var Backbone = require('backbone');

  var Movie = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'movies',
    defaults: {
      title: '',
      year: '',
      genre: 0
    }
  });

  return Movie;

});