VideoManager.module(
  'NavigationApp.Menu',
  function (Menu, VideoManager, Backbone, Marionette, $, _) {
    Menu.Item = Marionette.ItemView.extend({
      template: '.js-menu-item',
      tagName: 'li',

      events: {
        'click a': 'navigate'
      },

      navigate: function (e) {
        e.preventDefault();
        this.trigger('navigate', this.model);
      },

      onRender: function () {
        if (this.model.selected) {
          this.$el.addClass('active');
        };
      }
    });

    Menu.Items = Marionette.CompositeView.extend({
      template: '.js-main-menu',
      className: 'navbar navbar-inverse',
      itemView: Menu.Item,
      itemViewContainer: '.js-main-menu-list'
    });
  }
);