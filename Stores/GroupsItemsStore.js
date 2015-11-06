// Menu info, categories, items

var alt = require('../alt')
var GroupsItemsActions = require('../Actions/GroupsItemsActions');

class GroupsItemsStore {
  constructor() {
    this.bindListeners({
      handleGroupsItems: GroupsItemsActions.groupsItemsUpdated
    });
    this.groupsItems = [];

    this.exportPublicMethods({
      getProdPrice: this.getProdPrice
    });
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
