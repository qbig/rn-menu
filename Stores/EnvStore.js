// Token, Last-Sync
// Network Status (socketed connected?)
var alt = require('../alt')
var AuthActions = require('../Actions/AuthActions');
var SystemActions = require('../Actions/SystemActions');
class EnvStore {
  constructor() {
    this.bindListeners({
      handleTokenUpdate : AuthActions.tokenUpdated,
      handleLastSyncUpdate : AuthActions.lastSyncUpdated,
      handleSocketUpdate : SystemActions.socketConnected,
      handleLoadingStart : SystemActions.loadingStart,
      handleLoadingFinish : SystemActions.loadingFinish,
      handleConfigStart : SystemActions.configStart
    });
    this.token = ""
    this.lastSync = ""
    this.socketStatus = "disconnected"
    this.exportPublicMethods({
      getAll: this.getAll
    });
    this.isLoading = false;
    this.configStart = false;
  }

  handleConfigStart() {
    console.log('handleConfigStart!!!!')
  }

  handleTokenUpdate(data) {
    // {
    //   permissions: [{
    //     uuid: 'store_admin',
    //     description: 'Store Administration',
    //     type: 'manager'
    //   }],
    //   id: 29,
    //   pin: '7737',
    //   name: 'Store Admin',
    //   webToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI5LCJleHAiOjE0NDY2NDkwMzE4OTQsInBvc0d1aWQiOiJnaGkifQ.Rx6HInGiFPv1nTMmyfotylczcfdk2I8t0kjF39PA0Pg',
    //   is_manager: true
    // }
    this.token = data.webToken;
    console.log("EnvStore: token updated!!!!!");
    console.log(JSON.stringify(data));
    console.log(this.token);
  }

  handleLastSyncUpdate(lastSync) {
    console.log("EnvStore: lastSync updated!!!!!");
    this.lastSync = lastSync;
  }

  handleSocketUpdate(socket) {
    if (socket.connected) {
      this.socketStatus = "connected";
    } else {
      this.socketStatus = "disconnected";
    }
  }

  handleLoadingStart() {
    console.log("EnvStore isLoading")
    this.isLoading = true;
  }

  handleLoadingFinish() {
    console.log("EnvStore loadingFinished")
    this.isLoading = false;
  }

  getAll() {
    return {
      token: this.getState().token,
      lastSync: this.getState().lastSync,
      socketStatus: this.getState().socketStatus
    }
  }
}

module.exports = alt.createStore(EnvStore, 'EnvStore');
