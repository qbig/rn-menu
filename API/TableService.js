var getRequest = require('./getRequest');
var TableActions = require('../Actions/TableActions');
var store = require('react-native-simple-store');
var Log = require('../Lib/Log')
var TABLE = 'table';

var TableService = {
   requestForTables : function() {
     console.log("TableService: START !!!")
    return Promise.all([getRequest('/table'), getRequest('/provisioning/sectors')])
    .then(function(resJson) {
      TableActions.tablesUpdated(resJson);
      console.log("TableService: done !!!")
      return resJson;
    })
    .catch(function(e){
      Log.logMessage(JSON.stringify(e));
      console.log(e);
    });
  },

  initFromCache() {
    return store.get(TABLE).then((tableInfo)=>{
      console.log('tableInfo !!!!!')
      console.log(tableInfo)
      if (tableInfo) {
        TableActions.tableIdUpdated({
          id: tableInfo['tableId'],
          name: tableInfo['tableName']
        })
      }
      console.log(this)
    })
  }
}

module.exports = TableService;
