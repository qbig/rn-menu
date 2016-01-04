/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var
{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Navigator,
  Animated,
  Dimensions,
  ToastAndroid,
  InteractionManager
} = React;

var StatusBar = require('../Components/StatusBar');
var screen = require('Dimensions').get('window');
var OrdersStore = require('../Stores/OrdersStore');
var OrderActions = require('../Actions/OrderActions');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var RCTUIManager = require('NativeModules').UIManager;

var TITLE_LENGTH = 20;
var BACK_TEXT_LENGTH = 10;
function trimString(str, length) {
  return str.length > length ?
  str.substring(0, length - 3) + "..." :
  str.substring(0, length);
}

var {
  height: deviceHeight
} = Dimensions.get('window');

var imgArr = [require('image!img_product_no_image')];

function insertLineBreak(str) {
  var reg = new RegExp('[a-z0-9]', 'i');
  var index = str.indexOf(reg.exec(str)[0]);
  if (index != -1 && index != 0 && index != str.length - 1) {
    return str.substring(0, index) + '\n' + str.substring(index)
  } else {
    return str
  }
}

var ModifierSectionView = React.createClass({
  getInitialState: function() {
    return {

    }
  },

  render: function() {

  }
});

var ModifierSectionHeader = React.createClass({
  shouldComponentUpdate: function(){
    return false;
  },
  render: function () {
    return (<View style={styles.optionsHeader}>
        <View style={styles.columnContainer1}>
          <View style={styles.separator} />
        </View>
        <View style={styles.columnContainer2}>
          <Text style={styles.marronHeader}> {this.props.name} </Text>
        </View>
        <View style={styles.columnContainer1}>
          <View style={styles.separator} />
        </View>
      </View>)
  }
});

var ModifierSectionCell = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState){
    return nextProps.isSelected !== this.props.isSelected;
  },

  render: function () {
    return (
      <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}
        onPress={()=>{this.props.onSelect(this.props.index, this.props.name)}}>
        <View style={styles.option}>
          <Image style={styles.thumb1} source={this.props.isSelected ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
            <View style={styles.overlay}>
              <Text style={this.props.isSelected ? styles.textPriceWhite : styles.textPrice}>
                {insertLineBreak(this.props.name)}
              </Text>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
    );
  }
});


