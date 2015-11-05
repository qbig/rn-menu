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
var ItemList = require('./ItemList');
var OrderList = require('./OrderList');
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var ds;

var MainView = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  getInitialState: function() {
    ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {

      dataSource: ds.cloneWithRows([{
        leftItemImage: '',
        leftItemName: 'PROMOTIONS',
        rightItemImage: '',
        rightItemName: 'RICE'
      }, {
        leftItemImage: '',
        leftItemName: 'SET MEALS',
        rightItemImage: '',
        rightItemName: 'CONGEE & SOUP'
      }, {
        leftItemImage: '',
        leftItemName: 'MEATS',
        rightItemImage: '',
        rightItemName: 'CHEF RECOMMENDATIONS'
      }, {
        leftItemImage: '',
        leftItemName: 'HOR FUN & NOODLES',
        rightItemImage: '',
        rightItemName: 'BEVERAGES'
      }]),
    };
  },

  _pressData: ({}: {
    [key: number]: boolean
  }),

  componentWillMount: function() {
    this._pressData = {};
  },
  componentDidMount: function() {
    _navigator = this.props.navigator;
  },
  _onPressButton: function() {},

  _onViewOrderPress: function() {
    this.props.navigator.push({
      title: "",
      component: OrderList
    });
  },

  menuItemClicked: function() {

    this.props.navigator.push({
      title: "",
      component: ItemList
    });
  },

  handleScroll: function(event: Object) {},
  render: function() {
     return (
       <View style={styles.container}>
           <View style={styles.statusBar}>
              <Text style={styles.statusBarTextLeft}> TABLE 1 </Text>
              <Text style={styles.statusBarTextRight}> CONNECTED </Text>
              <Image style={styles.icon} source={require('image!icn_connected')} />
           </View>
           <View style={styles.navBar}>
              <Text style={styles.navBarText}> MENU </Text>
           </View>

           <View style={styles.separator} />

           <View style={styles.container}>
               <ScrollView style={styles.scrollView} scrollEventThrottle={200} onScroll={this.handleScroll}>
                 <View style={styles.row}>
                   <View >
          						<TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.menuItemClicked}>
          							<View>
          							 	<Image style={styles.thumb} source={require('image!one')} >
          							 		<Image style={styles.thumb} source={require('image!overlay1')} >
          							 		<View style={styles.overlay1}><Text style={styles.footerText}>PROMOTIONS</Text></View>
          							 		</Image>

          							 	</Image>
          							</View>
          						</TouchableHighlight>
                   </View>
                   <View>
          						 <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.menuItemClicked}>
          						 	<View>
          									<Image style={styles.thumb} source={require('image!two')}>
          									<Image style={styles.thumb} source={require('image!overlay1')} >
          										<View style={styles.overlay1}><Text style={styles.footerText}>RICE</Text></View>
          									</Image>
          							 	</Image>
          							</View>
          						 </TouchableHighlight>
                   </View>
                 </View>

                 <View style={styles.row}>
                     <View >
                         <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.menuItemClicked}>
                             <View>
        											<Image style={styles.thumb} source={require('image!three')} >
        											<Image style={styles.thumb} source={require('image!overlay1')} >
        												<View style={styles.overlay1}><Text style={styles.footerText}>SET MEALS</Text></View>
        												</Image>
        											</Image>
        										</View>
                         </TouchableHighlight>
                     </View>

                     <View>
                         <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}    onPress={this.menuItemClicked}>
                          <View>
        									<Image style={styles.thumb} source={require('image!four')} >
        										<Image style={styles.thumb} source={require('image!overlay1')} >
        											<View style={styles.overlay1}><Text style={styles.footerText}>CONGEE & SOUP</Text></View>
        										</Image>
        									</Image>
        								</View>
                         </TouchableHighlight>
                     </View>
               </View>

               <View style={styles.row}>
                   <View >
                       <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.menuItemClicked}>
                          <View>
                          		<Image style={styles.thumb} source={require('image!five')} >
                          		<Image style={styles.thumb} source={require('image!overlay1')} >
                          			<View style={styles.overlay1}><Text style={styles.footerText}>MEATS</Text></View>
                          		</Image>
                          		</Image>
                        	</View>
                        </TouchableHighlight>
                    </View>
                    <View>
                       <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.menuItemClicked}>
                          <View>
                      		<Image style={styles.thumb} source={require('image!six')} >
                      		<Image style={styles.thumb} source={require('image!overlay1')} >
                      			<View style={styles.overlay1}><Text style={styles.footerText}>CHEF RECOMMENDATIONS</Text></View>
                      			</Image>
                      		</Image>
                    	   </View>
                       </TouchableHighlight>
                   </View>
                 </View>

                 <View style={styles.row}>
                      <View >
                       <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.menuItemClicked}>
                           <View>
                        		<Image style={styles.thumb} source={require('image!seven')} >
                        		<Image style={styles.thumb} source={require('image!overlay1')} >
                        			<View style={styles.overlay1}><Text style={styles.footerText}>HOR FUN & NOODLES</Text></View>
                        			</Image>
                        		</Image>
                        	</View>
                        </TouchableHighlight>
                      </View>

                     <View>
                         <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.menuItemClicked}>
                            <View>
                          		<Image style={styles.thumb} source={require('image!four')} >
                          		<Image style={styles.thumb} source={require('image!overlay1')} >
                          			<View style={styles.overlay1}><Text style={styles.footerText}>BEVERAGES</Text></View>
                          		</Image>
                          		</Image>
                          	</View>
                          </TouchableHighlight>
                      </View>
                  </View>
               </ScrollView>
            </View>
            <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this._onViewOrderPress}>
               <View style={styles.footer}>
                   	<Text style={styles.footerText}> VIEW ORDER - 1 ITEM ($7.80) </Text>
               </View>
             </TouchableHighlight>
        </View>);
    },
});

var styles = StyleSheet.create({
  scrollView: {
    height: (screen.height * 69) / 100,
    top: 0
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

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 23,
    alignItems: 'center',
    color: '#891F02',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
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

    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 23,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  },
});
module.exports = MainView;
