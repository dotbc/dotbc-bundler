import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo } = DS;
const computed = Ember.computed;

export default DS.Model.extend({
  work: belongsTo('work', { inverse: 'media', acync: false }),
  s3Key: attr(),
  filename: attr(),
  width: attr('number'),
  height: attr('number'),
  size: attr('number'),
  mimeType: attr(),
  metadata: attr(),
  localFile: attr(),
  mediumPreviewUrl: attr(),

  isAudio: computed('mimeType', function() {
    return this.get('mimeType').startsWith('audio/');
  }),

  isText: computed('mimeType', function() {
    return this.get('mimeType').startsWith('text/');
  }),

  isImage: computed('mimeType', function() {
    return this.get('mimeType').startsWith('image/');
  }),
});
