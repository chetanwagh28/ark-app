import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, TouchableHighlight, Alert } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import {doctorActions} from '../action';
import * as Animatable from 'react-native-animatable';
import { Header } from 'react-native-elements';
import style from '../assets/style.js';
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import {LocalizationContext} from './Translations';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;




var {width, height} = Dimensions.get('screen')
 width = width

class QRCodeScan extends Component {

    constructor(props){
        super(props);
        this.state={
            user: '',
            name: '',
            city: '',
            value: 5,
            modalVisible: false,
            viewFocused: false,
            getCat: false,
            myproducts: [],
            total:''
        }
        //console.disableYellowBox = true;
    }

   

    componentDidMount(){
      this.props.navigation.addListener('focus', () => {
          this.setState({viewFocused: true});
      });

      this.props.navigation.addListener('blur', () => {
          this.setState({viewFocused: false});
      });
    }

    onSuccess(e){
        // // console.log('An error occured', e.data)
        let url = e.data
        var splitUrl = url.split('&');
        if(splitUrl.length > 0){
          let doc_id = splitUrl[1].split('=')
          if(doc_id.length > 0 && doc_id[0] === 'doctor_id'){
            const { dispatch } = this.props;
            dispatch(doctorActions.getDoctorsDetail(doc_id[1])).then(res => {
              // // console.log("res===", res)
              if(res.length > 0){
                    this.props.navigation.navigate("DoctorDetail", { 
                                                      categroy: "doctor", 
                                                      categroyKey: "doctor", 
                                                      doctorDetail: res[0],
                                                      video:1,
                                                      spec_id: res[0].spec_id
                                                    }
                                                  )
              }
            })
          }
          
        }
    };

    makeSlideOutTranslation(translationType, fromValue) {
      return {
        from: {
          [translationType]: SCREEN_WIDTH * -0.18
        },
        to: {
          [translationType]: fromValue
        }
      };
    }
   

    render() {
      const translations = this.context.translations;
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const { goBack } = this.props.navigation;
        // let url = 'https://play.google.com/store/apps/details?id=com.arkpatient&doctor_id=8fc65987-06b1-49cd-8e70-50e3ad2e0766&type=appointment'
        // var splitUrl = url.split('&');
        // // console.log("splitUrl", splitUrl)
        // let doc_id = splitUrl[1].split('=')
        // // console.log("doc_id", doc_id[1])

      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{translations['QR_Code_Scanner']}</Title></>}
                rightComponent={<>
                  </>}
              />
            <ScrollView >
            {this.state.viewFocused && 
              <QRCodeScanner
                reactivate={true}
                reactivateTimeout={2000}
                showMarker
                onRead={this.onSuccess.bind(this)}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                customMarker={
                  <View style={styles.rectangleContainer}>
                    <View style={styles.topOverlay}>
                      <Text style={{ fontSize: 30, color: "white" }}>
                        {translations['QR_Code_Scanner']}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.leftAndRightOverlay} />

                      <View style={styles.rectangle}>
                        <Icon
                          // name="ios-qr-scanner"
                          size={SCREEN_WIDTH * 0.73}
                          // color={iconScanColor}
                        />
                        <Animatable.View
                          style={styles.scanBar}
                          direction="alternate-reverse"
                          iterationCount="infinite"
                          duration={2700}
                          easing="linear"
                          animation={this.makeSlideOutTranslation(
                            "translateY",
                            SCREEN_WIDTH * -0.80
                          )}
                        />
                      </View>

                      <View style={styles.leftAndRightOverlay} />
                    </View>

                    <View style={styles.bottomOverlay} />
                  </View>
                }
              />
            }
            </ScrollView>
        </SafeAreaView>
      );
    }
}


QRCodeScan.contextType = LocalizationContext; 
const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.85; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.56; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

function mapStateToProps(state) { 
  const { loader, doctorDetail } = state.doctorReducer;
  // // console.log("myproducts",myproducts)
  return {
    doctorDetail,
    loader
  };    
}

export default connect(mapStateToProps)(QRCodeScan);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
});
