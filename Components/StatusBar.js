'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} = React;

var StatusBar = React.createClass({
  render: function() {
    return (
      <View style={styles.statusBar}>
        <TouchableHighlight delayLongPress={5000} onLongPress={()=>{console.log("long pressed !!!!!!!!!")}}>
          <Text style={styles.statusBarTextLeft}> TABLE 1 </Text>
        </TouchableHighlight>
        <Text style={styles.statusBarTextRight}> CONNECTED </Text>
        <Image style={styles.icon} source={require('image!icn_connected')} />
      </View>
    );
  }
})

var styles = StyleSheet.create({
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
    color: 'white',
    paddingLeft: 15,
    marginLeft: 25
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
    width: 27,
    height: 27,
    marginRight: 25,
  },

});

module.exports = StatusBar;
