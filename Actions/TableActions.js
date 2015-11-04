var alt = require('../alt')

class TableActions {
  constructor() {
    this.generateActions(
      'tablesUpdated'
    );
  }
}

module.exports = alt.createActions(TableActions);
