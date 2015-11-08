var getRequest = require('./getRequest');
var SystemActions = require('../Actions/SystemActions');

var StoreInfoService = (function() {
    return {
      requestForStoreInfo : function() {
        getRequest('/storeinfo')
          .then(function(resJson) {
            SystemActions.storeInfoLoaded(resJson);
            console.log("StoreInfoService :StoreInfoService: done !!!")
          }).catch(function(e){
            console.log(e);
          });
      }
    };
})();

module.exports = StoreInfoService;
