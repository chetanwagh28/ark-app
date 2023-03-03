import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity , Dimensions, ScrollView, SafeAreaView, Feather, Alert, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { Input as TextInput, Header } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../assets/style.js';
import { patientActions, profileActions } from '../action';
import {isEmpty} from 'lodash';
import {LocalizationContext} from './Translations';
var {width, height} = Dimensions.get('window')

const Item = Picker.Item;
const AddMember = ({navigation, route}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        name: '',
        contact_no: '',
        patient_id: '',
        member_name: '',
        relationship: '',
        age: '',
        blood_group: '',
        health_problem_id: '',
        height: '',
        height_inch: '',
        height_feet: '',
        weight: '',
        gender: '',
    });
    const [check, setCheck] = React.useState({
        errors:{
            member_name: '',
            relationship: '',
        },
        submit: false,
    })

    const [error, setError] = useState("");

    const textInputChange = (val) => {
        setData({
            ...data,
            username: val,
            check_textInputChange: false
        });
    }
    const selectBox = (val) => {
        // // console.log(val)
        setData({
            ...data,
            height_feet: val
        });
    }

    const selectBox1 = (val) => {
        // // console.log(val)
        setData({
            ...data,
            height_inch: val
        });
    }
    const selectBox2 = (val) => {
        // // console.log(val)
        setData({
            ...data,
            health_problem_id: val
        });
    }
    useEffect(() => {
        dispatch(patientActions.getHealthProblem())
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
    const health = useSelector(state => ({ ...state.patientReducer}), shallowEqual)
    
    const checkEmpty = (dataToCheck) => {
        // // console.log("----------",dataToCheck)
        let stopApicall = false
        let errors = {
            member_name: '',
            relationship: ''
        }
        for (var key in dataToCheck) {
                if(dataToCheck && dataToCheck[key].length === 0){
                    stopApicall = true
                    setCheck({
                        ...check,
                        errors: {
                            ...errors,
                            [key] : [key] + " can't be blank"
                        }
                    });
                }
                else{
                    errors[key] = ""
                }
            }

        return stopApicall
    }


    const save = () => {
        let validData = {
                            relationship: data.relationship,
                            member_name: data.member_name,
                        }
        if(!checkEmpty(validData)){
            setCheck({
                ...check,
                submit: true
            });
            const params = {
                      "member_name": data.member_name,
                      "relationship": data.relationship,
                      "age": data.age,
                      // "health_problem_id": data.health_problem_id,
                      "height": data.height_feet+','+data.height_inch,
                      "weight": data.weight,
                      "blood_group": data.blood_group,
                      "gender": data.gender,
                    }
            // // console.log("-------",params)
            
            dispatch(profileActions.addMember(params)).then(res=>{
                // // console.log("res", res)
                if(res.status === 200){
                    Alert.alert('Successfully Add Member', '', [
                        {text: 'Close', onPress: () =>  navigation.navigate("Home")}
                    ]);
                }
            })
            // setCheck({...check, next: true})
        }else{
            // // console.log("errors",check.errors)
            Alert.alert('Star fields required!', '', [
                {text: 'Close'}
            ]);
        }
    }
    // 
    // // console.log('route',data)
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
            leftComponent={<>
                    <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => navigation.goBack()}></Icon>
                  </>}
            centerComponent={<><Text style={style.PageTitle}>Add Family Member</Text></>}
            rightComponent={<></>}
          />
          
            <ScrollView>
                <View>
                    <Animatable.View 
                            animation="fadeInUp"
                            style={{padding: 15, minHeight: 500, margin: 10}}
                        >
                        <>
                                    <TextInput 
                                        placeholder="Phone Number"
                                        keyboardType="phone-pad"                                        
                                        autoCapitalize="none"
                                        value={data.contact_no}
                                        editable={false}
                                        onChangeText={(contact_no) => setData({...data, contact_no})}
                                    />
                                    <TextInput 
                                        placeholder="Name"                                        
                                        autoCapitalize="none"
                                        value={data.name}
                                        editable={false}
                                        onChangeText={(name) => setData({...data, name})}
                                    />
                                    <TextInput 
                                        leftIcon={
                                            <Text style={styles.textStar}>*</Text>
                                        }
                                        placeholder="Member Name"                                        
                                        autoCapitalize="none"
                                        value={data.member_name}
                                        onChangeText={(member_name) => setData({...data, member_name})}
                                    />
                                    <TextInput 
                                        leftIcon={
                                            <Text style={styles.textStar}>*</Text>
                                        }
                                        placeholder="Relationship"
                                        autoCapitalize="none"
                                        value={data.relationship}
                                        onChangeText={(relationship) => setData({...data, relationship})}
                                    />
                                
                                <View style={style.dropdown}>
                                    <Picker
                                    style={{ height: 40, width: "100%" }}
                                    itemTextStyle={{fontSize: 8}}
                                    activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                    iosHeader="Select Health Problem"
                                    placeholder="Select Health Problem"
                                    selectedValue={data.health_problem_id}
                                    mode="dialog"
                                    onValueChange={(health_problem_id) => selectBox2(health_problem_id)} >
                                        <Picker.Item label="Select Health Problem" value="" />
                                        {health.healthProblem.length > 0 && health.healthProblem.map((row) => { 
                                            return (<Picker.Item label={row.health_problem_title} value={row.health_problem_id} />)
                                          })
                                        }
                                    </Picker>                           
                                </View>
                                    <TextInput 
                                        placeholder="Age"
                                        autoCapitalize="none"
                                        value={data.age}
                                        onChangeText={(age) => setData({...data, age})}
                                    />
                                    <TextInput 
                                        placeholder={translations['weight']}
                                        autoCapitalize="none"
                                        value={data.weight}
                                        onChangeText={(weight) => setData({...data,weight})}
                                    />

                                <View style={style.dropdown}>
                                    <Picker
                                    style={{ height: 40, width: "100%" }}
                                    itemTextStyle={{fontSize: 8}}
                                    activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                    iosHeader="Select Height in Feet"
                                    placeholder="Select Height in Feet"
                                    selectedValue={data.height_feet}
                                    mode="dialog"
                                    onValueChange={(height_feet) => selectBox(height_feet)} >
                                    <Picker.Item label={translations['height'] +' '+ translations['feet']} value="" />
                                    <Picker.Item label="0" value="0" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                    <Picker.Item label="7" value="7" />
                                    <Picker.Item label="8" value="8" />
                                    </Picker>
                                </View>
                                <View style={style.dropdown}>
                                    <Picker
                                    style={{ height: 40, width: "100%" }}
                                    itemTextStyle={{fontSize: 8}}
                                    activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                    iosHeader="Select Height in Inch"
                                    placeholder="Select Height in Inch"
                                    selectedValue={data.height_inch}
                                    mode="dialog"
                                    onValueChange={(height_inch) => selectBox1(height_inch)} >

                                    <Picker.Item label={translations['height'] +' '+ translations['inch']} value="" />
                                    <Picker.Item label="0" value="0" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                    <Picker.Item label="7" value="7" />
                                    <Picker.Item label="8" value="8" />
                                    <Picker.Item label="9" value="9" />
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="11" value="11" />

                                    </Picker>
                                </View>
                                <Animatable.View style={{marginTop:15}}>
                                    <TouchableOpacity onPress={() => save()}>
                                        <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={[style.commonAppButton, style.buttonD, {height: 40}]}>
                                            <Text style={[style.commonAppButtonText, {fontSize: 16}]}>Add Member</Text>
                                        </LinearGradient>
                                    </TouchableOpacity> 
                                </Animatable.View>  
                                {check.submit &&
                                    <View style={styles.loading}>
                                      <ActivityIndicator size='large' color="#00B2B6" animating={true} />
                                    </View>
                                }

                        </>
                        
                    
                    </Animatable.View>  
                </View>
           </ScrollView>
        </SafeAreaView>
      );
};

export default AddMember;

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
  textStar: {
    marginVertical: 15,
    marginLeft: 10,
    fontSize: 15,
    color: 'red'
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

    height:'auto',
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
  }

});
