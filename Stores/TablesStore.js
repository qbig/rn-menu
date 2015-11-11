// Menu info, categories, items

var alt = require('../alt')
var TableActions = require('../Actions/TableActions');

class TablesStore {
  constructor() {
    this.bindListeners({
      handleTablesUpdated: TableActions.tablesUpdated
    });
    this.tableStatus = [];
    this.tableInfo = [];
  }

  handleTablesUpdated([tableStatus, tableInfo]) {
    this.tableStatus = tableStatus;
    this.tableInfo = tableInfo;
    console.log("TablesStore: updated");
    console.log([tableStatus, tableInfo]);
  }
}

module.exports = alt.createStore(TablesStore, 'TablesStore');
