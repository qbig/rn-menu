'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} = React;

var EnvStore = require('../Stores/EnvStore');
var ConfigStore = require('../Stores/ConfigStore');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var SystemActions = require('../Actions/SystemActions');
var StatusBar = React.createClass({
  mixins: [ListenerMixin],

  getInitialState: function() {
    return {
      connected: EnvStore.getState().socketStatus === 'connected',
      tableName: ConfigStore.getState().tableName,
      description: ConfigStore.getState().description
    };
  },

  _handleConnectionChange: function() {
    this.setState({connected: EnvStore.getState().socketStatus === 'connected'})
  },

  _handleTableChange: function() {
    this.setState({tableName: ConfigStore.getState().tableName})
    console.log("_handleTableChange!!!!  : " + this.state.tableName);
    console.log(" ConfigStore.getState().tableId :" +  ConfigStore.getState().tableName)
  },

  componentWillMount: function() {
    this.listenTo(EnvStore, this._handleConnectionChange);
    this.listenTo(ConfigStore, this._handleTableChange);
  },

  render: function() {
    return (
      this.state.tableName ?
      <View style={styles.statusBar}>
        <TouchableHighlight style={{height:36,flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}} delayLongPress={4000} onLongPress={()=>{SystemActions.configStart()}}>
          <Text style={styles.statusBarTextLeft}>{this.state.tableName} </Text>
        </TouchableHighlight>
        <Text style={styles.statusBarTextRight}>{this.state.description} {this.state.connected ? 'CONNECTED' : 'DISCONNECTED'}  </Text>
        <Image style={[styles.icon, !this.state.connected&&{opacity:0}]} source={require('../img/icn_connected.png')} />
      </View> : null
    );
  }
})

var styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0
  },

  statusBarTextLeft: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 10,
    color: 'white',
    paddingLeft: 15,
    marginLeft: 25,
    height:15
  },

  statusBarTextRight: {
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 10,
    alignItems: 'flex-end',
    color: 'white',
    paddingRight: 4,
    textAlign: 'right',
  },

  icon: {
    width: 15,
    height: 15,
    marginRight: 25,
  },

});

module.exports = StatusBar;
