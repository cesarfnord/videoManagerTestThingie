VideoManager.module(
  'NavigationApp',
  function (NavigationApp, VideoManager, Backbone, Marionette, $, _) {
    var API = {
      listMenu: function () {
        NavigationApp.Menu.Controller.listMenu();
      }
    };

    VideoManager.commands.setHandler('set:active:menu', function (name) {
      VideoManager.NavigationApp.Menu.Controller.setActiveMenu(name);
    });

    NavigationApp.on('start', function () {
      API.listMenu();
    });
  }
);