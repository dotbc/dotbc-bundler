import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '', // Don't wrap in an ember-view div
  isEditing: false,

  actions: {
    editWork() {
      this.set('isEditing', true);
    },
    endEditing() {
      this.set('isEditing', false);
    },
    backClicked() {
      this.set('isExpanded', false);
    }
  }
});
