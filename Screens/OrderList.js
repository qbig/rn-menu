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
var StatusBar = require('../Components/StatusBar');
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
      showSentOrder: false,
      editRowIndex: -1
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
      isAlertVisibale: !this.state.isAlertVisibale,
      clickClickedRemoveBtn:false,
    });
  },

  alertYesPressed: function() {
    if (this.state.clickClickedRemoveBtn) {
      this.setState({
        clickClickedRemoveBtn: false,
        isAlertVisibale: !this.state.isAlertVisibale
      })
      OrderActions.unsentOrderItemDecrement(this.state.editRowIndex);
    } else {
      this.setState({
        isAlertVisibale: !this.state.isAlertVisibale
      });
      OrderActions.orderItemStartedEdit(this.state.editRowIndex);
      this.props.navigator.push({
        title: 'SetMealView',
        from: 'ORDER LIST',
        data: this.state.orders.unsentItems[this.state.editRowIndex].data
      });
    }
  },

  _handleOrdersChange: function(){
    if (this.state.viewOrder) {
      this.setState({
        orders: OrdersStore.getState(),
        dataSource: ds.cloneWithRows(OrdersStore.getState().unsentItems),
      });
    } else {
      this.setState({
        orders: OrdersStore.getState(),
        dataSource: ds.cloneWithRows(OrdersStore.getState().sentItems.concat({name:'total'})),
      });
    }
  },

  componentWillMount: function() {
    this.listenTo(OrdersStore, this._handleOrdersChange);
  },

  _onBackToMainView: function() {
    this.props.navigator.pop();
  },

  sendOrderPress: function() {
    if (this.state.isAlertVisibale) {
      return;
    }

    if(this.state.viewOrder) {
      var self = this;
      SystemActions.loadingStart();
      OrderService.updateCurrentOrder()
      .then(function(){
        SystemActions.loadingFinish();
        self.setState({showSentOrder:true});
      }).catch(function(){
        SystemActions.loadingFinish();
      }).finally(function () {
        SystemActions.loadingFinish();
      });
    }
  },

  _pressRow: function(rowID: number) {
    if (this.state.viewOrder) {
      if (!this.state.isAlertVisibale) {
        this.setState({
          isAlertVisibale: !this.state.isAlertVisibale,
          editRowIndex:  rowID
        });
      }
    }
  },

  handleDecrement: function(rowID, rowData) {
    if(this.state.viewOrder && rowData.quantity > 1) {
      OrderActions.unsentOrderItemDecrement(rowID);
    } else if (this.state.viewOrder && rowData.quantity == 1) {
      if (!this.state.isAlertVisibale) {
        this.setState({
          isAlertVisibale: true,
          clickClickedRemoveBtn:true,
          editRowIndex : rowID
        });
      }
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

              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={[styles.column2, !this.state.viewOrder&&{opacity: 0}]} onPress={()=>{this.handleDecrement(rowID, rowData)}}>
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
      var sumRaw = (storeInfo.tax+100) * (storeInfo.service_charge+100) * OrdersStore.getOrderSum();
      sumRaw = sumRaw - (sumRaw % 500); // round down to 5 cent
      var sum = Number(sumRaw/10000.0).toFixed(2)
      return (
        <View>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={[styles.column, {marginTop:15, marginBottom:15}]}>
                <View style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>SUB TOTAL:</Text>
                  <Text style={styles.textTotalValue}>{OrdersStore.getOrderSum()}</Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>DISCOUNT:</Text>
                  <Text style={styles.textTotalValue}>0.00</Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>SERVICE CHARGE:</Text>
                  <Text style={styles.textTotalValue}>{Number(storeInfo.service_charge * OrdersStore.getOrderSum()/100.0).toFixed(2)}</Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotalLabel}>GST:</Text>
                  <Text style={styles.textTotalValue}>{Number(storeInfo.tax * OrdersStore.getOrderSum()/100.0).toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowSepView}>
              <View style={styles.totalColumn1}>
                <Text style={styles.redText}>CURRENT TOTAL</Text>
              </View>
              <View style={styles.totalColumn2}>
                <Text style={styles.blackTextBold}>${sum}</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>

          <View style={styles.payAtCounterInfoContainer}>
            <View style={styles.emptyInfo}>
              <Text style={[styles.emptyText, {textAlign: 'center'}]}>{'请到柜台付款，谢谢\nPLEASE PAY YOUR BILL AT THE COUNTER THANK YOU.'}</Text>
            </View>
          </View>
        </View>
      );
    }
  },

  _renderEmptyView() {
      var message= '';
      if (this.state.viewOrder) {
        if (this.state.showSentOrder) {
          message = "订单收到。\nORDER SENT! THANK YOU."
        } else {
          message = "您的订单为空。\nYOUR ORDER LIST IS EMPTY."
        }
      } else {
        message = "您的账单为空。\nTHERE ARE NO ITEMS IN YOUR BILL."
      }
      return (
        <View style={styles.emptyViewContainer}>
          <View style={styles.emptyInfo}>
            <Text style={[styles.emptyText, {textAlign: 'center'}]}>{message}</Text>
          </View>
          <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.backToMain}>
            <Text style={styles.emptyText}>回去菜单 RETURN TO MAIN MENU</Text>
          </TouchableHighlight>
          {this.state.viewOrder ? <TouchableHighlight style={styles.emptyBtn} activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.togglePressed} >
          <Text style={styles.emptyText}>查看总计 VIEW BILL</Text>
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
    var textMessage = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Would you like to {this.state.clickClickedRemoveBtn ? 'remove' : 'edit'} {this.state.editRowIndex === -1 ? 'meal' : this.state.orders.unsentItems[this.state.editRowIndex].data.name}?</Text>:null;

      return (
        <View style={styles.container}>
          <StatusBar />
          <View style={styles.navBar}>
            <View style={{flexDirection: 'column', flex:1, left:10, justifyContent: 'center', alignItems: 'flex-start',}}>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this._onBackToMainView}>
                <View style={styles.backButtonContainer}>
                  <Image source={require('image!btn_back')}  />
                  <Text style={styles.backButton}> {this.props.from} </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'center',}}>
              <Text style={styles.navBarText}>{this.state.viewOrder ? '订单 ORDER LIST' : '总计 TOTAL BILL'} </Text>
            </View>
            <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'center',}} >
              <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}
                style={styles.toggleBtn} onPress={this.togglePressed}>
                <Text style={styles.toggleBtnText}>{this.state.viewOrder ? 'VIEW BILL' : 'VIEW ORDER'}</Text>
              </TouchableHighlight>
              {(this.state.orders.sentItems.length > 0 && this.state.viewOrder) ?
                <Image style={styles.badge} source={require('image!badge_bill')}>
                  <Text style={{color: 'white'}}>{OrdersStore.getOrderCount()}</Text>
                </Image> : null
              }
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

          {this.isEmpty() || !this.state.viewOrder ? null : <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.sendOrderPress}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>确认送出 SEND ORDER</Text>
          </View>
        </TouchableHighlight>}
        <View style={styles.separator} />
      </View>);
    }
});
var styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 7,
    right: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

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

  listView: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 0,
    paddingLeft: 0
  },

  payAtCounterInfoContainer: {
    width: screen.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50
  },

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
    width:310,
    marginBottom: 40
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
    fontFamily: 'AvenirNext-DemiBold',
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
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    marginLeft: 40,
    marginTop: 15,
    marginBottom: 25,
    lineHeight: 25
  },
  textAmountTotal: {
    fontFamily: 'AvenirNext-Regular',
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
    fontFamily: 'AvenirNext-Regular',
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
    fontFamily: 'AvenirNext-Regular',
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
    fontFamily: 'AvenirNext-Medium',
    flex: 3,
    fontSize: 16,
    textAlign: 'right',
  },

  textTotalValue: {
    fontFamily: 'AvenirNext-Medium',
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },

  backbutton: {
    fontFamily: 'AvenirNext-Regular',
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
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },

  blackTextBold: {
    fontFamily: 'AvenirNext-Regular',
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
    marginLeft: 25,
  },

  totalColumn2: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25
  },

  redText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 24,
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
    fontFamily: 'AvenirNext-DemiBold',
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
