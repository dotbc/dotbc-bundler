import Ember from 'ember';

const Promise = Ember.RSVP.Promise;

export default Ember.Service.extend({

  store: Ember.inject.service('store'),
  storage: Ember.inject.service('local-storage'),
  sessionToken: null,
  userId: null,
  entityId: null,

  initAuthData: Ember.on('init', function(){
    var storage = this.get('storage');
    this.set('sessionToken', storage.get('access_token'));
    this.set('userId', storage.get('user_id'));
    this.set('entityId', storage.get('entity_id'));
  }),

  login: function(username, password) {
    const adapter = this.container.lookup('adapter:application');
    return adapter.login(username, password);
  },
  logout: function() {
    var s = this.get('storage');
    s.removeItem('access_token');
    s.removeItem('user_id');
    s.removeItem('entity_id');
  },
  storeCredentials: function(authData){
    var storage = this.get('storage');
    storage.set("access_token", authData.access_token);
    storage.set("user_id", authData["user-id"]);
    this.set('sessionToken', authData.access_token);

    return this.get('store').findRecord('user', authData["user-id"]).then(function(user) {
      storage.set('entity_id', user.get('entity.id'));
    });
  },
  isAuthenticated: function() {
    return !!this.get('storage').get("access_token")
      && !!this.get('storage').get("user_id")
      && !!this.get('storage').get("entity_id");
  }
});
