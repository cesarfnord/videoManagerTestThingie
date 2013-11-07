require.config({
  paths: {
    'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
    'underscore': 'vendor/underscore.min',

    'backbone': 'vendor/backbone.min',
    'syphon': 'vendor/backbone.syphon.min',

    'marionette': 'vendor/backbone.marionette.min',

    'text': 'vendor/require.text',
    'jst': 'vendor/require.jst',

    'bootstrap': 'vendor/bootstrap'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    syphon: {
      deps: ['backbone']
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    }

  }
});

require(['jquery', 'app'], function ($, app){
  app.start();
});