var ConfigStore = require('../Stores/ConfigStore');
var EnvStore = require('../Stores/EnvStore');
var GroupsItemsActions = require('../Actions/GroupsItemsActions');
var AuthActions = require('../Actions/AuthActions');
var Log = require('../Lib/Log')
var GroupsItemsService = (function() {
  return {
    requestForGroupsItems : function() {
      var configInfo = ConfigStore.getAll();
      if (!configInfo.guid || !configInfo.host) {
        console.log("!!!!! Insufficient information for authentication !!!!!");
        console.log(JSON.stringify(configInfo));
      }

      var envInfo = EnvStore.getAll();
      if (!configInfo.guid || !configInfo.host || !envInfo.token) {
        console.log("!!!!! Insufficient information for authentication !!!!!");
        console.log(JSON.stringify(configInfo));
      }

      //'X-Last-Synced': '',
      var authInfo = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Web-Token': envInfo.token
        }
      };

      return fetch(configInfo.host + '/provisioning/product/groups', authInfo)
        .then(function(res) {
          AuthActions.lastSyncUpdated(res.headers.get("Last-Modified"));
          console.log(res)
          return res.json();
        })
        .then(function(resJson) {
          console.log("GroupsItemsService: resJson:!!!")
          GroupsItemsActions.groupsItemsUpdated(resJson);
          console.log("resJson: done !!!")
        }).catch(function(e){
          Log.logMessage(e);
          console.log(e);
        });
    }
  };
})();


module.exports = GroupsItemsService;
