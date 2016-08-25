import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model(){
    return this.get('store').findAll('entity-work').then(function(works){
      return _.filter(works.toArray(), function(work){
        return work.get('metadata.type');
      });
    });
  },
  actions: {
    refreshWorks() {
      this.refresh();
    }
  }
});
