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
var digestAuthRequest = require('./digestAuthRequest');
window.navigator.userAgent = 'react-native'
var io = require('socket.io-client/socket.io') ;

var RNMenu = React.createClass({
  getInitialState: function() {
    return {
      text: 'posGuid=ghi!xx!'
    }
  },
  componentDidMount: function() {
    var self = this;
    var url = 'http://104.155.205.124/auth/login?posGuid=abc';
    var uri = '/auth/login?posGuid=abc';

    var req = new digestAuthRequest('GET', url, uri, '7737', '7737');
    // make the request
    req.request(function(data) {
        console.log('Data retrieved successfully');
        console.log(data);
        //self.setState({text: JSON.stringify(data)});
        console.log('Above is the retrieved');
    },function(errorCode) {
        console.log('no dice: '+errorCode);
    }, {});

    var socket = io.connect('http://104.155.205.124', {query: "posGuid=ghi"});
    socket.on('connect', function(){ self.setState ({text:"connected!"});});
    socket.on('connect_error', function(data){
      self.setState({text:"connect error:" + JSON.stringify(data)});
    });
    socket.on('permission', function(data){self.setState({text:"permission event occurred: " + JSON.stringify(data)})});
    //socket.on('order', function(data){console.log ("order event occurred: " + JSON.stringify(data))});
    socket.on('order', function(data){self.setState ({text:"order event occurred: " + JSON.stringify(data)})});
    socket.on('orderitem', function(data){self.setState({text:"orderItem event occurred: " + JSON.stringify(data)})});
    //socket.get('/pos', function(resData, jwres) {console.log("ResData: " + resData);})
    // var permissionGetReq = '/order?webToken=' + webToken;
    // socket.emit('post', {"url": permissionGetReq}, function (res) { console.log('response from post: ' + JSON.stringify(res));});
    socket.on('connection', function(socket) {
        socket.conn.on('heartbeat', function() {
          console.log('heartbeat');
        });
    });

  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.text}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
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
