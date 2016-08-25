import Ember from 'ember';

export default Ember.Controller.extend({

  authManager: Ember.inject.service('auth'),

  username: "",
  password: "",
  errormessage: "",

  actions: {
    login() {
      var username = this.get("username");
      var password = this.get("password");
      var auth = this.get('authManager');
      var self = this;
      auth.login(username, password)
        .then(function(authData) {
          return auth.storeCredentials(authData);
        })
        .then(function(){
        self.send('loginSuccess');
      })
      .catch(function(){
        self.set('errormessage', "Username or Password was Invalid");
      });
    }
  }
});
