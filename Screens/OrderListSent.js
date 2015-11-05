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
var ds;
var OrderListSent = React.createClass({
  getInitialState: function() {
      ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      return {
        dataSource: ds.cloneWithRows([{
          name: 'SET MEAL 1',
          qty: 'Qty: 1',
          item1: 'Comes with your choice of meat,hor fun/noodle, and 1 drink',
          price: '$7.80'
        }])
      };
  },

  _pressData: ({}: {[key: number]: boolean}),
  componentWillMount: function() {
      this._pressData = {};
  },
  _onBackToMainView: function() {
    this.props.navigator.pop();
  },
  _pressRow: function(rowID: number) {},
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
                  <Text style={{flex: 1,fontSize:23, paddingLeft: 10,marginLeft:10,paddingTop:5,color:'#BBB8B0'}} numberOfLines={5}>
                    {rowData.qty}
                  </Text>
                </View>
                <View >
                  <Text style={styles.textDesc} numberOfLines={3}>
                    {rowData.item1}
                  </Text>
                </View>

              </View>

              <View style={styles.columnInnerRight}>
                <View >
                  <Text style={styles.text}>
                    {rowData.price}
                  </Text>
                </View>
                <View >

                </View>

              </View>

            </View>
            <View style={styles.rowSepView}>
              <View style={styles.column1}>
                <Text style={styles.blackText}> ORDER SENT. THANK YOU! </Text>
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
                    {'SUB TOTAL'}
                  </Text>
                  <Text style={styles.textTotal1}>
                    {rowData.subtotal}
                  </Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotal}>
                    {'DISCOUNT'}
                  </Text>
                  <Text style={styles.textTotal1}>
                    {rowData.discount}
                  </Text>
                </View >
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotal}>
                    {'SERVICE CHARGE'}
                  </Text>
                  <Text style={styles.textTotal1}>
                    {rowData.servicecharge}
                  </Text>
                </View>
                <View  style={styles.rowWithOp}>
                  <Text style={styles.textTotal}>
                    {'GST'}
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

        <View style={styles.upfooter}>
          <View style={{flex:1}}>
            <Text style={{color: 'black'}}>SUB TOTAL</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign: 'right',color:'black',marginRight:10}}>21.0</Text>
          </View>
        </View>
        <View style={{color: '#FFFAF0'}} />
        <View style={styles.upfooter}>
          <View style={{flex:1}}>
            <Text style={{color: 'black'}}>DISCOUNT</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign: 'right',color:'black',marginRight:10}}>0.0</Text>
          </View>
        </View>
        <View style={{color: '#FFFAF0'}} />
        <View style={styles.upfooter}>
          <View style={{flex:1}}>
            <Text style={{color: 'black'}}>SERVICE CHARGE</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign: 'right',color:'black',marginRight:10}}>2.10</Text>
          </View>
        </View>
        <View style={{color: '#FFFAF0'}} />
        <View style={styles.upfooter}>
          <View style={{flex:1}}>
            <Text style={{color: 'black'}}>GST</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign: 'right',color:'black',marginRight:10}}>1.47</Text>
          </View>
        </View>
        <View style={{color: '#FFFAF0'}} />
        <View style={styles.footer}>
          <View style={{flex:1}}>
            <Text style={{fontSize:23,textAlign: 'left',color:'white',marginLeft:10,paddingTop:8,fontFamily: 'AvenirNextLTPro-Demi'}}>Current Total</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:23,textAlign: 'right',color:'white',marginRight:10,paddingTop:8,fontFamily: 'AvenirNextLTPro-Demi'}}>24.57</Text>
          </View>
        </View>
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
  upfooter: {
    height: 25,
    alignItems: 'center',
    backgroundColor: '#F2EDE4',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 10
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
    color: 'white',
    textAlign: 'center',

  },
  column: {
    flex: 1,
    width: screen.width,
    height: 205,
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
    height: 80,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 0,
    paddingTop: 5,
  },
  rowWithOp: {

    height: 15,
    flexDirection: 'row',

  },
  rowWithOption: {
    flex: 1,
    height: 15,
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

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 14,
    alignItems: 'center',
    color: '#10E790',
    paddingLeft: 15,
  },
  statusBarTextRight: {

    fontFamily: 'AvenirNextLTPro-Regular',
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
    backgroundColor: '#891F02',
  },
  column1: {
    flex: 3.0,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },


  blackText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 23,
    textAlign: 'center',
    color: 'white',
  },

  columnSep: {
    flex: 0.08,
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
});
module.exports = OrderListSent;
