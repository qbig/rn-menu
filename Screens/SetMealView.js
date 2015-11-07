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
  Modal,
} = React;
var orderListView = require('./OrderList');
var screen = require('Dimensions').get('window');
var ds;


var {
  height: deviceHeight
} = Dimensions.get('window');
var TopModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceHeight) }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 0,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 0,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  okEvent: function() {
    Animated.timing(this.state.offset, {
      duration: 0,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  render: function() {
    return (
      <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset }]}]}>
        <View style = {styles.alertView}>
          <View style= {{flex:1,paddingTop:20,justifyContent: 'center',
            alignItems: 'center'}}>
            <Text style={{color:'#000',fontSize:20,paddingTop:5, fontFamily: 'AvenirNextLTPro-Regular'}}>TEST MESSAGE</Text>
          </View>
          <View style = {{flexDirection:'row',flex:1,paddingTop:5, fontFamily: 'AvenirNextLTPro-Regular'}}>

            <TouchableOpacity onPress={this.okEvent}>
              <Text style={{color: '#000',padding:20,fontSize:18,paddingTop:5, fontFamily: 'AvenirNextLTPro-Regular'}}>Ok</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={this.closeModal}>
              <Text style={{color: '#000',padding:20,fontSize:18,paddingTop:5, fontFamily: 'AvenirNextLTPro-Regular'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }
});
var App = React.createClass({
  render: function() {
    return (
      <View style={styles.flexCenter}>
        <TouchableOpacity onPress={this.props.openModal}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
      </View>
    )
  }
});
var RouteStack = {
  app: {
    component: App
  }
}

var imgArr = [require('image!item_1'),require('image!item_2'),require('image!item_3'),require('image!item_4'),require('image!item_5'),require('image!item_6'),require('image!item_7'),require('image!item_8')];
var styles = StyleSheet.create({ contentContainer: { paddingVertical: 20 } });

var onlyMultiline = {
  onSelectionChange: true, // not supported in Open Source yet
  onTextInput: true, // not supported in Open Source yet
  children: true,
};

var notMultiline = {
  onSubmitEditing: true,
};

