import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  email: (i) => `someuser${i}@dotbc.tst`,
  name: faker.name.findName,
  username: faker.internet.username,
  password: faker.internet.password,
  entity: null,
  collections: []
});