var SetMealView = React.createClass({
  mixins: [ListenerMixin],
  getInitialState() {
    return {
      currentItem: OrdersStore.getState().currentItem,
      isAlertVisibale: false,
      comment:OrdersStore.getState().currentItem.comment,
      done: false,
      isEditMode: this.props.from === 'ORDER LIST',
      isLoading: true
    };
  },

  _handleOptionsChange: function(){
    this.setState({currentItem: OrdersStore.getState().currentItem});
  },

  handleScroll: function(event: Object) {},

  componentWillMount: function() {
    this.listenTo(OrdersStore, this._handleOptionsChange);
  },

  componentDidMount: function() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isLoading: false
      });
    });
  },

  componentDidUpdate: function(prevProps, prevState){
    if (prevState.isLoading == true && this.state.isLoading == false) {
      const handleSep = React.findNodeHandle(this._sep);
      RCTUIManager.measureLayoutRelativeToParent(
        handleSep,
        (e) => {console.error(e)},
        (x, yForSep, w, h) => {
          if (this._headers) {
            this._headers.forEach((header, index)=>{
              const handle = React.findNodeHandle(header);
              RCTUIManager.measureLayoutRelativeToParent(
                handle,
                (e) => {console.error(e)},
                (x, y, w, h) => {
                  header._myPos = yForSep + y
                  console.log('offset:' + header._myPos);
                });
            })
          }
        }
      );
    }
  },

  componentWillUnmount: function() {
    if (this.state.done) {
      if (this.state.isEditMode) {
        console.log("SetMealView item edited !")
        OrderActions.orderItemCompletedEdit(this.state.comment);
      } else {
        console.log("SetMealView item created !")
        OrderActions.orderItemCreated(this.state.comment);
      }
    }
  },

  handleEditComplete: function() {
    if (this.state.currentItem.isCompleted()){
      if(!this.state.isAlertVisibale) {
        this.setState({done: true});
        this.props.navigator.pop();
      }
    } else {
      ToastAndroid.show("Pls choose your " + this.state.currentItem.getNextIncompleteModName(), ToastAndroid.LONG);
    }
  },

  _onBackToMainView:function() {
    this.props.navigator.pop();
  },

  openAlertView:function() {
    if(!this.state.isAlertVisibale) {
      this.setState({isAlertVisibale: !this.state.isAlertVisibale});
    }
  },

  btnBackPressed:function() {
    if(!this.state.isAlertVisibale) {
      this.setState({isAlertVisibale: !this.state.isAlertVisibale});
    }
  },

  closeAlertView:function() {
    this.setState({isAlertVisibale: !this.state.isAlertVisibale});
  },

  alertDiscardPressed:function() {
    this.setState({isAlertVisibale: !this.state.isAlertVisibale});
    this.props.navigator.pop();
  },

  _renderModal: function() {
    var okBtn = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>No</Text>: null;
    var cancelBtn = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Yes, discard</Text>: null;
    var textMessage = <Text style={styles.alertTextVisible}>Are you sure you want to discard? The item will not be saved to your order.</Text>//this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Are you sure you want to discard? The item will not be saved to your order.</Text>  : null;
      return (
        <View style={this.state.isAlertVisibale ? styles.overlayVisible : styles.overlayInVisible} >
          <View  style={this.state.isAlertVisibale ? styles.alertBodyVisible : styles.alertBodyInVisible}>
            <View  style={this.state.isAlertVisibale ? styles.alertRowVisible : styles.alertRowInVisible}>
              {textMessage}
            </View>
            <View  style={this.state.isAlertVisibale ? styles.alertSecondRowVisible : styles.alertSecondRowInVisible}>
              <View  style={this.state.isAlertVisibale ? styles.alertCollVisible : styles.alertCollInVisible}>
                <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.closeAlertView}>
                  <View style={this.state.isAlertVisibale ? styles.alertBtnVisible : styles.alertBtnInVisible}>
                    {okBtn}
                  </View>
                </TouchableHighlight>
              </View>
              <View  style={this.state.isAlertVisibale ? styles.alertCollVisible : styles.alertCollInVisible}>
                <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.alertDiscardPressed}>
                  <View style={this.state.isAlertVisibale ? styles.alertBtnVisible : styles.alertBtnInVisible}>
                    {cancelBtn}
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      );
  },

  _renderActionButton: function() {
    if (this.state.isEditMode) {
      return (
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}
          onPress={this.handleEditComplete}>
          <View style={styles.footer}>
            <Text style={styles.footerText}> 修改 EDIT ITEM </Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}
          onPress={this.handleEditComplete}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>加入订单 ADD TO ORDER</Text>
          </View>
        </TouchableHighlight>
      );
    }
  },

  _handleRadioSelect(index, name) {
    OrderActions.radioClicked({index, name});
  },

  _handleBoolSelect(index, name){
    OrderActions.boolClicked({index, name});
  },

  _renderRadios: function(radioMods) {
    var self = this;
    return radioMods.map(function(mod, index){
      return (
      <View
        key={mod.data.name}
        ref={(header)=>{
          if (!self._headers){
            self._headers = []
          }
          self._headers[index] = header;
        }}
      >
        <ModifierSectionHeader name={mod.data.name} />
        <View style={styles.optionsContainer}>
          {mod.data.radioOptions.map(function(option){
            return (
              <ModifierSectionCell
                name={option.nameWithPrice} index={index}
                isSelected={option.isSelected}
                onSelect={(sectionIndex, name)=>{
                  self._handleRadioSelect(sectionIndex, name);
                  if (sectionIndex + 1 < self._headers.length){
                      self._scrollView.scrollTo(self._headers[sectionIndex+1]._myPos);
                  }
                }} />
            );
          })}
        </View>
      </View>);
    });
  },

  _renderBools: function(boolMods) {
    var self = this;
    if (boolMods.length > 0) {
      return (
      <View
        ref={(header)=>{
          if (!self._headers){
            self._headers = [header];
          } else {
            self._headers[this.state.currentItem.radioMods.length] = header;
          }
        }}
      >
        <ModifierSectionHeader name={"Additional Options"} />
        <View style={styles.optionsContainer}>
          {boolMods.map(function(boolMod, index){
            return (
              <ModifierSectionCell name={boolMod.getNameWithPrice()} index={index} isSelected={boolMod.isSelected}
                onSelect={(sectionIndex, name)=>{
                  self._handleBoolSelect(sectionIndex, name);
                  self._scrollView.scrollTo(self._headers[self._headers.length-1]._myPos);
                }}
              />
            );
          })}
        </View>
      </View>);
    }
  },

  _renderSections: function () {
      return (<View>
        {this._renderRadios(this.state.currentItem.radioMods)}
        {this._renderBools(this.state.currentItem.boolMods)}
      </View>);
  },

  _renderQuantityWidget() {
    return (
      <View style={styles.quantityAndPriceRow}>
        <View style={styles.column1}>
          <Text style={styles.blackText}> QUANTITY </Text>
        </View>

        <View style={styles.columnSep}/>
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.column2} onPress={()=>{OrderActions.currentOrderItemDecrement()}}>
          <View style={styles.column2}>
            <Image style={{ resizeMode:Image.resizeMode.contain}} source={require('image!btn_qty_less')} />
          </View>
        </TouchableHighlight>

        <View style={styles.columnSep}/>
        <View style={styles.column3}>
          <Text style={styles.blackTextBold}> {this.state.currentItem.quantity} </Text>
        </View>

        <View style={styles.columnSep}/>
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.column2} onPress={()=>{OrderActions.currentOrderItemIncrement()}}>
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
          <Text style={styles.blackTextBold}> {Number(this.state.currentItem.getCost() /100.0).toFixed(2)} </Text>
        </View>
      </View>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.navBar}>
          <View style={{flexDirection: 'column', flex:1, left:10, justifyContent: 'center', alignItems: 'flex-start',}}>
            <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.btnBackPressed}>
              <View style={styles.backButtonContainer}>
                <Image source={require('image!btn_back')}  />
                <Text style={styles.backButton}>{trimString(this.props.from, BACK_TEXT_LENGTH)}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={styles.navBarText}> {trimString(this.props.data.name,TITLE_LENGTH)} </Text>
          </View>
          <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'flex-start',}}></View>
        </View>
        <View style={styles.separator} />

        <View style={styles.container}>
          <ScrollView ref={(component) => { this._scrollView = component; }}
            style={styles.scrollView} showsVerticalScrollIndicator={false} scrollEventThrottle={200} onScroll={this.handleScroll}>
            <View style={{backgroundColor:'#F2EDE4',justifyContent: 'center',alignItems: 'center',}}>
              <Image style={{flex:2, backgroundColor:'#F2EDE4',width:screen.width,height:screen.width/1.5 }} source={this.props.data.images.length > 0 ? {uri:  this.props.data.images[0].url} : imgArr[0]} />
            </View>
            <View style={styles.separator1} />
            {this._renderQuantityWidget()}
            <View ref={(component) => { this._sep = component; }} style={styles.separator} />
            {this.state.isLoading ? <View style={styles.emptyViewContainer}>
              <Text style={styles.emptyText}>Loading ...</Text>
            </View> : this._renderSections()}
            <View style={styles.columnContainerAddComment}>
              <View style={styles.separator} />
            </View>
            <TextInput underlineColorAndroid={'#891F02'} style={styles.input} value={this.state.comment} placeholder="Add a comment here" placeholderTextColor="#999" onChangeText={(text) => this.setState({comment:text})} />
          </ScrollView>
          {this._renderModal()}
        </View>
        {this._renderActionButton()}
      </View>
    );
  }
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

  containerForAlert: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  innerContainer: {
    borderRadius: 10,
  },

  backButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft:20,
    height: 60,
    alignItems: 'center',
  },

  backButton: {
    fontFamily: 'AvenirNext-Regular',
    paddingLeft: 10,
    height: 25,
    color: '#8D383D',
    marginLeft:8
  },

  thumb1: {
    width: 150,
    height: 150,
    resizeMode:Image.resizeMode.ratio,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    width:120,
    height:120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textPrice: {
    fontFamily: 'AvenirNext-Medium',
    textAlign:'center',
    fontSize:16,
    width:120,
  },

  textPriceWhite: {
    fontFamily: 'AvenirNext-Medium',
    textAlign:'center',
    fontSize:16,
    width:120,
    color: '#FEFAF0',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  scrollView: { height:(screen.height*69)/100, top:0},
  imageContainer: {
    flex: 1,
    width:(screen.width*33.33)/100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    // 								flex: 1,
    width:85,
    height:85,
    resizeMode:Image.resizeMode.ratio,
    justifyContent: 'center',
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

  statusBar: {
    flex : 0,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 0
  },

  statusBarTextLeft: {
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize: 14,
    alignItems: 'center',
    color: 'white',
    paddingLeft: 15,
  },

  statusBarTextRight: {
    fontFamily: 'AvenirNext-Regular',
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
    marginRight : 10,
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
    fontSize:23,
    alignItems: 'center',
    color: '#891F02',
  },

  blackText: {

    fontFamily: 'AvenirNext-Regular',
    fontSize:16,
    textAlign:'center',
    color: 'black',
  },

  blackTextBold: {

    fontFamily: 'AvenirNext-Regular',
    fontSize:20,
    textAlign:'center',
    color: 'black',
  },

  input:{
    fontFamily: 'AvenirNext-Regular',
    height:50,
    color:'black',
    left:10,
    width:screen.width-20,
    marginBottom:36
  },

  marronText: {

    fontFamily: 'AvenirNext-Regular',
    fontSize:20,
    textAlign:'center',
    color: '#891F02',
  },

  marronHeader: {

    fontFamily: 'AvenirNext-Regular',
    fontSize:16,
    textAlign:'center',
    color: '#891F02',
  },

  circleText: {

    fontFamily: 'AvenirNext-Regular',
    flex:2,
    fontSize:16,
    textAlign:'center',
    color: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'center',
  },

  circleTextSelected: {

    fontFamily: 'AvenirNext-Regular',
    flex:2,
    fontSize:16,
    textAlign:'center',
    color: '#FEFAF0',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'center',
  },

  menubutton: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft : 0,
    marginLeft: 0
  },


  headerImage: {
    flex: 1,
    alignSelf :'auto',
    alignItems: 'center',
    flexDirection: 'column',
    top:30,
  },

  separator: {
    height: 1,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D',

  },

  separatorFull: {
    height: 1,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D',
    left:5,
    width:screen.width-10,
  },

  separator1: {
    height: 2,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D'
  },
  separator2: {
    width: 1,
    alignItems: 'flex-end',
    backgroundColor: '#8D383D'
  },


  columnContainer1:{
    flex:3,
    height:50,
    flexDirection: 'column',
  },
  columnContainerAddComment:{
    flex:3,
    height:10,
    flexDirection: 'column',
    marginTop: 36
  },
  columnContainer2:{
    flex:7,
    height:50,
    flexDirection: 'column',
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:25,
  },

  column:{
    flex:1,
    height:30,
    flexDirection: 'column',
  },

  column1:{
    flex:3.0,
    height:30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column2:{
    flex:1,
    height:30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnSep:{
    flex:0.02,
    height:60,
    width:2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#DCDCDC',
  },

  column3:{
    flex:1,
    height:30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  column4:{
    flex:1,
    height:30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  column5:{
    flex:1.8,
    height:30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  column6:{
    flex:2.2,
    height:30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityAndPriceRow: {
    flex:1,
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    backgroundColor:'#F2EDE4',
  },

  itemSepView: {
    flex:1,
    height:58,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
  },

  optionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 0,
    marginLeft: 15,
    marginRight: 10
  },

  option: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15
  },

  optionsHeader: {
    flex:1,
    height:36,
    flexDirection: 'row',
    marginTop: 36
  },

  homebutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    paddingTop:8,
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize:28,
    paddingLeft: 10,
    alignItems: 'center',
    color:'#802628'
  },
  textDesc: {
    paddingTop:5,
    fontFamily: 'AvenirNext-Regular',
    flex: 1,
    fontSize:16,
    paddingLeft: 10,
    color:'#BBB8B0',
  },
  backbutton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize:23,
    alignItems: 'center',
    color: 'white',
    textAlign :'center',
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
    height:screen.height,
    width:screen.width,
  },
  alertView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  overlayVisible: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width:screen.width,
    height:screen.height,
    top:0,
    left:0,
    right:0,
    bottom:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayInVisible: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width:0,
    height:0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertBodyVisible: {
    backgroundColor:'white',
    width:250,
    height:150,
    borderRadius:10,
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  alertBodyInVisible: {
    backgroundColor:'white',
    width:0,
    height:0,
  },
  alertRowVisible: {
    height:100,
    flexDirection: 'row',
    alignSelf:'center',
    borderRadius:10,
    width:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertRowInVisible: {
    width:0,
    height:0,
  },
  alertSecondRowVisible: {
    height:50,
    flexDirection: 'row',
    alignSelf:'center',
    borderRadius:10,
    width:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertSecondRowInVisible: {
    width:0,
    height:0,
  },
  alertCollVisible: {
    flex: 1,
    flexDirection: 'column',
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    borderRadius:10,
  },
  alertCollInVisible: {
    width:0,
    height:0,
  },
  alertBtnVisible: {
    height:50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:125,
    borderRadius:10,
  },
  alertBtnInVisible: {
    backgroundColor:'white',
    width:0,
    height:0,
  },
  alertTextVisible: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize:14,
    color: '#891F02',
    width:200,
    textAlign:'center',
  },
  alertTextInVisible: {
    width:0,
    height:0,
  },
});


module.exports = SetMealView;
