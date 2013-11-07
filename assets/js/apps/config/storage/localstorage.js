VideoManager.module('Entities',
    function (Entities, VideoManager, Backbone, Marionette, $, _) {

      var findStorageKey = function (entity) {
        if (entity.urlRoot) {
          return _.result(entity, 'urlRoot');
        }
        if (entity.url) {
          return _.result(entity, 'url');
        }
        if (entity.collection && entity.collection.url) {
          return _.result(entity.collection, 'url');
        }
        throw new Error("No storage key.");
      };

      var StorageMixin = function (entityPrototype) {
        var storageKey = findStorageKey(entityPrototype);
        return {
          localStorage: new Backbone.LocalStorage(storageKey)
        };
      };

      Entities.configureStorage = function (entity) {
        _.extend(entity.prototype, StorageMixin);
      };

    }
);