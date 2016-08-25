import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({

  isRecording: computed('type', function() {
    return this.get('type') === 'Recording';
  }),
  isComposition: computed('type', function() {
    return this.get('type') === 'Composition';
  }),

  actions: {
    click() {
      this.sendAction("click");
    }
  }
});
