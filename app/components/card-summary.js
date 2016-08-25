import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({

  placeholderText: computed('work', function() {
    var workType = this.get('work.workType');
    switch(workType) {
      case "Recording":
        return "";//Composition by Magic Tricks";
      case "Composition":
        return "";//Linked to 1 recording";
      default:
        return "WORK_TYPE_NOT_FOUND";
    }
  }),

  actions: {
    goToWork(work) {
      this.get('router').transitionTo('works.work', work.get('workId'));
    },
    sendToMonegraph(work){
      var id = work.get('monegraphIdentifier');
      window.open('https://staging.monegraph.com/m' + id, '_blank');
    }
  }
});
