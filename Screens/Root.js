/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';
console.log("root1")
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
console.log("root100")
var SplashScreen = require('./SplashScreen');
console.log("root10")
var MainView = require('./MainView');
console.log("root19")
var ItemList = require('./ItemList');
console.log("root18")
var SetMealView = require('./SetMealView')
console.log("root17")
var OrderList = require('./OrderList');
console.log("root16")
var Settings = require('./Settings');
console.log("root12")
var SocketService = require('../API/SocketService');
var GroupsItemsService = require('../API/GroupsItemsService');
var AuthService = require('../API/AuthService');
var TableService = require('../API/TableService');
var ProdAttributeService = require('../API/ProdAttributeService');
console.log("root1222")
var OrderService = require('../API/OrderService');
var ModifierService = require('../API/ModifierService');
var StoreInfoService = require('../API/StoreInfoService');
var StoreConfigService = require('../API/StoreConfigService');
console.log("root12")
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
var TimerMixin = require('react-timer-mixin');

var CodePush = require("react-native-code-push");
console.log("root2")
var routeSetting = {
  title: 'Settings',
  data: '',
  from: ''
};
import Portal from 'react-native/Libraries/Portal/Portal';
var tag = Portal.allocateTag();

var Root = React.createClass({
  mixins: [ListenerMixin,TimerMixin],
  getInitialState: function() {
      return {
        ang: new Animated.Value(0),
        status: "  LOADING . . .",
        dataInitializing: false,
        dataInitialized: false,
        isAnimating: false
      };
  },

  showLoading : function () {
    this.setTimeout(()=> {
      Portal.showModal(tag, this._modalComponent());
      this._animate();
      this.setState({isAnimating: true});
    }, 0);
  },
  closeLoading : function() {
    Portal.closeModal(tag);
    this.setState({isAnimating: false});
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
    var self = this;
    return new Promise(function(resolve, reject) {
      self.setTimeout(resolve, miliSec);
    });
  },

  bootStrapData: function bootStrapData() {
    var self = this;
    console.log('bootStrapData() started !')
    return StoreConfigService.getConfig().then(function(){
       console.log('bootStrapData() 1 !')
      return TableService.initFromCache();
    }).then(function(){
       console.log('bootStrapData() 2 !')
      SocketService.init();
    }).then(function(){
       console.log('bootStrapData() 3 !')
      return AuthService.requestForToken();
    }).then(function(){
       console.log('bootStrapData() 4 !')
      return self.delay(500);
    }).then(function(){
       console.log('bootStrapData() 5 !')
      return GroupsItemsService.requestForGroupsItems();
    }).then(function(){
       console.log('bootStrapData() 6 !')
      return TableService.requestForTables();
    }).then(function(){
       console.log('bootStrapData() 7 !')
      return ProdAttributeService.requestForProdAttribute();
    }).then(function(){
       console.log('bootStrapData() 8 !')
      return ModifierService.requestForModifiers();
    }).then(function(){
       console.log('bootStrapData() 9 !')
      return StoreInfoService.requestForStoreInfo();
    }).catch(function(err) {
      console.log("bootStrapData() failed !!!!!!!!!")
      console.log(err);
      throw err;
    });
//
//     try {
//       await StoreConfigService.getConfig();
//       console.log('bootStrapData() 1 !')
//       await TableService.initFromCache();
//       console.log('bootStrapData() 2 !')
//       SocketService.init();
//       console.log('bootStrapData() 3 !')
//       await AuthService.requestForToken();
//       console.log('bootStrapData() 4 !')
//     //  await this.delay(10);
//       await GroupsItemsService.requestForGroupsItems();
//       console.log('bootStrapData() 5 !')
// //      await this.delay(10);
//       await TableService.requestForTables();
//       console.log('bootStrapData() 6 !')
//   //    await this.delay(10);
//       await ProdAttributeService.requestForProdAttribute();
//       console.log('bootStrapData() 7 !')
//     //  await this.delay(10);
//       await ModifierService.requestForModifiers();
//       console.log('bootStrapData() 8 !')
//       //await this.delay(10);
//       await StoreInfoService.requestForStoreInfo();
//       console.log('bootStrapData() 9 !')
//     } catch(err) {
//       console.log("bootStrapData() failed !!!!!!!!!")
//       console.log(err);
//       throw err;
//     }
  },

  updateLoading: function () {
    if (EnvStore.getState().isLoading) {
      if (!this.state.isAnimating) {
          this.showLoading();
      }
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
    console.log('Root reset!')
    if (EnvStore.getState().reset) {
      this._nav.popToTop();
      SystemActions.orderResetComplete.defer();
    }
  },

  initData: function() {
    console.log('initData!')
    if (this.state.dataInitializing) {
      return;
    }

    if (EnvStore.getState().webToken == "" || EnvStore.getState().lastSync == ""){
      this.setState({dataInitializing:true})
      this.showLoading();
      this.bootStrapData()
      .then(()=>{
        this.closeLoading();
        this.setState({
          dataInitializing:false,
          dataInitialized:true
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
          dataInitializing:false
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
    CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME })

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
console.log("root3")
