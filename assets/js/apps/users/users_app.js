VideoManager.module(
  'UsersApp',
  function(UsersApp, VideoManager, Backbone, Marionette, $, _) {
    UsersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'users' : 'listUsers',
        'users/:id': 'showUser',
        'users/:id/edit': 'editUser'
      }
    });

    var API = {
      listUsers: function () {
        UsersApp.List.Controller.listUsers();
        VideoManager.execute('set:active:link', 'users');
      },
      showUser: function (id) {
        UsersApp.Show.Controller.showUser(id);
        VideoManager.execute('set:active:link', 'users');
      },
      editUser: function (id) {
        UsersApp.Edit.Controller.editUser(id);
        VideoManager.execute('set:active:link', 'users');
      }
    };

    VideoManager.on('users:list', function () {
      VideoManager.navigate('users');
      API.listUsers();
    });
    VideoManager.on('user:show', function (id) {
      VideoManager.navigate('users/' + id);
      API.showUser(id);
    });
    VideoManager.on('user:edit', function (id) {
      VideoManager.navigate('users/' + id + '/edit');
      API.editUser(id);
    });

    VideoManager.addInitializer(function () {
      new UsersApp.Router({
        controller: API
      });
    });
  }
);