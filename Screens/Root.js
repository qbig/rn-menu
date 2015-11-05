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
  NavigatorIOS,
  Navigator
} = React;

var MainViewController = require('./SplashScreen');

var hashCode = function(str)
{
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var YCY = React.createClass({


  getInitialState: function()
  {
    return{
      navigationBarHidden:false
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() { this._pressData = {}; },
  _pressRow: function(rowID: number) {

  },


  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = {
      //uri: THUMB_URLS[rowHash % THUMB_URLS.length],
    };
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{name: '', component: MainViewController}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator });
          }
        }}
        />
    );
  },
});

var styles = StyleSheet.create({
  menubutton: {
    alignItems: 'flex-start'
  },
  backbutton: {
    flex:1
  },
  container: {
    flex: 1
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'column',
    paddingBottom: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    fontSize:22,
  },
});

AppRegistry.registerComponent('YCY', () => YCY);
