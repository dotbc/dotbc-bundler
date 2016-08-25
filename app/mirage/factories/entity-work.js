import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function(i) {
    return 'Work #' + (i + 1);
  },
  authorName: function() {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  }
});
