// Sent Orders --> Bill
// Unsent Orders --> Orders

// Menu info, categories, items

var alt = require('../alt')
var OrderActions = require('../Actions/OrderActions');
var GroupsItemsStore = require('./GroupsItemsStore');
var OrderItemModel = require('../Models/OrderItem');
var ModifierStore = require('./ModifierStore');
var store = require('react-native-simple-store');
var ORDER = 'order';

class OrdersStore {
  constructor() {
    this.bindListeners({
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

  persistCurrentItems() {
    store.save(ORDER, {
        currentItems: JSON.stringify(this.unsentItems)
    })
  }

  handleOrderDelete() {
    this.init();
  }

  handleUnsentItemCompletedEdit(comment) {
    this.currentItem.comment = comment;
    this.unsentItems[this.currentItem.index] = this.currentItem; // replacing original item
    this.currentItem = '';
    this.persistCurrentItems();
  }

  handleUnsentItemStartedEdit(index) {
    this.currentItem = this.unsentItems[index].getClone();
    this.currentItem.index = index; // for later, to replace the original
  }

  handleUnsentItemIncrement(index) {
    this.unsentItems[index].incre();
    this.persistCurrentItems();
  }

  handleUnsentItemDecrement(index) {
    if (this.unsentItems[index].quantity > 1) {
      this.unsentItems[index].decre()
    } else {
      this.unsentItems.splice(index, 1)
    }
    this.persistCurrentItems();
  }

  handleSendOrderSuccess(successInfo) {
    if (successInfo && successInfo['order_items']) {
      this.unsentItems.forEach(function(item){
        item.sent = true;
      })
    }
    this.sentItems = this.sentItems.concat(this.unsentItems);
    this.unsentItems = [];
    this.persistCurrentItems();
  }

  handleCurrentItemAdded(comment) {
    this.currentItem.comment = comment;
    this.unsentItems.push(this.currentItem);
    this.currentItem = '';
    this.persistCurrentItems();
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

  handleOrderCreate(data) {
    this.details = data;
    if (data['order_items'].length > 0) {
      this.sentItems = OrderItemModel.makeItemsFromJson(data['order_items'], GroupsItemsStore,  ModifierStore.getState().modifiers )
    }
    store.get(ORDER).then((currenOrderInfo)=>{
      console.log('existing order !!!!!')
      console.log(currenOrderInfo)
      if (currenOrderInfo) {
        var info = JSON.parse(currenOrderInfo['currentItems'])
        console.log(info);
        if (info.length > 0) {
          console.log("start!!!")
            this.unsentItems = OrderItemModel.makeUnsentItemsFromCache(info, GroupsItemsStore,  ModifierStore.getState().modifiers );
            console.log("here!!!")
            console.log(this.unsentItems)
            console.log("Done!!!")
        }
      }
    })
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
/*
{
  "order_items": [
    {
      "id": 140,
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
      "updatedAt": "2015-11-12T10:44:28.000Z",
      "createdAt": "2015-11-12T10:44:28.000Z",
      "unit_gram_amount": 0,
      "staff_id": 29,
      "deletedAt": null,
      "adjustments": []
    }
  ],
  "uuid": "151112YCY0000057",
  "staff_id": 29,
  "pax": 1,
  "type": "eat-in",
  "state": "opened",
  "subtotal_adj_amt": 0,
  "subtotal_adj_type": "value",
  "subtotal_adj_entry_type": "discount",
  "notes": null,
  "updatedAt": "2015-11-12T10:44:28.000Z",
  "adjustments": null,
  "queue_num": null,
  "createdAt": "2015-11-12T09:15:00.000Z",
  "table_id": 81
}
 */
