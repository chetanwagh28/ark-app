import React, {useContext, useState} from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Dimensions, StatusBar, Alert, Image, ScrollView } from 'react-native';
import { Input as TextInput } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { loginActions } from '../action';
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';

import Background from '../Constants/Background';
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';
import Field from '../Constants/Field';


const width = Dimensions.get('window').width;

const ForgotPassword = ({navigation}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // // console.log("----",translations)
    const dispatch = useDispatch();

    const [data, setData] = React.useState({
        contact_no: '',
        check_textInputChange: false,
    });
    //console.disableYellowBox = true;


    const textInputChange = (val) => {
        if( val.trim().length > 9 ) {
            setData({
                ...data,
                contact_no: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                contact_no: val,
                check_textInputChange: false,
            });
        }
    }

    const forgetHandle = (contact_no) => {

        const params = {
                      contact_no : contact_no
                    }
        if(contact_no === ""){
            Alert.alert("Enter Mobile Number", '', [
                {text: 'Close'}
            ]);
        }else{
            dispatch(loginActions.forgotPassword(params)).then((res)=>{
                // // console.log("res======",res)
                if(res.status === 200){
                    Alert.alert("OTP send", '', [
                        {text: 'Close'}
                    ]);
                    navigation.navigate('ResetPassword')
                }else{
                    Alert.alert(res.message, '', [
                        {text: 'Close'}
                    ]);
                }
            })
        }

    }
    
    // const user = useSelector(state => ({ ...state.loginReducer}), shallowEqual)
    // // console.log("user",user)

    return (
        
            <Background>
                <View style={{alignItems: 'center', width: width}}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: "85%",
                            width: "100%",
                            marginTop:"35%",
                            borderRadius: 50,
                            paddingTop: 20,
                            alignItems: 'center',
                        }}>

                        <Image source={require("../assets/newimage/leaves2.png")}  />
                        <Text style={{fontSize: 32, color: black, marginBottom: 25}}>
                            {translations['Forgot_Password']} 
                        </Text>

                        <Field
                            placeholder={translations['Phone_Number']}
                            fontWeight='bold'
                            keyboardType={'numeric'}
                            name="phone"
                            onChangeText={(val) => textInputChange(val)}
                            maxLength={10}
                        />

                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5}}>
                            <TouchableOpacity>
                              <Btn textColor='black' bgColor={lightgreen} btnLabel={translations['Submit']} Press={() => forgetHandle(data.contact_no)} width={250}/>
                            </TouchableOpacity>
                        </View>         
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5}}>
                            <TouchableOpacity>
                              <Btn textColor='black' bgColor={lightgreen} btnLabel={translations['Back']} Press={() => navigation.goBack()} width={250}/>
                            </TouchableOpacity>
                        </View>         
                    </View>
                </View>
            </Background>
    );
};

export default ForgotPassword;

