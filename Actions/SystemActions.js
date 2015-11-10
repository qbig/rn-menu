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
      'storeClosed',
      'loadingStart',
      'loadingFinish',
      'storeInfoLoaded',
      'configStart'
    );
  }
}

module.exports = alt.createActions(SystemActions);
