var getRequest = require('./getRequest');
var ProdAttributeActions = require('../Actions/ProdAttributeActions');

var ProdAttributeService = (function() {
  return {
    requestForProdAttribute : function() {
      getRequest('/product_attribute')
        .then(function(resJson) {
          ProdAttributeActions.prodAttributeLoaded(resJson);
          console.log("ProdAttributeService: done !!!")
        }).catch(function(e){
          console.log(e);
        });
    }
  };
})();

module.exports = ProdAttributeService;
