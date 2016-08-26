const debug = require('debug')('dotbc-desktop-plugin-capability-search');
const {ipcMain} = require('electron');
const util = require('util');

const COMMANDS = ['search', 'getDetails'];

module.exports.enable = (plugin, window) => {
  
  debug(`enabling '${plugin.name}' plugin for 'search'`);

  window.send('plugin:enable', plugin);

  window.on('application:refresh', () => {

    debug(`refreshing plugin '${plugin.name}' for 'search'`);

    window.send('plugin:enable', plugin);

  });

  if (plugin.capabilities.search && plugin.capabilities.search.commands && plugin.capabilities.search.commands.length) {
    
    plugin.capabilities.search.commands.forEach((command) => {

      if (COMMANDS.indexOf(command) === -1) return;

      const eventType = `plugin:${plugin.name}:command:${command}`;

      ipcMain.on(eventType, (event, args) => {

        debug(`sending ${eventType} command with args ${util.inspect(args)}`);

        var [ignore, pluginName, ignored, command] = eventType.split(':');

        if (plugin.name !== pluginName) return;

        var timeout;

        function receive (args) {
          clearTimeout(timeout);
          window.send(`plugin:${plugin.name}:command:${command}`, args);
        }

        plugin.once(`command:${command}`, receive);

        timeout = setTimeout(() => {
          // remove listener to avoid leaks in case of errors
          plugin.removeListener(`command:${command}`, receive);
        }, 15000);

        plugin.sendCommand(command, args);

      });

    });

  }

}