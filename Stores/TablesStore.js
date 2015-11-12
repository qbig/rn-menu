// Menu info, categories, items

var alt = require('../alt')
var TableActions = require('../Actions/TableActions');
var ConfigStore = require('../Stores/ConfigStore');

class TablesStore {
  constructor() {
    this.bindListeners({
      handleTablesUpdated: TableActions.tablesUpdated
    });
    this.tableStatus = [];
    this.tableInfo = [];

    this.exportPublicMethods({
      getCurrentOrderID: this.getCurrentOrderID
    });
  }

  getCurrentOrderID() {
    var tableId = ConfigStore.getState().tableId;
    var result = this.getState().tableStatus.find(function(status){
      return status.id == tableId
    });
    if (result == undefined) {
      return -1
    } else {
      return result["order_uuid"];
    }
  }

  handleTablesUpdated([tableStatus, tableInfo]) {
    this.tableStatus = tableStatus;
    this.tableInfo = tableInfo;
    console.log("TablesStore: updated");
    console.log([tableStatus, tableInfo]);
  }
}

module.exports = alt.createStore(TablesStore, 'TablesStore');
