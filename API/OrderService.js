var getRequest = require('./getRequest');
var OrderActions = require('../Actions/OrderActions');
var OrdersStore = require('../Stores/OrdersStore');
var ConfigStore = require('../Stores/ConfigStore');
var ORDER_URI = '/order/';
var ITEM_URI = '/item';
var OrderService = (function() {
  return {
    requestForCurrentOrder : function() {
      return getRequest(ORDER_URI + OrdersStore.getState().details.uuid)
        .then(function(resJson) {
          OrderActions.orderUpdated(resJson);
          console.log("OrderService: requestForCurrentOrder done !!!")
        }).catch(function(e){
          console.log(e);
        });
    },

    createNewEmptyOrder : ()=>{
      return getRequest(ORDER_URI, 'POST', {"pax":1, "type": "eat-in", "table_id":ConfigStore.getState().tableId})
        .then(function(resJson) {
          OrderActions.orderCreated(resJson);
          console.log("OrderService: createNewOrder done !!!")
        }).catch(function(e){
          console.log(e);
        });
    },

    updateCurrentOrder : ()=>{
      var orderInfo = OrdersStore.getState();
      var orderJsonArr = orderInfo.unsentItems.map(function(item){
        return item.getJSON();
      });
/*      var orderInfo = [{
                   "product_uuid":167,
                   "qty": 1,
                   "modifiers":[{
                       "uuid":
                         "type_of_hor_fun_/_noodle",
                         "selected_radio_option_name":"河粉汤 Hor Fun Soup"
                     },
                     {
                         "uuid": "takeaway",
                            "is_selected": true
                     },
                     {
                         "uuid":"add_hor_fun",
                         "is_selected": true
                     },
                     {
                         "uuid":"add_noodles",
                         "is_selected": true
                     },
                     {
                         "uuid":"add_veg",
                         "is_selected": true
                     },
                     {
                         "uuid":"add_meat_($2)",
                         "is_selected": true
                     },
                     {
                         "uuid":"soup_separate",
                         "is_selected": true
                     },
                     {
                         "uuid":"sauce_separate",
                         "is_selected": true
                     }
                   ]
        }];
*/
      return getRequest(ORDER_URI + orderInfo.details.uuid + ITEM_URI, 'POST', orderJsonArr)
        .then(function(resJson) {
          OrderActions.orderUpdated(resJson);
          console.log("OrderService: updateCurrentOrder done !!!")
        }).catch(function(e){
          console.log(e);
        });

    }
  };

})();


module.exports = OrderService;
