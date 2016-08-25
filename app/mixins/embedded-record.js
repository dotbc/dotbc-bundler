//https://github.com/emberjs/data/issues/3720#issuecomment-185545973

import Ember from 'ember';

export default Ember.Mixin.create({

  // add json-api compliant serialization type
  hasSerializeIdsAndTypeOption: function(attr) {
    var option = this.attrsOption(attr);
    return option && option.serialize === 'ids-and-type';
  },

  serializeHasMany: function(snapshot, json, relationship) {
    var attr = relationship.key;
    if (this.noSerializeOptionSpecified(attr)) {
      this._super(snapshot, json, relationship);
      return;
    }
    var includeRecords = this.hasSerializeRecordsOption(attr);
    if (includeRecords) {
      let serializedKey = this.keyForRelationship(attr, relationship.kind, 'serialize');
      if (!json['relationships']) {
        json['relationships'] = {};
      }
      json['relationships'][serializedKey] = this._generateSerializedHasMany(snapshot, relationship);
    }
  }
});
