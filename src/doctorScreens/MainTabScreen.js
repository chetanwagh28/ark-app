import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Communications from 'react-native-communications';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import DHomeScreen from './HomeScreen';
import TimeSlot from './TimeSlotScreen';
import DoctorLocation from './DoctorLocationScreen';
import MyUpcomingAppointment from './MyUpcomingAppointmentScreen';
import PatientDetail from './PatientDetailScreen';
import PatientHistory from './PatientHistoryScreen';
import DigitalPrescription from './DigitalPrescriptionScreen';
import UploadPrescription from './UploadPrescriptionScreen';
import FindCategory from './FindCategoryScreen';
import FindDoctor from './FindDoctorScreen';
import DoctorDetail from './DoctorDetailScreen';
import MyPatients from './MyPatientsScreen';
import ManageCalendarSlot from './ManageCalendarSlotScreen';
import NewPatientDigitalPrescription from './NewPatientDigitalPrescriptionScreen';
import FavoriteDoctor from './FavoriteDoctorScreen';
import Report from './ReportScreen';
import Wallet from '../screens/WalletScreen';
import Referral from './ReferralScreen';
import Chat from '../components/Chat/Chat';
import kartScreen from '../screens/kartScreen';
import orderList from '../screens/orderList';
import PrivacyPage from '../screens/PrivacyPage';
import InformationScreen from '../screens/informationScreen';
import ShippingScreen from '../screens/shippingScreen';
import QRCodeGenerate from './QRCodeGenerate';
import POSTInquiry from './POSTInquiry';
import InquiryList from './InquiryList';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import EnxConferenceScreen from '../videoAPI/src/EnxConferenceScreen';
// import EnxJoinScreen from '../videoAPI/src/EnxJoinScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
     <Tab.Navigator
        initialRouteName="Home"
        
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Wallet') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'MyUpcomingAppointment') {
              iconName = focused ? 'md-chatbubbles' : 'md-chatbubbles-outline';
            } else if (route.name === 'kartScreen') {
              iconName = focused ? 'cart-sharp' : 'ios-cart-outline';
            } else if (route.name === 'ManageCalendarSlot') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Referral') {
              iconName = focused ? 'share-social' : 'share-social-outline';
            }


            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        // })}
        // tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#04898c',
            inactiveBackgroundColor: '#00B2B6',
            style: {
                backgroundColor: '#00B2B6'
            },
            labelStyle: {
                fontSize: 11,
                marginBottom: 5,
                padding: 0,
              },
        // }}
        })}
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={true}
      >
      <Tab.Screen name="Home" component={DHomeScreen} />
      <Tab.Screen name="ManageCalendarSlot" component={ManageCalendarSlot} options={{tabBarLabel: 'Calendar'}}/>
      <Tab.Screen name="Referral" component={Referral} options={{tabBarLabel: 'Referral'}}/>
      <Tab.Screen name="kartScreen" component={kartScreen} options={{tabBarLabel: 'Cart'}}/>
      <Tab.Screen name="Wallet" component={Wallet} options={{tabBarLabel: 'Reward'}}/>
    </Tab.Navigator>
  );
};


const HomeStack = createStackNavigator();
const DMainTabScreen = ({navigation}) => {

    return (
    <HomeStack.Navigator
            // headerMode="none"
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
            <HomeStack.Screen name="Home" component={BottomTabNavigator} options={{
            title:'Dashboard',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#00B2B6" onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            headerRight: () => (
                <MaterialCommunityIcons.Button name="phone" size={25} backgroundColor="#00B2B6"></MaterialCommunityIcons.Button>
            )
            }} />
            {/* ### End Dashboard Navigation Bar ### */}


            {/* ### Start Find Doctor by Category ### */}
            <HomeStack.Screen name="FindCategory" component={FindCategory} options={{
            title:'Find Doctor by Category',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}></Icon.Button>
            ),
            headerRight: () => (
                <MaterialCommunityIcons.Button name="phone" size={25} backgroundColor="#00B2B6" onPress={() => navigation.navigate('SOSScreen')}></MaterialCommunityIcons.Button>
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

            <HomeStack.Screen name="MyUpcomingAppointment" component={MyUpcomingAppointment} options={{
            title:'Find Medical Store',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            <HomeStack.Screen name="PatientDetail" component={PatientDetail} options={{
            title:'Patient Detail',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} /> 

            <HomeStack.Screen name="PatientHistory" component={PatientHistory} options={{
            title:'Find Lab',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} /> 

            <HomeStack.Screen name="TimeSlot" component={TimeSlot} options={{
            title:'Find Lab',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            <HomeStack.Screen name="DoctorDetail" component={DoctorDetail} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            <HomeStack.Screen name="DigitalPrescription" component={DigitalPrescription} options={{
            title:'Upload Prescription',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />

            <HomeStack.Screen name="UploadPrescription" component={UploadPrescription} options={{
            title:'Upload Prescription',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            <HomeStack.Screen name="MyPatients" component={MyPatients} options={{
            title:'Book Appointment',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />
            <HomeStack.Screen name="ManageCalendarSlot" component={ManageCalendarSlot} options={{
            title:'Order Medicine',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => navigation.goBack()}>Back</Icon.Button>
            )
            }} />


            <HomeStack.Screen name="NewPatientDigitalPrescription" component={NewPatientDigitalPrescription} />
            <HomeStack.Screen name="DoctorLocation" component={DoctorLocation} />
            <HomeStack.Screen name="FavoriteDoctor" component={FavoriteDoctor} />
            <HomeStack.Screen name="Report" component={Report} />
            {/*<HomeStack.Screen name="EnxConferenceScreen" component={EnxConferenceScreen} />*/}
            <HomeStack.Screen name="PrivacyPage" component={PrivacyPage} />
            <HomeStack.Screen name="orderList" component={orderList} />
            <HomeStack.Screen name="QRCodeGenerate" component={QRCodeGenerate} />
            
            <HomeStack.Screen name="ShippingScreen" component={ShippingScreen} />
            <HomeStack.Screen name="InformationScreen" component={InformationScreen} />
            <HomeStack.Screen name="POSTInquiry" component={POSTInquiry} />
            <HomeStack.Screen name="InquiryList" component={InquiryList} />

    </HomeStack.Navigator>
    );
}
export default DMainTabScreen;