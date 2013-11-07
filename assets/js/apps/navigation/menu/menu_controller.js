VideoManager.module(
  'NavigationApp.Menu',
  function (Menu, VideoManager, Backbone, Marionette, $, _) {
    Menu.Controller = {
      listMenu: function () {
        var links = VideoManager.request('navigation:entities');
        var navigation = new Menu.Items({
          collection: links
        });

        navigation.on('itemview:navigate', function (childView, model) {
          var url = model.get('url');
          VideoManager.trigger(url + ':list');
        });

        VideoManager.menuRegion.show(navigation);
      },
      setActiveLink: function (linkUrl) {
        var links = VideoManager.request('navigation:entities');
        var linkToSelect = links.find(function (item) {
          return item.get('url') === linkUrl;
        });
        linkToSelect.select();
        links.trigger('reset');
      }
    };
  }
);
