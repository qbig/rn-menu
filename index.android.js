'use strict';

var React = require('react-native');
require('regenerator/runtime');

var Raven = require('raven-js');
require('raven-js/plugins/react-native')(Raven);
Raven
  .config('https://2e17bf8efad3484885d58ae04608a468@app.getsentry.com/63290', { release: '1.1.3' })
  .install();

var {
  AppRegistry
} = React;

var Root = require('./Screens/Root');

AppRegistry.registerComponent('RNMenu', () => Root);
