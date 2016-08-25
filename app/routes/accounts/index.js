import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  actions: {
    goToWorksIndex() {
      this.transitionTo('works.index');
    }
  }
});
