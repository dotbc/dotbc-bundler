import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string'),
  entity: DS.belongsTo('entity', { async: false }),
  collections: DS.hasMany('collection', { async: true })
});
