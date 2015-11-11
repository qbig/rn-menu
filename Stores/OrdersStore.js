// Sent Orders --> Bill
// Unsent Orders --> Orders

// Menu info, categories, items

var alt = require('../alt')
var OrderActions = require('../Actions/OrderActions');
var GroupsItemsStore = require('./GroupsItemsStore');
var OrderItemModel = require('../Models/OrderItem');
var ModifierStore = require('./ModifierStore');

class OrdersStore {
  constructor() {
    this.bindListeners({
      handleOrderUpdate: OrderActions.orderUpdated,
      handleOrderCreate: OrderActions.orderCreated,
      handleOrderDelete: OrderActions.orderClosed,
      handleNewItem: OrderActions.orderItemStarted,
      handleBoolClicked: OrderActions.boolClicked,
      handleRadioClicked: OrderActions.radioClicked,
      handleCurrentItemIncrement: OrderActions.currentOrderItemIncrement,
      handleCurrentItemDecrement: OrderActions.currentOrderItemDecrement,
      handleCurrentItemAdded: OrderActions.orderItemCreated,
      handleSendOrderSuccess: OrderActions.orderUpdated,
      handleUnsentItemIncrement: OrderActions.unsentOrderItemIncrement,
      handleUnsentItemDecrement: OrderActions.unsentOrderItemDecrement,
      handleUnsentItemStartedEdit: OrderActions.orderItemStartedEdit,
      handleUnsentItemCompletedEdit: OrderActions.orderItemCompletedEdit
    });
    this.init();
    this.exportPublicMethods({
      getOrderCount: this.getOrderCount,
      getOrderSum: this.getOrderSum,
      getUnsentOrderSum: this.getUnsentOrderSum
    });
  }

  init(){
    this.sentItems = [];
    this.unsentItems = [];
    this.details = '';
    this.currentItem = '';
  }

  handleOrderDelete(data) {
    if (data['verb'] === 'destroyed' && data['id'] === this.details.uuid) {
      this.init();
    }
  }

  handleUnsentItemCompletedEdit(comment) {
    this.currentItem.comment = comment;
    this.unsentItems[this.currentItem.index] = this.currentItem;
    this.currentItem = '';
  }

  handleUnsentItemStartedEdit(index) {
    this.currentItem = this.unsentItems[index].getClone();
    this.currentItem.index = index; // for later, to replace the original
  }

  handleUnsentItemIncrement(index) {
    this.unsentItems[index].incre();
  }

  handleUnsentItemDecrement(index) {
    if (this.unsentItems[index].quantity > 1) {
      this.unsentItems[index].decre()
    } else {
      this.unsentItems.splice(index, 1)
    }
  }

  handleSendOrderSuccess(successInfo) {
    this.sentItems = this.sentItems.concat(this.unsentItems);
    this.unsentItems = [];
  }

  handleCurrentItemAdded(comment) {
    this.currentItem.comment = comment;
    this.unsentItems.push(this.currentItem);
    this.currentItem = '';
  }

  handleCurrentItemIncrement() {
    this.currentItem.incre();
  }

  handleCurrentItemDecrement() {
    this.currentItem.decre();
  }

  handleBoolClicked({index, name}) {
    this.currentItem.boolMods[index].select(name);
  }

  handleRadioClicked({index, name}) {
    this.currentItem.radioMods[index].select(name);
  }

  handleNewItem(productInfo) {
    this.currentItem = new OrderItemModel(productInfo, ModifierStore.getState().modifiers);
    console.log("new item creation started")
    console.log(this.currentItem);
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
    return this.getState().unsentItems.reduce(function(prev, cur){
      return prev + cur.quantity
    }, 0);
  }

  getOrderSum() {
    return (this.getState().sentItems.reduce(function(prev, cur){
      return prev + cur.getCost();
    },0) / 100.0).toFixed(2);
  }

  getUnsentOrderSum() {
    return (this.getState().unsentItems.reduce(function(prev, cur){
      return prev + cur.getCost();
    },0) / 100.0).toFixed(2);
  }
}

module.exports = alt.createStore(OrdersStore, 'OrdersStore');
