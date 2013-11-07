define(function (define) {
  'use strict';

  var Backbone = require('backbone');
  var Model = require('apps/models/navigationModel');

    var NavigationCollection = Backbone.Collection.extend({
      model: Model
    });

    var Collection = new NavigationCollection([
        {
          name: 'Users',
          url: 'users'
        }, {
          name: 'Movies',
          url: 'movies'
        }
      ]);

    return Collection;
});
