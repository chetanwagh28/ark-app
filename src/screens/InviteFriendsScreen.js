import React, { useContext, useEffect } from 'react';
import { View, Text, Share, StyleSheet, FlatList,  Image, TouchableOpacity, Dimensions, ScrollView,SafeAreaView } from 'react-native';
import { Rating, Slider, Header } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Container, Header, Content, Footer, FooterTab, Title, Left, Body, Tabs , Tab ,Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocalizationContext} from './Translations';
import { Avatar, Title, Button } from 'react-native-paper';
import style from '../assets/style.js';
let shareImage = 'https://panel.avark.in/apk-image/assets/images/share.png';

const InviteFriends = ({navigation}) => {
    const {translations} = useContext(LocalizationContext);
    const [userDetail, setUserDetail] = React.useState(null);

    const onShare = async () => {
    try {
      const result = await Share.share({
          title: 'App link',
          message: translations['Invite_friend_message1'] + userDetail.referral_code + " " + translations['Invite_friend_message2'],
          url: 'https://play.google.com/store/apps/details?id=com.arkpatient&referral_code='+userDetail.referral_code
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              alert(error.message);
            }
          };

      useEffect(() => {
          setTimeout(async() => {
            let userToken;
            userToken = null;
            try {
              userToken = await AsyncStorage.getItem('userToken');
              // // console.log(jwtdecode(userToken))
              setUserDetail(jwtdecode(userToken));
            } catch(e) {
              // console.log(e);
            }
          }, 100);
      }, []);

      const { goBack } = navigation;
      // // console.log("userDetail",userDetail)
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>{translations['Invite_Friends']}</Title></>}
                rightComponent={<>
                  </>}
              />
          <View >

            <View style={styles.imageContainer}>
              <Image  source={{uri: shareImage}} style={styles.profile_image}/>
              <Text>{translations['Send_Referral_Code_and_Earn_Rewards']}</Text>
              <Text style={styles.referral}>{userDetail && userDetail.referral_code}</Text>
              
              
            </View>
            <View style={styles.imageContainer}>
              <Button 
                style={{backgroundColor: '#273f61', alignItems: 'center', justifyContent: 'center', borderRadius: 15}} 
                mode="contained" 
                width={250} 
                onPress={onShare}
                labelStyle={{height: 20, fontSize: 20}}
                >
                {translations['Share']}
              </Button>
            </View>
          </View>
        </SafeAreaView>
      );
 
}

export default InviteFriends;

const styles = StyleSheet.create({
  imageContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  appHeader:{
    backgroundColor:'#273f61',
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#dcf7fa'
  },
  searchHead: {
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 0,
    marginLeft: 10,
    marginTop:10,
    marginRight: 10,
    marginBottom:10,
    backgroundColor: '#ffffff',    
    borderColor:'#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    textAlign:'center',
    padding:5,
    borderRadius:5
  },
  categroyCard: {
    borderWidth: 0,
    marginLeft: 10,
    marginTop:10,
    marginRight: 10,
    marginBottom:10,
    height:'auto',
    backgroundColor: '#ffffff',    
    borderColor:'#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    textAlign:'center',
    padding:15,
    borderRadius:5
  },
  buttonS:{
    margin: 5,
    backgroundColor:'#00B2B6',
  },
  titleHeading:{
    width:'100%',
    textAlign:'center',
    fontWeight:'400',
    fontSize:20,
    marginTop:10
  },
  titleHeadingSubHeading:{
    width:'100%',
    textAlign:'center'
  },
  titleHeadingDescription:{
    width:'100%',
    textAlign:'center'
  },
  profile_image:{
    width:280,
    height:280, 
  },
  referral: {
    marginBottom:10,
    fontWeight:'bold',
    fontSize:28,
  }
});
