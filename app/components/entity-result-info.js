import Ember from 'ember';

export default Ember.Component.extend({

  pluginSearchService: Ember.inject.service('plugin-search'),

  fetchAdditionalData: Ember.on('init', Ember.observer('entity', function(){
    var entity = this.get('entity');
    if(!entity){
      return;
    }
    var self = this;
    Ember.RSVP.Promise.resolve(entity.plugin.getDetails(entity))
      .then(function(results) {
        self.set('topTracks', results.topTracks);
        self.set('albums', results.topAlbums);
        self.set('secondaryText', results.secondaryText);
        self.set('entityImage', results.image);
      });
  })),
});
