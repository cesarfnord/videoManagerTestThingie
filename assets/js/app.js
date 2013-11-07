var VideoManager = new Marionette.Application();

VideoManager.addRegions({
  menuRegion: '.js-menu',
  mainRegion: '.js-app-container',
  modalRegion: '.js-modal-region'
});

VideoManager.navigate = function (route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
};

VideoManager.getCurrentRoute = function () {
  return Backbone.history.fragment;
};

VideoManager.on('initialize:after',  function () {
  if (Backbone.history) {
    Backbone.history.start();

    if (this.getCurrentRoute() === '') {
      VideoManager.trigger('users:list');
    }
  }
})
