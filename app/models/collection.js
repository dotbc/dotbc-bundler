import DS from 'ember-data';

const { belongsTo, attr } = DS;

export default DS.Model.extend({
  user: belongsTo('user'),
  name: attr('string'),
  shortname: attr('string'),
  description: attr()
});
