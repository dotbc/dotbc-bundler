import Ember from 'ember';
export default Ember.Service.extend({
  spotify: Ember.inject.service('spotify'),
  getPlugins: function(uploadUrl, file) {
    const adapter = this.container.lookup('adapter:application');
    return adapter.uploadFile(uploadUrl, file);
  }
});