var SetMealView = React.createClass({
  getInitialState() { return {
    animated: false,
    modalVisible: false,
    transparent: true,

    round1: false,
    round2: false,
    round3: false,
    round4: false,
    round5: false,
    round6: false,
    round7: false,
    round8: false,
    round9: false,
    round10: false,
    round11: false,
    round12: false,
    round13: false,
    round14: false,
    round18: false,

    isAlertVisibale: false,
    isBackPressed:false,

  }; },
  _setModalVisible(visible)
  {
    this.setState({modalVisible: visible});
  },

  okEvent:function()
  {
    this.setState({modalVisible: false});
  },
  cancelEvent:function()
  {
    this.setState({modalVisible: false});
  },
  menuItemClicked:function()
  {
    this.setState({round1: !this.state.round1});
  },
  round1Clicked:function()
  {
    this.setState({round1: !this.state.round1});
  },


  round2Clicked:function()
  {
    this.setState({round2: !this.state.round2});
  },
  round3Clicked:function()
  {
    this.setState({round3: !this.state.round3});
  },
  round4Clicked:function()
  {
    this.setState({round4: !this.state.round4});
  },
  round5Clicked:function()
  {
    this.setState({round5: !this.state.round5});
  },
  round6Clicked:function()
  {
    this.setState({round6: !this.state.round6});
  },
  round7Clicked:function()
  {
    this.setState({round7: !this.state.round7});
  },
  round8Clicked:function()
  {
    this.setState({round8: !this.state.round8});
  },
  round9Clicked:function()
  {
    this.setState({round9: !this.state.round9});
  },
  round10Clicked:function()
  {
    this.setState({round10: !this.state.round10});
  },
  round11Clicked:function()
  {
    this.setState({round11: !this.state.round11});
  },
  round12Clicked:function()
  {
    this.setState({round12: !this.state.round12});
  },
  round13Clicked:function()
  {
    this.setState({round13: !this.state.round13});
  },
  round14Clicked:function()
  {
    this.setState({round14: !this.state.round14});
  },
  round18Clicked:function()
  {
    this.setState({round18: !this.state.round18});
  },
  _pressData: ({}: {[key: number]: boolean}),

  handleScroll: function(event: Object) {},

  componentWillMount: function() { this._pressData = {}; },
  goPrvPage:function()
  {
    this.props.navigator.pop();
  },

  _onViewOrderPress: function() {
    if(!this.state.isAlertVisibale)
    {
      this.props.navigator.push({
        title: "",
        component: orderListView
      });
    }
  },

  _onBackToMainView:function()
  {
    this.props.navigator.pop();
  },

  discardClicked: function() {},
  openAlertView:function()
  {
    this.setState({isBackPressed: false})
    if(!this.state.isAlertVisibale)
    {
      this.setState({isAlertVisibale: !this.state.isAlertVisibale});
    }
  },

  btnBackPressed:function()
  {
    this.setState({isBackPressed: true})
    if(!this.state.isAlertVisibale)
    {
      this.setState({isAlertVisibale: !this.state.isAlertVisibale});
    }
  },


  closeAlertView:function()
  {
    this.setState({isAlertVisibale: !this.state.isAlertVisibale});

  },

  alertDiscardPressed:function()
  {
    this.setState({isAlertVisibale: !this.state.isAlertVisibale});
    this.props.navigator.pop();
  },


  renderScene: function(route, navigator) {
    var Component = route.component;

    return (<Component openModal={() => this.setState({modal: true})}/>)
  },


  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };

    var okBtn = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>No</Text>: null;
    var cancelBtn = this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Yes, discard</Text>: null;
    var textMessage = this.state.isBackPressed ? this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Are you sure you want to back? The item will not be saved to your order.</Text>  : null : this.state.isAlertVisibale ? <Text style={styles.alertTextVisible}>Are you sure you want to discard? The item will not be saved to your order.</Text>  : null;
    var innerContainerTransparentStyle = this.state.transparent
    ? {backgroundColor: '#fff', padding: 20}
    : null;
    return (

      <View style={styles.container}>
        <View style={styles.statusBar}>
          <Text style={styles.statusBarTextLeft}> TABLE 1 </Text>
          <Text style={styles.statusBarTextRight}> CONNECTED </Text>
          <Image style={styles.icon} source={require('image!icn_connected')} />

        </View>
        <View style={styles.navBar}>
          <View style={{flexDirection: 'column', flex:1, left:10, justifyContent: 'center', alignItems: 'flex-start',}}>
            <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.btnBackPressed}>
              <View style={{flexDirection: 'row', flex:1}}>
                <Image source={require('image!btn_back')}  />
                <Text style={styles.backButton}>{this.props.from}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={styles.navBarText}> {this.props.data.name} </Text>
          </View>
          <View style={{flexDirection: 'column',  flex:1, justifyContent: 'center', alignItems: 'flex-start',}}>

          </View>

        </View>
        <View style={styles.separator} />
        <View style={styles.container}>


          <ScrollView style={styles.scrollView} scrollEventThrottle={200} onScroll={this.handleScroll}>

            <View style={{backgroundColor:'#F2EDE4',justifyContent: 'center',alignItems: 'center',}}>
              <Image style={{flex:2, backgroundColor:'#F2EDE4',width:screen.width,height:screen.width/1.5 }} source={require('image!mainimg')} />

            </View>
            <View style={styles.separator1} />
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.blackText}> QUANTITY </Text>
              </View>
              <View style={styles.columnSep}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.column2} >
                <View style={styles.column2}>
                  <Image style={{ resizeMode:Image.resizeMode.contain}} source={require('image!btn_qty_less')} />

                </View>
              </TouchableHighlight>
              <View style={styles.columnSep}/>
              <View style={styles.column3}>

                <Text style={styles.blackTextBold}> 3 </Text>
              </View>
              <View style={styles.columnSep}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} style={styles.column2} >
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
                <Text style={styles.blackTextBold}> $23.40 </Text>
              </View>
            </View>

            <View style={styles.separator} />


            <View style={styles.row1}>
            </View>
            <View style={styles.row1}>
              <View style={styles.columnContainer1}>
                <View style={styles.separator} />
              </View>
              <View style={styles.columnContainer2}>
                <Text style={styles.marronHeader}> SELECT MEAT </Text>
              </View>
              <View style={styles.columnContainer1}>
                <View style={styles.separator} />
              </View>

            </View>

            <View style={styles.row2}>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round1Clicked}>
                <View >

                  <Image style={styles.thumb1} source={this.state.round1 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round1 ? styles.textPriceWhite : styles.textPrice}>
                        SILKY CHICKEN
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round2Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round2 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round2 ? styles.textPriceWhite : styles.textPrice}>
                        ROAST CHICKEN
                      </Text>
                    </View>
                  </Image>
                </View>

              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round3Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round3 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round3 ? styles.textPriceWhite : styles.textPrice}>
                        CHAR SIU
                      </Text>
                    </View>
                  </Image>
                </View>


              </TouchableHighlight>
              <View style={styles.itemSepView}/>
            </View>
            <View style={styles.row30}/>
            <View style={styles.row2}>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.round4Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round4 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round4 ? styles.textPriceWhite : styles.textPrice}>
                        ROAST PORK
                      </Text>
                    </View>
                  </Image>
                </View>

              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round5Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round5 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round5 ? styles.textPriceWhite : styles.textPrice}>
                        BEEF BRISKET +$1
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round6Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round6 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round6 ? styles.textPriceWhite : styles.textPrice}>
                        ROAST DUCK +$2
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
            </View>
            <View style={styles.row1}/>
            <View style={styles.row1}>
              <View style={styles.columnContainer1}>
                <View style={styles.separator} />
              </View>
              <View style={styles.columnContainerLong}>
                <Text style={styles.marronHeader}> SELECT NOODLE/HOR FUN </Text>
              </View>
              <View style={styles.columnContainer1}>
                <View style={styles.separator} />
              </View>
            </View>
            <View style={styles.row2}>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round7Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round7 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round7 ? styles.textPriceWhite : styles.textPrice}>
                        DRY HOR FUN
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round8Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round8 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round8 ? styles.textPriceWhite : styles.textPrice}>
                        HOR FUN IN SOUP
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round9Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round9 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round9 ? styles.textPriceWhite : styles.textPrice}>
                        RICE
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
            </View>
            <View style={styles.row30}/>
            <View style={styles.row2}>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round10Clicked}>

                <View >
                  <Image style={styles.thumb1} source={this.state.round10 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round10 ? styles.textPriceWhite : styles.textPrice}>
                        DRY NOODEL
                      </Text>
                    </View>
                  </Image>
                </View>

              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round11Clicked}>


                <View >
                  <Image style={styles.thumb1} source={this.state.round11 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round11 ? styles.textPriceWhite : styles.textPrice}>
                        NOODEL IN SOUP
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round18Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round18 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round18 ? styles.textPriceWhite : styles.textPrice}>
                        NOODEL IN SOUP
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
            </View>

            <View style={styles.row1}/>
            <View style={styles.row1}>
              <View style={styles.columnContainer1}>
                <View style={styles.separator} />
              </View>
              <View style={styles.columnContainer2}>
                <Text style={styles.marronHeader}> SELECT DRINK </Text>
              </View>

              <View style={styles.columnContainer1}>
                <View style={styles.separator} />
              </View>
            </View>
            <View style={styles.row2}>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round12Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round12 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round12 ? styles.textPriceWhite : styles.textPrice}>
                        BARLEY
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.round13Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round13 ? require('image!btn_option_selected') : require('image!btn_option_unselected')}>
                    <View style={styles.overlay}>
                      <Text style={this.state.round13 ? styles.textPriceWhite : styles.textPrice}>
                        CHINESE TEA
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
              <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'}  onPress={this.round14Clicked}>
                <View >
                  <Image style={styles.thumb1} source={this.state.round14 ? require('image!btn_option_selected') : require('image!btn_option_unselected')} >
                    <View style={styles.overlay}>
                      <Text style={this.state.round14 ? styles.textPriceWhite : styles.textPrice}>
                        CANNED DRINKS
                      </Text>
                    </View>
                  </Image>
                </View>
              </TouchableHighlight>
              <View style={styles.itemSepView}/>
            </View>
            <View style={styles.row1}/>
            <View style={styles.columnContainerAddComment}>
              <View style={styles.separator} />
            </View>
            <TextInput style={styles.input} placeholder="Add a comment here" placeholderTextColor="#999" />
            <View style={styles.row1}/>
          </ScrollView>

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
        </View>
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this._onViewOrderPress}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>ADD TO ORDER</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
        <TouchableHighlight activeOpacity={0.8} underlayColor={'rgba(255,255,255,0.1)'} onPress={this.openAlertView}>
          <View style={styles.footer}>
            <Text style={styles.footerText}> CHANGE ORDER ITEM </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});




