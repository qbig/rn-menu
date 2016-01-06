'use strict';

var React = require('react-native');
require('regenerator/runtime');
var {
  AppRegistry
} = React;

var Root = require('./Screens/Root');

AppRegistry.registerComponent('RNMenu', () => Root);
