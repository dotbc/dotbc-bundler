import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({

  authService: Ember.inject.service('auth'),

  actions: {
    addClick(value){
      this.get('authService').logout();
      this.send('goToWorksIndex');
    }
  }
});
