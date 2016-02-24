var ConfigStore = require('../Stores/ConfigStore');
var EnvStore = require('../Stores/EnvStore');
var Log = require('../Lib/Log');

function checkStatus(response) {
  if (! (response.status >= 200 && response.status < 300) ) {
    response.failed = true;
  }
  return response
}

function parseJSON(response) {
  return response.json()
}

function getRequest(uri, method, data) {
  var configInfo = ConfigStore.getAll();
  if (!configInfo.guid || !configInfo.host) {
    console.log("!!!!! Insufficient information for authentication !!!!!");
    console.log(JSON.stringify(configInfo));
  }

  var envInfo = EnvStore.getAll();
  if (!configInfo.guid || !configInfo.host || !envInfo.token || !envInfo.lastSync) {
    console.log("!!!!! Insufficient information for authentication !!!!!");
    console.log(JSON.stringify(envInfo));
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

  if (method) {
    authInfo.method = method;
  }
  if (data) {
    authInfo.body = JSON.stringify(data)
    console.log("getRequest->request body:" + authInfo.body);
  }
  console.log('configInfo:' + JSON.stringify(configInfo));
  console.log('uri:' + uri);
  console.log('token:' + envInfo.token);
  console.log('lastSync:' + envInfo.lastSync);
  console.log('configInfo.host:' + configInfo.host);
  console.log('getRequest:' + configInfo.host + uri);
  return fetch(configInfo.host + uri, authInfo)
    .then(checkStatus)
    .then(parseJSON)
    .catch(function(e){
      Log.logMessage(JSON.stringify(e));
      console.log(e);
      throw e;
    });
}

module.exports = getRequest;
