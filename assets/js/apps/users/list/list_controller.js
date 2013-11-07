VideoManager.module(
  'UsersApp.List',
  function(List, VideoManager, Backbone, Marionette, $, _) {
    List.Controller = {
      listUsers: function () {
        var fetchUsers = VideoManager.request('user:entities');

        var usersListLayout = new List.Layout();

        $.when(fetchUsers).done(function (users) {
          var userListView = new List.Users({
            collection: users
          });

          usersListLayout.on('show', function () {
            usersListLayout.userRegion.show(userListView)
          });
          usersListLayout.on('user:new', function() {
            var newUser = new VideoManager.Entities.User();

            var ModalView = VideoManager.UsersApp.New.User.extend({
              className: 'modal fade js-edit-modal'
            });

            var view = new ModalView({
              model: newUser
            });

            view.on('form:submit', function (data) {
              newUser.save(
                data,
                {
                  success: function (data) {
                    users.add(data);
                    view.$el.modal('hide');
                  }
                });
            });

            VideoManager.modalRegion.show(view);
            view.$el.modal('show');

            view.$el.on('hidden.bs.modal', VideoManager.modalRegion.close);

          });


          userListView.on('itemview:user:delete', function (childView, model) {
            model.destroy();
          });
          userListView.on('itemview:user:show', function (childView, model) {
            VideoManager.trigger('user:show', model.get('_id'));
          });
          userListView.on('itemview:user:edit', function (childView, model) {
            var ModalView = VideoManager.UsersApp.Edit.User.extend({
              className: 'modal fade js-edit-modal'
            });

            var modal = new ModalView({
              model: model
            });


            modal.$el.on('hidden.bs.modal', VideoManager.modalRegion.close);
            modal.on('form:submit', function (data) {
              if(model.save(data)) {
                childView.render();
                modal.$el.modal('hide');
              }
            });

            VideoManager.modalRegion.show(modal);
            modal.$el.modal('show');
          });


          VideoManager.mainRegion.show(usersListLayout);
        });

      }
    };
  }
);