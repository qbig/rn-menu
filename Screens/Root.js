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
  Navigator
} = React;

var SocketService = require('../API/SocketService');
var GroupsItemsService = require('../API/GroupsItemsService');
var AuthService = require('../API/AuthService');
var TableService = require('../API/TableService');
var ProdAttributeService = require('../API/ProdAttributeService');
var OrderService = require('../API/OrderService');
var ModifierService = require('../API/ModifierService');

var SystemActions = require('../Actions/SystemActions');
var ConfigStore = require('../Stores/ConfigStore');
var EnvStore = require('../Stores/EnvStore');
var ModifierStore = require('../Stores/ModifierStore');
var OrdersStore = require('../Stores/OrdersStore');
var ProdAttributeStore = require('../Stores/ProdAttributeStore');
var TablesStore = require('../Stores/TablesStore');
var GroupsItemsStore = require('../Stores/GroupsItemsStore');

var SplashScreen = require('./SplashScreen');

var hashCode = function(str)
{
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var Root = React.createClass({
  getInitialState: function()
  {
    return{
      navigationBarHidden:false
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() { this._pressData = {}; },
  componentDidMount : function() {
    // var digestAuthRequest = require('./digestAuthRequest');
    // var self = this;
    // var url = 'http://104.155.205.124/auth/login?posGuid=abc';
    // var uri = '/auth/login?posGuid=abc';
    //
    // var req = new digestAuthRequest('GET', url, uri, '7737', '7737');
    // // make the request
    // req.request(function(data) {
    //     console.log('Data retrieved successfully');
    //     console.log(data);
    //     //self.setState({text: JSON.stringify(data)});
    //     console.log('Above is the retrieved');
    // },function(errorCode) {
    //     console.log('no dice: '+errorCode);
    // }, {});
    // SocketService.init();
    // GroupsItemsService.requestForGroupsItems();
    // AuthService.requestForToken();
    // TableService.requestForTables();
    // ProdAttributeService.requestForProdAttribute();
    // OrderService.requestForCurrentOrder();
    // OrderService.createNewEmptyOrder();
    // OrderService.updateCurrentOrder();
    // ModifierService.requestForModifiers();
  },
  _pressRow: function(rowID: number) {

  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = {};
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{name: '', component: SplashScreen}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator });
          }
        }}
        />
    );
  },
});

var styles = StyleSheet.create({
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
