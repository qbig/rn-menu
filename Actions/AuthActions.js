var alt = require('../alt')

class AuthActions {
  constructor() {
    this.generateActions(
      'tokenUpdated',
      'lastSyncUpdated'
    );
  }
}


console.log(JSON.stringify(alt));
module.exports = alt.createActions(AuthActions);
