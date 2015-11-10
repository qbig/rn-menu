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
} = React;

var screen = require('Dimensions').get('window');
var OrdersStore = require('../Stores/OrdersStore');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var ConfigStore = require('../Stores/ConfigStore');
var OrderService = require('../API/OrderService');
var OrderActions = require('../Actions/OrderActions');
var SystemActions = require('../Actions/SystemActions');
/*
1. view margin padding adjustment
*/
var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var OrderList = React.createClass({
  mixins: [ListenerMixin],
  getInitialState: function() {
    return {
      isAlertVisibale: false,
      orders: OrdersStore.getState(),
      dataSource: ds.cloneWithRows(OrdersStore.getState().unsentItems),
      viewOrder: true,
      showSentOrder: false
    };
  },

  isEmpty: function () {
    if (this.state.viewOrder) {
      return this.state.orders.unsentItems.length === 0;
    } else {
      return this.state.orders.sentItems.length === 0;
    }
  },

  togglePressed: function() {
    if (this.state.viewOrder) {
      this.setState({
        isAlertVisibale: false,
        orders: OrdersStore.getState(),
        dataSource: ds.cloneWithRows(OrdersStore.getState().sentItems.concat({name:'total'})),
        viewOrder: false,
        showSentOrder: false
      });
    } else {
      this.setState({
        isAlertVisibale: false,
        orders: OrdersStore.getState(),
        dataSource: ds.cloneWithRows(OrdersStore.getState().unsentItems),
        viewOrder: true,
        showSentOrder: false
      });
    }
  },

  alertNoPressed: function() {
    this.setState({
      isAlertVisibale: !this.state.isAlertVisibale
    });
  },

  alertYesPressed: function() {
    this.setState({
      isAlertVisibale: !this.state.isAlertVisibale
    });
    this.props.navigator.pop();
  },
  _handleOrdersChange: function(){
    this.setState({
      orders: OrdersStore.getState(),
      dataSource: ds.cloneWithRows(OrdersStore.getState().unsentItems)
    });
  },

  componentWillMount: function() {
    this.listenTo(OrdersStore, this._handleOrdersChange);
  },

  _onBackToMainView: function() {
    this.props.navigator.pop();
  },

  sendOrderPress: function() {
    var self = this;
    SystemActions.loadingStart();
    OrderService.updateCurrentOrder()
    .then(function(){
      SystemActions.loadingFinish();
      self.setState({showSentOrder:true});
    }).catch(function(){
      SystemActions.loadingFinish();
    })
  },

  _pressRow: function(rowID: number) {
    if (this.state.viewOrder) {
      if (!this.state.isAlertVisibale) {
        this.setState({
          isAlertVisibale: !this.state.isAlertVisibale
        });
      }
    }
  },

  handleDecrement: function(rowID) {
    if(this.state.viewOrder) {
      OrderActions.unsentOrderItemDecrement(rowID);
    }
  },

  handleIncrement: function(rowID) {
    if (this.state.viewOrder) {
      OrderActions.unsentOrderItemIncrement(rowID);
    }
  },

  backToMain: function() {
    this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1])
  },

  _renderRow: function(rowData: map, sectionID: number, rowID: number) {
    var storeInfo = ConfigStore.getState().storeInfo;
    var cellView;
    if (rowData.name != 'total') {
      return (
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={() => this._pressRow(rowID)}>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.columnInner}>
                <View>
                  <Text style={styles.itemName}>
                    {rowData.data.name}
                  </Text>
                </View>
                <View>
                  <Text style={styles.itemDesc}>
                    {rowData.getModsStrWithComment()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rowSepView}>
              <View style={styles.column1}>
                <Text style={styles.blackText}> QUANTITY </Text>
              </View>
              <View style={styles.columnSep}/>

              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={[styles.column2, !this.state.viewOrder&&{opacity: 0}]} onPress={()=>{this.handleDecrement(rowID)}}>
                <View style={styles.column2}>
                  <Image style={{ resizeMode:Image.resizeMode.contain}} source={require('image!btn_qty_less')} />
                </View>
              </TouchableHighlight>
              <View style={styles.columnSep}/>
              <View style={styles.column3}>
                <Text style={styles.blackTextBold}> {rowData.quantity} </Text>
              </View>
              <View style={styles.columnSep}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={[styles.column2, !this.state.viewOrder&&{opacity: 0}]} onPress={()=>{this.handleIncrement(rowID)}}>
                <View style={styles.column2}>
                  <Image style={{ resizeMode:Image.resizeMode.contain}} source={require('image!btn_qty_more')} />
                </View>
              </TouchableHighlight>
              <View style={styles.columnSep}/>

              <View style={styles.column5}>
                <Text style={styles.blackText}> PRICE </Text>
              </View>

              <View style={styles.column6}>
                <Text style={styles.blackTextBold}> ${Number(rowData.getCost()/100.0).toFixed(2)} </Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>SUB TOTAL</Text>
                  <Text style={styles.textTotalValue}>{OrdersStore.getOrderSum()}</Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>DISCOUNT</Text>
                  <Text style={styles.textTotalValue}>0.00</Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>SERVICE CHARGE</Text>
                  <Text style={styles.textTotalValue}>{Number(storeInfo.service_charge * OrdersStore.getOrderSum()/100.0).toFixed(2)}</Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>GST</Text>
                  <Text style={styles.textTotalValue}>{Number(storeInfo.tax * OrdersStore.getOrderSum()/100.0).toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowSepView}>
              <View style={styles.totalColumn1}>
                <Text style={styles.redText}>CURRENT TOTAL</Text>
              </View>
              <View style={styles.totalColumn2}>
                <Text style={styles.redText}>${Number((storeInfo.tax+storeInfo.service_charge+100) * OrdersStore.getOrderSum()/100.0).toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
    }
  },

  _renderEmptyView() {
    var message= '';
    if (this.state.viewOrder) {
      if (this.state.showSentOrder) {
        message = "ORDER SENT! THANK YOU."
      } else {
        message = "YOUR ORDER LIST IS EMPTY."
      }
    } else {
      message = "THERE ARE NO ITEMS IN YOUR BILL."
    }
    return (
      <View style={styles.emptyViewContainer}>
        <View style={styles.emptyInfo}>
          <Text style={[styles.emptyText, {textAlign: 'center'}]}>{message}</Text>
        </View>
        <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.backToMain}>
          <Text style={styles.emptyText}>RETURN TO MAIN MENU</Text>
        </TouchableHighlight>
        {this.state.viewOrder ? <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.togglePressed} >
        <Text style={styles.emptyText}>VIEW BILL</Text>
      </TouchableHighlight> : null}
    </View>
  );
},

