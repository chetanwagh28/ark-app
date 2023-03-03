import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, TouchableHighlight, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem, Title } from 'native-base';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from '../screens/Translations';
import { Avatar,List } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from "@react-native-community/geolocation";
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { profileActions, patientActions, videoActions } from '../action';
import jwtdecode from 'jwt-decode'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import DateTimePicker from '@react-native-community/datetimepicker';
import { configConstants } from '../constant';
import style from '../assets/style.js';
import { Switch } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = Picker.Item;


class MedicalProfileScreen extends Component {

	constructor(props){
        super(props);
        this.state={
            display_pic: '',
            name: '',
            gender:'',
            email: '',
            contact_no: '',
            contact_no_old: '',
            registration_number: '',
            homeservice: '',
            license: '',
            license_expire_date: new Date(),
            isSwitchOn:false, 
            latitude: 0,
    	    	longitude: 0,
    	    	patientProfile: false,
    	    	show: false,
    	    	code: '',
    	    	is_mobile_varify: '',
    	    	date: new Date(),
            dob: new Date(),
            show1: false,
            show2: false,
            mode: 'datetime',
            state_id:'',
            city_id:'',
            address: '',
            stateArg: [
                      {value: "1", label: 'ANDHRA PRADESH' },
                      {value: "2", label: 'ASSAM' },
                      {value: "3", label: 'ARUNACHAL PRADESH' },
                      {value: "4", label: 'BIHAR' },
                      {value: "5", label: 'GUJRAT' },
                      {value: "6", label: 'HARYANA' },
                      {value: "7", label: 'HIMACHAL PRADESH' },
                      {value: "8", label: 'JAMMU & KASHMIR' },
                      {value: "9", label: 'KARNATAKA' },
                      {value: "10", label: 'KERALA' },
                      {value: "11", label: 'MADHYA PRADESH' },
                      {value: "12", label: 'MAHARASHTRA' },
                      {value: "13", label: 'MANIPUR' },
                      {value: "14", label: 'MEGHALAYA' },
                      {value: "15", label: 'MIZORAM' },
                      {value: "16", label: 'NAGALAND' },
                      {value: "17", label: 'ORISSA' },
                      {value: "18", label: 'PUNJAB' },
                      {value: "19", label: 'RAJASTHAN' },
                      {value: "20", label: 'SIKKIM' },
                      {value: "21", label: 'TAMIL NADU' },
                      {value: "22", label: 'TRIPURA' },
                      {value: "23", label: 'UTTAR PRADESH' },
                      {value: "24", label: 'WEST BENGAL' },
                      {value: "25", label: 'DELHI' },
                      {value: "26", label: 'GOA' },
                      {value: "27", label: 'PONDICHERY' },
                      {value: "28", label: 'LAKSHDWEEP' },
                      {value: "29", label: 'DAMAN & DIU' },
                      {value: "30", label: 'DADRA & NAGAR' },
                      {value: "31", label: 'CHANDIGARH' },
                      {value: "32", label: 'ANDAMAN & NICOBAR' },
                      {value: "33", label: 'UTTARANCHAL' },
                      {value: "34", label: 'JHARKHAND' },
                      {value: "35", label: 'CHATTISGARH' }
                  ]
        }
        //console.disableYellowBox = true;
    }
	
    handleChangeState = (value, name) => {
      console.log (value, name)
      this.setState({ [name] : value})

      const { dispatch } = this.props;
      dispatch(videoActions.gitCity(value));
    }
	getProfile = async() => {
		let user_id = '';
	    let userToken = null;
	    try {
	        userToken = await AsyncStorage.getItem('userToken');
	        // // console.log(jwtdecode(userToken))
	        user_id = jwtdecode(userToken).user_id
	        const { dispatch } = this.props;
        	dispatch(profileActions.getMedicalProfile(user_id));
	    } catch(e) {
	        // console.log(e);
	    }
	}

