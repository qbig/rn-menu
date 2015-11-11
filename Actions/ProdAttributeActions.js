'use strict';

import alt from '../alt';

class ProdAttributeActions {
  constructor() {
    this.generateActions(
      'prodAttributeLoaded',
      'prodAttributeChanged'
    )
  }
}

module.exports = alt.createActions(ProdAttributeActions);

/*

[
  {
    "id": 1,
    "product_uuid": 1,
    "sold_out": true,
    "comments": "Chickens ran out of coop"
  },
  {
    "id": 2,
    "product_uuid": 2,
    "sold_out": true,
    "comments": "Ducks died"
  }
]
*/
