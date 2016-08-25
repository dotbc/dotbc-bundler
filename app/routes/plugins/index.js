import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  pluginSearchService: Ember.inject.service('plugin-search'),

  model(){
    return this.get('pluginSearchService.plugins');
  },

  actions: {
    backClicked() {
      this.get('router').transitionTo('plugins');
    }
  }
});
