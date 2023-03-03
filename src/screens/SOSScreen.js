import React, {useContext, useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Title } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { profileActions } from '../action';
import {LocalizationContext} from './Translations';
import { Header, Input as TextInput } from 'react-native-elements';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from "@react-native-community/geolocation";
import style from '../assets/style.js';


const SOSScreen = ({navigation}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // // console.log("----",translations)
    const [userDetail, setUserDetail] = React.useState(null);
    const [check, setCheck] = React.useState(false);

    const [error, setError] = useState("");
    const [position, setPosition] = React.useState({
        latitude: 0,
        longitude: 0
    });

    const [data, setData] = React.useState({
        Phone: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true
    });
    //console.disableYellowBox = true;

    useEffect(async() => {

          // setIsLoading(false);
          let userDetailData;
          userDetailData = null;
          try {
            userDetailData = await AsyncStorage.getItem('userDetail');
            // userToken = await AsyncStorage.getItem('userToken');
            // // console.log(jwtdecode(userToken))
            setUserDetail(JSON.parse(userDetailData));
            // // console.log("====================")
            setData({
                ...data,
                Phone: JSON.parse(userDetailData).sos
            });
          } catch(e) {
            // console.log(e);
          }

        // const watchId = Geolocation.watchPosition(
        //   pos => {
        //     setError("");
        //     setPosition({
        //       latitude: pos.coords.latitude,
        //       longitude: pos.coords.longitude
        //     });
        //   },
        //   e => setError(e.message)
        // );
        // return () => Geolocation.clearWatch(watchId);
    }, []);

    const dispatch = useDispatch();
    // const { colors } = useTheme();

    const textInputChange = (val) => {
        if( val.trim().length >= 10 ) {
            setData({
                ...data,
                Phone: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                phone: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
            return false
        } else {
            setData({
                ...data,
                isValidUser: false
            });
            return true
        }
    }

    const sosHandle = (phone, position) => {
        // // console.log("---",phone)
        if ( phone === "" ) {
            Alert.alert('Wrong Input!', 'phone field cannot be empty.', [
                {text: 'Close'}
            ]);
            return;
        }else{

            const params = {
                      "lang": "en",
                      "sos_contact": phone,
                      "patient_id": userDetail.user_id,
                      "requested_by": "requested_by"
                    }
            // // console.log("-------",params)
            dispatch(profileActions.updateSOS(params));

            let userdata = {
                        user_id: userDetail.user_id,
                        email: userDetail.email,
                        contact_no: userDetail.contact_no,
                        role: userDetail.role,
                        name: userDetail.name,
                        sos: phone,
                        referral_code: userDetail.referral_code,
                        display_pic: userDetail.display_pic,
                        patient_id: userDetail.patient_id,
                        is_approved: userDetail.is_approved
                       }
            setCookieData(userdata); 
        }
    }

    const setCookieData = async(data) => {
      try {
        // // console.log("setData")
       await AsyncStorage.setItem('userDetail', JSON.stringify(data));
      } catch(e) {
        // console.log(e);
      }
    }

    const user = useSelector(state => ({ ...state.profileReducer}), shallowEqual)
    if(user.profileUpdate ){
        Alert.alert('Successfully added!', '', [
            {text: 'Close'}
        ]);
    }
    
    // // console.log("---------",userDetail)
    return (
    <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => navigation.goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>{translations['update_emergency_number']}</Title></>}
                rightComponent={<>
                  </>}
              />    
          <ScrollView>

              <View>
                <View style={styles.header}>
                    <Image style={styles.appLogo} resizeMode={'center'} source={{uri: "https://panel.avark.in/apk-image/assets/images/logo.png"}}/>
                    <Text style={{color: '#00b2b6', fontWeight: 'bold'}}>ARK</Text>
                </View>
                    <Animatable.View 
                        animation="fadeInUp"
                        style={{padding: 20}}
                    >
                        <TextInput 
                            leftIcon={
                                <FontAwesome 
                                    name="phone"
                                    // color={colors.text}
                                    size={20}
                                />
                              }
                            rightIcon={data.check_textInputChange ? 
                                            <Animatable.View
                                                animation="bounceIn"
                                            >
                                                <Feather 
                                                    name="check-circle"
                                                    color="green"
                                                    size={20}
                                                />
                                            </Animatable.View>
                                            : null}
                            placeholder={userDetail && userDetail.sos || translations['Phone Number']}
                            placeholderTextColor="#666666"
                            name="phone"
                            autoCapitalize="none"
                            keyboardType="phone-pad"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        { data.isValidUser ? null : 
                            <Text style={styles.errorMsg}>{translations['phone']}</Text>
                        }

                        <View style={styles.contentList}>
                            <View style={styles.buttonContainer}>

                                <TouchableOpacity style={styles.signIn} onPress={() => {sosHandle( data.phone, position)}}>
                                    <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={styles.signIn}>
                                        <Text style={[styles.textSign, {color:'#fff'}]}>{translations['Submit']}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            

                                <TouchableOpacity style={styles.signIn} onPress={() => navigation.goBack()}>
                                    <LinearGradient colors={['#00B2B6', '#00B2B6']} style={styles.signIn}>
                                        <Text style={[styles.textSign, {color:'#fff'}]}>{translations['Back']}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>
                        </View>    
                        
                    </Animatable.View>
              </View>
          </ScrollView>
    </SafeAreaView>
    );
};

export default SOSScreen;

const styles = StyleSheet.create({
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
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    appLogo:{
        width:60,
        height:60,
    },
    footer: {
        flex: 8,
        backgroundColor: '#00B2B6',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth: 1,
        borderColor: '#000'
    },
    errorMsg: {
        color: 'red',
        fontSize: 16,
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 15
    },
    signIn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    textSign: {
        fontSize: 16,
    },
    signUp: {
        marginTop: 15,
        width:'100%',
        textAlign:"center"
    },
    textSign1: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    contentList:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
      },
  });
