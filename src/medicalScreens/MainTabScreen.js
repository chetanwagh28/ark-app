import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Communications from 'react-native-communications';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wallet from '../screens/WalletScreen';
// Screens
import HomeScreen from './HomeScreen';
import MyInquiriesScreen from './MyInquiriesScreen';
import LanguageScreen from '../screens/LanguageScreen';
import MedicalProfileScreen from './MedicalProfileScreen';
import InquiriesHistory from './InquiriesHistoryScreen';

import kartScreen from '../screens/kartScreen';
import orderList from '../screens/orderList';
import PrivacyPage from '../screens/PrivacyPage';
import InformationScreen from '../screens/informationScreen';
import ShippingScreen from '../screens/shippingScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
            } else if (route.name === 'MyInquiriesScreen') {
              iconName = focused ? 'reorder-four' : 'reorder-four-outline';
            } else if (route.name === 'kartScreen') {
              iconName = focused ? 'cart-sharp' : 'ios-cart-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#04898c',
            inactiveBackgroundColor: '#00B2B6',
            style: {
                backgroundColor: '#00B2B6'
            },
            labelStyle: {
                fontSize: 14,
                marginBottom: 5,
                padding: 0,
              },
        }}
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={true}
      >
      <Tab.Screen name="Home"  component={HomeScreen} options={{tabBarLabel: 'Home'}}/>
      <Tab.Screen name="MyInquiriesScreen" component={MyInquiriesScreen} options={{tabBarLabel: 'Inquiries'}}/>
      <Tab.Screen name="kartScreen" component={kartScreen} options={{tabBarLabel: 'Cart'}}/>
      <Tab.Screen name="Wallet" component={Wallet} options={{tabBarLabel: 'Reward'}}/>
    </Tab.Navigator>
  );
};

const HomeStack = createStackNavigator();
const MMainTabScreen = ({navigation}) => {

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

            <HomeStack.Screen name="MyInquiriesScreen" component={MyInquiriesScreen} />
            <HomeStack.Screen name="MedicalProfileScreen" component={MedicalProfileScreen} />
            <HomeStack.Screen name="PrivacyPage" component={PrivacyPage} />
            <HomeStack.Screen name="orderList" component={orderList} />
            <HomeStack.Screen name="ShippingScreen" component={ShippingScreen} />
            <HomeStack.Screen name="InformationScreen" component={InformationScreen} />
            <HomeStack.Screen name="LanguageScreen" component={LanguageScreen}/>
            <HomeStack.Screen name="InquiriesHistory" component={InquiriesHistory}/>

    </HomeStack.Navigator>
    );
}
export default MMainTabScreen;