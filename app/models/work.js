import Ember from 'ember';
import DS from 'ember-data';
import RecordingSchema from './schemas/recording';
import CompositionSchema from './schemas/composition';

const { attr, hasMany, belongsTo } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  name: attr('string'),
  metadata: attr(),
  attributes: computed('metadata', function () {
    return this.get('isRecording') ? RecordingSchema : CompositionSchema;
  }),
  files: attr(),
  media: hasMany('medium', { inverse: 'work', async: false }),
  registeredMedia: computed('media', function() {
    var media = this.get('media').toArray();
    var hasServerReturnedMedia = _.find(media, function(m) { return !m.get('isNew'); });
    var filtered = _.filter(media, function(media) {
      // This filter ensures that after creating a work, the duplicated medium
      // returned from API doesn't cause each file to show twice.
      return !hasServerReturnedMedia || media.get('id') !== null;
    });

    return _.sortBy(filtered, function(media){
      return media.get('filename').toLowerCase();
    });
  }),
  classification: belongsTo('classification', { async: false }),
  compositionWorkId: attr('string'),
  monegraphIdentifier: attr('string'),

  isRecording: computed('workType', function() {
    return this.get('workType') === 'Recording';
  }),
  isComposition: computed('workType', function() {
    return this.get('workType') === 'Composition';
  }),
  workType: computed.readOnly('metadata.type'),

  typeClassName: computed('workType', function() {
    var workType = this.get('workType');
    switch(workType) {
      case "Recording":
        return "cs-work-recording";
      case "Composition":
        return "cs-work-composition";
      default:
        return "WORK_TYPE_NOT_FOUND";
    }
  }),

  metadataValues: computed("metadata", function() {
    var attrMetadata = this.get("attributes");
    var metadata = [];
    var workMetadata = this.get('metadata') || {};
    for(var i=0; i < attrMetadata.length; i++){
      var attr = {
        attribute: attrMetadata[i],
        value: workMetadata[attrMetadata[i].propertyName]
      };
      metadata.push(attr);
    }
    return metadata;
  }),

});
