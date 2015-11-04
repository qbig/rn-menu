'use strict';

import alt from '../alt';

class OrderActions {
  constructor() {
    this.generateActions(
      'orderClosed',
      'orderCreated',
      'orderUpdated',
      'orderItemCreated',
      'orderItemUpdated',
      'orderItemDeleted'
    );
  }
}

export default alt.createActions(OrderActions);
