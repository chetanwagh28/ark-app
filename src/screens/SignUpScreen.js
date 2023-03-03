import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TouchableHighlight, Platform, StyleSheet, ScrollView, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import { Input as TextInput } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from './Translations';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions, patientActions } from '../action';
import Geolocation from "@react-native-community/geolocation";
// import { Container, Header, Content, Left, Body, Right } from 'native-base';
import { AuthContext } from '../components/context';
import style from '../assets/style.js';

import Background from '../Constants/Background';
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';
import Field from '../Constants/Field';
import { Appbar } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width;
const Item = Picker.Item;
const SignUpScreen = ({navigation}) => {

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const dispatch = useDispatch();

	const { signIn } = React.useContext(AuthContext);

	const [data, setData] = React.useState({
		name: '',
		email: '',
		contact_no: '',
		password: '',
		confirm_password: '',
		height_feet:"",
		height_inch:"",
		weight:"",
		// health_problem:'',
		health_problem_id: '',
		referral_code: '',
	});
	const [check, setCheck] = React.useState({
		errors:{
			name: '',
			// email: '',
			contact_no: '',
			password: '',
			confirm_password: '',
		},
		check_textInputChange: false,
		secureTextEntry: false,
		confirm_secureTextEntry: false,
		submit: false,
		next: false,
		equalpassword: false,
		emailV: false,
		mobileV: false,
		skip: ''
	})

	const [error, setError] = useState("");
	const [position, setPosition] = React.useState({
	    latitude: 0,
	    longitude: 0
	});

	useEffect(() => {
		let mounted = true;

	    async function fetchMyAPI() {
	    	if (mounted) {
		    	dispatch(patientActions.getHealthProblem())
			    // const watchId = Geolocation.watchPosition(
			    //   pos => {
			    //     setError("");
			    //     setPosition({
			    //       latitude: pos.coords.latitude,
			    //       longitude: pos.coords.longitude
			    //     });
			    //   },
			    //   e => setError(e.message)
			    // );
			    // return () => Geolocation.clearWatch(watchId);
		    }
	    }
	    fetchMyAPI()

	    return () => mounted = false; // cleanup function

	}, [])


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
			confirm_password: val
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
			name: '',
			// email: '',
			contact_no: '',
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


	const nextHandle = () => {
		let validData = {
							name: data.name,
							// email: data.email,
							contact_no: data.contact_no,
							password: data.password,
							confirm_password: data.confirm_password,
						}
		if(!checkEmpty(validData)){
			setCheck({
				...check,
				submit: true
			});
			const params = {
					  "lang":"en",
					  "name":data.name,
					  "country_code":"+91",
					  "contact_no":data.contact_no,
					  "health_problem_id":data.health_problem_id,
					  "email":data.email,
					  "password":data.password,
					  "device_id": data.device_id,
                      "device_type": Platform.OS,
                      "notification_id": DeviceInfo.getUniqueId(),
                      "notification": DeviceInfo.getUniqueId(),
                      "app_version": DeviceInfo.getVersion(),
                      "lat": position.latitude,
                      "lng": position.longitude,
                      "requested_by": "requested_by",
					}
	        // // console.log("-------",params)
	        
	        dispatch(loginActions.registrationV(params))
			// setCheck({...check, next: true})
		}else{
			// // console.log("errors",check.errors)
			Alert.alert('Star fields required!', '', [
	            {text: 'Close'}
	        ]);
		}
	}
	const signUpHandle = (data, position, skip) => {
		// // console.log("data",!checkEmpty(data))
		if(skip){
			if(data.referral_code === ''){
				Alert.alert('Enter referral code or press skip!', '', [
		            {text: 'Close'}
		        ]);
				return false
			}
		}

		setCheck({
				...check,
				skip: skip
			});
		let validData = {
							name: data.name,
							// email: data.email,
							contact_no: data.contact_no,
							password: data.password,
							confirm_password: data.confirm_password,
						}
		if(!checkEmpty(validData)){
			setCheck({
				...check,
				submit: true
			});

			const params = {
					  "lang":"en",
					  "name":data.name,
					  "country_code":"+91",
					  "contact_no":data.contact_no,
					  "height":'',
					  "weight":'',
					  "referral_code": skip ? data.referral_code : '',
					  "health_problem_id":'',
					  "email":data.email,
					  "password":data.password,
					  "device_id": data.device_id,
                      "device_type": Platform.OS,
                      "notification_id": DeviceInfo.getUniqueId(),
                      "notification": DeviceInfo.getUniqueId(),
                      "app_version": DeviceInfo.getVersion(),
                      "lat": position.latitude,
                      "lng": position.longitude,
                      "requested_by": "requested_by",
					}
	        // // console.log("-------",params)
	        
	        dispatch(loginActions.registration(params))
		}else {
			Alert.alert('Star fields required!', '', [
	            {text: 'Close'}
	        ]);
		}
    }

    const user = useSelector(state => ({ ...state.loginReducer}), shallowEqual)
    const health = useSelector(state => ({ ...state.patientReducer}), shallowEqual)
    // // console.log(check.submit,'error--',user)
    
    if(user.userInfo && check.submit){
        Alert.alert('Successfully Registration!', '', [
            {text: 'Close'}
        ]);
        setCheck({
			...check,
			submit: false
		});
        signIn(user.userInfo)
        // navigation.goBack();
    }else if(user.valid && check.submit){
    	setCheck({...check, next: true, submit: false})
    }else if(user.errorMsg && check.submit){
    	Alert.alert(user.errorMsg, '', [
            {text: 'Close'}
        ]);
        setCheck({
			...check,
			submit: false
		});
    }

    const validateIsEmail = (email) => {
    	setData({...data,email})
	    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
	 		setCheck({
				...check,
				emailV: false
			});   	
	    }else{
	    	setCheck({
				...check,
				emailV: true
			});
	    }
	}

	const phonenumber = (contact_no) => {
		setData({...data,contact_no})
		// var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(contact_no)) {
		// if(contact_no.value.match(phoneno)) {
			setCheck({
				...check,
				mobileV: false
			});
		}
		else {
			setCheck({
				...check,
				mobileV: true
			});
		}
	}
	// // console.log('data', data)
	return (
		<Background>
	        <ScrollView style={{width: WIDTH, padding: 10}}>
	            <View
	                style={{
	                    backgroundColor: 'white',
	                    // height: "90%",
	                    width: "100%",
	                    marginTop:"10%",
	                    borderRadius: 50,
	                    paddingTop: 20,
	                    marginBottom: 20
	                 
	                }}>
	                <View style={{   alignItems: 'center'}}>
	                	<Image source={require("../assets/newimage/leaves2.png")}  />
		                <Text style={{fontSize: 25, color: black, marginBottom: 15}}>
		                    New Account 
		                </Text>
	                </View>
				{!check.next ?
					(<>
						<View >
							<TextInput
							leftIcon={
								<Text style={styles.textStar}>*</Text>
							}
							placeholder={translations['Name']}
							style={{fontSize: 12}}
							autoCapitalize="none"
							onChangeText={(name) => setData({...data, name})}
							value={data.name}
							/>
							{data.name && data.name.length > 3 ?
							<Animatable.View
							animation="bounceIn"
							>
							<Feather
							name="check-circle"
							color="green"
							size={20}
							style={{marginTop: 10, marginRight: 10}}
							/>
							</Animatable.View>
							: null}
						</View>
						{(data.name.length > 0) && (data.name.length < 4) && (<Text style={styles.textStar}>Minimum 4 character require</Text>)}

						<View >
							<TextInput
							leftIcon={
								<Text style={styles.textStar}>*</Text>
							}
							placeholder={translations['Email']}
							style={{fontSize: 12}}
							autoCapitalize="none"
							keyboardType="email-address"
							onChangeText={(email) => validateIsEmail(email)}
							value={data.email}
							/>
							{check.emailV ?
							<Animatable.View
							animation="bounceIn"
							>
							<Feather
							name="check-circle"
							color="green"
							size={20}
							style={{marginTop: 10, marginRight: 10}}
							/>
							</Animatable.View>
							: null}
						</View>
						{check.emailV && <Text style={styles.textStar}>Enter valid email</Text>}

						<View >
							<TextInput
							leftIcon={
									<Text style={styles.textStar}>*</Text>
								}
							placeholder={translations['Phone_Number']}
							style={{fontSize: 12}}
							autoCapitalize="none"
							keyboardType="phone-pad"
							onChangeText={(contact_no) => phonenumber(contact_no)}
							value={data.contact_no}
							rightIcon={check.mobileV ?
							<Animatable.View
							animation="bounceIn"
							>
							<Feather
							name="check-circle"
							color="green"
							size={20}
							style={{marginTop: 10, marginRight: 10}}
							/>
							</Animatable.View>
							: null}
							/>
						
						</View>
						{check.mobileV ? 
						 <Text style={styles.textStar}>Enter valid mobile number</Text> : null
						}

						<View >
							<TextInput
							leftIcon={
									<Text style={styles.textStar}>*</Text>
								}
							rightIcon={<TouchableOpacity
								onPress={updateSecureTextEntry}
								style={{marginVertical:8, marginHorizontal:8}}
								>
								{!check.secureTextEntry ?
								<Feather
								name="eye-off"
								color="grey"
								size={20}
								style={{marginRight: 10}}
								/>
								:
								<Feather
								name="eye"
								color="grey"
								size={20}
								style={{marginRight: 10}}
								/>
								}
								</TouchableOpacity>
							}
							placeholder={translations['Password']}
							secureTextEntry={!check.secureTextEntry}
							style={{fontSize: 12}}
							autoCapitalize="none"
							onChangeText={(val) => handlePasswordChange(val)}
							value={data.password}
							/>
						
						</View>

						<View >
							<TextInput
							leftIcon={
									<Text style={styles.textStar}>*</Text>
								}
							rightIcon={<TouchableOpacity
								onPress={updateConfirmSecureTextEntry}
								style={{marginVertical:8, marginHorizontal:8}}
								>
								{!check.confirm_secureTextEntry ?
								<Feather
								name="eye-off"
								color="grey"
								size={20}
								style={{marginRight: 10}}
								/>
								:
								<Feather
								name="eye"
								color="grey"
								size={20}
								style={{marginRight: 10}}
								/>
								}
								</TouchableOpacity>
							}
							placeholder={translations['Confirm Password']}
							secureTextEntry={!check.confirm_secureTextEntry}
							style={{fontSize: 12}}
							autoCapitalize="none"
							onChangeText={(val) => handleConfirmPasswordChange(val)}
							value={data.confirm_password}
							/>
						</View>
						{(data.confirm_password !=='' && !check.equalpassword) && (<Text style={styles.textStar}>Password and Confirm password not same</Text>)}
						{/*
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

						<View >
							<TextInput
							placeholder={translations['weight']}
							style={{fontSize: 12}}
							autoCapitalize="none"
							onChangeText={(weight) => setData({...data,weight})}
							value={data.weight}
							/>
							{check.check_textInputChange ?
							<Animatable.View
							animation="bounceIn"
							>
							<Feather
							name="check-circle"
							color="green"
							size={20}
							style={{marginTop: 10, marginRight: 10}}
							/>
							</Animatable.View>
							: null}
						</View>

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
						</View>*/}
					</>)
					:
					(<View style={{marginBottom: 15}}>
						<View >
							<TextInput
							placeholder="Refarral Code"
							// style={[styles.textInput, {
							// color: colors.text
							// }]}
							autoCapitalize="none"
							onChangeText={(referral_code) => setData({...data, referral_code})}
							value={data.referral_code}
							rightIcon={data.referral_code ?
							<Animatable.View
							animation="bounceIn"
							>
							<Feather
							name="check-circle"
							color="green"
							size={20}
							style={{marginTop: 10, marginRight: 10}}
							/>
							</Animatable.View>
							: null}
							/>
							
						</View>
						<Text>"Enter Refarral Code to Earn Reward Point"</Text>
					</View>)
				}

				{check.next ?
				  (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
					<Btn 
						textColor='black' 
						bgColor={lightgreen} 
						btnLabel="Skip" 
						Press={() => signUpHandle(data, position, false)}
					/>

					<Btn 
						textColor='black' 
						bgColor={lightgreen} 
						btnLabel={translations['Sign_Up']} 
						Press={() => signUpHandle(data, position, true)}
					/>

					<Btn 
						textColor='black' 
						bgColor={lightgreen} 
						btnLabel={"Back"} 
						Press={() => setCheck({...check, next: false})}
					/>
				  </View>)
				  :
				  (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
					<Btn 
						textColor='black' 
						bgColor={lightgreen} 
						btnLabel="Next" 
						Press={() => nextHandle()}
					/>

					<Btn 
						textColor='black' 
						bgColor={lightgreen} 
						btnLabel={translations['Back']} 
						Press={() => navigation.goBack()}
					/>
					
	  			  </View>)
	  			}

				{check.submit &&
				    <View style={styles.loading}>
				      <ActivityIndicator size='large' color="#00B2B6" animating={true} />
				    </View>
				}
	        
	         </View>
	       </ScrollView>

	    </Background>
		  
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff'
},
header: {
alignItems: 'center',
marginTop: 0,
flexDirection: 'row',
padding: 5
},
appLogo:{
	width:30,
    height:30,
    marginLeft:5	
},
footer: {
flex: 3,
// backgroundColor: '#00B2B6',
paddingHorizontal: 20,
paddingVertical: 20
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
pageTitle:{
	fontWeight:'bold',
	fontSize:18,
	color:'#ffffff'
},
action: {
flexDirection: 'row',
marginTop: 10,
borderWidth: 1,
borderRadius: 5,
borderColor: '#f2f2f2',
paddingBottom: 0,
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
marginTop: Platform.OS === 'ios' ? 0 : -5,
paddingLeft: 10,
marginVertical:5,
color: '#05375a',
},
errorMsg: {
color: '#FF0000',
fontSize: 16,
},
signIn: {
justifyContent: 'center',
alignItems: 'center',
borderRadius: 3,
flexDirection: 'row',
paddingVertical: 10,
paddingHorizontal: 20,
marginRight:10,
marginTop:10
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
commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,   
},
textStar: {
	marginVertical:2,
	color: 'red'
},
loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appHeader:{
    backgroundColor:'#04898c',
  },
  headerTitleText:{
    color:'#ffffff',
    fontSize:18,
    fontWeight: 'bold'
  },
});
