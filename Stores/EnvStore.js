// Token, Last-Sync
// Network Status (socketed connected?)
var alt = require('../alt')
var AuthActions = require('../Actions/AuthActions');

class EnvStore {
  constructor() {
    this.bindListeners({
      handleTokenUpdate : AuthActions.tokenUpdated,
      handleLastSyncUpdate : AuthActions.lastSyncUpdated
    });
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI5LCJleHAiOjE0NDY3MDM4MTU2NTEsInBvc0d1aWQiOiJhYmMifQ.Ipot2yiYvWNjHt2YVH2X3BDkfkJ4v_XBQLyDwOGSj7E"
    this.lastSync = "Sat, 10 Oct 2015 11:04:06 GMT"
    this.socketStatus = "disconnected"
    this.exportPublicMethods({
      getAll: this.getAll
    });
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

  getAll() {
    return {
      token: this.getState().token,
      lastSync: this.getState().lastSync,
      socketStatus: this.getState().socketStatus
    }
  }
}

module.exports = alt.createStore(EnvStore, 'EnvStore');
