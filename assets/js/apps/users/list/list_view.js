VideoManager.module(
  'UsersApp.List',
  function(List, VideoManager, Backbone, Marionette, $, _) {
    List.Layout = Marionette.Layout.extend({
      serializeData: function () {
        return {
          button: 'Add New User'
        };
      },
      template: '.js-list-layout',
      regions: {
        userRegion: '.js-table'
      },
      triggers: {
        'click .js-new-button': 'user:new'
      }
    });

    List.User = Marionette.ItemView.extend({

      tagName: 'tr',
      template: '.js-user-item',

      events: {
        'click': 'highlightName',
        'click .js-delete': 'deleteUser',
        'click .js-show': 'showClicked',
        'click .js-edit-user': 'editUser'
      },

      highlightName: function () {
        this.$el.toggleClass('warning');
      },
      deleteUser: function (e) {
        e.stopPropagation();
        this.trigger('user:delete', this.model);
      },
      showClicked: function (e) {
        e.stopPropagation();
        this.trigger('user:show', this.model);
      },
      editUser: function (e) {
        e.stopPropagation();
        this.trigger('user:edit', this.model);
      }
    });

    List.Users = Marionette.CompositeView.extend({
      tagName: 'table',
      className: 'table table-hover',
      template: '.js-user-table',
      itemView: List.User,
      itemViewContainer: '.js-user-table-body',
      //Triggers on itemView > Users:Delete
      onItemviewUserDelete: function () {
       //console.log('Item Deleted')
      }
    });

  }
 );