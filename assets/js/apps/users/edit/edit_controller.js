VideoManager.module(
  'UsersApp.Edit',
  function(Edit, VideoManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
      editUser: function (id) {
        var fetchUser = VideoManager.request('user:entity', id);

        $.when(fetchUser).done(function (user) {
          var editModal;
          if (user !== undefined) {
            var editModal = new Edit.User({
              model: user
            });

            editModal.on('form:submit', function (data) {
              user.save(data);
              VideoManager.trigger('user:show', user.get('_id'));
            });

          } else {}

          VideoManager.mainRegion.show(editModal);        
        });

      }
    };
  }
);