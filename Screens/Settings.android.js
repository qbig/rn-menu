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
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ListView,
  NativeModules
} = React;
var NSDModule = NativeModules.NSDModule
var StatusBar = require('../Components/StatusBar');
var SetMealView = require('./SetMealView');
var OrderList = require('./OrderList');
var TablesStore = require('../Stores/TablesStore');
var ConfigStore = require('../Stores/ConfigStore');
var TableActions = require('../Actions/TableActions');
var SystemActions = require('../Actions/SystemActions');
var StoreConfigService = require('../API/StoreConfigService');
var screen = require('Dimensions').get('window');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var Toast = require('../Lib/Toast');
var TITLE_LENGTH = 20;

function trimString(str, length) {
  return str.length > length ?
                      str.substring(0, length - 3) + "..." :
                      str.substring(0, length);
}

var ds = new ListView.DataSource({
  rowHasChanged           : (row1, row2) => true, //row1 !== row2,
  sectionHeaderHasChanged : (s1, s2) => true//s1 !== s2
});

var Settings = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    var tbInfo = TablesStore.getState().tableInfo;

    var tbItems = tbInfo.map(function(section, index){
      return section.tables
    });
    var sectionIDs = tbInfo.map(function(section, index){
      return index + '';
    });
    var rowIDs = tbInfo.map(function(section, index){
      return section.tables.map(function(table, tbIndex){
        return tbIndex + ''
      });
    });

    return {
      pin: '',
      setTableView: false,
      firstTime: false,
      table: tbInfo,
      dataSource : ds.cloneWithRowsAndSections(tbItems, sectionIDs, rowIDs),
      selectedTableId: ConfigStore.getState().tableId
    };
  },
  _handleTableSelectedChange: function() {
    console.log('Settings _handleTableSelectedChange!')
    if (this.state.firstTime && ConfigStore.getState().tableId != -1) {
        this.props.navigator.pop();
    }

    var tbInfo = TablesStore.getState().tableInfo;
    var sectionIDs = tbInfo.map(function(section, index){
      return index + '';
    });
    var rowIDs = tbInfo.map(function(section, index){
      return section.tables.map(function(table, tbIndex){
        return tbIndex + ''
      });
    });

    var tbItems = tbInfo.map(function(section, index){
      return section.tables
    });
    this.setState({
      table: tbInfo,
      dataSource : ds.cloneWithRowsAndSections(tbItems, sectionIDs, rowIDs),
      selectedTableId: ConfigStore.getState().tableId,
      setTableView: false
    })
    console.log('!!!! after update this.state.selectedTableId:' + this.state.selectedTableId)
  },
  componentWillMount: function() {
    this.listenTo(ConfigStore, this._handleTableSelectedChange);
  },

  componentDidMount: function() {
    NSDModule.getDeviceID((err)=>{
      console.log(err);
    }, (id)=>{
      this.setState({
        deviceID: id
      })
    });
  },

  _onBackToMainView: function() {
    if (!ConfigStore.getState().host) {
      Toast.show("Pls choose a host.", Toast.LONG);
    } else if (this.state.selectedTableId == -1) {
      Toast.show("Pls choose a Table for this device.", Toast.LONG);
      return;
    }
    this.props.navigator.pop();
  },
  _pressRow: function(rowData) {
    if (this.state.selectedTableId == -1) {
      this.setState({firstTime: true})
    }
    TableActions.tableIdUpdated(rowData);
  },

  renderSectionHeader: function(sectionData, sectionID) {
    return (
      <View key={'section:' + sectionID} style={styles.section}>
        <Text style={styles.sectionText}>{this.state.table[sectionID].name}</Text>
      </View>
      )
  },

  _renderRow: function(rowData: map, sectionID: number, rowID: number) {
    var selected = rowData.id == this.state.selectedTableId;
    return (
      <TouchableHighlight activeOpacity = {0.8}
        key={ sectionID + ":" + rowID}
        underlayColor = {'rgba(255,255,255,0.1)'}
        onPress = {() => this._pressRow(rowData)}>
        <View style = {[styles.column, selected&&{backgroundColor:'#891F02'}]} >
          <Text style = {[styles.text, selected&&{color:'white'} ]}> {rowData.name} </Text>
          {selected ? <Image style={{width:60, height: 60, resizeMode: 'contain'}} source={require('../img/icn_tick_white.png')}/> : null}
          <View style = {styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  _renderTableList: function() {
    return (
      <View style = {styles.listview} >
        <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this._renderRow}
            renderSectionHeader = {this.renderSectionHeader}
            showsVerticalScrollIndicator={false}/>
      </View>
    );
  },

  _renderPinField: function()  {
    return (
      <View style={styles.emptyViewContainer}>
        <View style={styles.emptyInfo}>
          <TextInput
            onChangeText={(pin) => this.setState({pin})}
            maxLength={4} // current not effect
            secureTextEntry={true}
            autoFocus={true}
            keyboardType={'default'} // 'numeric would broke secureTextEntry'
            underlineColorAndroid={'#891F02'}
            placeholder={"Pls enter staff PIN"}
            placeholderTextColor={'#999'}
            style={styles.emptyText} />
        </View>
      </View>
    );
  },

  _renderEmptyView() {

      return (
        <View style={styles.emptyViewContainer}>
        {ConfigStore.getState().password ? <TouchableHighlight style={styles.emptyBtn}
          activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={()=>{
            this.setState({setTableView: true});
          }}>
          <Text style={styles.emptyText}>CHANGE TABLE</Text>
        </TouchableHighlight> : null }
        <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8}
          underlayColor={'rgba(255,255,255,0.1)'} onPress={()=>{
            SystemActions.loadingStart();
            StoreConfigService.discoverFromLocalWifi()
            .then((configInfo)=>{
              SystemActions.loadingFinish();
              this.props.navigator.pop();
              SystemActions.configInfoUpdate({
                host: configInfo['host'],
                guid: configInfo['guid'],
                username: configInfo['username'],
                password: configInfo['password'],
                description: configInfo['description']
              })
            }).catch((e)=>{
              SystemActions.loadingFinish();
              if (e === "NotFound") {
                Toast.show("No nearby host is found.", Toast.LONG);
              }
            }).finally(function () {
              SystemActions.loadingFinish();
            });
          }}>
          <Text style={styles.emptyText}>SEARCH NEARBY HOST</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8}
          underlayColor={'rgba(255,255,255,0.1)'} onPress={()=>{
            this.props.navigator.pop();
            SystemActions.configInfoUpdate({
              host: "http://104.155.205.124", //"http://192.168.0.119"
              guid: "abc",
              username: "4021",
              password: "4021",
              description: "TEST"
            });
          }} >
          <Text style={styles.emptyText}>YCY TEST HOST</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8}
          underlayColor={'rgba(255,255,255,0.1)'} onPress={()=>{
            this.props.navigator.pop();
            SystemActions.configInfoUpdate({
              guid: this.state.deviceID
            })
          }} >
          <Text style={styles.emptyText}>{this.state.deviceID}</Text>
        </TouchableHighlight>
      </View>
    );
  },

  render: function() {
    var content;
    if (!ConfigStore.getState().password) {
      // no host set(therefore, no password)
      content = this._renderEmptyView(); // without table options
    } else if (this.state.setTableView || ConfigStore.getState().tableId == -1) {
      // after 'change table selected, or no table set yet
      content = this._renderTableList();
    } else if (this.state.pin =='' || this.state.pin != ConfigStore.getState().password){
      // has host&table set already, to change, show pin field
      content = this._renderPinField();
    }  else {
      // has host&table set already, pin keyed in as well, show options
      content = this._renderEmptyView(); // with table options
    }
    return (
      <View style = {styles.container}>
        <StatusBar />
        <View style = {styles.navBar}>
          <View style = {{flexDirection: 'column',flex: 1,left: 10,justifyContent: 'center',alignItems: 'flex-start',}}>
            <TouchableHighlight activeOpacity = {0.8}
              underlayColor = {'rgba(255,255,255,0.1)'}
              onPress = {this._onBackToMainView} >
              <View style = {styles.backButtonContainer}>
                <Image source = {require('../img/btn_back.png')}/>
                <Text style = {styles.backButton}> Back </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style = {{flexDirection: 'column',flex: 1,justifyContent: 'center',alignItems: 'center',}} >
            <Text style = {styles.navBarText} > Settings </Text>
          </View>
          <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center', top: 10, alignItems: 'flex-start', }} >
          </View>
        </View>
        <View style = {styles.separator}/>
          {content}
        </View>
    );
  }
});

