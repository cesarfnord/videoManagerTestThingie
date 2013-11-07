VideoManager.module(
  'MoviesApp.List',
  function(List, VideoManager, Backbone, Marionette, $, _) {
    List.Layout = Marionette.Layout.extend({
      serializeData: function () {
        return {
          button: 'Add New Movie'
        };
      },
      template: '.js-list-layout',
      regions: {
        movieRegion: '.js-table'
      },
      triggers: {
        'click .js-new-button': 'movie:new'
      }
    });

    List.Movie = Marionette.ItemView.extend({

      tagName: 'tr',
      template: '.js-movie-item',

      events: {
        'click': 'highlightName',
        'click .js-delete': 'deleteMovie',
        'click .js-show': 'showMovie',
        'click .js-edit-user': 'editMovie'
      },

      highlightName: function () {
        this.$el.toggleClass('warning');
      },
      deleteMovie: function (e) {
        e.stopPropagation();
        this.trigger('movie:delete', this.model);
      },
      showMovie: function (e) {
        e.stopPropagation();
        this.trigger('movie:show', this.model);
      },
      editMovie: function (e) {
        e.stopPropagation();
        this.trigger('movie:edit', this.model);
      }
    });

    List.Movies = Marionette.CompositeView.extend({
      tagName: 'table',
      className: 'table table-hover',
      template: '.js-movie-table',
      itemView: List.Movie,
      itemViewContainer: '.js-movie-table-body',
      //Triggers on itemView > Users:Delete
      onItemviewMovieDelete: function () {
        //console.log('Item Deleted')
      }
    });
  }
 );