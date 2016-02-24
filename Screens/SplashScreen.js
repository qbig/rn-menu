/**
\* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} = React;

var MainView = require('./MainView');
var OrderService = require('../API/OrderService');
var AuthService = require('../API/AuthService');
var GroupsItemsService = require('../API/GroupsItemsService');
var TableService = require('../API/TableService');

var ProdAttributeService = require('../API/ProdAttributeService');
var ModifierService = require('../API/ModifierService');
var StoreInfoService = require('../API/StoreInfoService');
var SystemActions = require('../Actions/SystemActions');
var AuthActions = require('../Actions/AuthActions');
var ConfigStore = require('../Stores/ConfigStore');
var EnvStore = require('../Stores/EnvStore');
var screen = require('Dimensions').get('window');
var StatusBar = require('../Components/StatusBar');

var SplashScreen = React.createClass({
  getInitialState: function() {
    return {loading: false}
  },

  _onViewPress: function() {
    if (ConfigStore.getState().tableId == -1) {
      SystemActions.configStart();
      return;
    }

    if (this.state.loading) {
      return;
    } else {
      this.setState({loading:true});
    }

    SystemActions.loadingStart();
    AuthService.requestForToken()
    .then(()=>{
        return StoreInfoService.requestForStoreInfo();
    })
    .then((storeInfo)=>{
      if (storeInfo.last_synced !== EnvStore.getState().lastSync) {
        console.log("update Last-Sync from:"+EnvStore.getState().lastSync +" to "+ storeInfo.last_synced)
          AuthActions.lastSyncUpdated(storeInfo.last_synced);
          return  Promise.all([
            GroupsItemsService.requestForGroupsItems(),
            TableService.requestForTables(),
            ProdAttributeService.requestForProdAttribute(),
            ModifierService.requestForModifiers()
          ]);
      } else {
        console.log("no update Last-Sync:" + storeInfo.last_synced)
      }
    })
    .then(()=>{
        return OrderService.createNewEmptyOrder();
    })
    .then(()=>{
      SystemActions.loadingFinish();
      this.setState({loading:false});
      this.props.navigator.push({
        'title': 'MainView',
        'from':'',
        'data':''
      });
    }).catch((err) =>{
      console.log('SplashScreen Error')
      console.log(err)
      SystemActions.loadingFinish();
      this.setState({loading:false});
    }).finally(function () {
      SystemActions.loadingFinish();
      this.setState({loading:false});
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.3)'} onPress={this._onViewPress}>
          <Image style={styles.cover} source={require('image!splashscreen')} />
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  cover: {
    flex: 1,
    width: screen.width,
    height: screen.height,
    resizeMode: 'stretch', // or 'cover'
  }
});

module.exports = SplashScreen;
