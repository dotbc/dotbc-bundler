import DS from 'ember-data';

export const CLASSIFICATION_MAPPINGS = {
  'artwork': 'c204d535-d5e2-4b8d-a2fb-09eb676d50dc',
  'news photo': '8daecaf6-af64-4341-8c62-b24b0e8fb078',
  'product image': '4dd3158a-3ffa-4963-8d91-0cc44669ffce',
  'snapshot': '7badc8bf-16dd-4cb2-bbc8-ebfb23ade456',
  'work': 'a0700504-6412-4a3d-accf-961cd9bf26ea'
};

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string')
});
