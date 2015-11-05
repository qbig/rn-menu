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
var setMealView = require('./SetMealView');
var orderListView = require('./OrderList');
var screen = require('Dimensions').get('window');
var ds;
var imgArr = [require('image!item_1'), require('image!item_2'), require('image!item_3'), require('image!item_4'), require('image!item_5'), require('image!item_6'), require('image!item_7'), require('image!item_8')];
var ItemList = React.createClass({
  getInitialState: function() {
    ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      dataSource: ds.cloneWithRows([{
        name: 'SET MEAL 1',
        price: '$27.80',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 2',
        price: '$9.80',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 3',
        price: 'SOLD OUT',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 4',
        price: '$17.80',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 5',
        price: '$27.80',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 6',
        price: 'SOLD OUT',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 7',
        price: '$9.80',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }, {
        name: 'SET MEAL 8',
        price: '$17.80',
        img: 'Age:28YO',
        desc: 'Comes with your choice of meat, hot fun/noodle, and drink'
      }])
    };
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
  _pressRow: function(rowID: number) {
    this.props.navigator.push({
      title: "",
      component: setMealView
    });

  },

  _onViewOrderPress: function() {
    this.props.navigator.push({
      title: "",
      component: orderListView
    });
  },
  _renderRow: function(rowData: map, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight activeOpacity = {0.8}
        underlayColor = {'rgba(255,255,255,0.1)'}
        onPress = {() => this._pressRow(rowID)}>
        <View style = {styles.column} >
          <View style = {styles.row}>
            <View>
              <Image style ={styles.thumb}
                  source = {imgArr[rowID]}/>
            </View>
            <View style = {styles.column}>
            <View style = {{width: screen.width - 420}} >
              <Text style = {styles.text}> {rowData.name} </Text>
            </View>
            <View>
              <View style = {{width: screen.width - 420}} >
                <Text style = {styles.textDesc}
                  numberOfLines = {3} > {rowData.desc} </Text>
              </View>
            </View>
          </View>
          <View>
            <Image style = {styles.thumb1}
              source = {
                require('image!btn_option_unselected')
              }>
              <View style = {styles.overlay} >
                <Text style = {styles.textPrice} > {rowData.price}
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
        <View style = {styles.statusBar} >
          <Text style = {styles.statusBarTextLeft} > TABLE 1 </Text>
          <Text style = {styles.statusBarTextRight} > CONNECTED </Text>
          <Image style = {styles.icon} source = {require('image!icn_connected')}/>
        </View>
        <View style = {styles.navBar}>
          <View style = {
              {
                flexDirection: 'column',
                flex: 1,
                left: 10,
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
            <TouchableHighlight activeOpacity = {0.8}
              underlayColor = {'rgba(255,255,255,0.1)'}
              onPress = {this._onBackToMainView} >
              <View style = {
                {
                  flexDirection: 'row',
                  flex: 1
              }}>
                <Image source = {require('image!btn_back')}/>
                <Text style = {styles.backButton}> Back </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style = {
            {
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }} >
            <Text style = {styles.navBarText} > SET MEALS </Text>
          </View>
          <View style = {
            {
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              top: 10,
              alignItems: 'flex-start',
            }} >
          </View>
        </View>
        <View style = {styles.separator}/>
        <View style = {styles.lstview}>
          <ListView
              dataSource = {this.state.dataSource}
              renderRow = {this._renderRow}/>
        </View>

        <TouchableHighlight activeOpacity = {0.8}
            underlayColor = {'rgba(255,255,255,0.1)'}
            onPress = {this._onViewOrderPress} >
          <View style = {styles.footer} >
              <Text style = {styles.footerText}> VIEW ORDER - 1 ITEM($7.80) </Text>
          </View>
        </TouchableHighlight>
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
  overlay: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lstview: {
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
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center',
    color: '#802628'
  },
  textDesc: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 17,
    paddingLeft: 10,
    marginLeft: 10,
    marginTop: 5,
    color: 'black',
  },
  textPrice: {

    fontFamily: 'AvenirNextLTPro-Regular',
    textAlign: 'center',
    fontSize: 16,
  },
  backbutton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'

  },
  footerText: {

    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 23,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',

  },

});

module.exports = ItemList;