	componentDidMount(){

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
		  this.getProfile()

	  });
	}

  onToggleSwitch = () => {
    this.setState({isSwitchOn:!this.state.isSwitchOn});
    this.state.isSwitchOn?this.setState({homeservice:0}):this.setState({homeservice:1})
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
          quality: 0.5
        };

        ImagePicker.showImagePicker(options, res => {
          // // console.log('Response = ', res);

          if (res.didCancel) {
            // console.log('User cancelled image picker');
          } else if (res.error) {
            // console.log('ImagePicker Error: ', res.error);
          } else if (res.fileSize > 60000) {
            // // console.log("---------",res.fileSize)
            Alert.alert('Upload image max size 5 mb', '', [
                  {text: 'Close'}
              ]);  
          } else {

           	let source = res.uri;
            let image = res.data;
            // return false
            const formData = new FormData();
            let ext = res.type.split("/")
            formData.append('display_pic', image);
            formData.append('display_pic_ext', ext[1]);
            // // console.log(ext[1])
            this.setState({display_pic: source, display_image: source});

            const { dispatch } = this.props;
            dispatch(profileActions.updateMedicalProfile(formData));
          }
        });
    }

    show = mode => {
      this.setState({
        show1: true,
        mode,
      });
    }
    show1 = mode => {
      this.setState({
        show2: true,
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

    datepicker1 = () => {
      // // console.log(field)
      this.show1('date');
    }

    setDateLicense = (event, date) => {
      // // console.log("date",date)
      date = date || this.state.date;
        // let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
        this.setState({
          show2: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          license_expire_date: date
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
  			return (<Avatar.Image size={100} style={styles.userProfilePageUserImage} source={ require('../assets/images/user-avatar.png') }/>)
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
        // // console.log("nextProps.doctorProfileDetail",nextProps)
        if(nextProps.getProfileFlag && nextProps.patientProfileDetail.length > 0){
            let data = nextProps.patientProfileDetail[0]

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
                        address: data.address || '',
                        state_id: data.state_id || '',
                        city_id: data.city_id || '',
                        is_approved: data.is_approved
                       }
            this.setData(userdata);

            this.setState({
                 name: data.name,
                 age: data.age,
                 gender: data.gender,
                 dob: data.dob || new Date(2003, 0, 1),
                 contact_no: data.contact_no, 
                 email: data.email, 
                 display_pic: data.display_pic,
                 registration_number: data.registration_number || '',
                 homeservice: data.homeservice || '',
                 license: data.license || '',
                 license_expire_date: data.license_expire_date || new Date(),
                 address: data.address || '',
                 state_id: data.state_id ? data.state_id.toString() : '',
                 city_id: data.city_id || '',
                 is_mobile_varify: data.is_mobile_varify
            });

            setTimeout(function(){
              const { dispatch } = this.props;
              if(data.state_id){
                dispatch(videoActions.gitCity(data.state_id));
              }

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
  		// formData.append('gender', this.state.gender)
  		formData.append('email', this.state.email)
  		// formData.append('dob', new Date(this.state.dob).toLocaleDateString())
      formData.append('license_expire_date', new Date(this.state.license_expire_date).toLocaleDateString())

  		formData.append('registration_number', this.state.registration_number )
      formData.append('license', this.state.license)
      formData.append('homeservice', this.state.homeservice)
      formData.append('address', this.state.address)
      formData.append('state_id', this.state.state_id)
      formData.append('city_id', this.state.city_id)
 		
    	// // console.log('====>>>>',formData)

    	const { dispatch } = this.props;
      	dispatch(profileActions.updateMedicalProfile(formData));
    }
  	
  	render() {
  		const{ display_pic, name, email, contact_no, gender, registration_number , homeservice , license, license_expire_date, mode, address, city_id, state_id } = this.state
  		const translations = this.context.translations;
  		// // console.log("feet",feet)
		return (
		  <Container>
	        <Header style={style.appHeader}>
	            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
	               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => this.props.navigation.goBack()}></Icon>
	            </Left>
	            <Body style={{ flex:4, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
	              <Title style={styles.headerTitleText}>Profile</Title>
	            </Body>
	            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
	            </Right>            
	        </Header>
	        <Content style={style.container}>	
			  <ScrollView>
				<View>
					<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop:10}}>
						{this.imageCheck(display_pic)}
						<TouchableHighlight onPress={this.selectFile}>
						<Entypo color={'#fff'} size={30} backgroundColor="#00B2B6" name="edit"/>
            </TouchableHighlight>
					</View>		

				
          <List.Section title="Edit Profile" titleStyle={{color: '#fff', fontWeight: 'bold'}}>
							<View style={style.textbox}>
								<TextInput
								placeholder={translations['Name']}
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								onChangeText={(name) => this.handleChange(name, 'name')}
								value={name}
								/>
								
							</View>
							<View style={style.textbox}>
								<TextInput
								placeholder={translations['Email']}
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								keyboardType="email-address"
								onChangeText={(email) => this.handleChange(email, 'email')}
								value={email}
								/>

							</View>
            {/*
							<View style={style.dropdown}>
													
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

							<View style={style.dropdown}>
								<Picker
									style={{ height: 40, width: "100%" }}
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
              */}
						
							
							
							<View style={style.textbox}>
								<TextInput
								placeholder={'Registration number'}
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								onChangeText={(registration_number) => this.handleChange(registration_number, 'registration_number')}
								value={registration_number}
								/>

							</View>

              <View style={style.textbox}>
                <TextInput
                placeholder={'license number'}
                style={[style.textInput, {
                
                }]}
                autoCapitalize="none"
                onChangeText={(license) => this.handleChange(license, 'license')}
                value={license}
                />

              </View>

              <View style={style.dropdown}>
                          
                <TouchableOpacity onPress={() => this.datepicker1()}>
                                  <LinearGradient colors={['#ffffff', '#ffffff']} style={style.commonAppButtonRight} >
                                    <Text style={style.commonAppButtonText2}>Select License expire date: {new Date(this.state.license_expire_date).toLocaleDateString()}</Text>
                                  </LinearGradient>
                            </TouchableOpacity>

                  { this.state.show2 && <DateTimePicker 
                                      value={new Date(this.state.license_expire_date)}
                                      mode={mode}
                                      format="YYYY-MM-DD"
                                      is24Hour={true}
                                      display="default"
                                      onChange={this.setDateLicense} />
                          }
                
              </View>
              <View style={style.textbox}>
                <TextInput
                placeholder={"Address"}
                style={[style.textInput, {
                
                }]}
                autoCapitalize="none"
                onChangeText={(address) => this.handleChange(address, 'address')}
                value={address}
                />

              </View>
             
              <View style={style.dropdownStar}>
             
                <Picker
                  style={{ height: 40, width: "100%" }}
                  itemTextStyle={{fontSize: 8}}
                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                  iosHeader="Select State"
                  placeholder="Select State"
                  selectedValue={state_id}
                  mode="dialog"
                  onValueChange={(state_id) => this.handleChangeState(state_id, 'state_id')}
                 >  
                  <Picker.Item label="Select State" value="" />
                  {this.state.stateArg.map((state) =>{
                    return (<Picker.Item label={state.label} value={state.value} />)
                    })
                  }
                </Picker>
                
              </View>

              <View style={style.dropdownStar}>
              
                <Picker
                  style={{ height: 40, width: "100%" }}
                  itemTextStyle={{fontSize: 8}}
                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                  iosHeader="Select City"
                  placeholder="Select City"
                  selectedValue={city_id}
                  mode="dialog"
                  onValueChange={(city_id) => this.handleChange(city_id, 'city_id')}
                 >
                  <Picker.Item label="Select City" value="" />
                  {this.props.cityList.map((cityArg) =>{
                    return (<Picker.Item label={cityArg.label} value={cityArg.value} />)
                    })
                  }
                </Picker>
                
              </View>
             
						{/* Start Third Accordion */}
						<List.Accordion title="Verify" titleStyle={{color: '#fff', fontWeight: 'bold'}}>
							

							<View style={style.textbox}>
								<TextInput
								placeholder={translations['Phone Number']}
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								keyboardType="phone-pad"
								onChangeText={(contact_no) => this.changeNumber(contact_no, 'contact_no')}
								value={contact_no}

								/>
								{this.state.is_mobile_varify ===1 &&
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
								{this.props.otp &&
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
								}

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
			</Content>
		  </Container>
		);
	}
};

MedicalProfileScreen.contextType = LocalizationContext; 
function mapStateToProps(state) { 
  const { loader, patientProfileDetail, getProfileFlag, profileUpdate, otp, otpDone, errorMsg } = state.profileReducer;
  const { cityList } = state.videoReducer;
  // // console.log("patientProfileDetail",patientProfileDetail)
  return {
  	patientProfileDetail,
    profileUpdate,
    loader,
    otp,
    otpDone,
    errorMsg,
    cityList,
    getProfileFlag
  };    
}

export default connect(mapStateToProps)(MedicalProfileScreen);

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
