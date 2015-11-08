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
var orderListSentView = require('./OrderListSent');
var screen = require('Dimensions').get('window');

var OrderList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      isAlertVisibale: false,
      dataSource: ds.cloneWithRows([{
        name: 'SET MEAL 1',
        item1: 'ROAST DUCK,\nDRY HOR FUN,\nCHINESE TEA',
        price: '$7.80',

      }, {
        name: 'SET MEAL 1',
        item1: 'ROAST CHICKEN,\nNOODLES IN SOUP,\nBARLEY',
        price: '$7.80',
      }, {
        name: 'total',
        subtotal: '15.80',
        discount: '0.00',
        servicecharge: '1.58',
        GST: '1.10'
      }])
    };
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

  _pressData: ({}: {
    [key: number]: boolean
  }),


  componentWillMount: function() {
    this._pressData = {};
  },
  _onBackToMainView: function() {
    this.props.navigator.pop();
  },


  sendOrderPress: function() {
    this.props.navigator.push({
      title: "",
      component: orderListSentView
    });
  },

  _pressRow: function(rowID: number) {
    if (rowID != 2) {
      if (!this.state.isAlertVisibale) {
        this.setState({
          isAlertVisibale: !this.state.isAlertVisibale
        });
      }
    }

  },



  _renderRow: function(rowData: map, sectionID: number, rowID: number) {
    var cellView;
    if (rowData.name != 'total') {
      return (
         <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={() => this._pressRow(rowID)}>
        	<View style={styles.column}>
         	  <View style={styles.row}>
           		<View style={styles.columnInner}>
  							<View >
  								<Text style={styles.text}>
  								 {rowData.name}
  								 </Text>
  							</View>
  							 <View >
  								<Text style={styles.textDesc} numberOfLines={3}>
  								 {rowData.item1}
  								 </Text>
  							</View>
              </View>
            </View>
            <View style={styles.rowSepView}>
  						<View style={styles.column1}>
  							<Text style={styles.blackText}> QUANTITY </Text>
  						</View>
							<View style={styles.columnSep}/>
								<TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.column2} onPress={this.menuItemClicked}>
									<View style={styles.column2}>
										<Image style={{ resizeMode:Image.resizeMode.contain}} source={require('image!btn_qty_less')} />
									</View>
								</TouchableHighlight>
                <View style={styles.columnSep}/>
                <View style={styles.column3}>
                  <Text style={styles.blackTextBold}> 3 </Text>
                </View>
                <View style={styles.columnSep}/>
                <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.column2} onPress={this.menuItemClicked}>
                  <View style={styles.column4}>
                    <Image style={{ resizeMode:Image.resizeMode.contain}} source={require('image!btn_qty_more')} />
                  </View>
                </TouchableHighlight>
                <View style={styles.columnSep}/>
                <View style={styles.column5}>
                  <Text style={styles.blackText}> PRICE </Text>
                </View>
                <View style={styles.columnSep}/>
                <View style={styles.column6}>
                  <Text style={styles.blackTextBold}> $23.40 </Text>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableHighlight>
        );
      } else {
        return (

          <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={() => this._pressRow(rowID)}>
            <View style={styles.column}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <View style={styles.rowWithOp}>
                    <Text style={styles.textTotal}>
                      SUB TOTAL
                    </Text>
                    <Text style={styles.textTotal1}>
                      {rowData.subtotal}
                    </Text>
                  </View>
                  <View  style={styles.rowWithOp}>
  									 <Text style={styles.textTotal}>
  									 DISCOUNT
  									 </Text>
  									<Text style={styles.textTotal1}>
  									 {rowData.discount}
  									 </Text>
  								</View>
  								<View  style={styles.rowWithOp}>
  									 <Text style={styles.textTotal}>
  									 SERVICE CHARGE
  									 </Text>
  									<Text style={styles.textTotal1}>
  									 {rowData.servicecharge}
  									 </Text>
  								</View>
  								<View  style={styles.rowWithOp}>
  									 <Text style={styles.textTotal}>
  									 GST
  									 </Text>
  									<Text style={styles.textTotal1}>
  									 {rowData.GST}
  									 </Text>
  								</View>
                </View>
              </View>
              <View style={styles.rowSepView}>
                <View style={styles.totalColumn1}>
                  <Text style={styles.redText}>  {'CURRENT TOTAL'} </Text>
                </View>
                <View style={styles.totalColumn2}>
                  <Text style={styles.redText}>  {'$18.48'} </Text>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableHighlight>
        );
      }
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
               <Text style={styles.navBarText}> ORDER LIST </Text>
             </View>
             <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', top:10, alignItems: 'flex-start',}}></View>
           </View>

           <View style={styles.lstview}>
             <ListView
               dataSource={this.state.dataSource}
               renderRow={this._renderRow}
               />
           </View>

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

           <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.sendOrderPress}>
             <View style={styles.footer}>
               <Text style={styles.footerText}>SEND ORDER</Text>
             </View>
           </TouchableHighlight>
           <View style={styles.separator} />
      </View>
    );
  }
});
var styles = StyleSheet.create({
  backButton: {

    fontFamily: 'AvenirNextLTPro-Regular',
    paddingLeft: 10,
    alignItems: 'flex-start',
    textAlign: 'left',
    color: '#8D383D',

  },
  lstview: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 0,
    paddingLeft: 0
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
    height: 175,
    flexDirection: 'column',
  },
  columnInner: {
    flex: 1,
    width: screen.width,
    height: 80,
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
    height: 110,
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


  /*: {
      fontSize:14,
      textAlign:'center',
       color: 'black',
       fontWeight: '400',


  },*/

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
    marginLeft: 10,
    alignItems: 'center',
    color: '#802628'
  },
  textO: {
    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',

    paddingBottom: 5,

  },
  imgCS: {
    padding: 5,
    height: 22,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EDE4'
  },
  textCT: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 2,
    fontSize: 16,
    alignItems: 'flex-start',
    color: '#802628',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width,
    paddingLeft: 5,
    paddingBottom: 5,
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
  textQ: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width / 3,
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
  textQ1: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: '#802628',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width / 15,
    paddingBottom: 5,
  },
  textQ2: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width / 15,
    paddingBottom: 5,
  },
  textQ3: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: '#802628',
    textAlign: 'center',
    backgroundColor: '#F2EDE4',
    width: screen.width / 15,
    paddingBottom: 5,
  },

  textDesc: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    marginLeft: 10,
    color: '#BBB8B0',
  },
  textTotal: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 3,
    fontSize: 16,
    textAlign: 'right',
    color: '#BBB8B0',
  },
  textTotal1: {

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

    flex: 3.0,
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
    flex: 2.2,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  blackText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },

  blackTextBold: {

    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 16,
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
