import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet, Linking, TouchableHighlight, Image } from 'react-native';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../components/context';
import {LocalizationContext} from './Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configConstants } from '../constant';



export const  DDrawerContent = ({props, navigation, userData}) => {
    // // console.log(userData)
    const [userDetail, setUserDetail] = React.useState(userData);

    //console.disableYellowBox = true;
    
    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    // // console.log('user Detail: ', userDetail);

    let display_pic = userDetail && userDetail.display_pic ? configConstants.API_BASE_PATH_Slash+userDetail.display_pic : 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png'
    // // console.log('user Detail: ', display_pic);
    
    return(
        <View style={{flex:1, backgroundColor: '#00B2B6'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 0}}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableHighlight 
                                    onPress={() => navigation.navigate('Home')} >
                                    <Image source={require('../assets/images/logo.png')}
                                        style={styles.appLogo}
                                        resizeMode="cover"
                                        />
                                </TouchableHighlight> 
                                {/*<Ionicons.Button color={'#ffffff'} onPress={() => navigation.closeDrawer()} backgroundColor="#00B2B6" name="ios-arrow-back"/>*/}
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Avatar.Image  source={{ uri: display_pic }}  size={50} />
                            <Entypo.Button color={'#ffffff'} onPress={() => navigation.navigate('DoctorProfileScreen', {clinic: true})} backgroundColor="#00B2B6" name="edit"/>
                        </View>

                        <View>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                Dr. { userDetail && userDetail.name} 
                            </Paragraph>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                { userDetail && userDetail.user_id} 
                            </Paragraph>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="qr-code"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label="QR Code"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('QRCodeGenerate')}}
                        />
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
                            label={"My Order"}
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
                            label={"My Inquries"}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('InquiryList')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label="My Patient"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('MyPatients')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="share-variant" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label="Referred Patient"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('ReferedDoctor')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="favorite" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label="Favorite Doctor"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('FavoriteDoctor')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cart" 
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label="Medical History"
                            labelStyle={{color: '#ffffff'}}
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
                        
                    {/*
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
                            onPress={() => {navigation.navigate('DOnBoardScreen')}}
                        />*/}

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="paper-plane"
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={'Plans'}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {navigation.navigate('PlanShow')}}
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
                            label="Privacy"
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
                            label="Term and Conditions"
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
        borderTopColor: '#00CBCC',
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