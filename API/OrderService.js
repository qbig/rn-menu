var getRequest = require('./getRequest');
var OrderActions = require('../Actions/OrderActions');
var OrdersStore = require('../Stores/OrdersStore');
var ConfigStore = require('../Stores/ConfigStore');
var TablesStore = require('../Stores/TablesStore');
var TableService = require('./TableService');
var ORDER_URI = '/order/';
var ITEM_URI = '/item';
var OrderService = (function() {
  function requestForCurrentOrder () {
    return TableService.requestForTables()
    .then(()=>{
      var currentOrderId = TablesStore.getCurrentOrderID();
      console.log("about to fetch existing order : " + currentOrderId)
      if (currentOrderId == undefined || currentOrderId == -1) {
        return Promise.reject("Unaware of uuid of existing order");
      }
      return getRequest(ORDER_URI + currentOrderId)
    })
    .then(function(resJson) {
      OrderActions.orderCreated(resJson);
      console.log("OrderService: requestForCurrentOrder done !!!")
    }).catch(function(e){
      console.log(e);
      throw e;
    });
  }

  function createNewEmptyOrder () {
    return getRequest(ORDER_URI, 'POST', {"pax":1, "type": "eat-in", "table_id":ConfigStore.getState().tableId})
    .then(function(resJson) {
      console.log(resJson)
      if (resJson['error']) {
        return requestForCurrentOrder();
      } else {
        OrderActions.orderCreated(resJson);
        console.log("OrderService: createNewOrder done !!!")
        return Promise.resolve(resJson);
      }
    }).catch(function(e){
      console.log(e);
    });
  }

  function updateCurrentOrder() {
    var orderInfo = OrdersStore.getState();
    var orderJsonArr = orderInfo.unsentItems.map(function(item){
      return item.getJSON();
    });

    return getRequest(ORDER_URI + orderInfo.details.uuid + ITEM_URI, 'POST', orderJsonArr)
    .then(function(resJson) {
      OrderActions.orderUpdated(resJson);
      console.log("OrderService: updateCurrentOrder done !!!")
    }).catch(function(e){
      console.log(e);
    });
  }

  function verifySentOrder() {
    var orderInfo = OrdersStore.getState();
    var orderJsonArr = orderInfo.sentItems
    .filter(function(item){
      return item.sent == false;
    })
    .map(function(item){
      return item.getJSON();
    });
    if (orderJsonArr.length > 0) {
      return getRequest(ORDER_URI + orderInfo.details.uuid + ITEM_URI, 'POST', orderJsonArr)
      .then(function(resJson) {
        orderJsonArr.forEach(function(item){
          item.sent = true;
        })
        OrderActions.orderUpdated(resJson);
        console.log("OrderService: updateCurrentOrder done !!!")
      }).catch(function(e){
        console.log(e);
      });
    } else {
      return Promise.resolve();
    }

  }

  return {
    requestForCurrentOrder : requestForCurrentOrder,
    createNewEmptyOrder : createNewEmptyOrder,
    updateCurrentOrder : updateCurrentOrder,
    verifySentOrder : verifySentOrder
  };

})();


module.exports = OrderService;
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
