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
  Easing
} = React;

var SplashScreen = require('./SplashScreen');
var MainView = require('./MainView');
var ItemList = require('./ItemList');
var SetMealView = require('./SetMealView')
var OrderList = require('./OrderList');


var SocketService = require('../API/SocketService');
var GroupsItemsService = require('../API/GroupsItemsService');
var AuthService = require('../API/AuthService');
var TableService = require('../API/TableService');
var ProdAttributeService = require('../API/ProdAttributeService');
var OrderService = require('../API/OrderService');
var ModifierService = require('../API/ModifierService');
var StoreInfoService = require('../API/StoreInfoService');

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
import Portal from 'react-native/Libraries/Portal/Portal';
var tag = Portal.allocateTag();

var Root = React.createClass({
  getInitialState: function() {
      return {
        ang: new Animated.Value(0),
        status: "  LOADING . . ."
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
    try {
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
      console.log("!!!!!!!!!")
    }
  },
  componentWillMount: function() {
    if (EnvStore.getState().webToken == "" || EnvStore.getState().lastSync == ""){
      this.showLoading();
      this.bootStrapData()
      .then(()=>{
        this.closeLoading();
        EnvStore.listen(this.updateLoading);
      })
      .catch((err)=>{
        console.log(err)
        this.setState({
          status: "SHIT..."
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

  updateLoading: function () {
    if (EnvStore.getState().isLoading) {
      this.showLoading();
    } else {
      this.closeLoading();
    }
  },

  componentDidMount : function() {},

  render: function() {
    return (
        <Navigator
          initialRoute={{data: '', from:'', title: 'SplashScreen'}}
          configureScene={() => {
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
