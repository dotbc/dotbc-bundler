import Ember from 'ember';
export default Ember.Service.extend({
  plugins: Ember.inject.service('plugins'),

  init: function() {
    // Todo: get plugins dynamically
    var plugins = [];
    var rawPlugins = this.get('plugins').all(); 

    for (var i = 0; i < rawPlugins.length; i++) {
      var p = rawPlugins[i];
      p.pluginId = Ember.uuid();
      plugins.push(p);

      // Inject wrappers around search function
      (function(plugin){
        var searchFunc = plugin.search;
        plugin.search = function(entityType, query) {
          return Ember.RSVP.Promise.resolve(searchFunc(entityType, query))
                .then(function(results) {
                  // Convert to Ember objects to satisfy binding & future interactions
                  var emberResults = _.map(results, function(result) {
                    return Ember.Object.create(result);
                  });

                  return _.each(emberResults, function(result) {
                    result.set('plugin', plugin);
                  });
                });
              };
            })(p);
    }

    this.set('plugins', plugins);
  },

  getPluginsForEntityType(entityType) {
    return _.filter(this.get('plugins'), function(p) {
      return _.includes(p.supportedSearchTypes, entityType);
    });
  },
});
