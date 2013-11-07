VideoManager.module(
  'Entities',
  function (Entities, VideoManager, Backbone, Marionette, $, _) {
    Entities.Navigation = Backbone.Model.extend({
      initialize: function () {
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });
    Entities.NavigationCollection = Backbone.Collection.extend({
      model: Entities.Navigation,
      initialize: function () {
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeNavigation = function () {
      Entities.navigation = new Entities.NavigationCollection([
        {
          name: 'Users',
          url: 'users'
        }, {
          name: 'Movies',
          url: 'movies'
        }
      ]);
    };

    var API = {
      getMenu: function () {
        if (Entities.navigation === undefined) {
          initializeNavigation();
        }
        return Entities.navigation;
      }
    };

    VideoManager.reqres.setHandler('navigation:entities', function () {
      return API.getMenu();
    });
  }
);