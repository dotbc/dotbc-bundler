import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({

  showNewWorkModal: false,
  showCreateWorkModal: false,
  newWork: null,
  showingRecordings: true,
  showingCompositions: true,
  searchString: '',
  works: computed('model', 'showingRecordings', 'showingCompositions', 'searchString', function(){
    var works = this.get('model').toArray();
    var self = this;
    works = _.filter(works, function(work){
      if(self.get('searchString').length != 0){
        return work.get('name').toLowerCase().includes(self.get('searchString'))
          && work.get('isRecording')
          && self.get('showingRecordings')
          ||
          work.get('name').toLowerCase().includes(self.get('searchString'))
          && work.get('isComposition')
          && self.get('showingCompositions');
      }
      else{
        return work.get('isRecording') && self.get('showingRecordings') ||
          work.get('isComposition') && self.get('showingCompositions');
      }
    });
    return works.reverse();
  }),

  actions: {
    addNewWork() {
      this.set('showNewWorkModal', true);
    },
    cancelNewWork() {
      this.set('showNewWorkModal', false);
    },
    createRecording() {
      this.set('newWork',
      this.get('store').createRecord('work', {
        metadata: {
          type: "Recording"
        },
        files: ''
      }));
      this.set('showCreateWorkModal', true);
      this.set('showNewWorkModal', false);
    },
    createComposition() {
      this.set('newWork',
      this.get('store').createRecord('work', {
        metadata: {
          type: "Composition"
        },
        files: ''
      }));
      this.set('showCreateWorkModal', true);
      this.set('showNewWorkModal', false);
    },
    endEditing() {
      this.set('showCreateWorkModal', false);
      this.send('refreshWorks');
    },
    showCompositions(val){
      this.set('showingCompositions', val);
      if(!(val || this.get('showingRecordings'))){
          this.set('showingRecordings', true);
      }
    },
    showRecordings(val){
      this.set('showingRecordings', val);
      if(!(val || this.get('showingCompositions'))){
          this.set('showingCompositions', true);
      }
    },
    searchWorks(value){
      this.set('searchString', value.toLowerCase())
    }
  }
});
