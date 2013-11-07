define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('jst!./_index.html');

  var MenuItem = require('apps/components/UsersListView/index');

  var ListUsers = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: template,
    itemView: MenuItem,
    itemViewContainer: '.js-user-table-body',
    //Triggers on itemView > Users:Delete
    onItemviewUserDelete: function() {
      //console.log('Item Deleted')
    }
  });

  return ListUsers;

});