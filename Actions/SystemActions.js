var alt = require('../alt')

class SystemActions {
  constructor() {
    this.generateActions(
      'socketConnectionChanged',
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
