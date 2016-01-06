var log = {
  logMessage: function(msg){
    console.log("logging:msg")
  },
  logStringValue: function(key, val) {
    console.log("logging-key:" + key)
    console.log("logging-val:" + val)
  }

}

module.exports = log;
