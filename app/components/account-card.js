import Ember from 'ember';

export default Ember.Component.extend({
  isExpanded: false,

  actions: {
    expandAccount() {
      this.set('isExpanded', true);
    },
    addClick() {
      this.sendAction('addClick');
    }
  }
});
