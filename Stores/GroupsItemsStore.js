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
      getProdPrice: this.getProdPrice
    });
  }

  handleProdAttributeChanges(prodAttributeData) {
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
    this.groupsItems = data;
    console.log('GroupsItemsStore : groupsItems updated !!!')
    console.log(this.groupsItems);
  }

  getProdPrice(uuid) {
    var result;
    this.getState().groupsItems.forEach((group)=>{
      group.products.forEach((prod)=>{
        if (prod.uuid == uuid){
          result = prod.price;
        }
      });
    });
    return result;
  }

}

module.exports = alt.createStore(GroupsItemsStore, 'GroupsItemsStore');
