/**
\* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} = React;

var MainView = require('./MainView');
var OrderService = require('../API/OrderService');
var AuthService = require('../API/AuthService');
var SystemActions = require('../Actions/SystemActions');
var ConfigStore = require('../Stores/ConfigStore');
var screen = require('Dimensions').get('window');
var StatusBar = require('../Components/StatusBar');

var SplashScreen = React.createClass({
  _onViewPress: function() {
    if (ConfigStore.getState().tableId == -1) {
      SystemActions.configStart();
      return;
    }
    SystemActions.loadingStart();
    AuthService.requestForToken()
    .then(()=>{
        return OrderService.createNewEmptyOrder()
    })
    .then(()=>{
      SystemActions.loadingFinish();
      this.props.navigator.push({
        'title': 'MainView',
        'from':'',
        'data':''
      });
    }).catch((err) =>{
      console.log('SplashScreen Error')
      console.log(err)
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.3)'} onPress={this._onViewPress}>
          <Image style={styles.cover} source={require('image!trans')} />
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  cover: {
    flex: 1,
    width: screen.width
  }
});

module.exports = SplashScreen;
