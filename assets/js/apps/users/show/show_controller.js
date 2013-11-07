VideoManager.module(
  'UsersApp.Show',
  function(Show, VideoManager, Backbone, Marionette, $, _) {
    Show.Controller = {
      showUser: function (id) {
        var fetchUser = VideoManager.request('user:entity', id);
        $.when(fetchUser).done(function (user) {        
          var userView;
          if (user !== undefined) {
            userView = new Show.User({
              model: user
            });


          userView.on('user:edit', function (user) {
            VideoManager.trigger('user:edit', user.get('_id'));
          });
          } else {}

          VideoManager.mainRegion.show(userView);
        });
      }
    };
  }
);
