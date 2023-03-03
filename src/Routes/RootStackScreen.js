import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import DoctorSignUpScreen from './DoctorSignUpScreen';
import ForgotPassword from './ForgotPasswordScreen';
import ResetPassword from './ResetPasswordScreen';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{
    headerShown: false
  }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="DoctorSignUpScreen" component={DoctorSignUpScreen}/>
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <RootStack.Screen name="ResetPassword" component={ResetPassword}/>
       
    </RootStack.Navigator>
);

export default RootStackScreen;