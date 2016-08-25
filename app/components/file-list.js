import Ember from 'ember';

const computed = Ember.computed;
const $ = Ember.$;

export default Ember.Component.extend({

  urlPresigning: Ember.inject.service('url-presigning'),
  fileUploader: Ember.inject.service('file-uploader'),
  authManager: Ember.inject.service('auth'),
  store: Ember.inject.service('store'),

  expandedMedium: false,

  initAudioPreview: Ember.on('didInsertElement', function(){
    var audioPreview = document.getElementById('cs-audio-preview');
    audioPreview.addEventListener("timeupdate", function(evt){
      var currentTime = evt.currentTarget.currentTime;
      var percentComplete = currentTime / evt.currentTarget.duration;
      $('.cs-file .audio-red').css('width', (percentComplete * 100) + '%');

      var minutes = Math.floor(currentTime / 60);
      var seconds = Math.floor(currentTime % 60);

      $('.cs-file .audio-time').text(minutes + ':' + ("0" + seconds).slice(-2));
    }, false);
  }),

  media: computed('work.registeredMedia', function() {
    // For refactoring compatibility.
    return this.get('work.registeredMedia');
  }),
  actions: {
    didSelectFiles(files) {
      this.sendAction('filesUploading');
      var self = this;
      var promises = [];
      var newFiles = _.differenceWith(files, this.get('work.media').toArray(), function(arrVal, othVal){
        return arrVal.name === othVal.get('filename');
      });
      var createUpload = function(file){
        var fileType = file.type || "application/octet-stream";
        promises.push(
        self.get('urlPresigning').build(fileType)
        .then(function(value){
          self.get('store').createRecord('medium', {
            work: self.get('work'),
            s3Key: value.key,
            filename: file.name,
            localFile: file,
            size: file.size,
            mimeType: fileType,
            metadata: {}
          });
          return self.get('fileUploader').uploadFile(value.url, file);
        }));
      };
      for(var i = 0; i < newFiles.length; i++){
        createUpload(newFiles[i]);
      }

      Ember.RSVP.Promise.all(promises).then(function(){
        self.sendAction('filesUploaded');
      });
    },
    mediumExpanded(medium) {
      this.set('expandedMedium', medium);
    }
  }
});
