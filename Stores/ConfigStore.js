var alt = require('../alt')

class ConfigStore {
  constructor() {
    // TODO: listen to action
    //this.bindActions(TodoActionCreators)
    this.host = "http://104.155.205.124"
    this.guid = "abc"
    this.username ="7737"
    this.password ="7737"
    this.tableId = ""
    this.exportPublicMethods({
      getAll: this.getAll
    });
  }

  getAll() {
    return {
      host: this.host,
      guid: this.guid,
      username: this.username,
      password: this.password,
      tableId: this.tableId
    }
  }
}

module.exports = alt.createStore(ConfigStore, 'ConfigStore')
