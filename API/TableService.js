var getRequest = require('./getRequest');
var TableActions = require('../Actions/TableActions');

var TableService = {
   requestForTables : function() {
    getRequest('/table')
      .then(function(resJson) {
        TableActions.tablesUpdated(resJson);
        console.log("TableService: done !!!")
      }).catch(function(e){
        console.log(e);
      });
  }
}

module.exports = TableService;
