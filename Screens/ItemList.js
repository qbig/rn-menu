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
  TouchableHighlight,
  ListView,
  ToastAndroid,
  InteractionManager
} = React;
var StatusBar = require('../Components/StatusBar');
var SetMealView = require('./SetMealView');
var OrderList = require('./OrderList');
var OrdersStore = require('../Stores/OrdersStore');
var GroupsItemsStore = require('../Stores/GroupsItemsStore');
var EnvStore = require('../Stores/EnvStore');
var OrderActions = require('../Actions/OrderActions');
var SystemActions = require('../Actions/SystemActions');
var screen = require('Dimensions').get('window');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var TITLE_LENGTH = 20;

function trimString(str, length) {
  return str.length > length ?
                      str.substring(0, length - 3) + "..." :
                      str.substring(0, length);
}

var imgArr = [require('image!item_1'), require('image!item_2'), require('image!item_3'), require('image!item_4'), require('image!item_5'), require('image!item_6'), require('image!item_7'), require('image!item_8')];
var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
var ItemList = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return {
      data: GroupsItemsStore.getState().groupsItems[this.props.data],
    }
  },
  _handleOrderItemsChange: function() {
    this.setState({
      data: GroupsItemsStore.getState().groupsItems[this.props.data],
      dataSource: ds.cloneWithRows(GroupsItemsStore.getState().groupsItems[this.props.data].products)
    })
  },

  componentDidMount: function() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        // this.props.data --> index of selected group
        data: GroupsItemsStore.getState().groupsItems[this.props.data],
        dataSource: ds.cloneWithRows(GroupsItemsStore.getState().groupsItems[this.props.data].products)
      });
    });
  },

  componentWillMount: function() {
    this.listenTo(OrdersStore, this._handleOrderItemsChange);
    this.listenTo(GroupsItemsStore, this._handleOrderItemsChange);
  },
  _onBackToMainView: function() {
    this.props.navigator.pop();
  },
  _pressRow: function(rowData) {
    if (!rowData.soldOut) {
      OrderActions.orderItemStarted(rowData);
      this.props.navigator.push({
        title: 'SetMealView',
        from: trimString(this.state.data.name, 15),
        data: rowData
      });
    } else {
      ToastAndroid.show("The item is sold out.", ToastAndroid.LONG);
    }
  },

  _onViewOrderPress: function() {
    this.props.navigator.push({
      title: 'OrderList',
      from: trimString(this.state.data.name, 15),
      data:''
    });
  },

  _renderViewOrderButton : function () {
    var count = OrdersStore.getUnsentOrderCount();
    var sum = OrdersStore.getUnsentOrderSum();
    if (count > 0) {
      return (
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this._onViewOrderPress}>
           <View style={styles.footer}>
                <Text style={styles.footerText}>查看订单 VIEW ORDER - {count} ITEM (${sum}) </Text>
           </View>
         </TouchableHighlight>
      );
    }
  },

  _renderRow: function(rowData: map, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight activeOpacity = {0.8}
        key={rowID}
        underlayColor = {'rgba(255,255,255,0.1)'}
        onPress = {() => this._pressRow(rowData)}>
        <View style = {styles.column} >
          <View style = {styles.row}>
            <View>
              <Image style ={styles.thumb}
                  source = {rowData.images.length > 0 ? {uri:  rowData.images[0].url} : imgArr[0]}/>
            </View>
            <View style = {styles.column}>
              <View style = {{width: screen.width - 420}} >
                <Text style = {styles.text}> {rowData.name} </Text>
              </View>
              <View>
                <View style = {{width: screen.width - 420}} >
                  <Text style = {styles.textDesc} numberOfLines = {7} > {rowData.description} </Text>
                </View>
              </View>
             </View>
          <View>
            <Image style = {styles.thumb1}
              source = { require('image!btn_option_unselected')}>
              <View style = {styles.overlay} >
                <Text style = {styles.textPrice} >
                  {rowData.soldOut? 'SOLD \nOUT' : (rowData.price/ 100.0).toFixed(2)}
                </Text>
              </View>
            </Image>
          </View>
        </View>
        <View style = {styles.separator}/>
      </View>
    </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <View style = {styles.container}>
        <StatusBar />
        <View style = {styles.navBar}>
          <View style = {{flexDirection: 'column', flex: 1, left: 10, justifyContent: 'center', alignItems: 'flex-start',}}>
            <TouchableHighlight activeOpacity = {0.8}
              underlayColor = {'rgba(255,255,255,0.1)'}
              onPress = {this._onBackToMainView} >
              <View style = {styles.backButtonContainer}>
                <Image source = {require('image!btn_back')}/>
                <Text style = {styles.backButton}> {this.props.from} </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style = {{flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center',}} >
            <Text style = {styles.navBarText} > {trimString(this.state.data.name, TITLE_LENGTH)} </Text>
          </View>
          <View style = {{flexDirection: 'column', flex: 1, justifyContent: 'center', top: 10, alignItems: 'flex-start',}} >
          </View>
          <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.topGoToOrderBtn} onPress={this._onViewOrderPress}>
            <Text style={styles.topGoToOrderText}>{'订单\nORDER LIST'}</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.separator}/>
        {this.state.dataSource ?
        <View style = {styles.listview}>
          <ListView
              dataSource = {this.state.dataSource}
              renderRow = {this._renderRow}
              showsVerticalScrollIndicator={false}/>
          </View> : <View style={styles.emptyViewContainer}>
            <Text style={styles.emptyText}>Loading ...</Text>
          </View>}
        {this._renderViewOrderButton()}
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
    height: 220,
    flexDirection: 'column',
  },

  row: {
    flex: 1,
    height: 70,
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
    width: 85,
    textAlign: 'center',
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
    fontSize: 24,
    paddingLeft: 10,
    marginLeft: 15,
    marginTop: 20,
    alignItems: 'center',
    color: '#802628'
  },

  textDesc: {
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 14,
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

module.exports = ItemList;
