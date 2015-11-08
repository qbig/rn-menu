var alt = require('../alt')
var SystemActions = require('../Actions/SystemActions')
class ConfigStore {
  constructor() {
    // TODO: listen to action
    //this.bindActions(TodoActionCreators)
    this.host = "http://104.155.205.124"
    this.guid = "abc"
    this.username ="7737"
    this.password ="7737"
    this.tableId = ""
    this.storeInfo = ""
    this.exportPublicMethods({
      getAll: this.getAll
    });
    this.bindListeners({
      handleStoreInfoUpdate: SystemActions.storeInfoLoaded
    });
  }

  handleStoreInfoUpdate(storeInfo) {
    this.storeInfo = storeInfo
    console.log("ConfigStore: storeInfo updated!")
    console.log(this.storeInfo)
  }

  getAll() {
    return {
      host: this.getState().host,
      guid: this.getState().guid,
      username: this.getState().username,
      password: this.getState().password,
      tableId: this.getState().tableId
    }
  }
}

module.exports = alt.createStore(ConfigStore, 'ConfigStore')


/*
{
    "store_prefix": "YCY",
    "company_uuid": "YCY",
    "tax": 7,
    "tax_type": "exclusive",
    "service_charge": 10,
    "address": "Holland Village",
    "description": "Yee Cheong Yuen",
    "currency_code": "SGD",
    "currency_decimal_places": 2,
    "state": "opened",
    "last_synced": "2015-11-07T02:18:04.000Z",
    "receipt_footer": "Powered By Sphere",
    "timezone": "Asia/Singapore"
}
*/
