const {EventEmitter} = requireNode('events');
const extend = requireNode('extend');

class Plugin extends EventEmitter {
  constructor (json) {
    super();
    extend(this, json);
  }
}

/**
 * Static function to determine if plugin specification notes a capability type is supported.
 *
 * @param  {Object} json  plugin specification from package.json.
 * @param  {String} type  plugin capability type [search, etc].
 * @param  {String} command  command name.
 */
Plugin.supportsCapability = function (json, type) {
  return json && json.capabilities && json.capabilities[type];
}

/**
 * Static function to determine if plugin specification notes a command is supported.
 *
 * @param  {Object} json  plugin specification from package.json.
 * @param  {String} type  plugin capability type [search, etc].
 * @param  {String} command  command name.
 */
Plugin.supportsCommand = function (json, type, command) {
  return json && json.capabilities && json.capabilities[type] && json.capabilities[type].commands && json.capabilities[type].commands.indexOf(command) > -1;
}

export default Plugin;