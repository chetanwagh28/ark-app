import React, {useContext, useState} from 'react';
import {  View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView  } from 'react-native';
import {ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '@react-navigation/native';
import {LocalizationContext} from './Translations';
import {utilityHelper} from '../helper/utilityHelper'
import Carousel from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) - 50;
var carouselItems = [] ;

let Stethoscope = 'https://panel.avark.in/apk-image/assets/images/doctor.png';
let Medinice = 'https://panel.avark.in/apk-image/assets/images/medicine.png';
import styles from '../assets/style.js';


const SplashScreen = ({navigation}) => {
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    const {
        translations,
        appLanguage,
        setAppLanguage,
        initializeAppLanguage,
      } = useContext(LocalizationContext); // 1
      initializeAppLanguage(); // 2

    const [state, setState] = React.useState(null);
    const [language, setLanguage] = React.useState(translations.getAvailableLanguages());
    //console.disableYellowBox = true;
    // const { colors } = useTheme();
    
    const _renderItem = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => { setAppLanguage(item) }} >
            <Text style={{color: '#FFFFFF', fontWeight:'bold', fontSize:(appLanguage === item) ? 24 : 18 }}>{utilityHelper.langExists(item)}</Text>
        </TouchableOpacity>
      );
    }

    return (
        <ScrollView style={style.container}>
            <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
                <View style={style.header}>
                
                    <Carousel
                      data={language}
                      renderItem={_renderItem}
                      sliderWidth={SLIDER_WIDTH}
                      itemWidth={ITEM_WIDTH}
                      // containerCustomStyle={style.list}
                      inactiveSlideShift={0}
                      onSnapToItem={(index) => setState({ index })}
                      useScrollView={false} 
                      loop={false}
                      autoplay={false}
                      layout={'default'}   
                      activeOpacity={1}
                    />
                    
                </View>

                <Animatable.View  style={style.footer} animation="fadeInUp">
                    {/*{translations.getAvailableLanguages().map((currentLang, i) => ( 
                        <ListItem
                            key={i} 
                            containerStyle={style.list}
                            title={utilityHelper.langExists(currentLang)} 
                            checkmark={appLanguage === currentLang} 
                            onPress={() => { setAppLanguage(currentLang);
                            }} 
                        />
                    ))}*/}

                    {/*<View style={styles.button}>
                        <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                <Text style={styles.commonAppButtonText}>Get Started</Text>
                                <MaterialIcons name="navigate-next" color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>*/}
                    <View style={{flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>    
                            <Animatable.Image animation="fadeInUp" duraton="1500"
                                source={{uri: "https://panel.avark.in/apk-image/assets/images/logo.png"}}
                                style={style.logo}
                                resizeMode="cover"
                            />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={{marginTop: 30}}>
                      <View style={styles.button}>
                        <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                            <Text style={[styles.commonAppButtonText, {fontSize: 18}]}>{translations['Login']}</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{marginTop: 20}}>
                      <View style={styles.button}>
                        <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={[styles.commonAppButton, styles.buttonD]} >
                            <Text style={[styles.commonAppButtonText, {fontSize: 18}]}>{translations['Create_New_Account']}</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>

                    <View style={{flex:1, flexDirection: 'row', marginTop: 10, justifyContent: 'center', width:"100%"}}>  
                        <TouchableOpacity onPress={() => navigation.navigate('DoctorSignUpScreen')}
                            style={{flexDirection: 'column', margin:15, justifyContent: 'center',alignItems: 'center'}}>
                          <>
                            <Image style={styles.signIcons} resizeMode={'center'} source={{uri: Stethoscope}} />
                            <Text style={[styles.signUp, {color: '#fff'}]}> {translations['Doctor']} </Text>
                          </> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MedicalSignUpScreen')}
                            style={{flexDirection: 'column', margin:15, justifyContent: 'center',alignItems: 'center'}}>
                          <>
                            <Image style={styles.signIcons} resizeMode={'center'} source={{uri: Medinice}} />
                            <Text style={[styles.signUp, {color: '#fff'}]}> {translations['Pharmacy']} </Text>
                          </> 
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
        </ScrollView>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const style = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00B2B6'
  },
  header: {
      flex: 1,
      marginTop:40,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#00B2B6',
      // borderTopLeftRadius: 0,
      // borderTopRightRadius: 0,
      paddingVertical: 30,
      paddingHorizontal: 30
  },
  logo: {
      width: 150,
      height: 150
  },
  title: {
      color: '#00B2B6',
      fontSize: 20,
      fontWeight: 'bold',
      width:'100%',
      textAlign:'center',
      marginBottom:20
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  commonAppButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText: {
      color: '#fff',
      fontSize:12
  },
  pageTitle:{
    fontWeight:'bold',
    fontSize:22,
    color:'#00B2B6',
    textAlign:'center',
    marginBottom:20
  },
  list: {
    borderWidth: 1,
    borderRadius: 5
  }
});

