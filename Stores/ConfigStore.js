var alt = require('../alt')

class ConfigStore {
  constructor() {
    // TODO: listen to action
    //this.bindActions(TodoActionCreators)
    this.host = "http://104.155.205.124"
    this.guid = "ghi"
    this.username ="7737"
    this.password ="7737"
    this.tableId = ""
    this.exportPublicMethods({
      getAll: this.getAll
    });
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
