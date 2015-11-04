'use strict';

import alt from '../alt';

class ProdAttributeActions {
  constructor() {
    this.generateActions(
      'prodAttributeLoaded',
      'prodAttributeCreated',
      'prodAttributeUpdated'
    )
  }
}

module.exports = alt.createActions(ProdAttributeActions);
