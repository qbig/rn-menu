var alt = require('../alt')

class AuthActions {
  constructor() {
    this.generateActions(
      'tokenUpdated',
      'lastSyncUpdated'
    );
  }
}

module.exports = alt.createActions(AuthActions);
