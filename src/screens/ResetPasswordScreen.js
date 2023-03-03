import React, {useContext, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet ,Dimensions , StatusBar, Alert, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
// import { useTheme } from 'react-native-paper';
import { loginActions } from '../action';
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';

import Background from '../Constants/Background';
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';
import Field from '../Constants/Field';

var {width, height} = Dimensions.get('screen')
const ResetPassword = ({navigation}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // // console.log("----",translations)
    // const { colors } = useTheme();
    const dispatch = useDispatch();

    const [data, setData] = React.useState({
            password : "",
            confirmpassword : "",
            otp : "",
            check_textInputChange: false
    });

    const [check, setCheck] = React.useState({
        secureTextEntry: false,
        confirm_secureTextEntry: false,
        equalpassword: false,
    })

    //console.disableYellowBox = true;

    const textInputChange = (val) => {
        if( val.trim().length > 5 ) {
            setData({
                ...data,
                otp: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                otp: val,
                check_textInputChange: false,
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        if(data.password === val){
            setCheck({
                ...check,
                equalpassword: true
            });
        }else{
            setCheck({
                ...check,
                equalpassword: false
            });
        }
        setData({
            ...data,
            confirmpassword: val
        });
    }

    const updateSecureTextEntry = () => {
        setCheck({
            ...check,
            secureTextEntry: !check.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setCheck({
            ...check,
            confirm_secureTextEntry: !check.confirm_secureTextEntry
        });
    }

    const checkEmpty = (dataToCheck) => {
        // // console.log("----------",dataToCheck)
        let stopApicall = false
        let errors = {
            otp: '',
            password: '',
            confirm_password: ''
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

    const resetHandle = (data) => {

        const params = {
                      otp : data.otp,
                      password : data.password,
                      confirmpassword : data.confirmpassword,
                    }
        if(!checkEmpty(params)){
            dispatch(loginActions.ResetPassword(params)).then((res)=>{
                // // console.log("res======",res)
                if(res.status === 200){
                    Alert.alert("Sccessfully set new password", '', [
                        {text: 'Close'}
                    ]);
                    navigation.navigate('SignInScreen')
                }else{
                    Alert.alert(res.message, '', [
                        {text: 'Close'}
                    ]);
                }
            })
        }else{
            Alert.alert("All data required", '', [
                {text: 'Close'}
            ]);
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
                    Set your new password
                </Text>

                <Field
                    fontWeight='bold'
                    keyboardType={'numeric'}
                    maxLength={10}
                    placeholder={"Enter OTP"}
                    placeholderTextColor="#666666"
                    name="otp"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />

                <Field
                    fontWeight='bold'
                    placeholder={translations['Password']}
                    secureTextEntry={!check.secureTextEntry}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                    value={data.password}
                />

                <Field
                    placeholder={translations['Confirm Password']}
                    secureTextEntry={!check.confirm_secureTextEntry}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    value={data.confirmpassword}
                />
                {(data.confirmpassword !=='' && !check.equalpassword) && (<Text style={styles.textStar}>Password and Confirm password not same</Text>)}

                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5}}>
                    <TouchableOpacity>
                      <Btn textColor='black' bgColor={lightgreen} btnLabel={translations['Submit']} Press={() => {resetHandle(data)}} width={250}/>
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

export default ResetPassword;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    appLogo:{
        width:80,
        height:80,
    },
    pageTitle:{
        fontWeight:'bold',
        fontSize:22,
        color:'#00B2B6'
    },    
    footer: {
        flex: 1,
        height: height -200,
        backgroundColor: '#00B2B6',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 16,
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 15
    },
    commonAppButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 21,
        marginHorizontal:2,
        marginVertical:2,
    },
    commonAppButtonText: {
        color:'#fff',
        fontSize: 12,
    },
    signUp: {
        marginTop: 15,
        width:'100%',
        textAlign:"center"
    },
    textSign1: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    textStar: {
        marginTop: 0,
        marginHorizontal:15,
        marginVertical:5,
        color: 'red'
    }
  });
