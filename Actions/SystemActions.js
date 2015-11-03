var alt = require('../alt')

class SystemActions {
  constructor() {
    this.generateActions(
      'socketConnected',
      'socketDisconnected',
      'tableUpdated',
      'masterOffline',
      'masterOnline',
      'storeOpened',
      'storeClosed'
    );
  }
}

module.exports = alt.createActions(SystemActions);
