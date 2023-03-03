import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView,Feather, Alert, Linking } from 'react-native';
import { Input as TextInput } from 'react-native-elements';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import style from '../assets/style.js';
import { adsActions } from '../action';
import {isEmpty} from 'lodash';
import { configConstants } from '../constant';

var {width, height} = Dimensions.get('window')


const POSTInquiry = ({navigation, route}) => {

    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        name: '',
        subject: '',
        message: '',
        contact_no: '',
        ads_id: route.params.ads_detail.id || '',
        doctor_id: "",
        adsDetail: route.params.ads_detail || ''
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    useEffect(() => {
        setTimeout(async() => {
          let userDetailData;
          userDetailData = null;
          try {
            userDetailData = await AsyncStorage.getItem('userDetail');
            setData({
                ...data,
                name: JSON.parse(userDetailData).name,
                contact_no: JSON.parse(userDetailData).contact_no,
                doctor_id: JSON.parse(userDetailData).doc_id,
            });
            // setUserDetail(JSON.parse(userDetailData))
          } catch(e) {
            // console.log(e);
          }
        }, 100);
    }, []);

    const selectFile = () => {
      // // console.log("selectFile")
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          base64: true,
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5
        };

        ImagePicker.showImagePicker(options, res => {
          // // console.log('Response = ', res);
          if (res.didCancel) {
            // console.log('User cancelled image picker');
          } else if (res.error) {
            // console.log('ImagePicker Error: ', res.error);
          } else if (res.fileSize > 60000) {
            Alert.alert('Upload document max size 5 mb', '', [
                  {text: 'Close'}
              ]); 
          } else {
            let image = res.data;
            let ext = res.type.split("/")
            
            let source = { uri: `data:image/${ext[1]};base64,${res.data}` };
            // // console.log("source",source)
            setData({
                ...data,
                prescription: image,
                prescription_ext: ext[1],
                imageShow: source
            });
            // this.completedApi();
          }
        });
    }

    const uploadPrescription = () => {
        const params = {
                        name: data.name,
                        subject: data.subject,
                        message: data.message,
                        contact_no: data.contact_no,
                        adds_id: data.ads_id,
                        doctor_id: data.doctor_id
                    }


        dispatch(adsActions.postInqury(params)).then((res)=>{
            if(res.status === 200){
                Alert.alert('Inquiry Saved', '', [
                  {text: 'Close', onPress: () =>  navigation.navigate("Home")}
                ]); 
                setData({
                    ...data,
                    subject: '',
                    message: '',
                    ads_id: ""
                });
            }
        })
    }

    // console.log('route',data.adsDetail)
      return (
          <Container>
          <Header style={style.appHeader}>
            
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => navigation.goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Inquiry Form </Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>   
          
            
          </Header>
          <Content style={style.container}>
            <ScrollView>
                <View style={styles.containerView}>
                    <Animatable.View 
                            animation="fadeInUp"
                            // style={styles.footer}
                        >

                        <Card style={styles.cardListView}>
                            <Card.Content>
                                <View>
                                    <View><Text style={{fontSize: 16, fontWeight: 'bold'}}>{data.adsDetail.title}</Text></View>
                                    <View><Text>{data.adsDetail.description}</Text></View>
                                </View>
                                <View >
                                    <TextInput 
                                        placeholder="Name"
                                        // style={style.textInput}
                                        autoCapitalize="none"
                                        value={data.name}
                                        onChangeText={(name) => setData({...data, name})}
                                    />
                                </View>
                                <View >
                                    <TextInput 
                                        placeholder="Subject"
                                        // style={style.textInput}
                                        autoCapitalize="none"
                                        value={data.subject}
                                        onChangeText={(subject) => setData({...data, subject})}
                                    />
                                </View>
                                <View >
                                    <TextInput
                                        placeholder="Messages"
                                        // style={styles.review_textarea}
                                        underlineColorAndroid="transparent"
                                        // label="Write Inquiry Message"
                                        numberOfLines={4}
                                        multiline={true}
                                        Type= {'TextInputOutlined'}
                                        onChangeText={(message) => setData({...data, message})}
                  
                                      />

                                </View>
                                <View >
                                    <TextInput 
                                        placeholder="Phone Number"
                                        keyboardType="phone-pad"
                                        // style={style.textInput}
                                        autoCapitalize="none"
                                        value={data.contact_no}
                                        onChangeText={(contact_no) => setData({...data, contact_no})}
                                    />
                                </View>
                                <Animatable.View style={{marginTop:15}}>
                                    <TouchableOpacity onPress={uploadPrescription}>
                                        <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={[style.commonAppButton, style.buttonD]}>
                                            <Text style={style.commonAppButtonText}>Submit</Text>
                                        </LinearGradient>
                                    </TouchableOpacity> 
                                </Animatable.View>  

                            </Card.Content>
                        </Card>
                        
                    
                    </Animatable.View>  
                </View>
            </ScrollView>
           </Content>
        </Container>
      );
};

export default POSTInquiry;

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerView: {
    margin: 0,
    flex: 1,
    backgroundColor: '#00B2B6'
  },
  formHeaderView: {
    margin: 5,
    flex: 0.4,
    backgroundColor: '#f2f2f2'
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,

    height:'auto',
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
    textAlign:'left',
    padding:5,
    borderRadius: 5,
    color:'#fff'
  },
  textInput: {
    height: 40,
    marginTop: 0,
    marginBottom:10,
    paddingLeft: 10,
    paddingRight: 10,
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
    borderRadius: 5,
  },
  submit_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
  },
  commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  },
  profile_image:{
      width:120,
      height:120,
  },
  review_textarea:{
    marginLeft:10,
    marginRight:10
  },

});
