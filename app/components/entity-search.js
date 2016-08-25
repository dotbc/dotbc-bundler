import Ember from 'ember';

const $ = Ember.$;

export default Ember.Component.extend({
  pluginSearchService: Ember.inject.service('plugin-search'),
  searchResults: [],
  selectedResult: null,
  showSearch: false,
  dontLoseFocus: false,
  selectedSearchProvider: null,
  debounceContext: { name: 'debounce' },
  query: '',
  noMoreSelectionsAllowed: Ember.computed('attrValue', function() {
    return this.get('attr.attribute.allowMultiple') === false && this.get('attrValue.length') > 0;
  }),
  noSearchResults: Ember.computed('showSearch', 'searchResults', 'dontLoseFocus', 'query', function() {
    return this.get('showSearch') && this.get('searchResults').length === 0 && this.get('query').length > 0;
  }),
  pluginsForEntityType: Ember.computed('pluginSearchService.plugins', 'attr.attribute', function() {
    return this.get('pluginSearchService').getPluginsForEntityType(this.get('attr.attribute.type'));
  }),
  searchPlugins: function(pluginSearchService, self, propertyType, value){
    self.get('selectedSearchProvider').search(propertyType, value).then(function(results){
      results = _.flatten(results);
      var propertyName = self.get('attr.attribute.propertyName');
      var input = $('#cs-editor-' + propertyName);
      if (input.val().length > 0) {
        self.set('showSearch', true);
        self.set('searchResults', results);
        self.set('selectedResult', results[0]);
      }
    });
  },
  clearSearchResults: function(self){
    self.set('searchResults', []);
    self.set('selectedResult', null);
    var propertyName = self.get('attr.attribute.propertyName');
    var input = $('#cs-editor-' + propertyName);
    input.focus();
    input.val('');
  },

  init() {
    this._super(...arguments);
    var propertyName = this.get('attr.attribute.propertyName');
    Ember.defineProperty(this, 'attrValue', Ember.computed.alias('work.metadata.' + propertyName));
    // TODO: guard this against having no plugins that support a property type
    this.set('selectedSearchProvider', this.get('pluginsForEntityType.firstObject'));
  },

  actions: {
    focusIn() {
      var propertyName = this.get('attr.attribute.propertyName');
      var input = $('#cs-editor-' + propertyName);

      if(input.val().length > 0){
        this.set('showSearch', true);
      }
    },
    focusOut() {
      var self = this;
      this.set('dontLoseFocus', false);

      //running later in case resultclick needs to be called
      Ember.run.later(function(){
        self.set('showSearch', false);
        self.set('dontLoseFocus', false);
      }, 250);
    },
    removeEntity(index) {
      var propertyName = this.get('attr.attribute.propertyName');
      var value = this.get('work.metadata.' + propertyName);
      if(index < value.length){
        value.splice(index, 1);
        this.set('work.metadata.' + propertyName, value);
        this.notifyPropertyChange('work.metadata.' + propertyName);
      }
    },
    resultMouseEnter(result){
      this.set('selectedResult', result);
    },
    resultClick(result){
      var propertyName = this.get('attr.attribute.propertyName');
      var value = this.get('work.metadata.' + propertyName) || [];

      var newValue = null;
      if (!result) {
        newValue = {
          name: this.get('query'),
          type: this.get('attr.attribute.type')
        };
      } else {
        newValue = {
          name: result.name,
          href: result.href || result.link,
          artist: result.artist, // TODO: make it so that this isn't saved for non-work field types
          'humanhref': result.human_href || result.humanhref || result.href || result.link,
          pluginsearchimage: result.plugin.searchImageUrl, // TODO: make this not saved
          type: this.get('attr.attribute.type')
        };
      }

      value.push(newValue);
      this.set('work.metadata.' + propertyName, value);
      this.notifyPropertyChange('work.metadata.' + propertyName);

      this.set('dontLoseFocus', true);
      this.set('showSearch', false);
      this.get('clearSearchResults')(this);
    },
    keyPress() {
      var propertyName = this.get('attr.attribute.propertyName');
      var propertyType = this.get('attr.attribute.type');
      var input = $('#cs-editor-' + propertyName);
      var value = input.val();
      this.set('query', value);
      if(value.length == 0){
        this.get('clearSearchResults')(this);
        return;
      }

      var pluginSearchService = this.get('pluginSearchService');
      var searchFunction = this.get('searchPlugins');
      Ember.run.debounce(this.get('debounceContext'), searchFunction, pluginSearchService, this, propertyType, value, 300);
    },
    entityProviderClick(plugin) {
      this.set('selectedSearchProvider', plugin);
      this.set('dontLoseFocus', true);
      this.get('actions.keyPress').bind(this)();
      var propertyName = this.get('attr.attribute.propertyName');
      var input = $('#cs-editor-' + propertyName);
      input.focus();
    }
  }
});
