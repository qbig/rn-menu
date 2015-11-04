// Sent Orders --> Bill
// Unsent Orders --> Orders

// Menu info, categories, items

var alt = require('../alt')
var OrderActions = require('../Actions/OrderActions');

class OrdersStore {
  constructor() {
    this.bindListeners({
      handleOrderUpdate: OrderActions.orderUpdated,
      handleOrderCreate: OrderActions.orderCreated
    });
    this.orders = [];
    this.details = '';
  }

  handleOrderUpdate(data) {
    // [{
    //            "product_uuid":167,
    //            "qty": 1,
    //            "modifiers":[{
    //                "uuid":
    //                  "type_of_hor_fun_/_noodle",
    //                  "selected_radio_option_name":"河粉汤 Hor Fun Soup"
    //              },
    //              {
    //                  "uuid": "takeaway",
    //                     "is_selected": true
    //              },
    //              {
    //                  "uuid":"add_hor_fun",
    //                  "is_selected": true
    //              },
    //              {
    //                  "uuid":"add_noodles",
    //                  "is_selected": true
    //              },
    //              {
    //                  "uuid":"add_veg",
    //                  "is_selected": true
    //              },
    //              {
    //                  "uuid":"add_meat_($2)",
    //                  "is_selected": true
    //              },
    //              {
    //                  "uuid":"soup_separate",
    //                  "is_selected": true
    //              },
    //              {
    //                  "uuid":"sauce_separate",
    //                  "is_selected": true
    //              }
    //            ]
    // }]
    console.log("OrdersStore : handleOrderUpdate updated")
    console.log(data);
  }

  handleOrderCreate(data) {
    // {
    //   "order_items": [],
    //   "uuid": "151104YCY0000292",
    //   "staff_id": 29,
    //   "pax": 1,
    //   "type": "eat-in",
    //   "state": "opened",
    //   "subtotal_adj_amt": 0,
    //   "subtotal_adj_type": "value",
    //   "subtotal_adj_entry_type": "discount",
    //   "notes": null,
    //   "updatedAt": "2015-11-04T06:03:57.000Z",
    //   "adjustments": null,
    //   "queue_num": null,
    //   "createdAt": "2015-11-04T06:03:57.000Z",
    //   "table_id": null
    // }
    this.details = data;
    console.log("OrdersStore : handleOrderCreate");
    console.log(this.details);
  }
}

module.exports = alt.createStore(OrdersStore, 'OrdersStore');
