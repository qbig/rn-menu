// Menu info, categories, items

var alt = require('../alt')
var ProdAttributeActions = require('../Actions/ProdAttributeActions');

class ProdAttributeStore {
  constructor() {
    this.bindListeners({
      handleProdAttributeLoaded: ProdAttributeActions.prodAttributeLoaded
    });
    this.prodAttributes = [];
  }

  handleProdAttributeLoaded(data) {
    this.prodAttributes = data;
    ProdAttributeActions.prodAttributeChanged.defer(data);
    console.log("ProdAttributeStore:updated")
    console.log(data);
  }
}

module.exports = alt.createStore(ProdAttributeStore, 'ProdAttributeStore');

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

When an Product Attribute is created, the following example JSON will be sent under this event:

{
  "verb": "created",
  "data": {
            "id": 1,
            "product_uuid": 1,
            "sold_out": true,
            "comments": "Chickens ran out of coop"
          },
  "id": 1
}
When an Product Attribute is updated, the following example JSON will be sent under this event:

{
  "verb": "updated",
  "id": "1"
}
When an Product Attribute is deleted, the following example JSON will be sent under this event:

{
  "verb": "destroyed",
  "id": "1"
}
*/
