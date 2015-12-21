var getRequest = require('./getRequest');
var ProdAttributeActions = require('../Actions/ProdAttributeActions');
var Log = require('../Lib/Log')
var ProdAttributeService = (function() {
  return {
    requestForProdAttribute : function() {
      getRequest('/product_attribute')
        .then(function(resJson) {
          ProdAttributeActions.prodAttributeLoaded(resJson);
          console.log("ProdAttributeService: done !!!")
        }).catch(function(e){
          Log.logMessage(e);
          console.log(e);
        });
    }
  };
})();

module.exports = ProdAttributeService;


/*
[
  {
    "id": 1,
    "product_uuid": 1,
    "sold_out": true,
    "comments": "Chickens ran out of coop"
  },
  {
    "id": 2,
    "product_uuid": 2,
    "sold_out": true,
    "comments": "Ducks died"
  }
]
*/
