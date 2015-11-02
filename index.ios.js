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
var RNMenu = React.createClass({
  getInitialState: function() {
    return {
      text: 'start!!'
    }
  },
  componentDidMount: function() {
    var url = 'http://104.155.205.124/auth/login?posGuid=abc';
    var uri = '/auth/login?posGuid=abc';
    var self = this;
    var req = new digestAuthRequest('GET', url, uri, '7737', '7737');
    // make the request
    req.request(function(data) {
        console.log('Data retrieved successfully');
        console.log(data);
        self.setState({text: JSON.stringify(data)});
        console.log('Above is the retrieved');
    },function(errorCode) {
        console.log('no dice: '+errorCode);
    }, {});
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
