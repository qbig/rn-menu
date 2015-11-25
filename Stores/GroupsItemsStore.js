// Menu info, categories, items

var alt = require('../alt')
var GroupsItemsActions = require('../Actions/GroupsItemsActions');
var ProdAttributeActions = require('../Actions/ProdAttributeActions');

class GroupsItemsStore {
  constructor() {
    this.bindListeners({
      handleGroupsItems: GroupsItemsActions.groupsItemsUpdated,
      handleProdAttributeChanges: ProdAttributeActions.prodAttributeChanged
    });
    this.groupsItems = [];

    this.exportPublicMethods({
      getProdPrice: this.getProdPrice,
      getProd: this.getProd
    });
  }

  handleProdAttributeChanges(prodAttributeData) {
    /*
    { error: 'storeClosed',
    msg: 'Store is currently closed. A manager needs to login and open the store.' }
    */
    if (!prodAttributeData || prodAttributeData['error'] || prodAttributeData.length == 0){
      console.log(prodAttributeData)
      return;
    }

    this.groupsItems.forEach(function(group){
      group.products.forEach(function(prod){
        prod.soldOut = false;
        prodAttributeData.forEach(function(prodAttri){
          if (prodAttri.product_uuid === prod.uuid) {
            prod.soldOut = prodAttri['sold_out'];
          }
        })
      })
    })
  }

  handleGroupsItems(data) {
    this.groupsItems = data.filter(function(group){
      return group.name.indexOf('Staff') == -1;
    });
    console.log('GroupsItemsStore : groupsItems updated !!!')
    console.log(this.groupsItems);
  }

  getProd(uuid) {
    var result;
    this.getState().groupsItems.forEach((group)=>{
      group.products.forEach((prod)=>{
        if (prod.uuid == uuid){
          result = prod;
        }
      });
    });
    return result;
  }

  getProdPrice(uuid) {
    var prod = this.getProd(uuid);
    if (prod == undefined){
      throw new Error("product not found for uuid:" + uuid);
    }
    return prod.price;
  }

}

module.exports = alt.createStore(GroupsItemsStore, 'GroupsItemsStore');
