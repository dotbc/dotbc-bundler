import Ember from 'ember';

export default Ember.Mixin.create({
  authManager: Ember.inject.service('auth'),

  beforeModel() {
    if(!this.get('authManager').isAuthenticated()){
      return this.transitionTo('login');
    }
    else {
      return this._super(...arguments);
    }
  }
});
