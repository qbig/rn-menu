/**
* Sample React Native App
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
  Navigator,
  Animated,
  Easing,
  ToastAndroid
} = React;

var SplashScreen = require('./SplashScreen');
var MainView = require('./MainView');
var ItemList = require('./ItemList');
var SetMealView = require('./SetMealView')
var OrderList = require('./OrderList');
var Settings = require('./Settings');

var SocketService = require('../API/SocketService');
var GroupsItemsService = require('../API/GroupsItemsService');
var AuthService = require('../API/AuthService');
var TableService = require('../API/TableService');
var ProdAttributeService = require('../API/ProdAttributeService');
var OrderService = require('../API/OrderService');
var ModifierService = require('../API/ModifierService');
var StoreInfoService = require('../API/StoreInfoService');
var StoreConfigService = require('../API/StoreConfigService');

var SystemActions = require('../Actions/SystemActions');
var ConfigStore = require('../Stores/ConfigStore');
var EnvStore = require('../Stores/EnvStore');
var ModifierStore = require('../Stores/ModifierStore');
var OrdersStore = require('../Stores/OrdersStore');
var ProdAttributeStore = require('../Stores/ProdAttributeStore');
var TablesStore = require('../Stores/TablesStore');
var GroupsItemsStore = require('../Stores/GroupsItemsStore');

var okayImage = require('image!icn_tick');
var loadingImage = require('image!icn_sync');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var routeSetting = {
  title: 'Settings',
  data: '',
  from: ''
};
import Portal from 'react-native/Libraries/Portal/Portal';
var tag = Portal.allocateTag();

var Root = React.createClass({
  mixins: [ListenerMixin,],
  getInitialState: function() {
      return {
        ang: new Animated.Value(0),
        status: "  LOADING . . .",
        initializing: false,
        initialized: false
      };
  },

  showLoading : function () {
    setTimeout(()=> {
      Portal.showModal(tag, this._modalComponent());
      this._animate();
    }, 0);
  },
  closeLoading : function() {
    Portal.closeModal(tag);
  },

  _animate : function () {
    if (Portal.getOpenModals().length == 0){
      return;
    }
    this.state.ang.setValue(0);
    Animated.timing(
      this.state.ang,
      {
        toValue: 360,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(this._animate);
  },

  delay : function(miliSec) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, miliSec);
    });
  },

  bootStrapData: async function bootStrapData() {
    console.log('bootStrapData !')
    try {
      await StoreConfigService.getConfig();
      await TableService.initFromCache();
      SocketService.init();
      await AuthService.requestForToken();
      await this.delay(10);
      await GroupsItemsService.requestForGroupsItems();
      await this.delay(10);
      await TableService.requestForTables();
      await this.delay(10);
      await ProdAttributeService.requestForProdAttribute();
      await this.delay(10);
      await ModifierService.requestForModifiers();
      await this.delay(10);
      await StoreInfoService.requestForStoreInfo();
    } catch(err) {
      console.log("!!!!!!!!!")
      console.log(err);
      throw err;
    }
  },

  updateLoading: function () {
    if (EnvStore.getState().isLoading) {
      this.showLoading();
    } else {
      this.closeLoading();
    }
  },

  startConfigFlow: function() {
    if (EnvStore.getState().configStart){
        var currentRoutes = this._nav.getCurrentRoutes();
        this._nav.immediatelyResetRouteStack(currentRoutes.slice(0, 1).concat(routeSetting))
        SystemActions.configDone.defer();
        console.log("config should start now")
    }
  },

  reset: function() {
    if (EnvStore.getState().reset) {
      this._nav.popToTop();
      SystemActions.orderResetComplete.defer();
    }
  },

  initData: function() {
    console.log('initData!')
    if (this.state.initializing) {
      return;
    }

    if (EnvStore.getState().webToken == "" || EnvStore.getState().lastSync == ""){
      this.setState({initializing:true})
      this.showLoading();
      this.bootStrapData()
      .then(()=>{
        this.closeLoading();
        this.setState({
          initializing:false,
          initialized:true
        })
        if (ConfigStore.getState().tableId == -1) {
          this._nav.push(routeSetting); // to choose a table
        }
      })
      .catch((err)=>{
        if (err === "NotFound") {
          this.closeLoading();
          this._nav.push(routeSetting); // to choose a config(ip, etc)
        }
        console.log(err)
        this.setState({
          status: "PLS TRY AGAIN...",
          initializing:false
        });
      }).then(()=>{
        return this.delay(2000)
      }).then(()=>{
        this.closeLoading();
        this.setState({
          status: "LOADING..."
        });
      });
    }
  },

  componentDidMount: function() {
    this.listenTo(EnvStore, this.updateLoading);
    this.listenTo(EnvStore, this.startConfigFlow);
    // only now the _nav ref is available
    this.listenTo(EnvStore, this.reset);
    this.listenTo(ConfigStore, this.initData);
    this.initData();
  },

  _modalComponent: function() {
    return (
      <View activeOpacity={0.8} style={styles.modal}>
        <View style={styles.modalsContainer}>
          <Animated.Image
            activeOpacity={0.8}
            source={loadingImage}
            style={{
              width:80,
              height:80,
              resizeMode: 'contain',
              backgroundColor: 'transparent',
              transform: [
                {rotate: this.state.ang.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                  })},
              ]
            }} />
          <Text style={styles.modalText}>{this.state.status}</Text>
        </View>
      </View>);
  },

  render: function() {
    return (
        <Navigator
          ref={(nav) => this._nav = nav}
          initialRoute={{data: '', from:'', title: 'SplashScreen'}} //
          configureScene={(route) => {
            if (route.title === "Settings") {
              return Navigator.SceneConfigs.FloatFromBottom;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if (route.title === "SplashScreen") {
              return <SplashScreen navigator={navigator} data={route.data} from={route.from} />
            }
            if (route.title === "MainView") {
              return <MainView navigator={navigator} data={route.data} from={route.from} />
            }
            if (route.title === "ItemList") {
              return <ItemList navigator={navigator} data={route.data} from={route.from} />
            }
            if (route.title === "SetMealView") {
              return <SetMealView navigator={navigator} data={route.data} from={route.from} />
            }
            if (route.title === "OrderList") {
              return <OrderList navigator={navigator} data={route.data} from={route.from} />
            }
            if (route.title === "Settings") {
              return <Settings navigator={navigator} data={route.data} from={route.from} />
            }
          }}
          />
    );
  },
});

var styles = StyleSheet.create({
  modal: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  modalsContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10
  },
  modalText: {
    padding: 10,
    fontSize: 15
  },
  menubutton: {
    alignItems: 'flex-start'
  },
  backbutton: {
    flex:1
  },
  container: {
    flex: 1
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'column',
    paddingBottom: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    fontSize:22,
  },
});

module.exports = Root;