_renderListView() {
  return (
    <View style={styles.listView}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        />
    </View>
  );
},

render: function() {
  var noBtn = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>No</Text>: null;
  var yesBtn = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Yes</Text>: null;
  var textMessage = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Would you like to edit meal?</Text>  : null ;
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTextLeft}> TABLE 1 </Text>
        <Text style={styles.statusBarTextRight}> CONNECTED </Text>
        <Image style={styles.icon} source={require('image!icn_connected')} />
      </View>
      <View style={styles.navBar}>
        <View style={{flexDirection: 'column', flex:1, left:10, justifyContent: 'center', alignItems: 'flex-start',}}>
          <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this._onBackToMainView}>
            <View style={{flexDirection: 'row', flex:1}}>
              <Image source={require('image!btn_back')}  />
              <Text style={styles.backButton}>Back</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'center',}}>
          <Text style={styles.navBarText}>{this.state.viewOrder ? 'ORDER LIST' : 'BILL TOTAL'} </Text>
        </View>
        <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'center',}} >
          <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}
            style={styles.toggleBtn} onPress={this.togglePressed}>
            <Text style={styles.toggleBtnText}>{this.state.viewOrder ? 'VIEW BILL' : 'VIEW ORDER'}</Text>
          </TouchableHighlight>
        </View>
      </View>
      {this.isEmpty() ? this._renderEmptyView() : this._renderListView()}
      <View style={this.state.isAlertVisibale ? styles.overlayVisible : styles.overlayInVisible} >
        <View  style={this.state.isAlertVisibale ? styles.alertBodyVisible : styles.alertBodyInVisible}>
          <View  style={this.state.isAlertVisibale ? styles.alertRowVisible : styles.alertRowInVisible}>
            {textMessage}
          </View>
          <View  style={this.state.isAlertVisibale ? styles.alertSecondRowVisible : styles.alertSecondRowInVisible}>
            <View  style={this.state.isAlertVisibale ? styles.alertCollVisible : styles.alertCollInVisible}>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.alertYesPressed}>
                <View style={this.state.isAlertVisibale ? styles.alertBtnVisible : styles.alertBtnInVisible}>
                  {yesBtn}
                </View>
              </TouchableHighlight>
            </View>
            <View  style={this.state.isAlertVisibale ? styles.alertCollVisible : styles.alertCollInVisible}>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.alertNoPressed}>
                <View style={this.state.isAlertVisibale ? styles.alertBtnVisible : styles.alertBtnInVisible}>
                  {noBtn}
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>

      {this.isEmpty() ? null : <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.sendOrderPress}>
      <View style={styles.footer}>
        <Text style={styles.footerText}>SEND ORDER</Text>
      </View>
    </TouchableHighlight>}
    <View style={styles.separator} />
  </View>
);
}
});
var styles = StyleSheet.create({
  toggleBtn: {
    margin: 10,
    marginRight:0,
    width:90,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderColor: '#8D383D',
    borderWidth: 1.2,
  },
  toggleBtnText: {
    color: '#8D383D',
    width: 50,
    textAlign: 'center',
  },
  backButton: {
    fontFamily: 'AvenirNextLTPro-Regular',
    paddingLeft: 10,
    alignItems: 'flex-start',
    textAlign: 'left',
    color: '#8D383D',
  },
  listView: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 0,
    paddingLeft: 0
  },
  emptyViewContainer: {
    flex:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'AvenirNextLTPro-Regular',
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
    width:310,
    marginBottom: 30
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
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
  footerText: {

    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 23,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',

  },
  column: {
    flex: 1,
    width: screen.width,
    flexDirection: 'column',
  },
  columnInner: {
    flex: 1,
    width: screen.width,
    flexDirection: 'column',
  },
  columnInnerRight: {
    flex: 1,
    width: screen.width,
    height: 80,
    flexDirection: 'column',
    right: 20,
    alignItems: 'flex-end',
  },
  borderCS: {
    flex: 1,
    borderRightColor: 'red',

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 0,
    paddingTop: 7,
  },
  rowWithOp: {

    height: 23,
    flexDirection: 'row',

  },
  rowWithOption: {
    flex: 1,
    height: 23,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: screen.width,
    marginRight: 10,
  },

  separator: {
    height: 1,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D'
  },
  columnSeperator: {
    width: 1,
    alignItems: 'flex-end',
    backgroundColor: 'black',
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
    flex: 1,
    fontSize: 14,
    alignItems: 'center',
    color: '#10E790',
    paddingLeft: 15,
  },
  statusBarTextRight: {
    flex: 1,
    fontSize: 14,
    alignItems: 'flex-end',
    color: '#10E790',
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
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 23,
    alignItems: 'center',
    color: '#891F02',
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
  itemName: {
    flex: 1,
    fontSize: 24,
    paddingLeft: 10,
    marginLeft: 40,
    marginTop: 15,
    alignItems: 'center',
    color: '#802628'
  },
  itemDesc: {
    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    marginLeft: 40,
    marginTop: 15,
    marginBottom: 25,
    lineHeight: 25
  },
  textAmountTotal: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: '#802628',
    textAlign: 'right',
    backgroundColor: '#F2EDE4',
    width: screen.width / 2,
    paddingRight: 25,
    paddingBottom: 5,
  },
  textPrice: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width / 4,
    paddingBottom: 5,
  },
  textAmount: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width / 4,
    paddingBottom: 5,
  },

  textTotalLabel: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 3,
    fontSize: 16,
    textAlign: 'right',
    color: '#BBB8B0',
  },
  textTotalValue: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#BBB8B0',
  },
  backbutton: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'

  },
  rowSepView: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    backgroundColor: '#F2EDE4',
  },
  column1: {
    flex: 2.5,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column2: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column3: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column4: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column5: {
    flex: 1.8,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column6: {
    flex: 2.5,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:5
  },

  blackText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },

  blackTextBold: {

    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },

  columnSep: {
    flex: 0.02,
    height: 60,
    width: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  totalColumn1: {
    flex: 3.0,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  totalColumn2: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  redText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#8D383D',
  },


  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: screen.height,
    width: screen.width,
  },
  alertView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
  },



  overlayVisible: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: screen.width,
    height: screen.height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },
  overlayInVisible: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertBodyVisible: {
    backgroundColor: 'white',
    width: 250,
    height: 150,
    borderRadius: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertBodyInVisible: {
    backgroundColor: 'white',
    width: 0,
    height: 0,
  },
  alertRowVisible: {
    height: 100,
    flexDirection: 'row',
    alignSelf: 'center',

    borderRadius: 10,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertRowInVisible: {

    width: 0,
    height: 0,
  },
  alertSecondRowVisible: {
    height: 50,
    flexDirection: 'row',
    alignSelf: 'center',

    borderRadius: 10,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertSecondRowInVisible: {

    width: 0,
    height: 0,
  },


  alertCollVisible: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  alertCollInVisible: {

    width: 0,
    height: 0,
  },
  alertBtnVisible: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 125,
    borderRadius: 10,

  },
  alertBtnInVisible: {
    backgroundColor: 'white',
    width: 0,
    height: 0,
  },
  alertTextVisible: {

    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 16,
    color: '#891F02',
    width: 200,
    textAlign: 'center',

  },
  alertTextInVisible: {
    width: 0,
    height: 0,

  },
});
module.exports = OrderList;
