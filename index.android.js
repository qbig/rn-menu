'use strict';
console.log("!!")
var React = require('react-native');

console.log("1")
var Raven = require('raven-js');
require('raven-js/plugins/react-native')(Raven);
// Raven
//   .config('https://2e17bf8efad3484885d58ae04608a468@app.getsentry.com/63290', { release: '1.1.3' })
//   .install();
console.log("2")
var {
  AppRegistry
} = React;
console.log("3")
var Root = require('./Screens/Root');
console.log("4")
AppRegistry.registerComponent('RNMenu', () => Root);
console.log("??")
