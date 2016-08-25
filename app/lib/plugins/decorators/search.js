import Ember from 'ember';
import Plugin from '../plugin';

const {ipcRenderer} = requireNode('electron');

const type = 'search';

export default {

  apply: function (plugin) {

    if ( ! Plugin.supportsCapability(plugin, type)) {
      return plugin;
    }

    console.log(`${plugin.name} supports ${type}. enabling.`);

    plugin.displayName = plugin.capabilities.search.name;
    plugin.description = plugin.capabilities.search.description;
    plugin.imageUrl = plugin.capabilities.search.imageUrl;
    plugin.searchImageUrl = plugin.capabilities.search.searchImageUrl;
    plugin.supportedSearchTypes = plugin.capabilities.search.supportedSearchTypes;

    if (Plugin.supportsCommand(plugin, type, 'search')) {

      console.log(`${plugin.name} supports ${type}:search. adding ${type}:search decorator`);

      plugin.search = function (entityType, query) {
        
        return new Ember.RSVP.Promise((resolve, reject) => {
        
          const eventType = `plugin:${plugin.name}:command:search`;

          var timeout;

          function receive (event, response) {
            clearTimeout(timeout);
            resolve(response);
          }
        
          ipcRenderer.once(eventType, receive);

          timeout = setTimeout(() => {
            // remove listener to avoid leaks in case of errors
            plugin.removeListener(eventType, receive);
          }, 15000);

          ipcRenderer.send(eventType, [ entityType, query ]);
          
        });
      };

    }

    if (Plugin.supportsCommand(plugin, type, 'getDetails')) {

      console.log(`${plugin.name} supports ${type}:getDetails. adding ${type}:getDetails decorator`);

      plugin.getDetails = function (entity) {
        
        if ( ! entity.href) return null;
        
        return new Ember.RSVP.Promise((resolve, reject) => {
          
          const eventType = `plugin:${plugin.name}:command:getDetails`;

          var timeout;

          function receive (event, response) {
            clearTimeout(timeout);
            resolve(response);
          }

          ipcRenderer.once(eventType, receive);
          
          timeout = setTimeout(() => {
            // remove listener to avoid leaks in case of errors
            plugin.removeListener(eventType, receive);
          }, 15000);
          
          ipcRenderer.send(eventType, [ entity ]);

        });
      };

    }

    return plugin;

  }

};