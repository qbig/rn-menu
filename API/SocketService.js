window.navigator.userAgent = 'react-native'
var io = require('socket.io-client/socket.io');

var ConfigStore = require('../Stores/ConfigStore');
var SystemActions = require('../Actions/SystemActions');
var OrderActions = require('../Actions/OrderActions');
var OrdersStore = require('../Stores/OrdersStore');
var ProdAttributeService = require('./ProdAttributeService');
var OrderService = require('./OrderService');
var SocketService = (function() {
  var socket;
  var updateNeed = false;
  return {
    init: function() {
      //{host, guid, username, password, tableId}
      //"http://104.155.205.124", "abc", "4021", "4021", ""

      var configInfo = ConfigStore.getAll();
      socket = io.connect(configInfo.host, {
        query: "posGuid=" + configInfo.guid
      });
      socket.on('connect', function() {
        SystemActions.socketConnectionChanged(socket);
        if (updateNeed) {
          console.log("updateNeed")
          OrderService.verifySentOrder()
          .then(() => {
            return OrderService.requestForCurrentOrder()
          })
          .then(()=>{
            updateNeed = false;
          })
          .catch((err)=>{
            console.log('requestForCurrentOrder:' + err)
            updateNeed = false;
            OrderActions.orderClosed()
            SystemActions.orderCleared();
          });
        }
        console.log("connected!");
      });
      socket.on('disconnect', function(data) {
        updateNeed = true;
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
          console.log("Event: Order destroyed")
          OrderActions.orderClosed()
          SystemActions.orderCleared();
        } else if (data['verb'] === 'updated' && OrdersStore.getState().details.uuid === data['id']) {
          if (data['table'] != undefined && data['table'] != ConfigStore.getState().tableId) {
            console.log("Event: Order updated, tableId changed")
            console.log(data)
            console.log("ConfigStore.getState().tableId:" + ConfigStore.getState().tableId)
            OrderActions.orderClosed()
            SystemActions.orderCleared();
          }
        }
        console.log("order event occurred: " + JSON.stringify(data));
      });
      socket.on('orderitem', function(data) {
        OrderService.requestForCurrentOrder();
        console.log("orderItem event occurred: " + JSON.stringify(data));
      });

      socket.on('table', function(data) {
        console.log('table update!!!!!')
        console.log(data)
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
