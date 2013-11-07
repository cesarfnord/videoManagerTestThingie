define(function(require) {
  'use strict';

  var Backbone = require('backbone');

  var Model = require('apps/models/userModel');

  var UserCollection = Backbone.Collection.extend({
    url: 'users',
    model: Model,
    comparator: 'lastName'
  });

  var API = {
    getUserEntities: function(userId) {

      var defer = $.Deferred();
      if (userId) {
        var user = new Model({
          _id: userId
        });
        user.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });
      } else {      
        var users = new UserCollection();
        users.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });
      }
      return defer.promise();
    }
  };

  return API.getUserEntities;

});