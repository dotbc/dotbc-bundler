import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model(){
    return {};
  },

  actions: {
    backClicked() {
      this.get('router').transitionTo('plugins');
    }
  }
});
