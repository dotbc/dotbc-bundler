import DS from 'ember-data';

const { hasMany } = DS;

export default DS.Model.extend({
  users: hasMany('user', { async: false }),
  works: hasMany('work')
});