var styles = StyleSheet.create({
  emptyViewContainer: {
    flex:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 23,
    alignItems: 'center',
    color: '#891F02',
  },

  emptyBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EDE4',
    height:60,
    width: screen.width,
    borderBottomWidth:2.7,
    borderColor: '#CCA697'
  },

  emptyInfo: {
    height:60,
    width:300,
    marginBottom: 30
  },

  backButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft:20,
    height: 60,
    alignItems: 'center',
  },

  backButton: {
    fontFamily: 'AvenirNext-Regular',
    paddingLeft: 10,
    height: 25,
    color: '#8D383D',
    marginLeft:8
  },

  overlay: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listview: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },

  thumb1: {
    top: 15,
    right: 15,
    width: 100,
    height: 100,
    alignItems: 'center',
  },

  thumb: {
    width: 290,
    height: 220,
    paddingLeft: 10,
    alignItems: 'center',
  },

  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#891F02',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0
  },

  column: {
    flex: 1,
    height: 55,
    flexDirection: 'row',
  },

  row: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 0,
  },

  separator: {
    height: 1,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D'
  },

  statusBar: {
    flex: 0,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0
  },

  statusBarTextLeft: {
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 14,
    alignItems: 'center',
    color: 'white',
    paddingLeft: 15,
  },

  statusBarTextRight: {
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 14,
    alignItems: 'flex-end',
    color: 'white',
    paddingRight: 4,
    textAlign: 'right',
  },

