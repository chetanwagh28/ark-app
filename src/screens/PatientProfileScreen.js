import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, TouchableHighlight, Dimensions, Platform, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Input as TextInput, Header } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from './Translations';
import { Avatar,List, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { profileActions, patientActions } from '../action';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import jwtdecode from 'jwt-decode'
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import DateTimePicker from '@react-native-community/datetimepicker';
import { configConstants } from '../constant';
import style from '../assets/style.js';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = Picker.Item;


class PatientProfileScreen extends Component {

	constructor(props){
        super(props);
        this.state={
            display_pic: '',
            name: '',
            gender:'',
            email: '',
            contact_no: '',
            contact_no_old: '',
            health_problem_id: '',
            height: '',
            inch: '',
            feet: '',
            weight: '',
            blood_group: '',
            latitude: 0,
	    	longitude: 0,
	    	patientProfile: false,
	    	show: false,
	    	code: '',
	    	is_mobile_varify: '',
	    	date: new Date(),
            dob: new Date(),
            show1: false,
            mode: 'datetime',
        }
        //console.disableYellowBox = true;
    }
	

	getProfile = async() => {
		let user_id = '';
	    let userToken = null;
	    try {
	        userToken = await AsyncStorage.getItem('userToken');
	        // // console.log(jwtdecode(userToken))
	        user_id = jwtdecode(userToken).user_id
	        const { dispatch } = this.props;
        	dispatch(profileActions.getPatientProfile(user_id));
	    } catch(e) {
	        // console.log(e);
	    }
	}

	componentDidMount(){
    const { dispatch } = this.props;
    dispatch(patientActions.getHealthProblem())

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
		  this.getProfile()
	  });
	}


    selectFile = () => {
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
          quality: 0.5,
          includeBase64: true,
        };

        launchImageLibrary(options, response => {
            console.log("Response = ", response);
            if (response.didCancel) {
                console.log("User cancelled image picker");
                alert("User cancelled image picker");
            } else if (response.errorCode) {
                console.log("ImagePicker ErrorCode: ", response.errorCode);
                alert("ImagePicker ErrorCode: " + response.errorCode);
            } else if (response.errorMessage) {
                console.log("ImagePicker ErrorMessage: ", response.errorMessage);
                alert("ImagePicker ErrorMessage: " + response.errorMessage);
            } else {
                let source = response;

                if(response?.assets){
                	const uri = response?.assets && response.assets[0].uri;

                	let image = response.assets[0];

                	
			            let ext = image.type.split("/")
                  // let image = response.assets[0].base64
			            // console.log("image", uri.replace('file://', ''))
                	const formData = new FormData();

                	// formData.append('display_pic', {
								  //   name: image.fileName,
								  //   type: image.type,
								  //   uri: uri.replace('file://', '')
								  // });

			            formData.append('display_pic', image.base64);
			            formData.append('display_pic_ext', ext[1]);
			            this.setState({ display_image: uri, display_pic: ""});
			            const { dispatch } = this.props;
			            dispatch(profileActions.updatePatientProfile(formData));
                }
		            
            }
        });

        // ImagePicker.showImagePicker(options, res => {
        //   // // console.log('Response = ', res);

        //   if (res.didCancel) {
        //     // console.log('User cancelled image picker');
        //   } else if (res.error) {
        //     // console.log('ImagePicker Error: ', res.error);
        //   } else if (res.fileSize > 60000) {
        //     // // console.log("---------",res.fileSize)
        //     Alert.alert('Upload image max size 5 mb', '', [
        //           {text: 'Close'}
        //       ]);  
        //   } else {

        //    	let source = res.uri;
        //     let image = res.data;
        //     // return false
        //     const formData = new FormData();
        //     let ext = res.type.split("/")
        //     formData.append('display_pic', image);
        //     formData.append('display_pic_ext', ext[1]);
        //     // // console.log(ext[1])
        //     this.setState({display_pic: source, display_image: source});

        //     const { dispatch } = this.props;
        //     dispatch(profileActions.updatePatientProfile(formData));
        //   }
        // });
    }

    show = mode => {
      this.setState({
        show1: true,
        mode,
      });
    }

    datepicker = () => {
      // // console.log(field)
      this.show('date');
    }

    setDate = (event, date) => {
      // // console.log("date",date)
      date = date || this.state.date;
        // let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
        this.setState({
          show1: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          dob: date
        });  
    }
    
  	imageCheck = (display_pic) => {
  		if(this.state.display_image){
  			return (
          <Avatar.Image  source={{ uri: this.state.display_image }}  size={100} />
				)
  		}else if(display_pic){
  			// // console.log(configConstants.API_BASE_PATH_Slash+display_pic)
  			return (
          <Avatar.Image  source={{ uri: configConstants.API_BASE_PATH_Slash+display_pic }}  size={100} />
				)
  		}else{
  			return (<Avatar.Image size={100} style={styles.userProfilePageUserImage} source={{uri: "https://panel.avark.in/apk-image/assets/images/user-avatar.png"}}/>)
  		}
  	}

    setData = async(data) => {
      try {
        // // console.log("setData")
       await AsyncStorage.setItem('userDetail', JSON.stringify(data));
      } catch(e) {
        // console.log(e);
      }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.getProfileFlag && nextProps.patientProfileDetail.length > 0){
            let data = nextProps.patientProfileDetail[0]

        		console.log("nextProps.doctorProfileDetail",data)

            let userdata = {
                        user_id: data.user_id,
                        email: data.email,
                        contact_no: data.contact_no,
                        contact_no_old: data.contact_no,
                        role: data.role,
                        name: data.name,
                        sos: data.sos_contact,
                        referral_code: data.referral_code,
                        display_pic: data.display_pic,
                        patient_id: data.patient_id,
                        is_approved: data.is_approved
                       }
            this.setData(userdata);
            let height = ''
            let feet = ''
            let inch = ''
            if(data.height){

	      			height = data.height.split(',')
	      			feet = height[0]
	      			inch = height[1]
            }
                  // CM to inch and feet
      			// // console.log("feet",feet(feet))

            this.setState({
                 name: data.name,
                 age: data.age,
                 gender: data.gender,
                 dob: data.dob || new Date(2003, 0, 1),
                 contact_no: data.contact_no,
                 email: data.email, 
                 display_pic: data.display_pic,
                 height: data.height,
                 inch: inch,
                 feet: feet,
                 weight: data.weight,
                 health_problem_id: data.health_problem_id,
                 blood_group: data.blood_group,
                 is_mobile_varify: data.is_mobile_varify
            });

            setTimeout(function(){
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1000);
        }
        if(nextProps.profileUpdate){
            setTimeout(function(){
              Alert.alert('Successfully Updated', '', [
                  {text: 'Close'}
              ]);  
              this.getProfile();              

              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
        if(nextProps.otpDone){
            setTimeout(function(){
              Alert.alert('Verified Number', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
        if(nextProps.errorMsg){
            setTimeout(function(){
              Alert.alert(nextProps.errorMsg, '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }     
    }

    handleChange = (value, name) => {
    	// console.log (value, name)
    	this.setState({ [name] : value})
    }

    changeNumber = (value, name) => {
    	// console.log (value, name)
    	this.setState({ [name] : value})
    	if(value.length === 10 && value !== this.state.contact_no){
    		this.setState({ show : true})
    	}
    }

    sendOTP = () => {
    	// // console.log("sendOTP")
    	  const { dispatch } = this.props;
      	dispatch(profileActions.sendOTP(this.state.contact_no));
    }

    updateProfile = () =>{
    	// // console.log(this.state)
    	const formData = new FormData();

  		formData.append('name', this.state.name)
  		formData.append('gender', this.state.gender)
  		formData.append('email', this.state.email)
  		formData.append('dob', new Date(this.state.dob).toLocaleDateString())
  		formData.append('health_problem_id', this.state.health_problem_id)

  		formData.append('height', this.state.feet+','+this.state.inch)
  		formData.append('weight', this.state.weight)
  		formData.append('blood_group', this.state.blood_group)
 		
    	// // console.log('====>>>>',formData)

    		const { dispatch } = this.props;
      	dispatch(profileActions.updatePatientProfile(formData));
    }
  	
  	render() {
  		const{ display_pic, name, email, contact_no, health_problem_id, blood_group, gender, height, weight, inch, feet, mode } = this.state
  		const translations = this.context.translations;
  		// // console.log("feet",feet)
		return (
			<SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => this.props.navigation.goBack()}></Icon>
                      </>}
                centerComponent={<><Text style={style.PageTitle}>Profile</Text></>}
                rightComponent={<>
                  </>}
              />
			  <ScrollView>
				<View>
					<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop:10}}>
						{this.imageCheck(display_pic)}
						<TouchableHighlight onPress={this.selectFile}>
						<Entypo color={'#000'} size={30} backgroundColor="#fff" name="edit"/>
            </TouchableHighlight>
					</View>		

				
          <List.Section title="Edit Profile" titleStyle={{color: '#000', fontWeight: 'bold'}}>
							<View style={{padding:15}}>
								<TextInput
								placeholder={translations['Name']}
								autoCapitalize="none"
								onChangeText={(name) => this.handleChange(name, 'name')}
								value={name}
								/>
								
								<TextInput
								placeholder={translations['Email']}
								autoCapitalize="none"
								keyboardType="email-address"
								onChangeText={(email) => this.handleChange(email, 'email')}
								value={email}
								/>

							

							<View style={style.dropdown1}>
													
								<TouchableOpacity onPress={() => this.datepicker()}>
		                              <LinearGradient colors={['#ffffff', '#ffffff']} style={style.commonAppButtonRight} >
		                                <Text style={style.commonAppButtonText2}>DOB Select: {new Date(this.state.dob).toLocaleDateString()}</Text>
		                              </LinearGradient>
		                        </TouchableOpacity>

								  { this.state.show1 && <DateTimePicker 
				                              maximumDate={new Date(2003, 0, 1)}
				                              minimumDate={new Date(1900, 0, 1)}
				                              value={new Date(this.state.dob)}
				                              mode={mode}
				                              format="YYYY-MM-DD"
				                              is24Hour={true}
				                              display="default"
				                              onChange={this.setDate} />
				                  }
								
							</View>

							<View style={style.dropdown1}>
								<Picker
									style={{ width: "100%" }}
									itemTextStyle={{fontSize: 8}}
									activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
									iosHeader="Select Gender"
									placeholder="Select Gender"
									selectedValue={gender}
									mode="dialog"
									onValueChange={(gender) => this.handleChange(gender, 'gender')} >
										<Picker.Item label="Select Gender" value="" />
										<Picker.Item label="Male" value="Male" />
										<Picker.Item label="Female" value="Female" />
								</Picker>
							</View>

							<View style={style.dropdown1}>
								<Picker
								style={{ width: "100%" }}
								itemTextStyle={{fontSize: 8}}
								activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
								iosHeader="Select Health Problem"
								placeholder="Select Health Problem"
								selectedValue={health_problem_id}
								mode="dialog"
								onValueChange={(health_problem_id) => this.handleChange(health_problem_id, 'health_problem_id')} >
									<Picker.Item label="Select Health Problem" value="" />
									{this.props.healthProblem.length > 0 && this.props.healthProblem.map((row) => { 
										return (<Picker.Item label={row.health_problem_title} value={row.health_problem_id} />)
									  })
									}
								</Picker>
							</View>

							<View style={style.dropdown1}>
								<Picker
								style={{ width: "100%" }}
								itemTextStyle={{fontSize: 8}}
								activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
								iosHeader="Select Blood Group"
								placeholder="Select Blood Group"
								selectedValue={blood_group}
								mode="dialog"
								onValueChange={(blood_group) => this.handleChange(blood_group, 'blood_group')} >
									<Picker.Item label="Select Blood Group" value="" />
									<Picker.Item label="A+" value="A+" />
									<Picker.Item label="B+" value="B+" />
									<Picker.Item label="O+" value="O+" />
									<Picker.Item label="AB+" value="AB+" />
									<Picker.Item label="A-" value="A-" />
									<Picker.Item label="B-" value="B-" />
									<Picker.Item label="O-" value="O-" />
									<Picker.Item label="AB-" value="AB-" />
								</Picker>
							</View>						

							<View style={{flexDirection: 'row', width: "100%"}}>
									<View style={[style.dropdown1, {width: "50%"}]}>
										<Picker
										style={{ width: "100%" }}
										itemTextStyle={{fontSize: 8}}
										activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
										iosHeader="Select Height in Feet"
										placeholder="Select Height in Feet"
										selectedValue={feet}
										mode="dialog"
										onValueChange={(feet) => this.handleChange(feet, 'feet')} >

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
									<View style={[style.dropdown1, {width: "50%"}]}>
										<Picker
										style={{ width: "100%" }}
										itemTextStyle={{fontSize: 8}}
										activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
										iosHeader="Select Height in Inch"
										placeholder="Select Height in Inch"
										selectedValue={inch}
										mode="dialog"
										onValueChange={(inch) => this.handleChange(inch, 'inch')} >

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
							</View>
								<TextInput
								placeholder={translations['weight']} 	 
								autoCapitalize="none"
								onChangeText={(weight) => this.handleChange(weight, 'weight')}
								value={weight}
								/>

							</View>
          

						{/* Start Third Accordion */}
						<List.Accordion title="Verify" titleStyle={{color: '#000', fontWeight: 'bold'}}>
							

							<View>
								<TextInput
								placeholder={translations['mobile_number']} 	 
								autoCapitalize="none"
								keyboardType="phone-pad"
								onChangeText={(contact_no) => this.changeNumber(contact_no, 'contact_no')}
								value={contact_no}
								rightIcon={this.state.is_mobile_varify ===1 &&
																		<Animatable.View
																		animation="bounceIn"
																		>
																		<Feather
																		name="check-circle"
																		color="green"
																		size={20}
																		/>
																		</Animatable.View>
																	}
								/>
								
							</View>

							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								{(this.state.is_mobile_varify === 0 || this.state.show) &&
									<TouchableOpacity
										onPress={this.sendOTP}
									>
										<LinearGradient
										colors={['#00B2B6', '#00B2B6']}
										style={[style.commonAppButton, style.buttonD]}
										>
										<Text style={[style.commonAppButtonText]}>Send OTP</Text>
										</LinearGradient>
									</TouchableOpacity>
								}
								{/* {this.props.otp &&
									<OTPInputView
									    style={{width: '80%', height: 200, color: '#000'}}
									    pinCount={6}
									    code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
									    onCodeChanged = {code => { this.setState({code})}}
									    autoFocusOnLoad
									    codeInputFieldStyle={styles.underlineStyleBase}
									    codeInputHighlightStyle={styles.underlineStyleHighLighted}
									    onCodeFilled = {(code) => {
									        // // console.log(`Code is ${code}, you are good to go!`)
									        const { dispatch } = this.props;
	      									dispatch(profileActions.verifyOTP(code,this.state.contact_no));
									    }}
									/>
								} */}

							</View>

						</List.Accordion>
						{/* End Third Accordion */}


					</List.Section>


					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity
							onPress={this.updateProfile}
						>
							<LinearGradient
							colors={['#00B2B6', '#00B2B6']}
							style={[style.commonAppButton, style.buttonD]}
							>
							<Text style={[style.commonAppButtonText]}>Update</Text>
							</LinearGradient>
						</TouchableOpacity>


						<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}
						>
							<LinearGradient
							colors={['#00B2B6', '#00B2B6']}
							style={[style.commonAppButton, style.buttonD]}
							>
							<Text style={[style.commonAppButtonText]}>Back</Text>
							</LinearGradient>
						</TouchableOpacity>

					</View>
				</View>
			  </ScrollView>
			</SafeAreaView>
		);
	}
};

PatientProfileScreen.contextType = LocalizationContext; 
function mapStateToProps(state) { 
  const { loader, patientProfileDetail, profileUpdate, otp, otpDone, errorMsg, getProfileFlag } = state.profileReducer;
  const { healthProblem } = state.patientReducer;
  // // console.log("getProfileFlag",getProfileFlag)
  return {
  	patientProfileDetail,
    profileUpdate,
    healthProblem,
    loader,
    otp,
    getProfileFlag,
    otpDone,
    errorMsg
  };    
}

export default connect(mapStateToProps)(PatientProfileScreen);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  userProfilePageUserImage:{
	marginTop:10,
	marginBottom:10
  },
  sectionTitleHeading:{
	backgroundColor:'#00B2B6',
	color:'#fff',
	width:'100%',
	padding:10,
	fontSize:18,
	textAlign:'center'
  },
  headerTitleText:{
    color:'#ffffff',
    fontSize:14
  },
  containerView: {
    margin: 0,
    marginTop: 0
  },

	header: {
	alignItems: 'center',
	marginTop: 10,
	padding: 5
	},
	appLogo:{
	width:30,
	height:30,
	},
	footer: {
	flex: 8,
	backgroundColor: '#00B2B6',
	paddingHorizontal: 20,
	paddingVertical: 30
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
	fontSize:22,
	color:'#00B2B6'
	},
	
	actionError: {
	flexDirection: 'row',
	marginTop: 10,
	borderWidth: 1,
	borderColor: '#FF0000',
	paddingBottom: 5
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

	borderStyleBase: {
	    width: 30,
	    height: 45
	},

	borderStyleHighLighted: {
	    borderColor: "#00B2B6",
	},

	underlineStyleBase: {
	    width: 40,
	    height: 45,
	    borderRadius: 5,
	    borderWidth: 1,
	    borderBottomWidth: 2,
	},

	underlineStyleHighLighted: {
	    borderColor: "#00B2B6",
	},
	
});
