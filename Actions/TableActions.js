var alt = require('../alt')

class TableActions {
  constructor() {
    this.generateActions(
      'tablesUpdated',
      'tableIdUpdated'
    );
  }
}

module.exports = alt.createActions(TableActions);
