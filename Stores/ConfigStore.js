var alt = require('../alt')
var SystemActions = require('../Actions/SystemActions')
var TableActions = require('../Actions/TableActions')
var store = require('react-native-simple-store');
var TABLE = 'table';

/*
store.save('coffee', {
    isAwesome: true
}).then(() => {
    return store.get('coffee').then((coffee) => {
        console.log(coffee.isAwesome === true); // true
    });

}).then(() => {

    return store.update('coffee', {
        isNotEssential: false
    });

}).then(() => {

    return store.get('coffee');

}).then((coffee) => {

    console.log(coffee.isNotEssential === false); // true
    console.log(coffee.isAwesome === true); // true

    return store.delete('coffee');

}).then(() => {

    store.get('coffee').then((coffee) => {
        console.log(coffee === null); // true
    });

});
*/

class ConfigStore {
  constructor() {
    this.host = ""
    this.guid = ""
    this.username =""
    this.password =""
    this.tableId = -1
    this.tableName = ''
    this.storeInfo = ""
    this.exportPublicMethods({
      getAll: this.getAll
    });
    this.bindListeners({
      handleStoreInfoUpdate: SystemActions.storeInfoLoaded,
      handleTableIdUpdate: TableActions.tableIdUpdated,
      handleConfigInfoUpdate: SystemActions.configInfoUpdate,
    });
  }

  handleConfigInfoUpdate(configInfo/*{host, guid, username, password}*/) {
    for (var item in configInfo) {
      if (configInfo[item]) {
        this[item] = configInfo[item]
      }
    }
  }

  handleTableIdUpdate({name, id}) {
    this.tableId = id
    this.tableName = name
    store.save(TABLE, {
        tableId: id,
        tableName: name
    })
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
