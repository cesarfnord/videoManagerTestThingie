define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
    $ = require('jquery');

  var Marionette = require('marionette');

  //controllers
  var NavigationController = require('apps/controllers/navigationBar');
  var UserController = require('apps/controllers/users');
  var MovieController = require('apps/controllers/movies');

  var VideoManager = new Marionette.Application();

  VideoManager.addRegions({
    menuRegion: '.js-menu',
    mainRegion: '.js-app-container',
    modalRegion: '.js-modal-region'
  });

  // Set routes HERE

  VideoManager.addInitializer(function() {
    var UserRouter = Marionette.AppRouter.extend({
      controller: new UserController(this),
      appRoutes: {
        'users': 'listUsers',
        'users/:id': 'showUser',
        'users/:id/edit': 'editUser'
      }
    });

    var MovieRouter = Marionette.AppRouter.extend({
      controller: new MovieController(this),
      appRoutes: {
        'movies': 'listMovies'
      }
    });
    this.movieRouter = new MovieRouter();
    this.userRouter = new UserRouter();
  });

  // History
  VideoManager.addInitializer(function() {
    this.navigate = function(route, options) {
      options || (options = {});
      Backbone.history.navigate(route, options);
    };

    this.getCurrentRoute = function() {
      return Backbone.history.fragment;
    };
  })

  VideoManager.addInitializer(function () {
    this.NavigationApp =
      new NavigationController(VideoManager);

    this.on('start', function() {
      VideoManager.NavigationApp.listMenu();
    });
  });

  VideoManager.on('initialize:after', function() {
    if (Backbone.history) {
      Backbone.history.start();

      if (this.getCurrentRoute() === '') {
        VideoManager.trigger('users:list');
      }
    }
  })


  return VideoManager;
});