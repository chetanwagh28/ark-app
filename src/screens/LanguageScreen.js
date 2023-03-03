import React, {useContext, useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import {ListItem} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '@react-navigation/native';
import {LocalizationContext} from './Translations';
import {utilityHelper} from '../helper/utilityHelper'


const LanguageScreen = ({navigation}) => {
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    const {
        translations,
        appLanguage,
        setAppLanguage,
        initializeAppLanguage,
      } = useContext(LocalizationContext); // 1
      initializeAppLanguage(); // 2
    //console.disableYellowBox = true;
    // const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
                <View style={styles.header}>
                    <Animatable.Image animation="bounceIn" duraton="1500"
                    source={{uri: "https://panel.avark.in/apk-image/assets/images/logo.png"}}
                    style={styles.logo}
                    resizeMode="stretch"
                    />
                </View>

                <Animatable.View  style={[styles.footer, { 
                        // backgroundColor: colors.background
                }
                    ]} animation="fadeInUp">
                    <Text style={[styles.pageTitle]}>
                        {translations['change_language']}
                    </Text>
                    {translations.getAvailableLanguages().map((currentLang, i) => ( 
                        <ListItem 
                            key={i} 
                            containerStyle={styles.list}
                            checkmark={appLanguage === currentLang} 
                            onPress={() => { setAppLanguage(currentLang) }} 
                            activeScale={0.95} //
                        >
                            <ListItem.Title style={{ color: '#00B2B6', fontWeight: 'bold' }}>
                                  {utilityHelper.langExists(currentLang)}
                            </ListItem.Title>
                        </ListItem>
                    ))}
                    <View style={styles.button}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                <Text style={styles.commonAppButtonText}>{translations['next']}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
        </View>
    );
};

export default LanguageScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff'
  },
  header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:40
  },
  footer: {
      flex: 1,
      // backgroundColor: '#00B2B6',
      // borderTopLeftRadius: 0,
      // borderTopRightRadius: 0,
      paddingVertical: 30,
      paddingHorizontal: 30
  },
  pageTitle:{
    fontWeight:'bold',
    fontSize:22,
    color:'#00B2B6',
    textAlign:'center',
    marginBottom:20
},
  logo: {
      width: 80,
      height: 80
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
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText: {
      color: 'white',
      fontSize:12
  },
  list: {
    borderWidth: 1,
    borderRadius: 5,
    color:'#000',
  }
});

