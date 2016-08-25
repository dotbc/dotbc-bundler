const path = require('path');

module.exports = {
  // we can override this env var to place our PLUGINs in a desired user directory on mac, windows, etc.
  CARDSTACK_PLUGIN_DIR: process.env.CARDSTACK_PLUGIN_DIR 
                        || path.join(process.cwd(), '.plugins'),
  CARDSTACK_PLUGIN_MANAGER_CMD: process.env.CARDSTACK_PLUGIN_DIR 
                        || path.join(process.cwd(), 'node_modules', 'cardstack-plugin-manager', 'bin', 'cardstack-plugin-manager-run')                        

}