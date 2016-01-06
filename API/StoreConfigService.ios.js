var React = require('react-native');
var {
  DeviceEventEmitter
} = React;
var getRequest = require('./getRequest');
var SystemActions = require('../Actions/SystemActions');
var store = require('react-native-simple-store');
var CONFIG = 'config';
var Toast = require('../Lib/Toast');

var StoreConfigService = {
  ip : "",

  respondToDiscoveredEvent(e) {

  },

  respondToResolvedEvent(e) {
    console.log("resolved:" + e['data']);
    if (e['data'] && e['data'].indexOf(':') != -1){
      return;
    }
    this.ip = e['data'];
    Toast.show("resolved IP:" + e['data'], Toast.SHORT);
  },

  discoverFromLocalWifi() {
    return Promise.reject("NotFound");
  },

  initFromCache() {
    return store.get(CONFIG).then((configInfo)=>{
      console.log('config from cache !!!!!')
      console.log(configInfo)
      return configInfo;
    })
  },

  getConfig() {
    console.log("getConfig")
    return this.initFromCache()
      .then((configInfo)=>{
        if (!configInfo) {
          return this.discoverFromLocalWifi()
        } else {
          return configInfo;
        }
      })
      .then((configInfo)=>{
        if (configInfo) {
          SystemActions.configInfoLoaded({
            host: configInfo['host'],
            guid: configInfo['guid'],
            username: configInfo['username'],
            password: configInfo['password'],
            description: configInfo['description']
          })
        }
      });
  }
}

module.exports = StoreConfigService;

/*
setTimeout(()=>{
  if (!this.state.initialized && !this.state.initializing) {
    SystemActions.configInfoUpdate({
      host: "http://104.155.205.124",
      guid: "abc",
      username: "4021",
      password: "4021"
    });
  }
}, 10 * 1000);
NSDModule.discover();

  componentWillMount: function() {
    this.addListenerOn(DeviceEventEmitter,
      NSDModule.SERVICE_RESOLVED,
      this.respondToResolvedEvent);

    this.addListenerOn(DeviceEventEmitter,
      NSDModule.SERVICE_FOUND,
      this.respondToDiscoveredEvent);
  },

  respondToDiscoveredEvent: function(e) {
    if (e['data'] == NSDModule.SPHERE_SERIVE_NAME) {
      NSDModule.resolve(NSDModule.SPHERE_SERIVE_NAME);
      Toast.show("BOX FOUND !!!!", Toast.LONG);
    }
  },

  respondToResolvedEvent: function(e) {
    console.log("resolved:" + e['data']);
    Toast.show("resolved IP:" + e['data'], Toast.SHORT);
    SystemActions.configInfoUpdate({
      host: "http://" + e['data'],
      guid: "abc",
      username: "4021",
      password: "4021"
    });
  },

DeviceEventEmitter.addListener('keyboardWillShow', function(e: Event) {
  // handle event.
});
{
  host: "http://104.155.205.124",
  guid: "abc",
  username: "4021",
  password: "4021"
}
*/
