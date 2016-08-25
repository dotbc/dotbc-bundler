import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model(params){
    return this.get('store').findRecord('work', params.work_id);
  },
  actions: {
    backClicked() {
      this.get('router').transitionTo('works');
    }
  }
});
