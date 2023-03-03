import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity,Image, Dimensions, BackHandler, ActivityIndicator, Alert, TextInput} from 'react-native';
import Background from '../Constants/Background';
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';
import Field from '../Constants/Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestMultiple, PERMISSIONS, requestNotifications} from 'react-native-permissions';
// import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import Users from '../model/users';
import DeviceInfo from 'react-native-device-info';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions } from '../action';
import {LocalizationContext} from './Translations';
import Geolocation from "@react-native-community/geolocation";
import {utilityHelper} from '../helper/utilityHelper'   
import Carousel from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import styles from '../assets/style.js';


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

    useEffect(
        () => {
        let timer1 = setTimeout(async() => {
            let fcmToken = await AsyncStorage.getItem('fcmToken'); 
            // // console.log("fcmToken",fcmToken)
            setData({   
                ...data,    
                device_id: fcmToken 
            }); 
            requestLocationPermission(); // function call
        }, 1 * 1000);
          // this will clear Timeout
          // when component unmount like in willComponentUnmount
          // and show will not change to true
          return () => {
            clearTimeout(timer1);
          };
        },
    []);

    // useEffect(() => {
    //     setTimeout(async() => {
    //         let fcmToken = await AsyncStorage.getItem('fcmToken'); 
    //         // // console.log("fcmToken",fcmToken)
    //         setData({   
    //             ...data,    
    //             device_id: fcmToken 
    //         }); 
    //         requestLocationPermission(); // function call
    //     }, 100);
        
    // }, []);

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

    // const { colors } = useTheme();

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
            <Text style={{color: (appLanguage === item) ? '#000' : '#000', fontWeight: (appLanguage === item) ? 'bold' : 'none', fontSize: (appLanguage === item) ? 18 : 18 }}>{utilityHelper.langExists(item)}</Text>
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
    <Background>
      <View style={{alignItems: 'center', width: SLIDER_WIDTH}}>
       <View
          style={{
            width: "100%",
            marginTop:"5%",
            padding: 15,
            alignItems: 'center',
          }}>
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
        <View
          style={{
            backgroundColor: 'white',
            height: "85%",
            width: "100%",
            marginTop:"15%",
            borderTopLeftRadius: 50,
            borderTopRightRadius:50,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            paddingTop: 20,
            alignItems: 'center',
          }}>

          <Image source={require("../assets/newimage/leaves2.png")}  /> 
 
          <Text style={{fontSize: 32, color: black, }}>
            {translations['Login']} 
          </Text>
          <Field
            placeholder={translations['mobile_number']}
            fontWeight='bold'
            keyboardType={'numeric'}
            name="phone"
            onChangeText={(val) => textInputChange(val)}
            maxLength={10}
          />

          {showPassword &&
            <Field 
              placeholder={translations['Password']}
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(val) => handlePasswordChange(val)}
            />
          }

          {showOTPInput &&
              <Field 
                  placeholder={'Enter OTP'}
                  placeholderTextColor="#000"
                  secureTextEntry={false}
                  maxLength={6}
                  autoCapitalize="none"
                  onChangeText={(val) => setOTP(val)}
              />
          }
          {showRegistrationForm &&
              <>
                <Field 
                    placeholder={translations['Name']}
                    placeholderTextColor="#000"
                    
                        autoCapitalize="none"
                    onChangeText={(val) => setName(val)}
                />
                <Field
                    placeholder={translations['Password']}
                    secureTextEntry={true}
                    
                    autoCapitalize="none"
                    onChangeText={(val) => setPassword(val)}
                    />
                <Field
                    placeholder="Refarral Code"
                    
                    autoCapitalize="none"
                    onChangeText={(referral_code) => setCode(referral_code)}
                    />
              </>
          }
          { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translations['password_validation']}</Text>
            </Animatable.View>
          }
          <View >
          {!showRegistrationForm &&
              <>
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <Text style={{color: black, fontWeight: 'bold', fontSize: 12, marginRight: 15 }}>{translations['Forgot_Password']}</Text>
                  </TouchableOpacity>
                  {showPassword ?
                      <>
                          <TouchableOpacity
                              onPress={() => setShowPassword(false)}
                            >
                              <Text style={{color: black, fontWeight: 'bold', fontSize: 12, marginLeft: 15}}>Login/SignUp with OTP</Text>
                          </TouchableOpacity>
                      </>
                      :
                      <View style={{flexDirection: 'column'}}>  
                          <TouchableOpacity
                              onPress={() => sendOTP()}
                            >
                              <Text style={{color: black, fontWeight: 'bold', fontSize: 12}}>{currentOTP ? "Resend OTP" : "Send OTP"}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                              onPress={() => {setShowPassword(true);setShowOTPInput(false);setCurrentOTP(false)}}
                            >
                              <Text style={{color: black, fontWeight: 'bold', fontSize: 12}}>Login with Password</Text>
                          </TouchableOpacity>
                      </View>
                  }       
                </View>
              </>
            }
            {!showOTPInput ?
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity>
                  <Btn textColor='black' bgColor={lightgreen} btnLabel={translations['Login']} Press={() => loginHandle( data.username, data.password, position )} width={250}/>
                  <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Btn textColor='black' bgColor={lightgreen} btnLabel={translations['Create_New_Account']} Press={() => navigation.navigate('SignUpScreen')} width={250}/>
                </TouchableOpacity>
                </View>
                :
                !showRegistrationForm && openSignup ?
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity>
                      <Btn textColor='black' bgColor={lightgreen} btnLabel={"NEXT"} Press={() => checKOTP()} width={250}/>
                      <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                    </TouchableOpacity>
                </View>
                :
                showRegistrationForm ?
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity>
                      <Btn textColor='black' bgColor={lightgreen} btnLabel={"Registration"} Press={() => registration()} width={250}/>
                      <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <TouchableOpacity>
                      <Btn textColor='black' bgColor={lightgreen} btnLabel={"Verify"} Press={() => verifyOTP()} width={250}/>
                      <ActivityIndicator size="small" color="#fff" animating={data.submit}/>
                    </TouchableOpacity>
                </View>
            }

          </View>
        </View>
      </View>
    </Background>
  );
};

export default SignInScreen;
