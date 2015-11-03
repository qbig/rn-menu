var alt = require('../alt')

class AuthActions {
  constructor() {
    this.generateActions(
      'tokenUpdated'
    );
  }
}

module.exports = alt.createActions(AuthActions);
