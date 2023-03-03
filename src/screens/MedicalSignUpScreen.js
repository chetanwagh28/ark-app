import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from './Translations';
// import { useTheme } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions } from '../action';
import Geolocation from "@react-native-community/geolocation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, Header, Content, Left, Body, Right } from 'native-base';
import style from '../assets/style.js';


const MedicalSignUpScreen = ({navigation}) => {

	// const { colors } = useTheme();
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const dispatch = useDispatch();

	const [data, setData] = React.useState({
		name: '',
		email: '',
		contact_no: '',
		password: '',
		confirm_password: '',
		gender:""
	});
	const [check, setCheck] = React.useState({
		errors:{},
		check_textInputChange: false,
		secureTextEntry: false,
		confirm_secureTextEntry: false,
		submit: false,
		next: false,
		equalpassword: false,
		emailV: false,
		mobileV: false,
	})

	const [error, setError] = useState("");
	const [position, setPosition] = React.useState({
	    latitude: 0,
	    longitude: 0
	});

	useEffect(() => {
		setTimeout(async() => {
			let fcmToken = await AsyncStorage.getItem('fcmToken'); 
        	setData({   
                ...data,    
                device_id: fcmToken 
            }); 
		}, 100);
		// const watchId = Geolocation.watchPosition(
	 //      pos => {
	 //        setError("");
	 //        setPosition({
	 //          latitude: pos.coords.latitude,
	 //          longitude: pos.coords.longitude
	 //        });
	 //      },
	 //      e => setError(e.message)
	 //    );
	 //    return () => Geolocation.clearWatch(watchId);

    }, []);

	const selectBox = (val) => {
		// // console.log(val)
		setData({
			...data,
			height_feet: val
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
		let stopApicall = false
		let errors = {}
		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					// errors[key] = "Field can't be blank"
					stopApicall = true
					setCheck({
						...check,
						errors: {
							...errors,
							[key] : "Field can't be blank"
						}
					});
				}
				else{
					errors[key] = ""
				}
			}

		return stopApicall
	}

	const signUpHandle = (data, position) => {
		// // console.log("data",data)
		let validData = {
							name: data.name,
							email: data.email,
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
					  "email":data.email,
					  // "gender":data.gender,
					  "password":data.password,
					  "device_id": data.device_id,
                      "device_type": Platform.OS,
                      "app_version": DeviceInfo.getVersion(),
                      "lat": position.latitude,
                      "lng": position.longitude,
                      "requested_by": "requested_by",
					}
	        // // console.log("-------",params)
	        dispatch(loginActions.medicalRegistration(params))
		}else{
			Alert.alert('Star fields required!', '', [
	            {text: 'Close'}
	        ]);
		}
    }

    const user = useSelector(state => ({ ...state.loginReducer}), shallowEqual)
    // // console.log('user',user)
    if(user.successMsg && check.submit){
        Alert.alert('Successfully Pharmacy Registration!', '', [
            {text: 'Close'}
        ]);
        navigation.goBack();
    }else if(user.errorMsg && check.submit){
    	// // console.log('error--',)
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

	// // console.log(data, check)
	return (
		<Container>
          <Header style={style.appHeader}>
            <Left>
              <Animatable.Image animation="fadeInUp"
				source={require('../assets/images/logo.png')}
				style={styles.appLogo}
				resizeMode="center"
				/>
               
            </Left>
            <Body>
            	<Animatable.View animation="fadeInUp">
					<Text style={style.PageTitle}>Pharmacy {translations['Sign_Up']}</Text>
				</Animatable.View>
            </Body>
          </Header>
          <Content style={style.container}>
            <StatusBar backgroundColor='#04898c' barStyle="light-content"/>
            <ScrollView>
			<View >
			  	<Animatable.View
				animation="fadeInUp"
				style={[styles.footer, {
				backgroundColor: "#00B2B6"
				}]}
				>

				<View style={style.textbox}>
				<Text style={styles.textStar}>*</Text>
				<TextInput
				placeholder={translations['Name']}
				style={[styles.textInput, {
				// color: colors.text
				}]}
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
				
				<View style={style.textbox}>
				<Text style={styles.textStar}>*</Text>
				<TextInput
				placeholder={translations['Email']}
				style={[styles.textInput, {
				// color: colors.text
				}]}
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

				<View style={style.textbox}>
				<Text style={styles.textStar}>*</Text>
				<TextInput
				placeholder={translations['Phone_Number']}
				style={[styles.textInput, {
				// color: colors.text
				}]}
				autoCapitalize="none"
				keyboardType="phone-pad"
				onChangeText={(contact_no) => phonenumber(contact_no)}
				value={data.contact_no}
				/>
				{check.mobileV ?
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
				{check.mobileV ? 
				 <Text style={styles.textStar}>Enter valid mobile number</Text> : null
				}

				<View style={style.textbox}>
				<Text style={styles.textStar}>*</Text>
				<TextInput
				placeholder={translations['Password']}
				secureTextEntry={!check.secureTextEntry}
				style={[styles.textInput, {
				// color: colors.text
				}]}
				autoCapitalize="none"
				onChangeText={(val) => handlePasswordChange(val)}
				value={data.password}
				/>
				<TouchableOpacity
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
				</View>

				<View style={style.textbox}>
				<Text style={styles.textStar}>*</Text>
				<TextInput
				placeholder={translations['Confirm Password']}
				secureTextEntry={!check.confirm_secureTextEntry}
				style={[styles.textInput, {
				// color: colors.text
				}]}
				autoCapitalize="none"
				onChangeText={(val) => handleConfirmPasswordChange(val)}
				value={data.confirm_password}
				/>
				
				<TouchableOpacity
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
				</View>
				{(data.confirm_password !=='' && !check.equalpassword) && (<Text style={styles.textStar}>Password and Confirm password not same</Text>)}
				{/*<View style={style.dropdown}>
					<Picker
					style={{ height: 40, width: "100%" }}
					itemTextStyle={{fontSize: 8}}
					activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
					iosHeader="Select Gender"
					placeholder="Select Gender"
					selectedValue={data.gender}
					mode="dialog"
					onValueChange={(gender) => setData({...data,gender})} >

						<Picker.Item label="Select Gender" value="" />
						<Picker.Item label="Male" value="Male" />
						<Picker.Item label="Female" value="Female" />
					</Picker>
				</View>
				*/}
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<TouchableOpacity
					onPress={() => {signUpHandle(data, position)}}
					>
						<LinearGradient
						colors={['#00B2B6', '#00B2B6']}
						style={[style.commonAppButton,style.buttonD]}
						>
						<Text style={[styles.commonAppButtonText]}>{translations['Sign_Up']}</Text>
						</LinearGradient>
					</TouchableOpacity>


					<TouchableOpacity
					onPress={() => navigation.goBack()}
					>
						<LinearGradient
						colors={['#00B2B6', '#00B2B6']}
						style={[style.commonAppButton,style.buttonD]}
						>
						<Text style={[styles.commonAppButtonText]}>{translations['Back'] + "  "}</Text>
						</LinearGradient>
					</TouchableOpacity>

				</View>

				</Animatable.View>
				{check.submit &&
				    <View style={styles.loading}>
				      <ActivityIndicator size='large' color="#00B2B6" animating={true} />
				    </View>
				}
			</View>
			</ScrollView>
	 	  </Content>
	 	</Container>  	
	);
};

export default MedicalSignUpScreen;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#00B2B6'
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
backgroundColor: '#00B2B6',
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
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,   
},
textStar: {
	marginVertical:7,
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
