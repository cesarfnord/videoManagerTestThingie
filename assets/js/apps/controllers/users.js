define(function(require) {
  'use strict';

  var Marionette = require('marionette');

  var UsersModel = require('apps/models/userModel');

  var UsersCollection = require('apps/collections/userCollection');

  var ListLayout = require('apps/components/UserListLayout/index');
  var ListUsersView = require('apps/components/UserListCompositeView/index');
  var SingleUserView = require('apps/components/UserShowView/index');
  var EditUserView = require('apps/components/UserSaveModalView/index');
  require('bootstrap');

  var Controller = Marionette.Controller.extend({
    initialize: function(app) {
      this.app = app;
      var self = this;

      app.on('users:list', function() {
        app.navigate('users');
        self.listUsers();
      });
      app.on('user:show', function(id) {
        app.navigate('users/' + id);
        self.showUser(id);
      });
      app.on('user:edit', function(id) {
        app.navigate('users/' + id + '/edit');
        self.editUser(id);
      });
    },
    listUsers: function() {
      //UsersApp.List.Controller.listUsers();
      var app = this.app;

      var fetchUsers = UsersCollection();
      //app.request('user:entities');

      var usersListLayout = new ListLayout();
      $.when(fetchUsers).done(function(users) {
        var userListView = new ListUsersView({
          collection: users
        });
        usersListLayout.on('show', function() {
          usersListLayout.userRegion.show(userListView);
        });
        usersListLayout.on('user:new', function() {
          var newUser = new UsersModel();

          var ModalView = EditUserView.extend({
            className: 'modal fade js-edit-modal'
          });
          var view = new ModalView({
            model: newUser
          });
          view.on('form:submit', function(data) {
            newUser.save(
              data, {
                success: function(data) {
                  users.add(data);
                  view.$el.modal('hide');
                }
              });
          });

          app.modalRegion.show(view);
          view.$el.modal('show');

          view.$el.on('hidden.bs.modal', app.modalRegion.close);

        });


        userListView.on('itemview:user:delete', function(childView, model) {
          model.destroy();
        });
        userListView.on('itemview:user:show', function(childView, model) {
          app.trigger('user:show', model.get('_id'));
        });
        userListView.on('itemview:user:edit', function(childView, model) {
          var ModalView = EditUserView.extend({
            className: 'modal fade js-edit-modal'
          });

          var modal = new ModalView({
            model: model
          });


          modal.$el.on('hidden.bs.modal', app.modalRegion.close);
          modal.on('form:submit', function(data) {
            if (model.save(data)) {
              childView.render();
              modal.$el.modal('hide');
            }
          });

          app.modalRegion.show(modal);
          modal.$el.modal('show');
        });


        app.mainRegion.show(usersListLayout);
      });


      this.app.execute('set:active:link', 'users');
    },
    showUser: function(id) {
      var app = this.app;

      var fetchUser = UsersCollection(id); //app.request('user:entity', id);
      $.when(fetchUser).done(function(user) {
        var userView;
        if (user !== undefined) {
          userView = new SingleUserView({
            model: user
          });


          userView.on('user:edit', function(user) {
            app.trigger('user:edit', user.get('_id'));
          });
        } else {}

        app.mainRegion.show(userView);
      });
      this.app.execute('set:active:link', 'users');
    },
    editUser: function(id) {
      var app = this.app;
      var fetchUser = UsersCollection(id);

      $.when(fetchUser).done(function(user) {
        var editModal;
        if (user !== undefined) {
          var editModal = new EditUserView({
            model: user
          });

          editModal.on('form:submit', function(data) {
            user.save(data);
            app.trigger('user:show', user.get('_id'));
          });

        } else {}

        app.mainRegion.show(editModal);
      });
      this.app.execute('set:active:link', 'users');
    }
  });

  return Controller;
});