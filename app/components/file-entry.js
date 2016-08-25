import Ember from 'ember';

const $ = Ember.$;

export default Ember.Component.extend({

  expanded: false,
  tagName: '',
  playing: false,
  expandedObserver: Ember.observer('expandedMedium', function(sender){
    if(this.get('expanded') && (sender.get('expandedMedium.filename') !== this.get('medium.filename'))) {
      this.send('contract');
    }
  }),

  actions: {
    click() {
      var medium = this.get('medium');
      this.toggleProperty('expanded');
      if(this.get('expanded')){
        if(medium.get('isAudio')){
          this.send('previewAudio', medium);
        }
        else if (medium.get('isImage')) {
          this.send('previewImage', medium);
        }
        else if (medium.get('isText')) {
          this.send('previewText', medium);
        }
        this.sendAction('mediumExpanded', medium);
      }
      else{
        this.send('contract');
      }
    },

    contract() {
      this.send('pause');
      this.set('expanded', false);
    },

    delete() {
      var medium = this.get('medium');
      medium.deleteRecord();
      this.send('pause');
    },

    play() {
      if(!this.get('expanded')){
        this.send('click');
      }
      else {
        var audioPreview = document.getElementById('cs-audio-preview');
        audioPreview.play();
        this.set('playing', true);
      }
    },

    pause() {
      var audioPreview = document.getElementById('cs-audio-preview');
      audioPreview.pause();
      this.set('playing', false);
    },

    previewAudio(medium){
      var audioPreview = document.getElementById('cs-audio-preview');
      if(medium.get('localFile')){
        var reader = new FileReader();
        reader.onload = (function(audio) {return function(e) {audio.src = e.target.result;};})(audioPreview);
        reader.addEventListener('load', function() {
          audioPreview.play();
        });
        reader.readAsDataURL(medium.get('localFile'));
      }
      else{
        audioPreview.src = medium.get('metadata').url;
        audioPreview.play();
      }
      this.set('playing', true);
    },

    previewImage(medium) {
      if(medium.get('localFile')){
        var reader = new FileReader();
        reader.onload = function(e) {
          $('.cs-image-preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(medium.get('localFile'));
      }
      else {
        Ember.run.scheduleOnce('afterRender', {
          preview() {
            $('.cs-image-preview').attr('src', medium.get('mediumPreviewUrl'));
          }
        }, 'preview');
      }
    },

    previewText(medium) {
      if(medium.get('localFile')){
        var reader = new FileReader();
        reader.onload = function(e) {
          var text = e.target.result;
          $('.cs-text-preview').text(text.substring(0,140) + (text.length > 140 ? '...' : ''));
        };
        reader.readAsText(medium.get('localFile'));
      }
    }
  }
});
