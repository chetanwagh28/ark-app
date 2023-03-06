/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, {useContext, useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, PermissionsAndroid, Linking, BackHandler, Alert, useWindowDimensions, DeviceEventEmitter, StyleSheet, Image, Text, SafeAreaView, ScrollView } from 'react-native';
// import * as Sentry from '@sentry/react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useNavigation,
  createNavigationContainerRef
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios'; 

// import { createNavigationContainerRef } from '@react-navigation/native';


import {
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';


import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkVersion } from "react-native-check-version";
import FlashMessage, { showMessage } from "react-native-flash-message";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import {requestMultiple, PERMISSIONS, requestNotifications} from 'react-native-permissions';

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// import {ToastContext} from './ToastContext';

import { AuthContext } from '../components/context';
import {LocalizationProvider, LocalizationContext} from '../screens/Translations';
import RootStackScreen from '../screens/RootStackScreen';

import { DrawerContent } from '../screens/DrawerContent';
import MainTabScreen from '../screens/MainTabScreen';
import MyAppointment from '../screens/MyAppointmentScreen';
import MyMedicineOrder from '../screens/MyMedicineOrderScreen';
import MyPrescription from '../screens/MyPrescriptionScreen';
import ChangePassword from '../screens/ChangePasswordScreen';
// import LabTestReport from '../screens/LabTestReportScreen';
import InviteFriends from '../screens/InviteFriendsScreen';
import Wallet from '../screens/WalletScreen';
import Setting from '../screens/SettingScreen';
import ReferedByDoctor from '../screens/ReferedByDoctorScreen';
import OnBoardScreen from '../screens/OnBoardScreen';
import SOSScreen from '../screens/SOSScreen';
import PatientProfileScreen from '../screens/PatientProfileScreen';

import HealthTipsScreen from '../screens/HealthTipsScreen';
import HealthTipsDetailScreen from '../screens/HealthTipsDetailScreen';
import VendorList from '../screens/VendorList';
import BestDeal from '../screens/BestDealScreen';
import BestDealDetailScreen from '../screens/BestDealDetailScreen';

import InHouseProductScreen from '../screens/InHouseProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// import Chat from '../components/Chat/Chat';

import HelpAndSupport from '../screens/helpAndSupport';
import MYCodeList from '../screens/MYCodeList';


import { DDrawerContent } from '../doctorScreens/DrawerContent';
import DMainTabScreen from '../doctorScreens/MainTabScreen';

const Drawer = createDrawerNavigator();

const navigationRef = createNavigationContainerRef();


