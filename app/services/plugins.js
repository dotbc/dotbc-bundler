import Ember from 'ember';
import Plugin from '../lib/plugins/plugin';
import search from '../lib/plugins/decorators/search';
const $ = Ember.$;

const {ipcRenderer} = requireNode('electron');

var plugins = new Map();

const factories = {
  'search': search
}

const capabilities = ['search'];

ipcRenderer.on('plugin:enable', (event, json) => {

  console.log(`PLUGIN REGISTRAR '${json.name}' plugin enabled with [${Object.keys(json.capabilities)}] capabilities`);

  var plugin = new Plugin(json);

  _.forEach(capabilities, (capability) => {

    factories[capability].apply(plugin);

    plugins.set(plugin.name, plugin);

  });

});

export default Ember.Service.extend({
  name: 'plugin-service',
  description: 'acts as a registry for plugins.',
  plugins: plugins,
  all: function () {
    return Array.from(this.plugins.values())
  },
  getPlugin: function(name) {
    return this.plugins.get(name);
  },
  setPlugin: function (plugin) {
    this.plugins.set(plugin.name, plugin);
  }
});
