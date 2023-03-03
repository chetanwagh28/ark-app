import React, {useEffect, useState, useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import HomeScreen from './HomeScreen';
import FindCategory from './FindCategoryScreen';
import FindDoctor from './FindDoctorScreen';
// import FindMedicine from './FindMedicineScreen';
// import FindLab from './FindLabScreen';
import DoctorDetail from './DoctorDetailScreen';
// import LabBookAppointment from './LabBookAppointmentScreen';
// import OrderMedicine from './OrderMedicineScreen';
// import Summary from './SummaryScreen';
import Wallet from './WalletScreen';
import LanguageScreen from './LanguageScreen';
import InviteFriends from './InviteFriendsScreen';
import UploadMedicalPrescription from './UploadMedicalPrescriptionScreen';
// import FindLabCategory from './FindLabCategoryScreen';
import kartScreen from './kartScreen';
import MyAppointment from './MyAppointmentScreen';
import ManualPrescriptionScreen from './ManualPrescriptionScreen';
import PrivacyPage from './PrivacyPage';

// import Chat from '../components/Chat/Chat';
import {LocalizationContext} from './Translations';

// import EnxConferenceScreen from '../videoAPI/src/EnxConferenceScreen';


// import EnxJoinScreen from '../videoAPI/src/EnxJoinScreen';
// import App from '../videoAPI/src/EnxJoinScreen';
import InformationScreen from './informationScreen';
import ShippingScreen from './shippingScreen';
import orderList from './orderList';

import QRCodeScan from './QRCodeScan';
import AddMember from './AddMember';
import Members from './Members';
const Tab = createBottomTabNavigator();

// var noti= ''
// const KartCount = async() => {
//     try {
//         const kartArg = await AsyncStorage.getItem('KartCount');
//         if(kartArg){
//             let newKartCount = JSON.parse(kartArg).length
//             // console.log("new--",newKartCount)
//             noti = newKartCount
//             return newKartCount;
//         }
//     } catch (error) {
//       // Error retrieving data
//     }
// }
// KartCount();
//     // console.log("noti=====",noti)

const BottomTabNavigator = () => {
  const {translations} = useContext(LocalizationContext);
  return (
     <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Wallet') {
              iconName = focused ? 'wallet' : 'wallet-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'kartScreen') {
              iconName = focused ? 'cart-sharp' : 'ios-cart-outline';
            } else if (route.name === 'InviteFriends') {
              iconName = focused ? 'share-social' : 'share-social-outline';
            } else if (route.name === 'MyAppointment') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'QRCodeScan') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        // })}
        // tabBarOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#fff',


            tabBarActiveBackgroundColor: '#04898c',
            tabBarInactiveBackgroundColor: '#00B2B6',
            style: {
                backgroundColor: '#00B2B6'
            },
            labelStyle: {
                fontSize: 10,
                marginBottom: 5,
                padding: 0,
              },
        // }}
        })}
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={true}
        headerShown={false}
      >
      <Tab.Screen name="Home"  component={HomeScreen} options={{tabBarLabel: translations['home'], headerShown: false}}/>
      <Tab.Screen name="MyAppointment"  component={MyAppointment} options={{tabBarLabel: translations['appointment'], headerShown: false}} size={10}/>
      <Tab.Screen name="InviteFriends" component={InviteFriends} options={{tabBarLabel: translations['Invite_Friends'], headerShown: false}}/>
      <Tab.Screen name="QRCodeScan" component={QRCodeScan} options={{tabBarLabel: translations['QR_Code_Scanner'], headerShown: false}} size={10}/>
      <Tab.Screen name="Wallet" component={Wallet} options={{tabBarLabel: translations['Wallet'], headerShown: false}}/>
      <Tab.Screen name="kartScreen" component={kartScreen} options={{tabBarLabel: translations['Cart'], headerShown: false}}/>
    </Tab.Navigator>
  );
};



const HomeStack = createStackNavigator();
const MainTabScreen = ({navigation}) => {
  
    return (
    <HomeStack.Navigator
         screenOptions={{
            headerStyle: {
                backgroundColor: '#00B2B6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                width:'100%',
                textAlign:'center',
                fontSize:15
            },
            headerShown: false
        }}>

            {/* ### Start Dashboard Navigation Bar ### */}            
            <HomeStack.Screen name="Home" component={BottomTabNavigator} />
            {/* ### End Dashboard Navigation Bar ### */}
             
          

            {/* ### Start Find Doctor by Category ### */}
            <HomeStack.Screen name="FindCategory" component={FindCategory} options={{
            title:'Find Doctor by Category',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}></Icon.Button>
            ),
            headerRight: () => (
                <MaterialCommunityIcons.Button name="phone" size={25} backgroundColor="#00B2B6"></MaterialCommunityIcons.Button>
            )            
            }} />
            {/* ### End Find Doctor by Category ### */}


            <HomeStack.Screen name="FindDoctor" component={FindDoctor} options={{
            title:'Find Doctor by Category',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}></Icon.Button>
            ),
            headerRight: () => (
                <MaterialCommunityIcons.Button name="phone" size={25} backgroundColor="#00B2B6" onPress={() => navigation.navigate('SOSScreen')}></MaterialCommunityIcons.Button>
            )  
            }} />

            {/*<HomeStack.Screen name="FindMedicine" component={FindMedicine} options={{
            title:'Find Medical Store',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            <HomeStack.Screen name="FindLab" component={FindLab} options={{
            title:'Find Lab',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />*/}
            <HomeStack.Screen name="DoctorDetail" component={DoctorDetail} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            {/*<HomeStack.Screen name="Summary" component={Summary} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />*/}
            
            {/*<HomeStack.Screen name="LabBookAppointment" component={LabBookAppointment} options={{
            title:'Book Appointment',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />*/}
            {/*<HomeStack.Screen name="OrderMedicine" component={OrderMedicine} options={{
            title:'Order Medicine',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />*/}
            
            <HomeStack.Screen name="LanguageScreen" component={LanguageScreen} options={{
            title:'Language',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />

            <HomeStack.Screen name="UploadMedicalPrescription" component={UploadMedicalPrescription} options={{
            title:'Language',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />

            {/*<HomeStack.Screen name="FindLabCategory" component={FindLabCategory} />*/}
            <HomeStack.Screen name="ManualPrescriptionScreen" component={ManualPrescriptionScreen} />
            {/*<HomeStack.Screen name="EnxConferenceScreen" component={EnxConferenceScreen} />
            <HomeStack.Screen name="EnxJoinScreen" component={App} />*/}
            <HomeStack.Screen name="PrivacyPage" component={PrivacyPage} />
            <HomeStack.Screen name="InformationScreen" component={InformationScreen} />
            <HomeStack.Screen name="ShippingScreen" component={ShippingScreen} />
            <HomeStack.Screen name="orderList" component={orderList} />
            <HomeStack.Screen name="QRCodeScan" component={QRCodeScan} />
            <HomeStack.Screen name="AddMember" component={AddMember} />
            <HomeStack.Screen name="Members" component={Members} />

    </HomeStack.Navigator>
    );
}
export default MainTabScreen;