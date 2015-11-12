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
      tableId: ConfigStore.getState().tableId
    };
  },

  _handleConnectionChange: function() {
    this.setState({connected: EnvStore.getState().socketStatus === 'connected'})
  },

  _handleTableChange: function() {
    this.setState({tabletId: ConfigStore.getState().tabletId})
  },

  componentWillMount: function() {
    this.listenTo(EnvStore, this._handleConnectionChange);
    this.listenTo(ConfigStore, this._handleTableChange);
  },

  render: function() {
    return (
      <View style={styles.statusBar}>
        <TouchableHighlight delayLongPress={5000} onLongPress={()=>{SystemActions.configStart()}}>
          <Text style={styles.statusBarTextLeft}> TABLE {this.state.tableId} </Text>
        </TouchableHighlight>
        <Text style={styles.statusBarTextRight}>{this.state.connected ? 'CONNECTED' : 'DISCONNECTED'}  </Text>
        <Image style={[styles.icon, !this.state.connected&&{opacity:0}]} source={require('image!icn_connected')} />
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