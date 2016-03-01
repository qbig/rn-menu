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
    if ((e['data'] && e['data'].indexOf(':') != -1) || !e['data']){
      return;
    }

    StoreConfigService.ip = e['data'];
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
    NSDModule.discover();
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        console.log("IP found:" + StoreConfigService.ip);
        ToastAndroid.show("StoreConfigService.ip is " + StoreConfigService.ip, ToastAndroid.SHORT);
        // NSDModule.stop(); --> Crash
        if (StoreConfigService.ip) {
          ToastAndroid.show("resolve(): " + StoreConfigService.ip, ToastAndroid.SHORT);
          console.log("resolve(): " + StoreConfigService.ip);
          resolve({
              host: "http://" + StoreConfigService.ip,
              guid: "abc",
              username: "4021",
              password: "4021",
              description: "LOCAL"
            });
        } else {
          reject("NotFound");
        }
      }, 30*1000);
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
            password: configInfo['password'],
            description: configInfo['description']
          })
        }
      });
  }
}

module.exports = StoreConfigService;
