import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet, Linking, Image, TouchableHighlight } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../components/context';
import {LocalizationContext} from './Translations';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { configConstants } from '../constant';


export const  DrawerContent = ({props, navigation, userData}) => {
    // console.log(navigation.navigate)
    const [userDetail, setUserDetail] = React.useState(userData);

    //console.disableYellowBox = true;
    // const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    let display_pic = userDetail && userDetail.display_pic ? configConstants.API_BASE_PATH_Slash+userDetail.display_pic : 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png'

    // // console.log('user Detail: ', display_pic);
    return(
        <View style={{flex:1, backgroundColor: '#04898c'}}>
            <DrawerContentScrollView {...props}>
              <LinearGradient colors={['#04898c', '#04898c', '#00B2B6']}>  
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row'}}>
                            <TouchableHighlight 
                                    onPress={() => navigation.navigate('Home')} >
                                <Image source={{uri: "https://panel.avark.in/apk-image/assets/images/logo.png"}}
                                    style={styles.appLogo}
                                    resizeMode="cover"
                                    />
                            </TouchableHighlight>        
                                {/*<Ionicons.Button color={'#ffffff'} onPress={() => navigation.closeDrawer()} backgroundColor="#04898c" name="ios-arrow-back"/>*/}
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Avatar.Image  source={{ uri: display_pic }}  size={50} />
                            <Entypo.Button color={'#ffffff'} onPress={() => navigation.navigate('PatientProfileScreen')} backgroundColor="#04898c" name="edit"/>
                        </View>

                        <View>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                {userDetail && userDetail.name}
                            </Paragraph>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                {userDetail && userDetail.user_id}
                            </Paragraph>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="group-add" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Add_Family_Member"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('Members')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['my_appointments']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('MyAppointment')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={"My Coupons"}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('MYCodeList')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["My_Orders"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('orderList')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['order_medicines']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('MyMedicineOrder')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="share-variant" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['You_are_Referred']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('ReferedByDoctor')}}
                        />
                        {/*<DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cart" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['order_medicines']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('FindDoctor', {
                                      categroy: "Medicine"
                                    })}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cogs"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label="OnBoarding"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('OnBoardScreen')}}
                        />*/}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="pen" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['Prescription']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('MyPrescription')}}
                        />
                        {/*
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="test-tube" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Lab_Test_Report"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('LabTestReport')}}
                        />*/}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="wallet"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Wallet"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('Wallet')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="send"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Invite_Friends"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('InviteFriends')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="file"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Language"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('LanguageScreen')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cogs"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["settings"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('Setting')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="privacy-tip"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Privacy_Policy"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('PrivacyPage')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name= "privacy-tip" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Term_and_Conditions"]}
                            labelStyle={{color: '#ffffff'}}
                            onPress={ ()=>{ Linking.openURL('https://avark.in/company/terms-conditions')}}
                        />   
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="power-standby"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['logout']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {signOut()}}
                        />
                    </Drawer.Section>
                    
                </View>
              </LinearGradient>  
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    label={translations["ABOUT_APPLICATION"]}
                    labelStyle={{color: '#ffffff'}}
                    onPress={ ()=>{ Linking.openURL('http://www.avark.in')}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color: '#ffffff'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      textAlign:'center',
      width:'100%',
      marginTop:5    
    },
    row: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      color: '#ffffff',
      textAlign:'center',
      width:'100%'
    },
    drawerSection: {
      marginTop: 5,
    },
    bottomDrawerSection: {
        borderTopColor: '#04898c',
        borderTopWidth: 2
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    pickerContainer: {
        
    },
    appLogo:{
        width:40,
        height:40,
    },
  });