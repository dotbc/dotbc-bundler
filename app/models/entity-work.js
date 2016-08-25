import Ember from 'ember';
import DS from 'ember-data';
import WorkModel from './work';

const { computed } = Ember;

export default WorkModel.extend({
  authorName: DS.attr('string'),
  artist: computed.readOnly('authorName'),
  workType: computed.readOnly('metadata.type'),
  workId: DS.attr('string'),
});
