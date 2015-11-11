var getRequest = require('./getRequest');
var TableActions = require('../Actions/TableActions');

var TableService = {
   requestForTables : function() {
    return Promise.all([getRequest('/table'), getRequest('/provisioning/sectors')])
    .then(function(resJson) {
      TableActions.tablesUpdated(resJson);
      console.log("TableService: done !!!")
    })
    .catch(function(e){
      console.log(e);
    });
  }
}

module.exports = TableService;
