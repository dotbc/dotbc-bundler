import Ember from 'ember';

const $ = Ember.$;

export default Ember.Component.extend({

  actions: {
    toggleWorkType(workType) {
      var eventName = 'show' + workType;
      var propertyName = 'showing' + workType;
      this.toggleProperty(propertyName);
      this.sendAction(eventName, this.get(propertyName));
    },

    keyPress() {
      var input = $('#works-search');
      var value = input.val();
      var eventName = 'searchWorks'
      this.sendAction(eventName, value);
    }
  }
});
