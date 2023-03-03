import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity , Dimensions, ScrollView, SafeAreaView, Feather, Alert, Linking } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Input as TextInput, Header } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import style from '../assets/style.js';
import { medicalActions } from '../action';
import {isEmpty} from 'lodash';
import { configConstants } from '../constant';

var {width, height} = Dimensions.get('window')


const UploadMedicalPrescription = ({navigation, route}) => {
    // route.params.storeid    sharePrescription
    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        name: '',
        address: '',
        landmark: '',
        pincode: '',
        contact_no: '',
        prescription: '',
        prescription_ext: '',
        prescription_url: route.params.sharePrescription || "",
        patient_id: '',
        // storeid: "",
        storeid: route.params.medicalDetail?.storeid || 6,
        imageShow: ""
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
                patient_id: JSON.parse(userDetailData).patient_id,
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
        // const params = {
        //                 name: data.name,
        //                 address: data.address,
        //                 landmark: data.landmark,
        //                 pincode: data.pincode,
        //                 contact_no: data.contact_no,
        //                 prescription: data.prescription,
        //                 prescription_ext: data.prescription_ext,
        //                 patient_id: data.patient_id,
        //                 storeid: data.storeid,
        //                 prescription_url: data.prescription_url,
        //             }
            // // console.log("-------",params)
        // console.log("data",data)
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('landmark', data.landmark);
        formData.append('pincode', data.pincode);
        formData.append('contact_no', data.contact_no);
        formData.append('patient_id', data.patient_id);
        // formData.append('storeid', 6);
        formData.append('storeid', data.storeid);
        formData.append('prescription', data.prescription);
        formData.append('prescription_ext', data.prescription_ext);
        formData.append('prescription_url', data.prescription_url);

        dispatch(medicalActions.bookMedicine(formData)).then((res)=>{
            if(res.status === 200){
                Alert.alert('Successfully Shared with Medical', '', [
                  {text: 'Close', onPress: () =>  navigation.navigate("Home")}
                ]); 
                setData({
                    ...data,
                    address: '',
                    landmark: '',
                    pincode: '',
                    prescription: '',
                    prescription_ext: '',
                    prescription_url: "",
                    storeid: "",
                    imageShow: ""
                });
            }
        })
    }

    // // console.log('route',data)
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => navigation.goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>Upload Prescription</Title></>}
                rightComponent={<>
                  </>}
              />
            <ScrollView>
                <View style={styles.containerView}>
                    <Animatable.View 
                            animation="fadeInUp"
                            style={styles.footer}
                        >

                        <Card style={styles.cardListView}>
                            <Card.Content>
                            {!isEmpty(data.prescription_url) ? 
                                <View>
                                    <TouchableOpacity onPress={()=>Linking.openURL(configConstants.API_BASE_PATH +'/'+ data.prescription_url)}>
                                        <Text style={style.commonAppButtonText}>View prescription</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <TouchableOpacity onPress={selectFile}>
                                        <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={[style.commonAppButton, style.buttonD]}>
                                            <Text style={style.commonAppButtonText}>Upload</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    
                                </View>
                            }{!isEmpty(data.imageShow) && 
                                        <View>
                                            <Image
                                                 source={data.imageShow}
                                                 style={{height: 200, width: 250}}
                                             />
                                        </View>    
                                    }
                            
                                 
                                
                            </Card.Content>
                        </Card>

                        <Card style={styles.cardListView}>
                            <Card.Content>
                                <View>
                                    <TextInput 
                                        placeholder="Name"
                                        autoCapitalize="none"
                                        value={data.name}
                                        onChangeText={(name) => setData({...data, name})}
                                    />
                                </View>
                                <View>
                                    <TextInput 
                                        placeholder="Address"
                                        autoCapitalize="none"
                                        value={data.address}
                                        onChangeText={(address) => setData({...data, address})}
                                    />
                                </View>
                                <View>
                                    <TextInput 
                                        placeholder="Landmark"
                                        autoCapitalize="none"
                                        value={data.landmark}
                                        onChangeText={(landmark) => setData({...data, landmark})}
                                    />
                                </View>
                                <View>
                                    <TextInput 
                                        placeholder="Pin code"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        value={data.pincode}
                                        onChangeText={(pincode) => setData({...data, pincode})}
                                    />
                                </View>
                                <View>
                                    <TextInput 
                                        placeholder="Phone Number"
                                        keyboardType="phone-pad"
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
        </SafeAreaView>
      );
};

export default UploadMedicalPrescription;

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
    // backgroundColor: '#00B2B6'
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

    // height:'auto',
    // backgroundColor: '#00B2B6',    
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
    borderRadius: 15,
    color:'#fff'
  },
  textInput: {
    height: 40,
    marginTop: 0,
    marginBottom:10,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: '#ffffff',    
    // borderColor:'#ffffff',
    // shadowColor: '#ffffff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    borderRadius: 15,
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
    borderRadius: 15,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginHorizontal:2,
    marginVertical:2,
    height: 20
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  },
  profile_image:{
      width:120,
      height:120,
  }

});
