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
    console.log("ProdAttributeStore:updated")
    console.log(data);
  }
}

module.exports = alt.createStore(ProdAttributeStore, 'ProdAttributeStore');
