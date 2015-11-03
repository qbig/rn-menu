// Token, Last-Sync
// Network Status (socketed connected?)
var alt = require('../alt')

class EnvStore {
  constructor() {
    //this.bindActions(TodoActionCreators)
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI5LCJleHAiOjE0NDY2MTIzNTI2OTMsInBvc0d1aWQiOiJhYmMifQ.5T_242WhAPekQ9h8Appo0RRUjbyl8fzsCvp1GExJ9Hs"
    this.lastSync = "Sat, 10 Oct 2015 11:04:06 GMT"
    this.socketStatus = "disconnected"
  }
}

module.exports = alt.createStore(EnvStore, 'EnvStore')
