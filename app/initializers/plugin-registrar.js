
import Ember from 'ember';

import Plugins from '../services/plugins';

export default {
  name: 'plugins',
  initialize: function (app) {
    app.register( 'plugins:main', Plugins, { singleton: true } );
  }
};
