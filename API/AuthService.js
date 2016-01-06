var digestAuthRequest = require('./digestAuthRequest');
var ConfigStore = require('../Stores/ConfigStore');
var AuthActions = require('../Actions/AuthActions');

var AuthService = (function() {
  return {
    requestForToken : function() {

      var configInfo = ConfigStore.getAll();
      if (!configInfo.guid || !configInfo.host || !configInfo.username || !configInfo.password) {
        console.log("!!!!! Insufficient information for authentication !!!!!");
        console.log(JSON.stringify(configInfo));
      }

      var uri = '/auth/login?posGuid=' + configInfo.guid;
      var url = configInfo.host + uri;
      var req = new digestAuthRequest('GET', url, uri, configInfo.username, configInfo.password);

      return new Promise(function(resolve, reject){
        req.request(function(data) {
            console.log('AuthService: Data retrieved successfully');
            console.log(data);
            AuthActions.tokenUpdated(data);
            console.log('Above is the retrieved');
            resolve(data);
        },function(errorCode) {
            console.log('no dice: '+errorCode);
        }, {});
      });
    }
  };
})();

module.exports = AuthService;
