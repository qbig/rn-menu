'use strict';

import alt from '../alt';

export class OrderActions {

  orderClosed() {
    this.dispatch()
  }

  orderCreated(orderInfo) {
    this.dispatch(orderInfo);
  }

  orderUpdated(orderInfo) {
    this.dispatch(orderInfo)
  }

  orderItemCreated(orderItemInfo) {
    this.dispatch(orderItemInfo)
  }

  orderItemUpdated(orderItemInfo) {
    this.dispatch(orderItemInfo)
  }

  orderItemDeleted(orderItemInfo) {
    this.dispatch(orderItemInfo)
  }

}

export default alt.createActions(OrderActions);
