import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '', // Don't wrap in an ember-view div
  isEditing: false,

  // TODO: The below chunk of code is a hack because
  // we don't yet really have a rich metadata system
  // (and Monegraph API still dasherizes fields)
  store: Ember.inject.service('store'),
  compositions: Ember.computed('work', function() {
    var store = this.get('store');
    return _.map(this.get('work.metadata.composition'), function(comp) {
      comp.metadata = {
        type: 'Composition',
        mainartist: [
          {
            name: comp.artist
          }
        ]
      };
      return store.createRecord('work', comp);
    });
  }),

  actions: {
    editWork() {
      this.set('isEditing', true);
    },
    endEditing() {
      this.set('isEditing', false);
    },
    sendToMonegraph(work){
      var id = work.get('monegraphIdentifier');
      window.open('https://staging.monegraph.com/m' + id, '_blank');
    }
  }
});
