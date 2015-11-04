// Menu info, categories, items

var alt = require('../alt')
var TableActions = require('../Actions/TableActions');

class TablesStore {
  constructor() {
    this.bindListeners({
      handleGroupsItems: TableActions.tablesUpdated
    });
    this.tablesInfo = [];
  }

  handleGroupsItems(data) {
    this.tablesInfo = data;
    console.log("TablesStore: updated");
    console.log(data);
  }
}

module.exports = alt.createStore(TablesStore, 'TablesStore');