const App = () => {
  
  let videoTokenn;
  let userName ;
  // const navigation = useNavigation();

  // const navigationRef = React.useRef(null);
  const dimensions = useWindowDimensions();


  //console.disableYellowBox = true;
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 
  
  const [onBoard, setonBoard] = React.useState(null); 
  const [fcmToken, setfcmToken] = React.useState(null); 
  const [videoData, setvideoData] = React.useState(null); 
  const [videoToken, setvideoToken] = React.useState(null); 
  
  const [roomID, setroomID] = React.useState(null); 
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  // const {show} = useContext(ToastContext);
  const [isSplash, setSplash] = React.useState(true);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userRole: null,
    onBoard: false
  };

  // const CustomDefaultTheme = {
  //   ...NavigationDefaultTheme,
  //   // ...PaperDefaultTheme,
  //   colors: {
  //     ...NavigationDefaultTheme.colors,
  //     // ...PaperDefaultTheme.colors,
  //     background: '#ffffff',
  //     text: '#333333',
  //     fontFamily: 'AntDesign'
  //   }
  // }
  
  // const CustomDarkTheme = {
  //   ...NavigationDarkTheme,
  //   // ...PaperDarkTheme,
  //   colors: {
  //     ...NavigationDarkTheme.colors,
  //     // ...PaperDarkTheme.colors,
  //     background: '#333333',
  //     text: '#ffffff',
  //     fontFamily: 'AntDesign'
  //   }
  // }

  const theme = {
    ...MD3LightTheme,

    // Specify a custom property
    custom: 'property',

    // Specify a custom property in nested object
    colors: {
      ...MD3LightTheme.colors,
      brandPrimary: '#fefefe',
      brandSecondary: 'red',
    },
  };

  // const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authReducers = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          userRole: action.role,
          isLoading: false,
          onBoard: action.onBoard,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          userRole: action.role,
          isLoading: false,
          onBoard: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          userRole: null,
          isLoading: false,
          onBoard: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userToken: null,
          userRole: null,
          isLoading: false,
          onBoard: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(authReducers, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(userInfo) => {
      // // console.log('--------------------')
      let data = jwtdecode(userInfo.token)
      setUserToken(userInfo);
      setonBoard(true);
      setIsLoading(false);
      
      try {
        await AsyncStorage.setItem('userToken', userInfo.token);
        await AsyncStorage.setItem('userDetail', JSON.stringify(data));

      } catch(e) {
        // console.log(e);
      }
      // // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', token: userInfo.token, role: data.role, onBoard: false });
    },
    signOut: async() => {
      setUserToken(null);
      setIsLoading(false);
      try {
        await AsyncStorage.clear();
        // console.log("logout")        
      } catch(e) {
        // console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
      
    },
    signUp: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  const Hide_Splash_Screen=()=>{
    setSplash(false)  
  } 

  useEffect(() => {
    // SplashScreen.hide();
    let timer1 = setTimeout(() => Hide_Splash_Screen(), 1 * 2000);
    // // this will clear Timeout
    // // when component unmount like in willComponentUnmount
    // // and show will not change to true
    return () => {
      clearTimeout(timer1);
    };
  },[]);

  useEffect(() => {
    const unsubscribe = requestLocationPermission(); // function call

    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const unsubscribe = checkState();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = checkUpdate();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = checkPermission();

    return unsubscribe;
  }, []);

  // firebase notification
  useEffect(() => {

    // When a user tap on a push notification and the app is in background .current().navigate("SOSScreen")
    messaging().getInitialNotification().then((remoteMessage) => {
          // console.log("getInitialNotification-----remoteMessage",remoteMessage)
        if (remoteMessage) {
          // Alert.alert(remoteMessage.title, remoteMessage.body, [
          //     {text: 'Close'}
          // ]);
          if(remoteMessage.data.custom_data && JSON.parse(remoteMessage.data.custom_data)?.type){
              var row = JSON.parse(remoteMessage.data.custom_data)    

               // notifee.displayNotification({
               //      title: remoteMessage.notification.title,
               //      body: `Your order was shipped at ${new Date(Number(timestamp)).toString()}!`,
               //      android: {
               //        channelId: 'orders',
               //      },
               //    });
               //  }             
              showMessage({ 
                  backgroundColor: "#00B2B6", 
                  color: "white", 
                  message: remoteMessage.notification.title, 
                  description: remoteMessage.notification.body, 
                  animationDuration: 5000, 
                  duration: 5000, 
                  type: "default", 
                  position: "top",
                  onPress: () => navigationRef.current?.navigate(row.type, {type: 'notification', id: row.id}),
              })  
          }else{

              showMessage({ 
                  backgroundColor: "#00B2B6", 
                  color: "white", 
                  message: remoteMessage.notification.title, 
                  description: remoteMessage.notification.body, 
                  animationDuration: 5000, 
                  duration: 5000, 
                  type: "default", 
                  position: "top"
              })
          }

        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
         // alert("Background Push Notification opened")
          if(remoteMessage.data.custom_data && JSON.parse(remoteMessage.data.custom_data)?.type){
              // console.log("custom_data----->>>>>>",JSON.parse(data.data.custom_data))
              var row = JSON.parse(remoteMessage.data.custom_data)

              showMessage({ 
                  backgroundColor: "#00B2B6", 
                  color: "white", 
                  message: remoteMessage.notification.title, 
                  description: remoteMessage.notification.body, 
                  animationDuration: 5000, 
                  duration: 5000, 
                  type: "default", 
                  position: "top",
                  onPress: () => navigationRef.current?.navigate(row.type, {type: 'notification', id: row.id}),
              })
          }else{
              showMessage({ 
                  backgroundColor: "#00B2B6", 
                  color: "white", 
                  message: remoteMessage.notification.title, 
                  description: remoteMessage.notification.body, 
                  animationDuration: 5000, 
                  duration: 5000, 
                  type: "default", 
                  position: "top"
              })
          }

      });

    // When a user tap on a push notification and the app is CLOSED
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log('Mess-------age handled in the background!', remoteMessage);  

    //         if(remoteMessage.data){
               
    //             if(remoteMessage.data.custom_data && JSON.parse(remoteMessage.data.custom_data)?.type){
    //               // JSON.parse
    //                 // console.log("handled in the background----->>>>>>",JSON.parse(data.data.custom_data))
    //                 var row = JSON.parse(remoteMessage.data.custom_data)
    //                 showMessage({ 
    //                     backgroundColor: "#00B2B6", 
    //                     color: "white", 
    //                     message: remoteMessage.notification.title, 
    //                     description: remoteMessage.notification.body, 
    //                     animationDuration: 5000, 
    //                     duration: 5000, 
    //                     type: "default", 
    //                     position: "top",
    //                     onPress: () => navigationRef.current?.navigate(row.type, {type: 'notification', id: row.id}),
    //                 }) 
    //                 // navigationRef.current?.navigate(row.type, {type: 'notification', id: row.id})
    //             }
    //         }
    //     });

    // When a user receives a push notification and the app is in foreground
    const unsubscribe = messaging().onMessage(async  (data) => {
        console.log("getInitialNotification-----data",data)
        if(data.data){
          if(data.data.custom_data && JSON.parse(data.data.custom_data)?.room_id){
            // JSON.parse
              var row = JSON.parse(data.data.custom_data)
              // setvideoData(row);
              AsyncStorage.setItem('roomID',row.room_id); 
              AsyncStorage.setItem('userName',row.name);
              
            
              // method getRoomTokenWebCall content
              var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
              const options = {
                headers: header
              };
              var name,userId,roomId;
              name=row.name;
              userId=row.user_id;
              roomId=row.room_id;
    
              let token = await axios
                  .post(kBaseURL+"createToken/", {
                    name: name,
                    // name:"Ritika Bhawsar",
                    role: "participant",
                    user_ref: userId,
                    // user_ref: "8fc65987-06b1-49cd-8e70-50e3ad2e0766",
                    roomId: roomId
                    // roomId: "608ac2f64e11874ceda9fc4e"
                  },options)
                  .then(function(response) {
                    return  response.data;         
                  })
                  .catch(function(error) {
                    // // console.log("axiosCreateTokenCatch", error);
                  });

                  setvideoToken(token.token);
                  token.token!=null?await AsyncStorage.setItem('videoToken', token.token):await AsyncStorage.setItem('videoToken', '')
                  setvideoToken(token.token);
                  videoTokenn = await videoTokenFun();
                  userName = await userNameFun();
                        //
                        // IncomingCall.display(
                        //   row.room_id, // Call UUID v4
                        //   "Dr. "+row.name, // Username
                        //   row.profile_url, // Avatar URL
                        //   'Incomming Call', // Info text
                        //   30000 // Timeout for end call after 20s
                        // );
          }
          if(data.data.custom_data && JSON.parse(data.data.custom_data)?.type){
            // JSON.parse
              console.log("custom_data----->>>>>>", data.notification)
              var row = JSON.parse(data.data.custom_data)

              //   navigationRef.current?.navigate(row.type, {
              //    }) 
              showMessage({ 
                  backgroundColor: "#00B2B6", 
                  color: "white", 
                  message: data.notification.title, 
                  description: data.notification.body, 
                  animationDuration: 5000, 
                  duration: 5000, 
                  type: "default", 
                  position: "top",
                  onPress: () => navigationRef.current?.navigate(row.type, {type: 'notification', id: row.id}),
              }) 

          }
        }else{
              showMessage({ 
                  backgroundColor: "#00B2B6", 
                  color: "white", 
                  message: data.notification.title, 
                  description: data.notification.body, 
                  animationDuration: 5000, 
                  duration: 5000, 
                  type: "default", 
                  position: "top"
              })
        }
                  
                   // alert("Foreground Push Notification opened")
      });

    return unsubscribe;
  }, []);
  
  const checkPermission = async() => {
    const enabled = await messaging().hasPermission();
    // // console.log("enabled==",enabled)
    // If Premission granted proceed towards token fetch
    if (enabled) {
      getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
      requestPermission();
    }
  }


  const getToken = async() => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
      setfcmToken(fcmToken)
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log("appfcmToken", fcmToken)
      if (fcmToken) {
        setfcmToken(fcmToken)
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }

    return false
  }

  const requestPermission = async() => {
    try {
      await messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      return false
    }
  }

  const checkUpdate = async() => {
    const version = await checkVersion();
    if (parseFloat(version.version) < parseFloat("2.15") ) {
      Alert.alert(
        'Please Update',
        'You will have to update your App to the latest version to continue using.',
        [
          {
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(version.url)
            }
          }
        ]
      )
       // // console.log(`App has a ${version.updateType} update pending.`);
    }
    return false
  }
  const checkState = async () => {
    var userToken = null;
    var userDetail = null;
    var onBoard = true;
    var role = null
      
      try {
        userDetail = await AsyncStorage.getItem('userDetail');
        userToken = await AsyncStorage.getItem('userToken');
        onBoard = await AsyncStorage.getItem('onBoard');
        if(userDetail){
          axios.defaults.headers.common['Authorization'] = userToken;
          role = JSON.parse(userDetail).role
        }else{
          axios.defaults.headers.common['Authorization'] = '';
        }
      } catch(e) {
        console.log(e);
        // return false
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, role: role, onBoard: onBoard });
  }

  //Location permission
  const requestLocationPermission = async () => {
    try {
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
            break;
          case 'blocked':
            showMessage({ 
                        backgroundColor: "#00B2B6", 
                        color: "white", 
                        message: "Location Permission", 
                        description: "The location permission is denied(blocked) and not requestable anymore, please grant by app setting", 
                        animationDuration: 5000, 
                        duration: 5000, 
                        type: "default", 
                        position: "top",
                    }) 
            break;
        }
      });

      requestNotifications(['alert', 'sound']).then(({status, settings}) => {
        // // console.log(status, settings)
      });
    } catch (err) {
      // log(err);
      return false
    }

  }

  let Splash_Screen = (
            <View style = { styles.MainContainer }>        
               <View style={styles.SplashScreen_ChildView}>  
                    <Image source={require("../assets/newimage/leave.png")}
                    // <Image source={{uri: "https://panel.avark.in/apk-image/assets/newimage/leave.png"}}
                      style={{
                        marginLeft:40,
                        marginTop:100,
                        }}  /> 
                  <Text style={styles.welcome}>From AVARK Pvt. Ltd.</Text>  

             </View> 
            </View>  
        )
  console.log("loginState", loginState)

  // if( loginState.isLoading ) {
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }

  let userData = '';
  if(loginState.userToken){
    userData = jwtdecode(loginState.userToken)
  }

  const isLargeScreen = dimensions.width >= 768;

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <LocalizationProvider>
          <NavigationContainer theme={theme} ref={navigationRef}>
          {
            isSplash ? 
              Splash_Screen 
              : 
                (loginState.userToken !== null) ?
                  ( loginState.userRole === 2) ?
                    (
                      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userData={userData} />}
                          drawerType={isLargeScreen ? 'back' : 'back'}
                          drawerStyle={isLargeScreen ? null : { width: '80%' }}
                          overlayColor="transparent"
                          screenOptions={{
                            headerShown: false
                          }}
                      >
                        <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
                        <Drawer.Screen name="OnBoardScreen" component={OnBoardScreen}/>  
                        <Drawer.Screen name="PatientProfileScreen" component={PatientProfileScreen}/>
                        <Drawer.Screen name="MyAppointment" component={MyAppointment} />
                        <Drawer.Screen name="MyMedicineOrder" component={MyMedicineOrder} />
                        <Drawer.Screen name="MyPrescription" component={MyPrescription} />
                        <Drawer.Screen name="ReferedByDoctor" component={ReferedByDoctor} />

                        <Drawer.Screen name="HealthTipsScreen" component={HealthTipsScreen} />
                        <Drawer.Screen name="HealthTipsDetailScreen" component={HealthTipsDetailScreen} />
                        
                        <Drawer.Screen name="InviteFriends" component={InviteFriends} />
                        <Drawer.Screen name="Wallet" component={Wallet} />
                        <Drawer.Screen name="Setting" component={Setting} />
                        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
                        <Drawer.Screen name="HelpAndSupport" component={HelpAndSupport}/>

                        <Drawer.Screen name="SOSScreen" component={SOSScreen} />
                        <Drawer.Screen name="VendorList" component={VendorList} />
                        <Drawer.Screen name="BestDeal" component={BestDeal} />
                        <Drawer.Screen name="BestDealDetailScreen" component={BestDealDetailScreen} />

                        <Drawer.Screen name="InHouseProductScreen" component={InHouseProductScreen} />
                        <Drawer.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
                        <Drawer.Screen name="MYCodeList" component={MYCodeList} />
                        
                      </Drawer.Navigator>
                    )
                  : loginState.userRole == 1 && 
                    (
                      <Drawer.Navigator drawerContent={props => <DDrawerContent {...props} userData={userData}/>}
                        drawerType={isLargeScreen ? 'back' : 'back'}
                        drawerStyle={isLargeScreen ? null : { width: '80%' }}
                        overlayColor="transparent"
                        screenOptions={{
                          headerShown: false
                        }}
                      >                    
                        <Drawer.Screen name="HomeDrawer" component={DMainTabScreen}/>

                        <Drawer.Screen name="InviteFriends" component={InviteFriends} />
                        <Drawer.Screen name="Wallet" component={Wallet} />
                        <Drawer.Screen name="Setting" component={Setting} />
                        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
                        <Drawer.Screen name="HelpAndSupport" component={HelpAndSupport}/>
                        
                        <Drawer.Screen name="SOSScreen" component={SOSScreen} />
                        <Drawer.Screen name="VendorList" component={VendorList} />
                        <Drawer.Screen name="BestDeal" component={BestDeal} />
                        <Drawer.Screen name="BestDealDetailScreen" component={BestDealDetailScreen} />

                        <Drawer.Screen name="InHouseProductScreen" component={InHouseProductScreen} />
                        <Drawer.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
                        <Drawer.Screen name="MYCodeList" component={MYCodeList} />
                        
                      </Drawer.Navigator>
                    )
                :
                <RootStackScreen fcmToken={fcmToken}/>
          }
          </NavigationContainer>
        </LocalizationProvider>  
      </AuthContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create(  
{  
    MainContainer:  
    {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',
        backgroundColor:'black',  
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    },  
     SplashScreen_RootView: {  
        flex:1,  
        margin: 10,  
        position: 'absolute',  
        width: '100%',  
        height: '100%', 
        backgroundColor:'black',  
      },  
     SplashScreen_ChildView:  
    {  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: 'black',  
        flex:1,  
    }, 
      welcome: {  
      fontSize: 20,  
      marginTop: "70%",
      fontWeight:'bold',
      color:'white',
      fontStyle: "italic",
    },    
});  
export default App;
