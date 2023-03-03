import React, {useContext, useState, useEffect} from 'react';
import { View, Text,  TouchableOpacity, FlatList, Dimensions, Platform , StatusBar, Alert, Image , ScrollView, ActivityIndicator, TouchableHighlight, BackHandler } from 'react-native';
import { Input as TextInput } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Left, Body, Right } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestMultiple, PERMISSIONS, requestNotifications} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import Users from '../model/users';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions } from '../action';
import {LocalizationContext} from './Translations';
import styles from '../assets/style.js';
import Geolocation from "@react-native-community/geolocation";
import {ListItem} from 'react-native-elements';
import {utilityHelper} from '../helper/utilityHelper'   
import Carousel from 'react-native-snap-carousel';
import Stethoscope from '../assets/images/doctor.png';
import Medinice from '../assets/images/medicine.png';
import Profile from '../assets/images/user-avatar.png';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) - 50;
var carouselItems = [] ;



const SignInScreen = ({navigation, props}) => {
    // // console.log(navigation, "fcmToken=>>>>>>>>>",props)

    const {
        translations,
        appLanguage,
        setAppLanguage,
        initializeAppLanguage,
      } = useContext(LocalizationContext); // 1
      initializeAppLanguage(); // 2

    const [state, setState] = React.useState(null);
    const [language, setLanguage] = React.useState(translations.getAvailableLanguages());

    const [showPassword, setShowPassword] = React.useState(true);
    const [showOTP, setShowOTP] = React.useState(false);
    const [currentOTP, setCurrentOTP] = React.useState(false);
    const [otp, setOTP] = React.useState(false);

    const [openSignup, setOpenSignup] = React.useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = React.useState(false);
    const [showOTPInput, setShowOTPInput] = React.useState(false);
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // // console.log("----",translations)

    const dispatch = useDispatch();

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_input: false,
        check_textInputChange: '',
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        submit: false
    });
    //console.disableYellowBox = true;

    const [error, setError] = useState("");
    const [position, setPosition] = React.useState({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        setTimeout(async() => {
            let fcmToken = await AsyncStorage.getItem('fcmToken'); 
            // // console.log("fcmToken",fcmToken)
            setData({   
                ...data,    
                device_id: fcmToken 
            }); 
            requestLocationPermission(); // function call
        }, 100);
        
    }, []);

    //Location permission
    const requestLocationPermission = async () => {
        try {
          requestMultiple([ PERMISSIONS.ANDROID.READ_PHONE_STATE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_CONTACTS ]).then((statuses) => {

          });

          requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
            switch (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
              case 'unavailable':
                console.log('This feature is not available (on this device / in this context)');
                break;
              case 'denied':
                console.log('The permission has not been requested / is denied but requestable');
                requestLocationPermission();
                break;
              case 'limited':
                console.log('The permission is limited: some actions are possible');
                break;
              case 'granted':
                console.log('The permission is granted');
                locationSet()
                break;
              case 'blocked':
                console.log('The permission is denied and not requestable anymore');
                break;
            }
            // // console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
          });
        } catch (err) {
          // log(err);
        }

    }

    const locationSet = async () => {
        const watchId = Geolocation.watchPosition(
          pos => {
            setError("");
            setPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            });
          },
          e => setError(e.message)
        );
        return () => Geolocation.clearWatch(watchId);
    }

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length > 9 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 10 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password, position) => {
        setData({
            ...data,
            submit: true
        });
        const params = {
                      "lang": "en",
                      "contact_no": userName,
                      "password": password,
                      "device_id": data.device_id,
                      "device_type": Platform.OS,
                      "notification_id": DeviceInfo.getUniqueId(),
                      "notification": DeviceInfo.getUniqueId(),
                      "app_version": DeviceInfo.getVersion(),
                      "lat": position.latitude,
                      "lng": position.longitude,
                      "requested_by": "requested_by"
                    }
        // // console.log("-------",params)
        
        dispatch(loginActions.login(params))
    }

    const user = useSelector(state => ({ ...state.loginReducer}), shallowEqual)
    if(user.authenticated && data.submit){
        // // console.log(user)
        signIn(user.userInfo) 
    }else if(user.errorMsg && data.submit){
        // // console.log(user)
        Alert.alert(user.errorMsg, '', [
            {text: 'Close'}
        ]);
        setData({
            ...data,
            submit: false
        });
    }
    

    const changeType = (type) => {
        setData({
                ...data,
                check_input: !type
            })
    }
    const _renderItem = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => { setAppLanguage(item) }} style={{marginBottom:10}} >
            <Text style={{color: (appLanguage === item) ? '#000' : '#000', fontWeight: (appLanguage === item) ? 'bold' : 'none', fontSize: (appLanguage === item) ? 16 : 16 }}>{utilityHelper.langExists(item)}</Text>
        </TouchableOpacity>
      );
    }

    const sendOTP = () =>{
        if(data.username.length === 10){
            dispatch(loginActions.sendOTP(data.username)).then((res)=>{
                Alert.alert('Please check otp', '', [
                    {text: 'close'}
                ]); 
                // console.log("res", res)
                if(res.user_exist){    
                    setCurrentOTP(res.otp)
                    setShowOTPInput(true)
                }else{
                    setCurrentOTP(res.otp)
                    setShowOTPInput(true)
                    setOpenSignup(true)
                }

            })
        }else{
            Alert.alert('Enter Valid mobile number', '', [
                {text: 'close'}
            ]); 
        }
    }

    const verifyOTP = () =>{
        if(data.username.length === 10){
            if(currentOTP == otp){
                setData({
                    ...data,
                    submit: true
                });
                const params = {
                              "lang": "en",
                              "contact_no": data.username,
                              "otp": otp,
                              "device_id": data.device_id,
                              "device_type": Platform.OS,
                              "notification_id": DeviceInfo.getUniqueId(),
                              "notification": DeviceInfo.getUniqueId(),
                              "app_version": DeviceInfo.getVersion(),
                              "lat": position.latitude,
                              "lng": position.longitude,
                              "requested_by": "requested_by"
                            }
                
                dispatch(loginActions.verifyOTP(params))
        
            }else{
                Alert.alert('Enter Valid otp', '', [
                    {text: 'close'}
                ]);
            }
        }else{
            Alert.alert('Enter Valid mobile number', '', [
                {text: 'close'}
            ]); 
        }
    }

    const checKOTP = () =>{
        if(currentOTP == otp){
            setShowRegistrationForm(true)
        }else{
            Alert.alert('Enter Valid otp', '', [
                {text: 'close'}
            ]);
        }
    }
    const registration = () =>{
        if(data.username.length === 10){
            if(currentOTP == otp){
                setData({
                    ...data,
                    submit: true
                });
                const params = {
                              "lang": "en",
                              "contact_no": data.username,
                              "name" : name,
                              "password" : password,
                              "referral_code" : code,
                              "otp": otp,
                              "device_id": data.device_id,
                              "device_type": Platform.OS,
                              "notification_id": DeviceInfo.getUniqueId(),
                              "notification": DeviceInfo.getUniqueId(),
                              "app_version": DeviceInfo.getVersion(),
                              "lat": position.latitude,
                              "lng": position.longitude,
                              "requested_by": "requested_by"
                            }
                
                dispatch(loginActions.registrationByOTP(params))
        
            }else{
                Alert.alert('Enter Valid otp', '', [
                    {text: 'close'}
                ]);
            }
        }else{
            Alert.alert('Enter Valid mobile number', '', [
                {text: 'close'}
            ]); 
        }
    }

    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      // console.log("========")
      return () => backHandler.remove()
    }, [])

    return (
        <Container>

            <Header style={styles.appHeader}>
                <Body >
                    <View style={[styles.header]}>
                        <Carousel
                          data={language}
                          renderItem={_renderItem}
                          sliderWidth={SLIDER_WIDTH}
                          itemWidth={ITEM_WIDTH}
                          // containerCustomStyle={styles.list}
                          inactiveSlideShift={0}
                          onSnapToItem={(index) => setState({ index })}
                          useScrollView={false} 
                          loop={false}
                          autoplay={false}
                          layout={'default'}   
                          activeOpacity={1}
                        />
                    </View>
                </Body>
            </Header>
            <Content style={styles.container}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Animatable.Image animation="fadeInUp"
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="center"
                        />

                    <Animatable.View animation="fadeInUp">
                        <Text style={[style.PageTitle, {color: '#000'}]}>{translations['Login']}</Text>
                    </Animatable.View> 
                </View>

            <Animatable.View 
                animation="fadeInUp"
                style={[styles.footer, {
                    // backgroundColor: "#00B2B6"
                }]}
            >
            {data.check_input ?
                <React.Fragment>
                
                <View >
                    
                    <TextInput 
                        leftIcon={
                            <FontAwesome 
                                name="user-o"
                                color={"#fff"}
                                size={20}
                            />
                          }
                        rightIcon={data.check_textInputChange ? 
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather 
                                            name="check-circle"
                                            color="#fff"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                        placeholder={translations['Email']}
                        placeholderTextColor="#666666"
                        style={{color: "#000"}}
                        name="email"
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    
                </View>
                { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{translations['email_validation']}</Text>
                </Animatable.View>
                }
                </React.Fragment>
            :    
                <React.Fragment>
                
                <View >
                    <TextInput
                        leftIcon={
                            <FontAwesome 
                                name="user-o"
                                color={"#000"}
                                size={20}
                            />
                          } 
                        rightIcon={data.check_textInputChange ? 
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather 
                                        name="check-circle"
                                        color="#000"
                                        size={20}
                                        style={{marginTop: 10, marginRight: 10}}
                                    />
                                </Animatable.View>
                                : null}
                        placeholder={translations['mobile_number']}
                        placeholderTextColor={"#000"}
                        style={{color: "#000"}}
                        name="phone"
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    
                    
                </View>
                
                { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{translations['phone_number_validation']}</Text>
                </Animatable.View>
                }
                </React.Fragment>

            }

            {showPassword ?
                <>
                <View >
                    <TextInput
                        leftIcon={
                            <FontAwesome 
                                name="lock"
                                color={"#000"}
                                size={20}
                            />
                          }  
                        rightIcon={
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                            >
                                {data.secureTextEntry ? 
                                <Feather 
                                    name="eye-off"
                                    color={"#000"}
                                    size={20}
                                    style={{marginTop: 10, marginRight: 10}}
                                />
                                :
                                <Feather 
                                    name="eye"
                                    color={"#000"}
                                    size={20}
                                    style={{marginTop: 10, marginRight: 10}}
                                />
                                }
                            </TouchableOpacity>
                        }
                        placeholder={translations['Password']}
                        placeholderTextColor="#000"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={{color: "#000"}}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    
                </View>
                </>
                :
                <>
                </>
            }
            {showOTPInput ?
                <>
                <View >
                    <TextInput 
                        placeholder={'Enter OTP'}
                        placeholderTextColor="#000"
                        secureTextEntry={false}
                        style={[styles.textInput, {
                            color: "#000"
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => setOTP(val)}
                    />
                </View>
                </>
                :
                <>
                </>
            }

            {showRegistrationForm &&
                <>
                    <View >
                        <TextInput 
                            placeholder={translations['Name']}
                            placeholderTextColor="#000"
                            style={[styles.textInput, {
                                color: "#000"
                                }]}
                                autoCapitalize="none"
                            onChangeText={(val) => setName(val)}
                        />
                    </View>
                    <View >
                        <TextInput
                            placeholder={translations['Password']}
                            secureTextEntry={true}
                            style={[styles.textInput, {
                            color: "#000"
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => setPassword(val)}
                            />
                    </View>
                    <View >
                        <TextInput
                            placeholder="Refarral Code"
                            style={[styles.textInput, {
                            color: "#000"
                            }]}
                            autoCapitalize="none"
                            onChangeText={(referral_code) => setCode(referral_code)}
                            />
                    </View>

                </>

            }
                { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{translations['password_validation']}</Text>
                </Animatable.View>
                }

                {!showRegistrationForm &&
                    <>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}
                          >
                            <Text style={{color: '#000', marginTop:25, marginBottom:20}}>{translations['Forgot_Password']}</Text>
                        </TouchableOpacity>
                        {showPassword ?
                            <>
                                <TouchableOpacity
                                    onPress={() => setShowPassword(false)}
                                  >
                                    <Text style={{color: '#000', marginTop:25, marginBottom:20}}>Login/SignUp with OTP</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <View style={{flexDirection: 'column'}}>  
                                <TouchableOpacity
                                    onPress={() => sendOTP()}
                                  >
                                    <Text style={{color: '#000', marginTop:25}}>{currentOTP ? "Resend OTP" : "Send OTP"}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowPassword(true)}
                                  >
                                    <Text style={{color: '#000', marginTop:25, marginBottom:20}}>Login with Password</Text>
                                </TouchableOpacity>
                            </View>
                        }       
                    </View>
                    </>
                }
                {!showOTPInput ?
                    <>
                    <TouchableOpacity onPress={() => loginHandle( data.username, data.password, position )} >
                      <View style={styles.button}>
                        <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                            <Text style={[styles.commonAppButtonText]}>{translations['Login']}</Text>
                            <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                        </LinearGradient>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{marginTop: 20}}>
                      <View style={styles.button}>
                        <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                            <Text style={[styles.commonAppButtonText]}>{translations['Create_New_Account']}</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                    </>
                    :
                    !showRegistrationForm && openSignup ?
                    <>
                        <TouchableOpacity onPress={() => checKOTP()} >
                          <View style={styles.button}>
                            <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                                <Text style={[styles.commonAppButtonText]}>{"NEXT"}</Text>
                                <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                            </LinearGradient>

                          </View>
                        </TouchableOpacity>
                    </>
                    :
                    showRegistrationForm ?
                    <>
                        <TouchableOpacity onPress={() => registration()} >
                          <View style={[styles.button, {marginTop:10}]}>
                            <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                                <Text style={[styles.commonAppButtonText]}>{"Registration"}</Text>
                                <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                            </LinearGradient>

                          </View>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity onPress={() => verifyOTP()} >
                          <View style={styles.button}>
                            <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                                <Text style={[styles.commonAppButtonText]}>{"Verify"}</Text>
                                <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                            </LinearGradient>

                          </View>
                        </TouchableOpacity>
                    </>
                }
                

            </Animatable.View>
        </Content>
      </Container>
    );
};

export default SignInScreen;
