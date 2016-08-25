import Ember from 'ember';

// From https://medium.com/the-ember-way/metaprogramming-in-emberjs-627921395299
var StorageService = Ember.Object.extend({
  persistence: window.localStorage,

  namespace: 'dotBC',

  init: function() {
    var callback = this._handleStorageEvent.bind(this);
    Ember.$(window).on('storage', callback);
  },

  unknownProperty: function(key) {
    var namespacedKey = this._key(key);
    var payload = this.get('persistence').getItem(namespacedKey);
    return this._deserialize(payload);
  },

  setUnknownProperty: function(key, value) {
    var namespacedKey = this._key(key);
    var payload = this._serialize(value);
    this.get('persistence').setItem(namespacedKey, payload);
    this.notifyPropertyChange(key);
    return true;
  },

  removeItem: function(key) {
    this.get('persistence').removeItem(this._key(key));
  },

  _serialize: function(value) {
    return JSON.stringify(value);
  },

  _deserialize: function(value) {
    if (value === 'undefined') { return; }
    return JSON.parse(value);
  },

  _key: function(key) {
    return '%@:%@'.fmt(this.get('namespace'), key);
  },

  _handleStorageEvent: function(event) {
    var storageEvent = event.originalEvent;

    var storageKey = storageEvent.key;
    var tokens = storageKey.split(':');
    var namespace = tokens[0];
    var key = tokens[1];

    if (key && namespace === this.get('namespace')) {
     this.notifyPropertyChange(key);
    }
  }
});

export default StorageService;
