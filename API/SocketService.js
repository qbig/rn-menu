window.navigator.userAgent = 'react-native'
var io = require('socket.io-client/socket.io');

var ConfigStore = require('../Stores/ConfigStore');
var SystemActions = require('../Actions/SystemActions');
var OrderActions = require('../Actions/OrderActions');
var OrdersStore = require('../Stores/OrdersStore');
var ProdAttributeService = require('./ProdAttributeService');
var SocketService = (function() {
  var socket;
  return {
    init: function() {
      //{host, guid, username, password, tableId}
      //"http://104.155.205.124", "abc", "7737", "7737", ""

      var configInfo = ConfigStore.getAll();
      socket = io.connect(configInfo.host, {
        query: "posGuid=" +  "ghi" //configInfo.guid
      });
      socket.on('connect', function() {
        SystemActions.socketConnectionChanged(socket);
        console.log("connected!");
      });
      socket.on('disconnect', function(data) {
        SystemActions.socketConnectionChanged(data);
        console.log("disconnected:" + JSON.stringify(data));
      });
      socket.on('connect_error', function(data) {
        SystemActions.socketConnectionChanged(data);
        console.log("connect error:" + JSON.stringify(data));
      });
      socket.on('permission', function(data) {
        console.log("permission event occurred: " + JSON.stringify(data));
      });

      socket.on('system_status', function(data) {
        if (data && data.event) {
          switch (data.event) {
            case "masterOffline":
              SystemActions.masterOnline(data);
              break;
            case "masterOnline":
              SystemActions.masterOffline(data);
              break;
            case "storeOpened":
              SystemActions.storeOpened(data);
              break;
            case "storeClosed":
              SystemActions.storeClosed(data);
              break;
            default:
              console.log(data);
          }
        }
        console.log("system_status:" + JSON.stringify(data));
      });

      socket.on('order', function(data) {
        if (data['verb'] === 'destroyed' && OrdersStore.getState().details.uuid === data['id']) {
          OrderActions.orderClosed(data)
          SystemActions.orderCleared();
        }
        console.log("order event occurred: " + JSON.stringify(data));
      });
      socket.on('orderitem', function(data) {
        OrderActions.orderUpdated(data);
        console.log("orderItem event occurred: " + JSON.stringify(data));
      });

      socket.on('productattribute', function(data) {
        ProdAttributeService.requestForProdAttribute();
        console.log("productattribute event occurred: " + JSON.stringify(data));
      });

      socket.on('connection', function(socket) {
        console.log('on connection fired');
        socket.conn.on('heartbeat', function() {
          console.log('heartbeat received');
        });
      });
    }
  };
})();



module.exports = SocketService;
