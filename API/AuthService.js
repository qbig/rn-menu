var digestAuthRequest = require('./digestAuthRequest');
var ConfigStore = require('../Stores/ConfigStore');
var AuthActions = require('../Actions/AuthActions');

var configInfo = ConfigStore.getAll();
if (!configInfo.guid || !configInfo.host) {
  console.log("!!!!! Insufficient information for authentication !!!!!");
  console.log(JSON.stringify(configInfo));
}

var uri = '/auth/login?posGuid=' + configInfo.guid;
var url = configInfo.host + uri;
var req = new digestAuthRequest('GET', url, uri, '7737', '7737');

function requestForToken() {
  req.request(function(data) {
      console.log('Data retrieved successfully');
      console.log(data);
      AuthActions.tokenUpdated(data);
      console.log('Above is the retrieved');
  },function(errorCode) {
      console.log('no dice: '+errorCode);
  }, {});
}

module.exports = requestForToken;
