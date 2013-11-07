define(function(require) {
  'use strict';

  var Backbone = require('backbone');

  var User = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'users',
    defaults: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  return User;

});
