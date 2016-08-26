const path = require('path');

module.exports = {
  // we can override this env var to place our PLUGINs in a desired user directory on mac, windows, etc.
  DOTBC_PLUGIN_DIR: process.env.DOTBC_PLUGIN_DIR 
                        || path.join(process.cwd(), '.plugins'),
  DOTBC_PLUGIN_MANAGER_CMD: process.env.DOTBC_PLUGIN_MANAGER_CMD 
                        || path.join(process.cwd(), 'node_modules', 'dotbc-plugin-manager', 'bin', 'dotbc-plugin-manager-run')                        

}