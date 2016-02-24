'use strict';

import alt from '../alt';

class OrderActions {
  constructor() {
    this.generateActions(
      'orderClosed',
      'orderCreated',
      'orderUpdated',
      'orderFailed',
      'orderItemTapped', // user 'select' in the menu list
      'orderItemStarted', // added to store, and start 'creating'
      'orderItemCreated', // done with editing--> 'created'
      'orderItemDiscard',
      'orderItemTappedEdit',
      'orderItemStartedEdit',
      'orderItemDiscardEdit',
      'orderItemCompletedEdit',
      'orderItemDeleted',
      'radioClicked',
      'boolClicked',
      'currentOrderItemIncrement',
      'currentOrderItemDecrement',
      'unsentOrderItemIncrement',
      'unsentOrderItemDecrement',
    );
  }
}

module.exports = alt.createActions(OrderActions);
