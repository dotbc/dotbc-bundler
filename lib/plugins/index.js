'use strict';

const constants = require('../../config/constants');
const debug = require('debug')('cardstack-desktop-plugin')
const events = require('events');
const EventEmitter = events.EventEmitter;
const fs = require('fs');
const loadPlugin = require('./loadPlugin');
const mkdirp = require('mkdirp');
const path = require('path');
const proxy = require('./proxy');

/*
  The PluginManager is responsible for loading all existing plugin at startup, and listening for new ones
  at runtime. When a new plugin is recognized, it is loaded using a shim that allows the cardstack-desktop
  process to communicate with the plugin via IPC. Having plugin run in a separate process keeps cardstack-
  desktop safe from bugs in plugin which may cause them to crash, and keeps our app running smoothly in the 
  event that they do.
*/
class PluginManager extends EventEmitter {

  constructor () {
    super();
  }

  _ensurePluginDirectoryExists () {
    fs.exists(constants.CARDSTACK_PLUGIN_DIR, (exists) => {
      if ( ! exists) {
        mkdirp(constants.CARDSTACK_PLUGIN_DIR, (err) => {
          if (err) return this.emit('error', err);
        });
      }
    });
  }

  _loadPlugin (pluginPath) {
    let name = path.basename(pluginPath);
    
    debug(`loading plugin ${name}`);
    
    loadPlugin(pluginPath, (err, plugin) => {
      if (err) {
        return this.emit('failed', {
          plugin,
          error: err
        });
      }

      plugin.on('exit', () => {

      });
      
      plugin.on('error', () => {

      });
      
      plugin.on('activated', (plugin) => {
        proxy.register(plugin);
      });

      // this.emit('loaded', plugin);
    });
  }

  _loadAllPlugins () {
    var dirs;
    try {
      dirs = fs.readdirSync(constants.CARDSTACK_PLUGIN_DIR)
      .filter((d) => fs.statSync(path.join(constants.CARDSTACK_PLUGIN_DIR, d)).isDirectory());
    } catch (err) {
      return this.emit('error', err);
    }
    
    debug(`loading plugins [${dirs}]`);
      
    dirs.forEach(this._loadPlugin.bind(this));
  }

  load (mainWindow) {
    proxy.setWindow(mainWindow);
    this._ensurePluginDirectoryExists();
    this._loadAllPlugins();
  }
}

module.exports = new PluginManager();
