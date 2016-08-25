const extend = require('extend');
const Plugin = require('./plugin');
const fs = require('fs');
const constants = require('../../config/constants');
const path = require('path');
const spawn = require('child_process').spawn;
const util = require('util');

const EXPECTED_MAIN_FILE_NAME = 'index.js';

module.exports = function (dir, cb) {

  const filename = path.join(constants.CARDSTACK_PLUGIN_DIR, dir, EXPECTED_MAIN_FILE_NAME);

  // ensure expected main file exists
  fs.exists(filename, (exists) => {

    if ( ! exists) return cb(new Error(util.format(`no main file found in plugin ${filename}.`)));

    const env = extend(process.env, { 
      // params: JSON.stringify(params), // serialize any startup params we might want to send to all plugins
    });

    // plugins are loaded via the cardstack plugin manager utility, which provides a shim
    // and sets up our IPC communications channel
    const childProcess = spawn(constants.CARDSTACK_PLUGIN_MANAGER_CMD, [filename], {
      cwd: path.join(constants.CARDSTACK_PLUGIN_DIR, dir),
      NODE_PATH: path.join(constants.CARDSTACK_PLUGIN_DIR, dir, 'node_modules'),
      env,
      stdio: [process.stdin, process.stdout, process.stderr, 'ipc']
    });

    return cb(null, new Plugin(childProcess));

  });

};
