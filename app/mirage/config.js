import {
  getJsonApiInstance,
  getJsonApiCollection
} from './config-util';
import Mirage, {faker} from 'ember-cli-mirage';

export default function() {

  this.put('https://mediaupload.tst/**', function() {
    return new Mirage.Response(200);
  });

  this.namespace = '/v4';

  this.post('/authentication/s3', function() {
    return {
      data: {
        type: 'presigned-urls',
        url: 'https://mediaupload.tst/my-upload-location?signed=1&sealed=1&delivered=0',
        bucket: 'mirage-uploads',
        key: 'super-secret-key'
      }
    };
  });

  this.get('/users/:id');
  this.get('https://staging-api.monegraph.com/v4/entity-works', function(db) {
    return getJsonApiCollection(db, 'entity-works', {});
  });

  this.post('/works', function(db, request) {
    const json = JSON.parse(request.requestBody);

    const workAttrs = json.data.attributes;
    const work = db.works.insert({
      id: faker.random.number(),
      name: workAttrs.name,
      description: workAttrs.description,
      media: []
    });

    const response = getJsonApiInstance(db, 'works', work.id, {});

    return response;
  });

  this.get('/works/:id', function(db, request) {
    return getJsonApiInstance(db, 'works', request.params.id, {});
  });

  this.get('/works/:id/download', function(db, request) {
    return {
      data: {
        id: request.params.id,
        url: faker.image.imageUrl(),
        type: 'downloads'
      }
    };
  });

}
