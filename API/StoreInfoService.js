var getRequest = require('./getRequest');
var SystemActions = require('../Actions/SystemActions');
var Log = require('../Lib/Log')
var StoreInfoService = (function() {
    return {
      requestForStoreInfo : function() {
        return getRequest('/storeinfo')
          .then(function(resJson) {
            SystemActions.storeInfoLoaded(resJson);
            return resJson;
          }).catch(function(e){
            Log.logMessage(JSON.stringify(e));
            console.log(e);
          });
      }
    };
})();

module.exports = StoreInfoService;
