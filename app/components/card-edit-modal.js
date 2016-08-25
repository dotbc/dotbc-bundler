import Ember from 'ember';

const $ = Ember.$;

export default Ember.Component.extend({

  store: Ember.inject.service('store'),

  saveEnabled: false,

  actions: {
    cancel() {
      this.sendAction("closeModal");
    },
    save() {
      if(!this.get('saveEnabled')){
        return;
      }
      this.sendAction("closeModal");
      var attributes = this.get('work.attributes');
      var metadata = this.get('work.metadata') || {};
      var store = this.get('store');
      this.set('work.name', $("#cs-editor-name").val());
      for(var i = 0; i < attributes.length; i++){
        if (attributes[i].type != 'text') continue;

        var node = $("#cs-editor-" + attributes[i].propertyName);
        metadata[attributes[i].propertyName] =  node.val();
      }
      this.set('work.metadata', metadata);
      var work = this.get('work');
      var query = $("#cs-editor-composition").val();
      var composition = store.peekAll('work');
      for(i = 0; i < composition.get('length'); i++){
        var comp = composition.get('content')[i].record;
        if(comp.get('name')===query) {
          work.set('compositionWorkId', comp.id);
          break;
        }
      }
      var genWorkId = 'a0700504-6412-4a3d-accf-961cd9bf26ea';
      var classification = store.peekRecord('classification', genWorkId);
      this.set('work.classification', classification || store.createRecord('classification', {
        id: genWorkId
      }));
      work.save();
    },
    filesUploading() {
      this.set('saveEnabled', false);
    },
    filesUploaded() {
      this.set('saveEnabled', true);
    },
    deleteWork(work) {

    }
  }

});
