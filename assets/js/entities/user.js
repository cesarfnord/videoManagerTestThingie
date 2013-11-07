VideoManager.module(
  'Entities',
  function(Entities, VideoManager, Backbone, Marionette, $, _) {
    Entities.User = Backbone.Model.extend({
      idAttribute: '_id',
      urlRoot: 'users',
      defaults: {
        firstName: '',
        lastName: '',
        email: ''
      }
    });

    Entities.UserCollection = Backbone.Collection.extend({
      url: 'users',
      model: Entities.User,
      comparator: 'lastName'
    });

    var initializeUsers = function () {
      var users = new Entities.UserCollection([
        {firstName: 'Dave', lastName: 'Colbert', email: ''},
        {firstName: 'Will', lastName: 'Wheaton', email: ''},
        {firstName: 'Tracy', lastName: 'Turnblade', email: ''}
      ]);
      users.forEach(function (user) {
        user.save();
      });
      return users;
    };

    var API = {
      getUserEntities: function () {
        var users = new Entities.UserCollection();
        var defer = $.Deferred();
        users.fetch({
          success: function (data) {
            defer.resolve(data);
          }
        });
        //remove later
/*        if(!users.length) {
          return initializeUsers();
        }*/
        return defer.promise();
      },
      getUserEntity: function (userId) {
        var user = new Entities.User({_id: userId});
        var defer = $.Deferred();
        user.fetch({
          success: function (data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      }
    };

    VideoManager.reqres.setHandler('user:entities', function () {
      return API.getUserEntities();
    });
    VideoManager.reqres.setHandler('user:entity', function (id) {
      return API.getUserEntity(id);
    });

  }
);