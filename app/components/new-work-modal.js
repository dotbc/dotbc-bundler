import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    cancel() {
      this.sendAction("cancel");
    },
    createRecording() {
      this.sendAction("createRecording");
    },
    createComposition() {
      this.sendAction("createComposition");
    }
  }
});
