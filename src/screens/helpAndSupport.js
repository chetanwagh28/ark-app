import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar,SafeAreaView, Image, Alert, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from './Translations';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions, doctorActions } from '../action';
import Geolocation from "@react-native-community/geolocation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from 'react-native-elements';
import style from '../assets/style.js';




class HelpAndSupport extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            contact_no: '',
            message:''
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      // this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //   // // console.log("data",data)
        
      //   this.setState({category:this.props.route.params.name})
      //   // let url = `/lab/getlabs?distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
      //   const { dispatch } = this.props;
      //   dispatch(healthTipsActions.getHealthTipsList(this.props.route.params.healthtips_category_id));
      // });
    }



    render() {
        // // console.log("categroy",this.state.categroy)
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
      const { goBack } = this.props.navigation;
      return (
      <SafeAreaView style={style.container}>
        <Header backgroundColor="#00b2b6"
              leftComponent={<>
                      <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                    </>}
              centerComponent={<><Text style={styles.logoText}>Help and Support</Text></>}
              rightComponent={<>
                </>}
            />

        <ScrollView>
        
          <View >
            <View style={style.textbox}>
             <TextInput
               style={[styles.textInput, {
               color:'white'
                }]}
                placeholder="name"
              />
            </View>
            <View style={style.textbox}>
             <TextInput
               style={[styles.textInput, {
               color:'white'
                }]}
                placeholder="Mobile Number"
              />
            </View>
            <View style={style.textbox}>
             <TextInput
               style={[styles.textInput, {
               color:'white'
                }]}
                placeholder="Email Id"
              />
            </View>
            <View style={style.textbox}>
             <TextInput
               style={[styles.textInput, {
               color:'white'
                }]}
                placeholder="Message"
                multiline = {true}
                numberOfLines = {6}
              />
            </View>
            <View style={{marginTop:90}}>
             <Text style={{fontSize:18,marginLeft:20,color:"#000"}}> Calll On :</Text>
            </View>
            <View style={{marginTop:5}}>
             <Text style={{fontSize:18,marginLeft:100,color:"#000"}}> +91-9XXXXXXXXX</Text>
            </View>
          </View>
          </ScrollView>
       </SafeAreaView>  
      );
    }
}

function mapStateToProps(state) { 
  const { loader, healthTipsList } = state.healthTipsReducer;
  // // console.log("healthTipsList",loader)
  return {
    healthTipsList,
    loader
  };    
}

export default connect(mapStateToProps)(HelpAndSupport);
// export default HelpAndSupport;


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
  containerView: {
    margin: 0,
    marginTop: 0
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,
    marginVertical:5,
    color: '#05375a',
    },
    messagebox: {
      flexDirection: 'row',
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: '#ffffff',
      backgroundColor: '#ffffff',
      paddingBottom: 0,
      marginHorizontal:10,
      height:70
  }, 
});
