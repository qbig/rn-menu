var getRequest = require('./getRequest');
var OrderActions = require('../Actions/OrderActions');
var OrdersStore = require('../Stores/OrdersStore');

var OrderService = (function() {
  return {
      requestForCurrentOrder : function() {
      getRequest('/order/' + OrdersStore.getState().orderId)
        .then(function(resJson) {
          OrderActions.orderUpdated(resJson);
          console.log("OrderService: done !!!")
        }).catch(function(e){
          console.log(e);
        });
    }
  };
})();


module.exports = OrderService;
