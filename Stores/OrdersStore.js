// Sent Orders --> Bill
// Unsent Orders --> Orders

// Menu info, categories, items

var alt = require('../alt')
var OrderActions = require('../Actions/OrderActions');
var GroupsItemsStore = require('./GroupsItemsStore');
class OrdersStore {
  constructor() {
    this.bindListeners({
      handleOrderUpdate: OrderActions.orderUpdated,
      handleOrderCreate: OrderActions.orderCreated
    });
    this.orders = [];
    this.details = '';
    this.currentItem = '';
    this.exportPublicMethods({
      getOrderCount: this.getOrderCount,
      getOrderSum: this.getOrderSum
    });
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
/*    this.details = {
    "order_items": [
        {
            "id": 31,
            "product_uuid": 167,
            "qty": 1,
            "subtotal": 980,
            "item_subtotal": 980,
            "item_adjustment": 0,
            "adjustment": 0,
            "item_adj_amt": 0,
            "item_adj_type": "value",
            "item_adj_entry_type": "discount",
            "modifiers": [
                {
                    "uuid": "type_of_hor_fun_/_noodle",
                    "selected_radio_option_name": "河粉汤 Hor Fun Soup",
                    "price": 0
                },
                {
                    "uuid": "takeaway",
                    "is_selected": true,
                    "price": 0
                },
                {
                    "uuid": "add_hor_fun",
                    "is_selected": true,
                    "price": 100
                },
                {
                    "uuid": "add_noodles",
                    "is_selected": true,
                    "price": 100
                },
                {
                    "uuid": "add_veg",
                    "is_selected": true,
                    "price": 100
                },
                {
                    "uuid": "add_meat_($2)",
                    "is_selected": true,
                    "price": 200
                },
                {
                    "uuid": "soup_separate",
                    "is_selected": true,
                    "price": 0
                },
                {
                    "uuid": "sauce_separate",
                    "is_selected": true,
                    "price": 0
                }
            ],
            "notes": null,
            "status": "placed",
            "updatedAt": "2015-11-04T04:14:54.000Z",
            "createdAt": "2015-11-04T04:14:54.000Z",
            "unit_gram_amount": 0,
            "staff_id": 29,
            "deletedAt": null,
            "adjustments": []
        }
    ],
    "uuid": "151022YCY0000006",
    "staff_id": 29,
    "pax": 1,
    "type": "eat-in",
    "state": "parked",
    "subtotal_adj_amt": 0,
    "subtotal_adj_type": "value",
    "subtotal_adj_entry_type": "discount",
    "notes": null,
    "updatedAt": "2015-11-04T04:14:05.000Z",
    "adjustments": [],
    "queue_num": null,
    "createdAt": "2015-10-22T16:25:16.000Z"
}; */
    console.log("OrdersStore : handleOrderCreate");
    console.log(this.details);
  }

  getOrderCount(){
    if (this.getState().details) {
        return this.getState().details['order_items'].length;
    } else {
      return 0;
    }
  }

  getOrderSum() {
    if (this.getState().details) {
        return Number(this.getState().details['order_items'].reduce((prev, cur, index, arr)=>{
          return prev + GroupsItemsStore.getProdPrice(cur['product_uuid']) + cur['modifiers'].reduce((pre, cur)=>{return pre + cur.price}, 0)
        }, 0) / 100.0).toFixed(2);
    } else {
      return 0;
    }
  }
}

module.exports = alt.createStore(OrdersStore, 'OrdersStore');
