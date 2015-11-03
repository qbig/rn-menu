var alt = require('../alt')

class GroupsItemsActions {
  constructor() {
    this.generateActions(
      'groupsItemsUpdated'
    );
  }
}

module.exports = alt.createActions(GroupsItemsActions);
