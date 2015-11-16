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
      'configStart',
      'configDone',
      'orderCleared',
      'orderResetComplete',
      'configInfoUpdate'
    );
  }
}

module.exports = alt.createActions(SystemActions);
