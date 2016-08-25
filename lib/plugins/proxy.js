const capabilities = require('objectify-folder')(__dirname + '/capabilities');
const _ = require('lodash');

const plugins = new Map();

class Proxy {

  constructor () {
    this.window = null;
  }

  _registerCommands (plugin) {
    
    Object.keys(capabilities).forEach((capabilityType) => {
      if (plugin.capabilities[capabilityType]) {
        const capability = capabilities[capabilityType];
        capability.enable(plugin, this.window);
      }
    });
  }
  _registerEvents (plugin) {

  }

  register (plugin) {
    plugins.set(plugin.name, plugin);
    this._registerCommands(plugin);
    this._registerEvents(plugin);
  }

  setWindow (window) {
    this.window = window;
  }
}

module.exports = new Proxy();