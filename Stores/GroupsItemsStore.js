// Menu info, categories, items

var alt = require('../alt')
var GroupsItemsActions = require('../Actions/GroupsItemsActions');

class GroupsItemsStore {
  constructor() {
    this.bindListeners({
      handleGroupsItems: GroupsItemsActions.groupsItemsUpdated
    });
    this.groupsItems = [];
  }

  handleGroupsItems(data) {
    this.groupsItems = data;
    console.log('GroupsItemsStore : groupsItems updated !!!')
    console.log(this.groupsItems);
  }
}

module.exports = alt.createStore(GroupsItemsStore, 'GroupsItemsStore');
