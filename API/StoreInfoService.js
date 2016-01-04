var getRequest = require('./getRequest');
var SystemActions = require('../Actions/SystemActions');
var Log = require('../Lib/Log')
var StoreInfoService = (function() {
    return {
      requestForStoreInfo : function() {
        getRequest('/storeinfo')
          .then(function(resJson) {
            SystemActions.storeInfoLoaded(resJson);
            console.log("StoreInfoService :StoreInfoService: done !!!")
          }).catch(function(e){
            Log.logMessage(JSON.stringify(e));
            console.log(e);
          });
      }
    };
})();

module.exports = StoreInfoService;
