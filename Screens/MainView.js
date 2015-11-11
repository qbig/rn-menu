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
  ScrollView,
  BackAndroid,
} = React;
import type {
  NavigationContext
}
from 'NavigationContext';
var screen = require('Dimensions').get('window');
var StatusBar = require('../Components/StatusBar');
var ItemList = require('./ItemList');
var OrderList = require('./OrderList');
var GroupsItemsStore = require('../Stores/GroupsItemsStore');
var OrdersStore = require('../Stores/OrdersStore');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
  // TODO : can check .length > 2, so that cannot go back to "FlashScreen"
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var MainView = React.createClass({
  getInitialState: function() {
    return {
      groupsItems : GroupsItemsStore.getState().groupsItems
    };
  },

  componentDidMount: function() {
    _navigator = this.props.navigator;
  },
  _onPressButton: function() {},

  _onViewOrderPress: function() {
    this.props.navigator.push({
      title: 'OrderList',
      data:"",
      from: "FULL MENU"
    });
  },

  menuItemClicked: function(groupIndex) {
    console.log(groupIndex)
    this.props.navigator.push({
      title: 'ItemList',
      data: groupIndex,
      from: "FULL MENU"
    });
  },
  _renderViewOrderButton : function () {
    var count = OrdersStore.getOrderCount();
    var sum = OrdersStore.getUnsentOrderSum();
    if (count > 0) {
      return (
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this._onViewOrderPress}>
           <View style={styles.footer}>
                <Text style={styles.footerText}> VIEW ORDER - {count} ITEM (${sum}) </Text>
           </View>
         </TouchableHighlight>
      );
    }
  },
  render: function() {
    var groups = this.state.groupsItems.map((group, groupIndex)=>{
      return (
        <View  style={styles.item} key={groupIndex}>
           <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={()=>{this.menuItemClicked(groupIndex)}}>
             <View>
               <Image style={styles.thumb} source={{uri:group.images[0].url}} >
                 <Image style={styles.thumb} source={require('image!overlay1')} >
                 <View style={styles.overlay1}><Text style={styles.groupNameText}>{group.name}</Text></View>
                 </Image>
               </Image>
             </View>
           </TouchableHighlight>
        </View>
      );
    })
     return (
       <View style={styles.container}>
           <StatusBar />
           <View style={styles.navBar}>
              <Text style={styles.navBarText}> MENU </Text>
              <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.topGoToOrderBtn} onPress={this._onViewOrderPress}>
                <Text style={styles.topGoToOrderText}>GO TO ORDER</Text>
              </TouchableHighlight>
           </View>

           <View style={styles.separator} />

           <View style={styles.container}>
               <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} scrollEventThrottle={200} onScroll={this.handleScroll}>
                  <View style={styles.itemsContainer}>
                    {groups}
                  </View>
               </ScrollView>
            </View>
            {this._renderViewOrderButton()}
        </View>);
    },
});

var styles = StyleSheet.create({
  scrollView: {
    height: (screen.height * 69) / 100,
    top: 0,
  },

  imageContainer: {
    flex: 1,
    width: (screen.width * 33.33) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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

  separator: {
    height: 1,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D'
  },

  overlay1: {
    position: 'absolute',
    bottom: 20,
    width: screen.width / 2,
  },

  overlay1Text: {
    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 16,
    color: '#891F02',
    fontWeight: '500',
  },

  statusBarTextLeft: {
    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize: 14,
    alignItems: 'center',
    color: 'white',
    paddingLeft: 15,
  },

  statusBarTextRight: {
    fontFamily: 'AvenirNextLTPro-Regular',
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

  thumb: {
    width: screen.width / 2,
    height: screen.height / 4,
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
    fontFamily: 'AvenirNext-Medium',
    color:'#FFFAF0',
    fontWeight: 'bold',
    width: 60,
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  itemsContainer : {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: screen.width / 2,
    height: screen.height / 4,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
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
  groupNameText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 23,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  }
});

module.exports = MainView;
