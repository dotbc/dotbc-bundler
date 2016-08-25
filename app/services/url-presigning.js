import Ember from 'ember';
export default Ember.Service.extend({
  build: function(contentType) {
    const adapter = this.container.lookup('adapter:application');
    return adapter.getS3UploadEndpoint(contentType);
  }
});
