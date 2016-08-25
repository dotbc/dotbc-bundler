const events = require('events');
const EventEmitter = events.EventEmitter;
const merge = require('merge');

class PluginError extends Error {

  constructor (err) {
    super(err.message);
    this.name = this.constructor.name;
    this.message = err.message; 
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = err.stack; 
    }
  }

}

class Plugin extends EventEmitter {

  constructor (process) {

    super();

    this.process = process;

    this.process.on('exit', this._exited.bind(this));

    this.process.on('error', this._errored.bind(this));

    this.process.on('message', this._messaged.bind(this));

    this.process.send({ type: 'command', name: 'load' });
  }

  _errored (err) {
    console.error(`error running plugin ${this.name}`);
    console.error(err);
    if (err.message === 'spawn EACCES') {
      console.error('your child this.process appears to not be executable. try running \'chmod +x [your-file-path]\' and trying again');
    }
    setTimeout(() => {
      // sending sigkill to avoid any plugins turning to zombied processes
      // this.process.kill('SIGKILL');
    }, 500);
  }

  _exited () {
    console.log(`plugin ${this.name} has exited`);
    this.emit('exited', this);
  }

  _messaged (msg) {

    const type = msg.type;

    // development helper
    if ( ! type) this.emit('error', new Error('messages from tasks must contain a type property'));

    if (type === 'event') {
      this._processEvent(msg.name, msg.params);
    } else if (type === 'command') {
      this._processCommand(msg.name, msg.params);
    } else {
      this.emit('error', new Error(`no supported message type of name ${type}`));
    }
  
  }

  _processCommand (name, params) {

    var [ignore, plugin, ignored, command] = name.split(':');

    this.emit(`command:${command}`, params);

  }

  _processEvent (name, params) {
    
    if (name === 'connected') { 
      merge(this, params);
      this.emit('connected', this);
    } else if (name === 'activated') {
      // fired when plugin has loaded and completed activation / startup logic
      merge(this, params);
      this.emit('activated', this);
    } else if (name === 'deactivated') {
      this.emit('deactivated', this)
    } else if (name === 'error') {
      this.emit('error', new PluginError(params.error));
    } else {
      this.emit(`event:${name}`, params);
    }
  }

  sendCommand (type, params) {
    this.process.send({ type: 'command', name: type, params: params });
  }

  sendEvent (type, params) {
    this.process.send({ type: 'event', name: type, params: params });
  }
    

}

module.exports = Plugin;