section: {
  width: screen.width,
  height: 70,
  backgroundColor: '#891F02',
  borderTopWidth:1,
  borderBottomWidth:1,
  borderColor: 'white',
  paddingLeft:20,
  justifyContent: 'center'
},

sectionText: {
  color: 'white',
  fontFamily: 'AvenirNext-Medium',
  fontSize: 26,
},

  icon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },

  navBar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EDE4',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0
  },

  navBarText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 23,
    alignItems: 'center',
    color: '#891F02',
  },

  topGoToOrderBtn: {
    backgroundColor:'#891F02',
    right: 0,
    position: 'absolute',
    height: 60,
    width: screen.width / 4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  topGoToOrderText: {
    color:'#FFFAF0',
    fontWeight: 'bold',
    width: 60,
    fontSize: 15,
  },

  blackText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: '400',
  },

  menubutton: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    marginLeft: 0
  },

  headerImage: {
    flex: 1,
    alignSelf: 'auto',
    alignItems: 'center',
    flexDirection: 'column',
    top: 30,
  },

  homebutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    flex: 1,
    fontSize: 23,
    paddingLeft: 10,
    marginLeft: 15,
    marginTop: 10,
    alignItems: 'center',
    color: '#802628',
    fontFamily: 'AvenirNext-Regular',
  },

  textDesc: {
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 17,
    paddingLeft: 10,
    marginLeft: 10,
    marginTop: 5,
    color: 'black',
  },

  textPrice: {
    fontFamily: 'AvenirNext-Medium',
    textAlign: 'center',
    fontSize: 16,
  },

  footerText: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 23,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',

  },

});

module.exports = Settings;
