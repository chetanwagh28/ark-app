import React, {Component} from 'react';
import { View,Text, Button, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Linking, Platform, StyleSheet, ScrollView, StatusBar, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem, Title } from 'native-base';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from './Translations';
import { Avatar,List } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import jwtdecode from 'jwt-decode'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Col, Row, Grid } from "react-native-easy-grid";
import AwesomeAlert from 'react-native-awesome-alerts';
import { configConstants } from '../constant';
import { profileActions, doctorActions, clinicActions } from '../action';
import style from '../assets/style.js';
import { Switch } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = Picker.Item;


class DoctorProfileScreen extends Component {

	constructor(props, context){
        super(props, context);
        this.state={
            show: false,
            profileUpdate: false,
            doctor_id: '',
            doctorProfileDetail: false,
            date: new Date(),
            dob: new Date(),
            mode: 'datetime',
            display_pic: '',
            display_image: '',
            name: '',
            gender:'',
            email: '',
            contact_no: '',
            latitude: 0,
    	    	longitude: 0,
    	    	age: '', 
    	    	hospital: '', 
    	    	expirience: '', 
    	    	about: '',  
    	    	visit_charge: '',  
    	    	video_charge: '',  
    	    	registratration_number: '',  
    	    	registration_year: '',  
    	    	spec_id: '',
    	    	degree: '',
    	    	year: '',
    	    	textInput : [],
            educational_qualification : [],
            council_id: '',
            clinics : [],
            activeTab: '',
            // registration_number_edit: true,
            // registration_year_edit: true,
            // council_edit: true,
            showAlert: false,
      			isSwitchOn:false, 
      			video:0,
      			is_mobile_varify: 0,
      			show: false,
            user_id: ''
        }
        //console.disableYellowBox = true;
    }	
    onToggleSwitch = () => {
		this.setState({isSwitchOn:!this.state.isSwitchOn});
		this.state.isSwitchOn?this.setState({video:0}):this.setState({video:1})
	}
	getProfile = async() => {
		let doc_id = '';
    let user_id = '';
	    let userToken = null;
	    try {
	        userToken = await AsyncStorage.getItem('userToken');
	        // // console.log(jwtdecode(userToken))
	        doc_id = jwtdecode(userToken).doc_id
          user_id = jwtdecode(userToken).user_id
          // // console.log("===========doc_id",doc_id)
	        this.setState({doctor_id: doc_id, user_id: user_id})
	        const { dispatch } = this.props;
        	dispatch(profileActions.getDoctorProfile(doc_id));
	    } catch(e) {
	        // console.log(e);
	    }
	}

