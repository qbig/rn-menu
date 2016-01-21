'use strict';

var React = require('react-native');
var Raven = require('raven-js');
require('raven-js/plugins/react-native')(Raven);
Raven
  .config('https://04a856d057544c3d8ec5b2a94b82efe6@app.getsentry.com/64445', { release: "" })
  .install();

require('regenerator/runtime');

var {
  AppRegistry
} = React;

var Root = require('./Screens/Root');
AppRegistry.registerComponent('RNMenu', () => Root);
