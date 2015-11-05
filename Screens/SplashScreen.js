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
import type { NavigationContext } from 'NavigationContext';

var MainVC = require('./MainView');
var hashCode = function(str)

var ds;
var SplashScreen = React.createClass({

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  _onViewPress: function() {
    this.props.navigator.push({
      title: "",
      component: MainVC
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onViewPress}>
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
  }
});


module.exports = SplashScreen;
