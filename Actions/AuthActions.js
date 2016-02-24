var alt = require('../alt')
console.log("aa1");
class AuthActions {
  constructor() {
    this.generateActions(
      'tokenUpdated',
      'lastSyncUpdated'
    );
  }
}

console.log("aa2");
console.log(JSON.stringify(alt));
module.exports = alt.createActions(AuthActions);
console.log("aa3");
