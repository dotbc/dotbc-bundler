import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    backClicked() {
      this.sendAction('backClicked');
    }
  }
});
