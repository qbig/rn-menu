var React = require('react-native');
var { NativeModules } = React;
var Log = NativeModules.FabricLogWrapper;

var LENGTH = 99;
function trimString(str, length) {
  return str.length > length ?
  str.substring(0, length - 3) + "..." :
  str.substring(0, length);
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
