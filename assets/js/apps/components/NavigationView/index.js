define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var MenuItem = require('apps/components/NavigationItem/index');

  //var Menu = VideoManager.NavigationApp.Menu;

  var MenuView = Marionette.CompositeView.extend({
    template: template,
    className: 'navbar navbar-inverse',
    itemView: MenuItem,
    itemViewContainer: '.js-main-menu-list'
  });

  return MenuView;

});