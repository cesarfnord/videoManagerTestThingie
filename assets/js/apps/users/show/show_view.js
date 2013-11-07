VideoManager.module(
  'UsersApp.Show',
  function(Show, VideoManager, Backbone, Marionette, $, _) {
    Show.User = Marionette.ItemView.extend({
    	template: '.js-user-view',
      events: {
        'click .js-edit-user': 'editUser'
      },
      editUser: function (e) {
        e.stopPropagation();
        this.trigger('user:edit', this.model);
      }
    });
  }
 );
