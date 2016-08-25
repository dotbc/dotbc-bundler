import Ember from 'ember';

const $ = Ember.$;

export default Ember.Route.extend({
  urlPresigningService: Ember.inject.service('url-presigning'),
  fileUploaderService: Ember.inject.service('file-uploader'),

  actions: {
    registerWork() {
      var store = this.get('store');
      var file = $('.test-upload')[0].files[0];
      this.get('urlPresigningService').build('hello there', file.type)
      .then((uploadData) => {
        return this.get('fileUploaderService').uploadFile(uploadData.url, file);
      }).then(() => {
        return store.createRecord('work', {
          name: 'my work',
          description: 'my work description'
        }).save();
      }).catch(function(reason){
        Ember.Logger.error(reason);
      });
    }
  }
});
