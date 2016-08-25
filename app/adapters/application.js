import DS from 'ember-data';
import Ember from 'ember';
import XHR from 'ember-xhr';

const computed = Ember.computed;

export var adapterConfig = {
  host: 'https://staging-api.monegraph.com',
  namespace: 'v4',
  getS3UploadEndpoint(contentType) {
    const apiUrl = this.buildURL('authentication/s3').replace(/s$/,'');
    return this.ajax(apiUrl, 'POST', {
      data: {
        'entity-id': this.get('authService.entityId'),
        'content-type': contentType
      }
    }).then((response) => {
      return response.data;
    });
  },
  uploadFile(uploadUrl, file) {
    var xhr = XHR.create();
    xhr.open('PUT', uploadUrl, true);
    xhr.send(file);
    this.set('xhr', xhr);
    return xhr;
  },
  login(username, password) {
    const apiUrl = this.buildURL('tokens');
    return this.ajax(apiUrl, 'POST', {
      data: {
        username: username,
        password: password,
        grant_type: "password"
      }
    });
  },
  authService: Ember.inject.service('auth'),
  sessionToken: computed.readOnly('authService.sessionToken'),
  headers: computed('sessionToken', function() {
    const headers = {};
    const token = this.get('sessionToken');
    if(token){
      headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
  })
};

export default DS.JSONAPIAdapter.extend(adapterConfig);
