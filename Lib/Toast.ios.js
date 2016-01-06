var React = require('react-native');
var { AlertIOS } = React;

module.exports = {
  LONG: 1,
  SHORT: 0,
  show: function(msg, duration) {
    AlertIOS.alert('Hi', msg)
  }
};
