// Menu info, categories, items

var alt = require('../alt')
var TableActions = require('../Actions/TableActions');
var ConfigStore = require('../Stores/ConfigStore');
var Log = require('../Lib/Log');

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
    console.log("getCurrentOrderID():")
    console.log(this.getState())
    console.log(this.getState().tableStatus)
    var result = this.getState().tableStatus.find(function(status){
      return status.id == tableId
    });
    console.log("getCurrentOrderID:")
    console.log(this.getState().tableStatus)
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
    Log.logStringValue('tableInfo', JSON.stringify(tableInfo))
    Log.logStringValue('tableStatus', JSON.stringify(tableStatus))
  }
}

module.exports = alt.createStore(TablesStore, 'TablesStore');
