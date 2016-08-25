import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('login', { path: '/login' });
  this.route('works', function() {
    this.route('work', { path: ':work_id' });
  });
  this.route('accounts', function() {
    this.route('acount', { path: ':work_id' });
  });
  this.route('plugins', function() {
    this.route('plugin', { path: ':work_id' });
  });
});

export default Router;
