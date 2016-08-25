import DS from 'ember-data';
import EmbeddedJSONAPIRecordsMixin from '../mixins/embedded-record';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, EmbeddedJSONAPIRecordsMixin,{
  attrs: {
    media: { serialize: 'records' }
  }
});