	componentDidMount(){
      const { dispatch } = this.props;
      if(this.props.spList.length < 1){
        dispatch(doctorActions.getSpecialization("params"))  
      }
      if(this.props.councilList.length < 1){
        dispatch(profileActions.getCouncil())  
      }
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
      	// // console.log("========",this.props.route.params.clinic)
		    this.getProfile()
      	if(this.props.route.params.clinic){
      		this.setState({doctorProfileDetail: false})
      	}
	   });
	}

	changeNumber = (value, name) => {
    	// console.log (value, name)
    	this.setState({ [name] : value})
    	if(value.length === 10 && value !== this.state.contact_no){
    		this.setState({ show : true,contact_no:value})
    	}
    }
	sendOTP = () => {
    	// // console.log("sendOTP")
    	  const { dispatch } = this.props;
      	dispatch(profileActions.sendOTP(this.state.contact_no));
    }
    displayPic = () => {
      // // console.log("displayPic")
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          base64: true,
          maxWidth: 300,
          maxHeight: 300,
          quality: 0.5
        };

        ImagePicker.showImagePicker(options, res => {
          // // console.log('Response = ', res);

          if (res.didCancel) {
            // console.log('User cancelled image picker');
          } else if (res.error) {
            // console.log('ImagePicker Error: ', res.error);
          } else if (res.fileSize > 60000) {
            // console.log("---------",res.fileSize)
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
        	  dispatch(profileActions.updateProfilePic(formData));

          }
        });
    }

    registrationUpload = () => {
      // // console.log("fieldName",fieldName)
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
            this.setState({registration_proof: image});
            let ext = res.type.split("/")
            // // console.log("]===============",JSON.stringify(image))
            const formData = new FormData();
            formData.append('registration_proof', image);
            formData.append('registration_proof_ext', ext[1]);

            const { dispatch } = this.props;
        	  dispatch(profileActions.updateProfilePic(formData));

          }
        });
    }

    idProofUpload = () => {
      // // console.log("fieldName",fieldName)
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
            this.setState({id_proof: image});
            let ext = res.type.split("/")
            // // console.log("==============",ext[1])
            const formData = new FormData();
            formData.append('id_proof', image);
            formData.append('id_proof_ext', ext[1]);
            // formData.append('id_proof', JSON.stringify(res));

            const { dispatch } = this.props;
        	dispatch(profileActions.updateProfilePic(formData));
          }
        });
    }
    
  	imageCheck = (display_pic) => {
  		if(this.state.display_image){
  			return (
          <Avatar.Image  source={{ uri: this.state.display_image }}  size={120} />
				)
  		}else if(display_pic){
  			// // console.log(configConstants.API_BASE_PATH_Slash+display_pic)
  			return (
          <Avatar.Image  source={{ uri: configConstants.API_BASE_PATH_Slash+display_pic }}  size={120} />
				)
  		}else{
  			return (<Avatar.Image size={120} style={styles.userProfilePageUserImage} source={ require('../assets/images/user-avatar.png') }/>)
  		}
  	}

  	show = mode => {
      this.setState({
        show: true,
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
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          dob: date
        });  
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
        // // console.log("nextProps.doctorProfileDetail",nextProps.doctorProfileDetail)
        if(nextProps.getProfileFlag && nextProps.doctorProfileDetail.length > 0){
            let data = nextProps.doctorProfileDetail[0]

            let userdata = {
                        user_id: data.user_id,
                        email: data.email,
                        contact_no: data.contact_no,
                        role: data.role,
                        name: data.name,
                        sos: data.sos_contact,
                        referral_code: data.referral_code,
                        display_pic: data.display_pic,
                        doc_id: data.doc_id,
                        is_approved: data.is_approved
                       }
            this.setData(userdata);
            this.setState({
                 name: data.name,
                 about: data.about || '',
                 age: data.age,
                 gender: data.gender,
                 dob: data.dob || new Date(2003, 0, 1),
                 contact_no: data.contact_no,
                 email: data.email,        
                 video_charge: data.video_charge && data.video_charge.toString() || '',
                 designation: data.designation || '',
                 display_pic: data.display_pic,
                  
                 expirience: (data.expirience) && data.expirience.toString() || '',
                 hospital: data.hospital || '',
                  
                 id_proof: data.id_proof,
                 registration_proof: data.registraion_proof,
                 registratration_number: data.registratration_number || '',
                 registration_year: data.registration_year || '',
                 council_id: data.council_id,

                 // registration_number_edit: (data.registratration_number) ? false : true,
                 // registration_year_edit: (data.registration_year) ? false : true,
                 // council_edit: (data.council_id) ? false : true,
                 video:data.video,
                 services: data.services,
                 spec_id: data.spec_id,
                 visit_charge: (data.visit_charge) && data.visit_charge.toString() || '',
                 chatting_charge: data.chatting_charge || '',
                 educational_qualification: (data.educational_qualification) ? JSON.parse(data.educational_qualification) : [],
                 clinics: data.clinics || [],
                 doctorProfileDetail: true,
				         is_mobile_varify: data.is_mobile_varify
            }, () => {
      				if(this.state.video==1){
      					this.setState({isSwitchOn:true});
      				}
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
              this.hideEDAlert();
              

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
        if(nextProps.deleteClinic){
            setTimeout(function(){
              Alert.alert('Clinic Deleted Successfully', '', [
                  {text: 'Close'}
              ]);  
              this.hideAlert();
              this.getProfile();
              const { dispatch } = this.props;
              dispatch(clinicActions.resetClinicState())
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

    addTextInput = () => {
      if(this.state.degree !== ''){
        let dataArray = this.state.educational_qualification;
        dataArray.push({
            degree: this.state.degree,
            year: this.state.year
        })
        this.setState({educational_qualification: dataArray, degree: '', year: ''});
      }else{
        Alert.alert("Enter degree name and year", '', [
            { text: 'OK'}
        ]);
      }
      
    }

    showEDAlert = (index, id) => {
      this.setState({
        showEDAlert: true,
        edIndex: index
      });
    };
   
    hideEDAlert = () => {
      this.setState({
        showEDAlert: false,
        edIndex: ''
      });
    };

    //function to remove TextInput dynamically
    removeTextInput = () => {
      const educational_qualification = this.state.educational_qualification;
      educational_qualification.splice(this.state.edIndex, 1);
      this.setState(educational_qualification);
      this.hideEDAlert();
    }


    updateProfile = () =>{

    	const formData = new FormData();

  		formData.append('name', this.state.name)
  		formData.append('gender', this.state.gender)
  		formData.append('dob', new Date(this.state.dob).toLocaleDateString())
  				
  		formData.append('age', this.state.age)

  		formData.append('registratration_number', this.state.registratration_number)
  		formData.append('registration_year', this.state.registration_year)

  		formData.append('hospital', this.state.hospital)
  		formData.append('spec_id', this.state.spec_id)
  		formData.append('council_id', this.state.council_id)
  		formData.append('expirience', this.state.expirience)
  		formData.append('about', this.state.about)
  		formData.append('educational_qualification', JSON.stringify(this.state.educational_qualification))
  		formData.append('video', this.state.video);
      formData.append('video_charge', this.state.video_charge);
    	// // console.log('====>>>>',formData)
    	const { dispatch } = this.props;
      dispatch(profileActions.updateProfilePic(formData));
    }
  	
  	handlePress = (id) => {
      if(this.state.activeTab === id){
        this.setState({activeTab: ''})
      }else{
  		  this.setState({activeTab: id})
      }
  	}

  	deleteClinic = () => {
  		// // console.log('id',id)
  		  const { dispatch } = this.props;
        dispatch(clinicActions.deleteClinicProfile(this.state.clinic_id));
        const newList = this.state.clinics.filter((item) => item.id !== this.state.clinic_id);
        this.setState({clinics: newList, doctorProfileDetail: false})
  	}

    showAlert = (index, id) => {
      this.setState({
        showAlert: true,
        clinicIndex: index,
        clinic_id: id
      });
    };
   
    hideAlert = () => {
      this.setState({
        showAlert: false,
        clinicIndex: '',
        clinic_id: ''
      });
    };

  	render() {
  		const{ showAlert, showEDAlert, activeTab, show, date, mode, dob, council_id, display_pic, name, age, email, contact_no, hospital, expirience, about, visit_charge, video_charge, registratration_number, registration_year, gender, spec_id, educational_qualification, degree, year ,video } = this.state
  		// // console.log('Chintu-------',this.state.video)
  		
  		const translations = this.context.translations;
  		// // console.log("--------------------",this.state.council_id)
		return (
		  <Container>
	        <Header style={styles.appHeader}>
	            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
	               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => this.props.navigation.navigate('Home')}></Icon>
	            </Left>
	            <Body style={{ flex:4, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
	              <Title style={styles.headerTitleText}>Profile</Title>
	            </Body>
	            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
	            </Right>            
	        </Header>
	        <Content style={styles.container}>	
			  <ScrollView>
				<View>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Delete Clinic"
            message="Are you sure?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.deleteClinic();
            }}
          />
          <AwesomeAlert
            show={showEDAlert}
            showProgress={false}
            title="Delete Qualification"
            message="Are you sure?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideEDAlert();
            }}
            onConfirmPressed={() => {
              this.removeTextInput();
            }}
          />
					<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
						{this.imageCheck(display_pic)}
						
						<Entypo color={'#fff'} size={25} onPress={this.displayPic} backgroundColor="#ffffff" name="edit"/>
            
					</View>		


					<View style={[styles.loaderContainer, styles.horizontal]}>
						<ActivityIndicator size="small" color="#00B2B6" animating={false}/>
					</View>

					<List.Section title="Edit Profile" titleStyle={{color: '#fff', fontWeight: 'bold'}}>


						{/* Start First Accordion */}
						<List.Accordion title="Personal Details" titleStyle={{color: '#fff', fontWeight: 'bold'}}
							expanded={(activeTab === 1)}
        					onPress={() => this.handlePress(1)}
						 >

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

							<View style={{flexDirection: 'row'}}>
													
								<TouchableOpacity onPress={() => this.datepicker()}>
                  <LinearGradient colors={['#00B2B6', '#00B2B6']} style={[style.commonAppButton, style.buttonD]} >
                    <Text style={style.commonAppButtonText}>DOB Select: {new Date(this.state.dob).toLocaleDateString()}</Text>
                  </LinearGradient>
                </TouchableOpacity>

								  { 
                   this.state.show && <DateTimePicker 
                              maximumDate={new Date(2003, 0, 1)}
                              minimumDate={new Date(1900, 0, 1)}
                              value={new Date(this.state.dob)}
                              mode={mode}
                              format="YYYY-MM-DD"
                              is24Hour={true}
                              display="default"
                              onChange={this.setDate} />
                  }
                <TextInput
  								placeholder="Age"
  								style={[style.textInputB, {
  								  width: 200, color: '#fff'
  								}]}
  								autoCapitalize="none"
  								onChangeText={(age) => this.handleChange(age, 'age')}
  								value={age}
								/>
								
								{/*<Animatable.View
								animation="bounceIn"
								>
								<Feather
								name="check-circle"
								color="green"
								size={20}
								/>
								</Animatable.View>*/}
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
					
						</List.Accordion>
						{/* End First Accordion */}


						{/* Start Second Accordion */}
						<List.Accordion title="Professional Details" titleStyle={{color: '#fff', fontWeight: 'bold'}}
							expanded={(activeTab === 2)}
        					onPress={() => this.handlePress(2)}
        				 >
        				<View style={style.dropdown}>
								
  								<Picker
  								style={{ height: 40, width: "100%" }}
  								itemTextStyle={{fontSize: 8}}
  								activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
  								iosHeader="Select Specialization"
  								placeholder="Select Specialization"
  								selectedValue={spec_id}
  								mode="dialog"
  								onValueChange={(spec_id) => this.handleChange(spec_id, 'spec_id')}
  										 >
                       <Picker.Item label="Select Specialization" value="" />
  									{this.props.spList.length > 0 && this.props.spList.map((row) => { 
  										return (<Picker.Item label={row.en_spec} value={row.spec_id} />)
  									  })
  									}
  								</Picker>
  								
							</View>
							<View style={style.textbox}>
								<TextInput
								placeholder="Total Expirience"
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								keyboardType="phone-pad"
								onChangeText={(expirience) => this.handleChange(expirience, 'expirience')}
								value={expirience}
								/>

							</View>

							<View style={style.textbox}>
								<TextInput
								placeholder="About"
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								onChangeText={(about) => this.handleChange(about, 'about')}
								value={about}

								/>

							</View>
							<View style={{ flexDirection: 'row',  marginTop:10,marginLeft:10 }}>
								
									<TextInput
									placeholder="Qualification"
									style={[style.textInputB, {
										width: 200, backgroundColor: '#ffffff'
									}]}
									autoCapitalize="none"
									onChangeText={(degree) => this.handleChange(degree, 'degree')}
									value={degree}
									/>
								
									<TextInput
									placeholder="Qualification Year"
									style={[style.textInputB, {
										width: 60, backgroundColor: '#ffffff'
									}]}
									autoCapitalize="none"
									keyboardType="phone-pad"
									onChangeText={(year) => this.handleChange(year, 'year')}
									value={year}
									/>
								  
                  <Entypo color={'#fff'} size={25} onPress={() => this.addTextInput()} backgroundColor="#00B2B6" name="plus"/>
							</View>
							<View style={{marginTop:10, padding:10, width: "100%" }}>
								{
					                this.state.educational_qualification.length > 0 &&
					                <React.Fragment>
						                <Grid style={{
					                          justifyContent: 'center',
					                          alignItems:'flex-start',
                                    fontSize: 14
					                        }}>
				                          <Row  style={styles.tableColumn1}> 
				                            <Col>
				                               <Row><Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Degree </Text></Row>
				                            </Col>
				                            <Col>
				                               <Row><Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Year</Text></Row>
				                            </Col>
				                            <Col>
				                              <Row><Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Action</Text></Row>  
				                            </Col>
				                          </Row>
				                 
									       	{this.state.educational_qualification.map((value, index) => {
						                  return (				                    
					                          <Row style={styles.tableColumn1}> 
					                            <Col>
					                               <Row><Text>{value.degree} </Text></Row>
					                            </Col>
					                            <Col>
					                               <Row><Text>{value.year}</Text></Row>
					                            </Col>
					                            <Col>
					                              <Row><Icon name="ios-trash" onPress={() => this.showEDAlert(index)} size={20} style={styles.trashButton}></Icon></Row>  
					                            </Col>
					                          </Row>
						                  )  
						                })}
					               </Grid>
					                </React.Fragment>
					            }		
							</View>

						</List.Accordion>
						{/* End Second Accordion */}
				
						
						{/* Start Sixth Accordion */}
						<List.Accordion title="Verification Details" titleStyle={{color: '#fff', fontWeight: 'bold'}}
							expanded={(activeTab === 5)}
        					onPress={() => this.handlePress(5)}
  						 >
  						 	<View style={style.textbox}>
								{/* <TextInput
								placeholder={translations['Phone Number']}
								style={[style.textInput, {
								
								}]}
								autoCapitalize="none"
								keyboardType="phone-pad"
								onChangeText={(contact_no) => this.changeNumber(contact_no, 'contact_no')}
								value={contact_no}
								editable = {true} />*/}

								
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
							<View style={{ justifyContent: 'center', alignItems: 'center',marginTop:15}}>
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
							<View style={style.dropdown}>
								
								<Picker
								style={{ height: 40, width: "100%" }}
								itemTextStyle={{fontSize: 8}}
								activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
								iosHeader="Select Council"
								placeholder="Select Council"
								selectedValue={council_id}
								mode="dialog"
								onValueChange={(council_id) => this.handleChange(council_id, 'council_id')}
                // enabled = {this.state.council_edit}
										 >
                    <Picker.Item label="Select Council" value="" />
									{this.props.councilList.length > 0 && this.props.councilList.map((row) => { 
										return (<Picker.Item label={row.council_title} value={row.council_id} />)
									  })
									}
								</Picker>
                
							</View>

							<View style={style.textbox}>
								<TextInput
								placeholder="Registratration Number"
								style={[style.textInput, {
								
								}]}
								keyboardType="number"
								autoCapitalize="none"
								onChangeText={(registratration_number) => this.handleChange(registratration_number, 'registratration_number')}
								value={registratration_number}
                // editable = {this.state.registration_number_edit}
								/>

              </View>

							<View style={style.textbox}>
								<TextInput
								placeholder="Registratration Year"
								style={[style.textInput, {
								
								}]}
								keyboardType="number"
								autoCapitalize="none"
								onChangeText={(registration_year) => this.handleChange(registration_year, 'registration_year')}
								value={registration_year}
                // editable = {this.state.registration_year_edit}

								/>
              </View>

							<View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop:10,marginLeft:15 }}>

								<View style={style.action}>
									<Text>Registration Proof:</Text>
								</View>

								<View style={styles.action1}>
									{this.state.registration_proof ?
										(<Feather name="download" color="green" size={20} onPress={ ()=>{ Linking.openURL(configConstants.API_BASE_PATH_Slash+this.state.registration_proof)}}/>)
										:
										(<Icon.Button name="add-circle-outline" onPress={this.registrationUpload} size={20} backgroundColor="#00B2B6"></Icon.Button>)
									}
								</View>

							</View>

							<View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop:10,marginLeft:15 }}>

								<View style={styles.action}>
									<Text>ID Proof:</Text>
								</View>

								<View style={styles.action1}>
									{this.state.id_proof ?
										(<Feather name="download" color="green" size={20} onPress={ ()=>{ Linking.openURL(configConstants.API_BASE_PATH_Slash+this.state.id_proof)}}/>)
										:
										(<Icon.Button name="add-circle-outline" onPress={this.idProofUpload} size={20} backgroundColor="#00B2B6"></Icon.Button>)
									}
								</View>

							</View>

							
						</List.Accordion>
						{/* End Sixth Accordion */}

						{/* Start Fourth Accordion */}
						<List.Accordion title="Clinic/Hospital Details" titleStyle={{color: '#fff', fontWeight: 'bold'}}
							expanded={(activeTab === 4)}
        					onPress={() => this.handlePress(4)}
						 >
							<View style={{marginTop:10, padding:10, width: "100%" }}>
								   
					                <React.Fragment>
					                	<Grid style={{
					                          justifyContent: 'center',
					                          alignItems:'flex-end',
					                          marginRight: 20
					                        }}>
				                          <Row> 
				                            <Icon size={25} name="add-circle-outline" color='#fff' backgroundColor="#00B2B6" onPress={() => this.props.navigation.navigate('DoctorLocation', {new: true, data: '', doctor_id: this.state.doctor_id})}></Icon>
				                          </Row>
				                       </Grid>
						                <Grid style={{
					                          marginHorizontal: 10,
                                    fontSize: 14
					                        }}>
				                          <Row style={styles.tableColumn1}> 
				                            <Col>
				                               <Row><Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Name</Text></Row>
				                            </Col>
				                            <Col>
				                               <Row style={styles.tableRow1}><Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Number</Text></Row>
				                            </Col>
				                            <Col>
				                              <Row style={styles.tableRow1}><Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Action</Text></Row>  
				                            </Col>
				                          </Row>

    									 	       {this.state.clinics.length > 0 ? this.state.clinics.map((value, index) => {
    						                  return (				                    
					                        
					                          <Row style={styles.tableColumn1}> 
					                            <Col >
					                               <Row><Text>{value.clinic_name} </Text></Row>
					                            </Col>
					                            <Col>
					                               <Row><Text>{value.clinic_number}</Text></Row>
					                            </Col>
					                            <Col>
					                              <Row>
					                              	<Entypo color={'#fff'} size={20} onPress={() => this.props.navigation.navigate('DoctorLocation', {new: false, data: value, doctor_id: this.state.doctor_id})} backgroundColor="#ffffff" name="edit"/>
					                              	<Icon name="ios-trash" onPress={() => this.showAlert(index, value.id)} size={20} style={styles.trashButton}></Icon>
					                              </Row>  
					                            </Col>
					                          </Row>
					                       
    						                  )  
    						                 }) : (
					                          <Row  style={styles.tableColumn1}>
					                          	<Text style={{color: '#fff', fontWeight: 'bold', fontSize:16}}>Clinic not add </Text>
					                          </Row>  
						                      )
									             }
                            </Grid>
					                </React.Fragment>
							</View>

							
						</List.Accordion>
						{/* End Fourth Accordion */}

						{/* Start Seventh Accordion */}
						<List.Accordion title="Clinic Time slot" titleStyle={{color: '#fff', fontWeight: 'bold'}} onPress={()=> this.props.navigation.navigate('TimeSlot', {doctor_id: this.state.doctor_id})}>

						</List.Accordion>
						{/* End Seventh Accordion */}
						</List.Section>
                     <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:10,marginBottom:15}}> 
					   <Text style={{color: '#fff', fontWeight: 'bold',marginLeft:18,fontSize:16}}>Video Appointment</Text>	 
					   <View><Switch
                trackColor={{ false: "#767577", true: "#ffffff" }}
                thumbColor={this.state.isSwitchOn ? "#008000" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={this.state.isSwitchOn} 
                onValueChange={this.onToggleSwitch} 
              />
              </View>    
					 </View>
           {this.state.isSwitchOn && 
            <View style={style.textbox}>
                <TextInput
                placeholder="Video Consultation"
                style={[style.textInput, {
                
                }]}
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChangeText={(video_charge) => this.handleChange(video_charge, 'video_charge')}
                value={video_charge}
                />

              </View>
           }
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity
						onPress={this.updateProfile}
						>
							<LinearGradient
							colors={['#00B2B6', '#00B2B6']}
							style={[style.commonAppButton, style.buttonD]}
							>
							<Text style={[style.commonAppButtonText]}>Update</Text>
              <ActivityIndicator size="small" color="#fff" animating={this.props.sendingRequest}/>
							</LinearGradient>
						</TouchableOpacity>


						<TouchableOpacity
						onPress={() => this.props.navigation.navigate('HomeDrawer')}
						>
							<LinearGradient
							colors={['#00B2B6', '#00B2B6']}
							style={[style.commonAppButton, style.buttonD]}
							>
							<Text style={[style.commonAppButtonText]}>  Back    </Text>

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

DoctorProfileScreen.contextType = LocalizationContext; 
function mapStateToProps(state) { 
  const { loader, spList } = state.doctorReducer;
  const { doctorProfileDetail, councilList, sendingRequest, otp,otpDone,profileUpdate, getProfileFlag, errorMsg } = state.profileReducer;
  const { deleteClinic } = state.clinicReducer;
  // // console.log("doctorProfileDetail",doctorProfileDetail)
  return {
    loader,
    spList,
  	otp,
  	otpDone,
    councilList,
    doctorProfileDetail,
    sendingRequest,
    profileUpdate,
    deleteClinic,
    getProfileFlag,
    errorMsg
  };    
}

export default connect(mapStateToProps)(DoctorProfileScreen);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#00B2B6'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  appHeader:{
    backgroundColor:'#273f61',
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
  genderLeftSide:{
	width:windowWidth/4
  },
  genderRightSide:{
	// width:windowWidth/2
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
	action: {
	flexDirection: 'row',
	marginTop: 10,
	borderBottomWidth: 1,
	borderBottomColor: '#f2f2f2',
	paddingBottom: 5,
	marginRight: 10
	},
	action1: {
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
	actionError: {
	flexDirection: 'row',
	marginTop: 10,
	borderBottomWidth: 1,
	borderBottomColor: '#FF0000',
	paddingBottom: 5,
	marginRight: 10
	},
	textInput: {
	flex: 1,
	marginTop: Platform.OS === 'ios' ? 0 : -12,
	paddingLeft: 10,
	color: '#05375a',
	marginLeft: 15
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
	commonAppButtonText2: {
	color:'#000',
	fontSize: 12,
	marginTop: Platform.OS === 'ios' ? 0 : -12,
	paddingLeft: 10,
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
	trashButton:{
    color:'red',
    // marginTop:20
  },
  commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,   
},
tableColumn1:{
  borderWidth:1,
  justifyContent: 'center',
  textAlign: 'center'
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
