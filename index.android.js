/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var SocketService = require('./API/SocketService');
var GroupsItemsService = require('./API/GroupsItemsService');
var AuthService = require('./API/AuthService');
var TableService = require('./API/TableService');
var ProdAttributeService = require('./API/ProdAttributeService');
var OrderService = require('./API/OrderService');
var ModifierService = require('./API/ModifierService');

var SystemActions = require('./Actions/SystemActions');
var ConfigStore = require('./Stores/ConfigStore');
var EnvStore = require('./Stores/EnvStore');
var ModifierStore = require('./Stores/ModifierStore');
var OrdersStore = require('./Stores/OrdersStore');
var ProdAttributeStore = require('./Stores/ProdAttributeStore');
var TablesStore = require('./Stores/TablesStore');
var GroupsItemsStore = require('./Stores/GroupsItemsStore');
var RNMenu = React.createClass({
  getInitialState: function() {
    return {
      text: 'posGuid=ghi!xx!'
    }
  },
  componentDidMount: function() {
    // var digestAuthRequest = require('./digestAuthRequest');
    // var self = this;
    // var url = 'http://104.155.205.124/auth/login?posGuid=abc';
    // var uri = '/auth/login?posGuid=abc';
    //
    // var req = new digestAuthRequest('GET', url, uri, '7737', '7737');
    // // make the request
    // req.request(function(data) {
    //     console.log('Data retrieved successfully');
    //     console.log(data);
    //     //self.setState({text: JSON.stringify(data)});
    //     console.log('Above is the retrieved');
    // },function(errorCode) {
    //     console.log('no dice: '+errorCode);
    // }, {});
    // SocketService.init();
    // GroupsItemsService.requestForGroupsItems();
    // AuthService.requestForToken();
    // TableService.requestForTables();
    // ProdAttributeService.requestForProdAttribute();
    // OrderService.requestForCurrentOrder();
    // ModifierService.requestForModifiers();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.text}
        </Text>
        <Text style={styles.instructions}>
          {ConfigStore.getAll().host}
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNMenu', () => RNMenu);
