// Sent Orders --> Bill
// Unsent Orders --> Orders

// Menu info, categories, items

var alt = require('../alt')
var OrderActions = require('../Actions/OrderActions');

class OrdersStore {
  constructor() {
    this.bindListeners({
      handleOrderUpdate: OrderActions.orderUpdated
    });
    this.orders = [];
    this.orderId = '';
  }

  handleOrderUpdate(data) {
    console.log("OrdersStore : handleOrderUpdate updated")
    console.log(data);
  }
}

module.exports = alt.createStore(OrdersStore, 'OrdersStore');
