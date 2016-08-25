import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    loginSuccess() {
      this.get('router').transitionTo('works');
    }
  }
});
