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
      component: MainView
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
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
  }
});


module.exports = SplashScreen;
