var ConfigStore = require('../Stores/ConfigStore');
var EnvStore = require('../Stores/EnvStore');

var configInfo = ConfigStore.getAll();
if (!configInfo.guid || !configInfo.host) {
  console.log("!!!!! Insufficient information for authentication !!!!!");
  console.log(JSON.stringify(configInfo));
}

var envInfo = EnvStore.getAll();
if (!configInfo.guid || !configInfo.host || !envInfo.token || !envInfo.lastSync) {
  console.log("!!!!! Insufficient information for authentication !!!!!");
  console.log(JSON.stringify(configInfo));
}

var authInfo = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Web-Token': envInfo.token,
    'X-Last-Synced': envInfo.lastSync
  }
};

var response;
function getRequest(uri, method, data) {
  if (method) {
    authInfo.method = method;
  }
  if (data) {
    authInfo.body = JSON.stringify(data)
    console.log(authInfo.body);
  }
  return fetch(configInfo.host + uri, authInfo)
    .then(function(res) {
      return res.json();
    })
    .catch(function(e){
      console.log(e);
    });
}

module.exports = getRequest;
