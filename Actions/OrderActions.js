'use strict';

import alt from '../alt';

class OrderActions {
  constructor() {
    this.generateActions(
      'orderClosed',
      'orderCreated',
      'orderUpdated',
      'orderItemTapped', // user 'select' in the menu list
      'orderItemStarted', // added to store, and start 'creating'
      'orderItemCreated', // done with editing--> 'created'
      'orderItemDiscard',
      'orderItemTappedEdit',
      'orderItemStartedEdit',
      'orderItemDiscardEdit',
      'orderItemUpdated',
      'orderItemDeleted',
      'radioClicked',
      'boolClicked',
      'currentOrderItemIncrement',
      'currentOrderItemDecrement'
    );
  }
}

export default alt.createActions(OrderActions);
