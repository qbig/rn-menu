// Token, Last-Sync
// Network Status (socketed connected?)
var alt = require('../alt')
var AuthActions = require('../Actions/AuthActions');

class EnvStore {
  constructor() {
    this.bindListeners({
      handleTokenUpdate: AuthActions.tokenUpdated
    });
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI5LCJleHAiOjE0NDY2MTIzNTI2OTMsInBvc0d1aWQiOiJhYmMifQ.5T_242WhAPekQ9h8Appo0RRUjbyl8fzsCvp1GExJ9Hs"
    this.lastSync = "Sat, 10 Oct 2015 11:04:06 GMT"
    this.socketStatus = "disconnected"
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
    console.log(JSON.stringify(data));
    console.log(this.token);
  }
}

module.exports = alt.createStore(EnvStore, 'EnvStore')
