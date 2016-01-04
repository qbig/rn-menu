var getRequest = require('./getRequest');
var ModifierActions = require('../Actions/ModifierActions');
var Log = require('../Lib/Log');
var ModifierService = (function() {
    return {
      requestForModifiers : function() {
        getRequest('/provisioning/product/modifiers')
          .then(function(resJson) {
            ModifierActions.modifiersUpdated(resJson);
            console.log("ModifierService :requestForModifiers: done !!!")
          }).catch(function(e){
            Log.logMessage(JSON.stringify(e));
            console.log(e);
          });
      }
    };
})();

module.exports = ModifierService;
