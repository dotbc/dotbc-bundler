import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  user: null,
  name: (i) => `Collection #${i}`,
  shortname: (i) => `Short Name #${i}`,
  description: (i) => `Description #${i}`
});
