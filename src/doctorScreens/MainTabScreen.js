import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import DHomeScreen from './HomeScreen';
// import TimeSlot from './TimeSlotScreen';
// import DoctorLocation from './DoctorLocationScreen';
// import MyUpcomingAppointment from './MyUpcomingAppointmentScreen';
// import PatientDetail from './PatientDetailScreen';
// import PatientHistory from './PatientHistoryScreen';
// import DigitalPrescription from './DigitalPrescriptionScreen';
// import UploadPrescription from './UploadPrescriptionScreen';
// import FindCategory from './FindCategoryScreen';
// import FindDoctor from './FindDoctorScreen';
// import DoctorDetail from './DoctorDetailScreen';
// import MyPatients from './MyPatientsScreen';
import ManageCalendarSlot from './ManageCalendarSlotScreen';
// import NewPatientDigitalPrescription from './NewPatientDigitalPrescriptionScreen';
// import FavoriteDoctor from './FavoriteDoctorScreen';
// import Report from './ReportScreen';
import Wallet from '../screens/WalletScreen';
import Referral from './ReferralScreen';
// import Chat from '../components/Chat/Chat';
import kartScreen from '../screens/kartScreen';
// import orderList from '../screens/orderList';
// import PrivacyPage from '../screens/PrivacyPage';
// import InformationScreen from '../screens/informationScreen';
// import ShippingScreen from '../screens/shippingScreen';
// import QRCodeGenerate from './QRCodeGenerate';
// import POSTInquiry from './POSTInquiry';
// import InquiryList from './InquiryList';
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
      <Tab.Screen name="Home" component={DHomeScreen} options={{ headerShown: false}}/>
      <Tab.Screen name="ManageCalendarSlot" component={ManageCalendarSlot} options={{tabBarLabel: 'Calendar', headerShown: false}}/>
      <Tab.Screen name="Referral" component={Referral} options={{tabBarLabel: 'Referral', headerShown: false}}/>

      <Tab.Screen name="Wallet" component={Wallet} options={{headerShown: false}}/>
      <Tab.Screen name="kartScreen" component={kartScreen} options={{headerShown: false}}/>
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


            

    </HomeStack.Navigator>
    );
}
export default DMainTabScreen;