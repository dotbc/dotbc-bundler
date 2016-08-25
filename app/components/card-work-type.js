import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  tagName: '', // Don't wrap in an ember-view div
  isEditing: false,
  
  cardClassName: computed('cardType', function() {
    var cardType = this.get('cardType');
    switch(cardType) {
      case "Summary":
        return "cs-work-type-summary";
      case "Details":
        return "cs-work-type-details";
      default:
        return "CARD_TYPE_NOT_FOUND";
    }
  }),
  actions: {
    editWork() {
      this.sendAction('editWork');
    }
  }
});
