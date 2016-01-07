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
  InteractionManager,
  Platform
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
if(Platform.OS === "android") {
  React.BackAndroid.addEventListener('hardwareBackPress', function() {
    // TODO : can check .length > 2, so that cannot go back to "FlashScreen"
    if (_navigator && _navigator.getCurrentRoutes().length > 2) {
      _navigator.pop();
      return true;
    }
    return true;
  });
}
var imgArr = [require('../img/img_product_no_image.png')];

var MainView = React.createClass({
  getInitialState: function() {
    return {
      groupsItems : GroupsItemsStore.getState().groupsItems,
      isLoading: false
    };
  },

  componentDidMount: function() {
    _navigator = this.props.navigator;
    InteractionManager.runAfterInteractions(()=>{
      this.setState({
        isLoading: false
      })
    });
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
  render: function() {
    console.log("MainView is Loading")
    console.log(this.state.isLoading)
    return (
       <View style={styles.container}>
           <StatusBar />
           <View style={styles.navBar}>
              <Text style={styles.navBarText}>菜单 MENU </Text>
              <TouchableHighlight  activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.topGoToOrderBtn} onPress={this._onViewOrderPress}>
                <Text style={styles.topGoToOrderText}>{'ORDER LIST'}</Text>
              </TouchableHighlight>
           </View>

           <View style={styles.separator} />

           <View style={styles.container}>
             {this.state.isLoading ?
               <View style={styles.emptyViewContainer}>
                 <Text style={styles.emptyText}>Loading ...</Text>
               </View>
                 :
               <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} scrollEventThrottle={200} onScroll={this.handleScroll}>
                  <View style={styles.itemsContainer}>
                    {
                      this.state.groupsItems.map((group, groupIndex)=>{
                      return (
                        <View  style={styles.item} key={groupIndex}>
                           <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}
                             onPress={()=>{this.menuItemClicked(groupIndex)}}>
                             <View>
                               <Image style={styles.thumb}
                                  source={group.images.length > 0 ? {uri:  group.images[0].url} : imgArr[0]} >
                                 <Image style={styles.thumb} source={require('../img/overlay.png')} >
                                 <View style={styles.overlay1}><Text style={styles.groupNameText}>{group.name}</Text></View>
                                 </Image>
                               </Image>
                             </View>
                           </TouchableHighlight>
                        </View>
                      )})
                    }
                  </View>
               </ScrollView>}
            </View>
            {this._renderViewOrderButton()}
        </View>);
    },
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

  scrollView: {
    height: screen.height-50,
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
    bottom: 10,
    width: screen.width / 2,
  },

  overlay1Text: {
    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 16,
    color: '#89+1F02',
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
    width:screen.width,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EDE4',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0
  },

  navBarText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    alignItems: 'center',
    color: '#891F02',
  },
  topGoToOrderBtn: {
    backgroundColor:'#891F02',
    right: 0,
    position: 'absolute',
    height: 35,
    width: screen.width / 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topGoToOrderText: {
    fontFamily: 'AvenirNext-Medium',
    color:'#FFFAF0',
    textAlign: 'center',
    width: 50,
    fontSize: 10,
  },
  container: {
    width:screen.width,
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
    fontSize: 16,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  }
});

module.exports = MainView;
