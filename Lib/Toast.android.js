var React = require('react-native');
var { ToastAndroid } = React;

module.exports = {
  LONG: ToastAndroid.LONG,
  SHORT: ToastAndroid.SHORT,
  show: function(msg, duration) {
    ToastAndroid.show(msg, duration);
  }
};
