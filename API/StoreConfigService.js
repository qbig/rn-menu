var React = require('react-native');
var {
  NativeModules,
  DeviceEventEmitter,
  ToastAndroid
} = React;
var getRequest = require('./getRequest');
var SystemActions = require('../Actions/SystemActions');
var store = require('react-native-simple-store');
var NSDModule = NativeModules.NSDModule
var CONFIG = 'config';

var StoreConfigService = {
  ip : "",

  respondToDiscoveredEvent(e) {
    if (e['data'] == NSDModule.SPHERE_SERIVE_NAME) {
      NSDModule.resolve(NSDModule.SPHERE_SERIVE_NAME);
      ToastAndroid.show("BOX FOUND !!!!", ToastAndroid.LONG);
    } else if (e && e['data']) {
      console.log(e['data'] + " FOUND");
    }
  },

  respondToResolvedEvent(e) {
    console.log("resolved:" + e['data']);
    if (e['data'] && e['data'].indexOf(':') != -1){
      return;
    }
    this.ip = e['data'];
    ToastAndroid.show("resolved IP:" + e['data'], ToastAndroid.SHORT);
  },

  discoverFromLocalWifi() {
    DeviceEventEmitter.addListener(
      NSDModule.SERVICE_RESOLVED,
      this.respondToResolvedEvent.bind(this)
    );

    DeviceEventEmitter.addListener(
      NSDModule.SERVICE_FOUND,
      this.respondToDiscoveredEvent.bind(this)
    );
    this.ip = "";
    var self = this;
    NSDModule.discover();
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        console.log("IP found:" + self.ip);
        // NSDModule.stop(); --> Crash
        if (self.ip) {
          resolve({
              host: "http://" + self.ip,
              guid: "abc",
              username: "4021",
              password: "4021"
            });
        } else {
          reject("NotFound");
        }
      }, 10*1000);
    });
  },

  initFromCache() {
    return store.get(CONFIG).then((configInfo)=>{
      console.log('config from cache !!!!!')
      console.log(configInfo)
      return configInfo;
    })
  },

  getConfig() {
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
            password: configInfo['password']
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
      ToastAndroid.show("BOX FOUND !!!!", ToastAndroid.LONG);
    }
  },

  respondToResolvedEvent: function(e) {
    console.log("resolved:" + e['data']);
    ToastAndroid.show("resolved IP:" + e['data'], ToastAndroid.SHORT);
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
