import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  work: null,
  mediumPreviewUrl: faker.image.imageUrl
});