var styles = StyleSheet.create({
  containerForAlert: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
  innerContainer: {
    borderRadius: 10,
  },
  backButton:{

    fontFamily: 'AvenirNextLTPro-Regular',
    paddingLeft:8,
    alignItems: 'flex-start',
    textAlign :'left',
    color: '#8D383D',
  },
  thumb1: {
    width: 80,
    height: 80,
    resizeMode:Image.resizeMode.ratio,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  overlay: {
    position: 'absolute',
    width:80,
    height:80,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textPrice: {
    fontFamily: 'AvenirNextLTPro-Regular',
    textAlign:'center',
    fontSize:12,
    width:60,
  },

  textPriceWhite: {
    fontFamily: 'AvenirNextLTPro-Regular',
    textAlign:'center',
    fontSize:12,
    width:60,
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

    fontFamily: 'AvenirNextLTPro-Regular',
    flex : 1,
    fontSize:14,
    alignItems: 'center',
    color: '#10E790',
    paddingLeft:15,
  },
  statusBarTextRight: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex : 1,
    fontSize:14,
    alignItems: 'flex-end',
    color: '#10E790',
    paddingRight : 4,
    textAlign :'right',
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

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize:23,
    alignItems: 'center',
    color: '#891F02',
  },

  blackText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize:16,
    textAlign:'center',
    color: 'black',
  },

  blackTextBold: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize:20,
    textAlign:'center',
    color: 'black',
  },

  input:{

    fontFamily: 'AvenirNextLTPro-Regular',
    height:50,
    color:'black',
    left:10,
    width:screen.width-20,
  },

  marronText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize:20,
    textAlign:'center',
    color: '#891F02',
  },

  marronHeader: {

    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize:16,
    textAlign:'center',
    color: '#891F02',
  },

  circleText: {

    fontFamily: 'AvenirNextLTPro-Regular',
    flex:2,
    fontSize:16,
    textAlign:'center',
    color: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'center',
  },

  circleTextSelected: {

    fontFamily: 'AvenirNextLTPro-Regular',
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
  },
  columnContainer2:{
    flex:4,
    height:50,
    flexDirection: 'column',
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    bottom:25,
  },
  columnContainerLong:{
    flex:10,
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


  row: {
    flex:1,
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    backgroundColor:'#F2EDE4',
  },

  row1: {
    flex:1,
    height:36,
    flexDirection: 'row',
  },

  row30: {
    flex:1,
    height:30,
    flexDirection: 'row',

  },

  itemSepView: {
    flex:1,
    height:58,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,

  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
  },

  homebutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },

  text: {
    paddingTop:8,
    fontFamily: 'AvenirNextLTPro-Regular',
    flex: 1,
    fontSize:28,
    paddingLeft: 10,
    alignItems: 'center',
    color:'#802628'
  },
  textDesc: {
    paddingTop:5,
    fontFamily: 'AvenirNextLTPro-Regular',
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


    fontFamily: 'AvenirNextLTPro-Demi',
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

    fontFamily: 'AvenirNextLTPro-Demi',
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
