define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var MenuItem = require('apps/components/MovieListView/index');

  var ListUsers = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: template,
    itemView: MenuItem,
    itemViewContainer: '.js-movie-table-body',
    //Triggers on itemView > Users:Delete
    onItemviewMovieDelete: function() {
      //console.log('Item Deleted')
    }
  });

  return ListUsers;

});