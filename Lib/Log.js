var React = require('react-native');
var { NativeModules } = React;
var Log = NativeModules.FabricLogWrapper;

var LENGTH = 99;
function trimString(str, length) {
  if (typeof str === 'object') {
    str = JSON.stringify(str);
  }
  return str.length > length ?
  str.substring(0, length - 3) + "..." : str;
}

function logMessage(msg) {
  Log.logMessage(trimString(msg, LENGTH))
}

function logStringValue(key, msg){
  Log.logStringValue(trimString(key, LENGTH), trimString(msg, LENGTH));
}


module.exports = {
  logMessage:logMessage,
  logStringValue:logStringValue
};
