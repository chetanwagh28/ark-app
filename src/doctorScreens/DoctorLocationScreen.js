import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, Platform, StyleSheet, ScrollView, StatusBar, Image, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem,  Title } from 'native-base';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Input as TextInput } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar,List } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import Geolocation from "@react-native-community/geolocation";
import Geocoder from 'react-native-geocoding';
import {LocalizationContext} from './Translations';
import { clinicActions, videoActions } from '../action';
import style from '../assets/style.js';


Geocoder.init("AIzaSyB2lZkMFQaG0EIqPdIq0s0WpNrlfYZkqaQ", {language : "en"});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



class DoctorLocation extends Component {

	constructor(props, context){
        super(props, context);
        this.state= this.initialState
        //console.disableYellowBox = true;
    }

    get initialState(){
    	return {
    		show: false,
            new: true,
            LocationDetail: false,
            latitude: 0,
	    	longitude: 0,
	    	clinic_id: '',
			clinic_name: '',
			clinic_number: '',
			clinic_address: '',
			clinic_city_id: '',
			clinic_state_id: '',
			patient_attend_time: '',
			clinic_pincode: '',
			clinic_fees: '',
			status: "active",
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
    }
	

	componentDidMount(){
     
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
		// this.getProfile()
		this.setState(this.initialState)

		// // console.log("========",this.props.route.params.data)
		this.setState({new: this.props.route.params.new, doctor_id: this.props.route.params.doctor_id})
		if(!this.props.route.params.new){
			this.setState({
				clinic_id: this.props.route.params.data.clinic_id,
				clinic_name: this.props.route.params.data.clinic_name,
				clinic_number: this.props.route.params.data.clinic_number.toString(),
				clinic_address: this.props.route.params.data.clinic_address,
				clinic_city_id: this.props.route.params.data.clinic_city_id.toString(),
				clinic_state_id: this.props.route.params.data.clinic_state_id.toString(),
				patient_attend_time: this.props.route.params.data.patient_attend_time.toString(),
				clinic_pincode: this.props.route.params.data.clinic_pincode.toString(),
				clinic_fees: this.props.route.params.data.clinic_fees,
				status: this.props.route.params.data.status
			})	
			const { dispatch } = this.props;
	    	dispatch(videoActions.gitCity(this.props.route.params.data.clinic_state_id));
		}


		let that = this
	    Geolocation.getCurrentPosition(
            //get the current location
            position => {
                this.setState({ 
	            	latitude: position.coords.latitude,
	                longitude: position.coords.longitude 
	            });
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000 },
        );
        //get location on location change
        that.watchID = Geolocation.watchPosition(position => {
            this.setState({ 
            	latitude: position.coords.latitude,
                longitude: position.coords.longitude 
            });
        });
	  });
	}

	currentLocation = () => {
		// // console.log('----')
		Geocoder.from(this.state.latitude, this.state.longitude)
        .then(json => {
        		var addressComponent = json.results[0].address_components[0];
            // // console.log(addressComponent);
        })
        .catch(error => console.warn(error));
	}
    handleChange = (value, name) => {
    	// console.log (value, name)
    	this.setState({ [name] : value})
    }

    handleChangeState = (value, name) => {
    	// console.log (value, name)
    	this.setState({ [name] : value})

    	const { dispatch } = this.props;
    	dispatch(videoActions.gitCity(value));
    }


    checkEmpty = (dataToCheck) => {
		let stopApicall = false
		let errors = {}
		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					// errors[key] = "Field can't be blank"
					stopApicall = true
				}
				else{
					errors[key] = ""
				}
			}

		return stopApicall
	}

    updateProfile = () =>{
    	const { dispatch } = this.props;

    	let validData = {
							clinic_name: this.state.clinic_name,
	    					clinic_number: this.state.clinic_number,
	    					clinic_address: this.state.clinic_address,
	    					clinic_state_id: this.state.clinic_state_id,
	    					clinic_city_id: this.state.clinic_city_id,
	    					clinic_pincode: this.state.clinic_pincode,
	    					clinic_fees: this.state.clinic_fees,
	    					patient_attend_time: this.state.patient_attend_time,
						}
		if(!this.checkEmpty(validData)){

	    	if(this.state.new){
	    		let data = {
	    					doctor_id: this.state.doctor_id,
	    					clinic_name: this.state.clinic_name,
	    					clinic_number: this.state.clinic_number,
	    					clinic_address: this.state.clinic_address,
	    					clinic_state_id: this.state.clinic_state_id,
	    					clinic_city_id: this.state.clinic_city_id,
	    					clinic_pincode: this.state.clinic_pincode,
	    					clinic_fees: this.state.clinic_fees,
	    					patient_attend_time: this.state.patient_attend_time,
	    					status: this.state.status,
	    					lat: this.state.latitude,
	    					lng: this.state.longitude
	    				}
		    	// // console.log('data',data)
		        dispatch(clinicActions.addClinicProfile(data));
		        
	    	}else{
	    		let data = {
	    					clinic_id: this.state.id,
	    					clinic_name: this.state.clinic_name,
	    					clinic_number: this.state.clinic_number,
	    					clinic_address: this.state.clinic_address,
	    					clinic_state_id: this.state.clinic_state_id,
	    					clinic_city_id: this.state.clinic_city_id,
	    					clinic_pincode: this.state.clinic_pincode,
	    					clinic_fees: this.state.clinic_fees,
	    					patient_attend_time: this.state.patient_attend_time,
	    					status: this.state.status,
	    					lat: this.state.latitude,
	    					lng: this.state.longitude
	    				}
		        // // console.log('data',data)
		        dispatch(clinicActions.updateClinicProfile(data));
		        // this.props.navigation.navigate('DoctorProfileScreen', {clinic: true})
	    	}
	    }else{
			Alert.alert('Star fields required!', '', [
	            {text: 'Close'}
	        ]);
		}
    	
    }

    requestSent = () => {

    }

    UNSAFE_componentWillReceiveProps(nextProps){
    	if(nextProps.clinicUpdate){
    		setTimeout(function(){
              Alert.alert('Successfully Save', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(clinicActions.resetClinicState())

              this.props.navigation.navigate('TimeSlot', {doctor_id: this.state.doctor_id})
              // this.props.navigation.navigate('DoctorProfileScreen', {clinic: true})
            }.bind(this),1500);
    	}
	    	// // console.log('error--',nextProps)
    	if(nextProps.errorMsg){
	    	Alert.alert(nextProps.errorMsg, '', [
	            {text: 'Close'}
	        ]);
	        const { dispatch } = this.props;
            dispatch(clinicActions.resetClinicState())
	    }
    }

    handleLocation = (data, details) => {
    	console.log('HIIIIIIIIIIIIIIIIII', data, details);
    }
  	
  	render() {
  		const{ clinic_id, clinic_number, clinic_name, clinic_address, clinic_city_id, clinic_state_id, clinic_pincode, patient_attend_time, clinic_fees } = this.state
  		// // console.log('==',this.state)
  		
  		const translations = this.context.translations;
		return (
		  <Container>
	        <Header style={style.appHeader}>
	            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
	               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => this.props.navigation.navigate('DoctorProfileScreen', {clinic: true})}></Icon>
	            </Left>
	            <Body style={{ flex:4, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
	              <Title style={styles.headerTitleText}>{this.state.new ? "Add Clinic" : "Edit Clinic"}</Title>
	            </Body>
	            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
	            </Right>            
	        </Header>
	        <Content style={style.container}>	
			  <ScrollView>
				<View style={{padding: 15, margin:10}}>
					
					{/*<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:10 }}>
						<Icon name="location" size={25} backgroundColor="#00B2B6" color="#000" onPress={this.currentLocation}>
							<Text>Current Location</Text>
						</Icon>
					</View>*/}
					<Text>Please enable device location for precise on maps</Text>
					<View >
						<TextInput
						leftIcon={
							<Text style={styles.textStar1}>*</Text>
						}
						placeholder="Clinic Name / Hospital"
						autoCapitalize="none"
						onChangeText={(clinic_name) => this.handleChange(clinic_name, 'clinic_name')}
						value={clinic_name}
						editable = {this.state.new}
						/>
						{(clinic_name.length > 0) && (clinic_name.length < 4) && (<Text style={styles.textStar}>Minimum 4 character require</Text>)}
					</View>

					<View>
						<TextInput
						leftIcon={
							<Text style={styles.textStar1}>*</Text>
						}
						placeholder="Clinic Number"
						autoCapitalize="none"
						keyboardType="phone-pad"
						onChangeText={(clinic_number) => this.handleChange(clinic_number, 'clinic_number')}
						value={clinic_number}
						editable = {this.state.new}
						/>
						{(clinic_number.length > 0) && (clinic_number.length < 10) && (<Text style={styles.textStar}>Valid Clinic Number</Text>)}

					</View>
					<View>
						

					    {/*<GooglePlacesAutocomplete
			              placeholder="Search Clinic Address"
			              minLength={2}
			              autoFocus={false}
			              listViewDisplayed={true}
			              keyboardShouldPersistTaps={'handled'}
			              fetchDetails={true}
			              currentLocation={true}
					      currentLocationLabel='Current location'
			              enableHighAccuracyLocation={true}
			              onFail={(error) => console.log(error)}
			              keyboardShouldPersistTaps = {'handled'}
			              onPress={(data, details = null) => this.handleLocation(data, details)}
			              query={{
			                key: 'AIzaSyB2lZkMFQaG0EIqPdIq0s0WpNrlfYZkqaQ',
			                language: 'en',
			                components: 'country:in'
			              }}
			             
			            />*/}
			            
						<TextInput
						leftIcon={
							<Text style={styles.textStar1}>*</Text>
						}
						placeholder="Clinic Address"
						autoCapitalize="none"
						onChangeText={(clinic_address) => this.handleChange(clinic_address, 'clinic_address')}
						value={clinic_address}
						editable = {this.state.new}
						/>
						{(clinic_address.length > 0) && (clinic_address.length < 4) && (<Text style={styles.textStar}>Minimum 4 character require</Text>)}
						
					</View>

					<View style={style.dropdownStar1}>
	                    <Text style={styles.textStar}>*</Text>
	                   <Picker
	                        style={{ width: "100%" }}
	                        itemTextStyle={{fontSize: 8}}
	                        activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
	                        iosHeader="Slot Interval per mintus"
	                        placeholder="Slot Interval per mintus"
	                        selectedValue={patient_attend_time}
	                        mode="dialog"
	                        enabled = {this.state.new}
	                        onValueChange={(patient_attend_time) => this.handleChange(patient_attend_time, 'patient_attend_time')} >

	                        <Picker.Item label="Slot Interval per mintus" value="" />
	                        <Picker.Item label="10" value="10" />
	                        <Picker.Item label="15" value="15" />
	                        <Picker.Item label="20" value="20" />
	                        <Picker.Item label="30" value="30" />
	                        <Picker.Item label="60" value="60" />
	                    </Picker>
	                </View>    


					<View style={style.dropdownStar1}>
						<Text style={styles.textStar}>*</Text>
						<Picker
							style={{ width: "100%" }}
							itemTextStyle={{fontSize: 8}}
							activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
							iosHeader="Select State"
							placeholder="Select State"
							selectedValue={clinic_state_id}
							mode="dialog"
							enabled = {this.state.new}
							onValueChange={(clinic_state_id) => this.handleChangeState(clinic_state_id, 'clinic_state_id')}
						 >	
						 	<Picker.Item label="Select State" value="" />
							{this.state.stateArg.map((state) =>{
								return (<Picker.Item label={state.label} value={state.value.toString()} />)
							  })
							}
						</Picker>
						
					</View>

					<View style={style.dropdownStar1}>
						<Text style={styles.textStar}>*</Text>
						<Picker
							style={{ width: "100%" }}
							itemTextStyle={{fontSize: 8}}
							activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
							iosHeader="Select City"
							placeholder="Select City"
							selectedValue={clinic_city_id}
							mode="dialog"
							enabled = {this.state.new}
							onValueChange={(clinic_city_id) => this.handleChange(clinic_city_id, 'clinic_city_id')}
						 >
						 	<Picker.Item label="Select City" value="" />
							{this.props.cityList.map((cityArg) =>{
								return (<Picker.Item label={cityArg.label} value={cityArg.value.toString()} />)
							  })
							}
						</Picker>
						
					</View>

					<View>
						<TextInput
						leftIcon={
							<Text style={styles.textStar1}>*</Text>
						}
						placeholder="Pincode"
						autoCapitalize="none"
						keyboardType="phone-pad"
						onChangeText={(clinic_pincode) => this.handleChange(clinic_pincode, 'clinic_pincode')}
						value={clinic_pincode}
						editable = {this.state.new}
						/>
						{(clinic_pincode.length > 0) && (clinic_pincode.length < 4) && (<Text style={styles.textStar}>Valid Pincode</Text>)}
					</View>
					
					<View>
						<TextInput
						leftIcon={
							<Text style={styles.textStar1}>*</Text>
						}
						placeholder="Clinic Fees"
						autoCapitalize="none"
						keyboardType="phone-pad"
						onChangeText={(clinic_fees) => this.handleChange(clinic_fees, 'clinic_fees')}
						value={clinic_fees}
						editable = {this.state.new}
						/>
						{(clinic_fees.length > 0) && (clinic_fees.length < 2) && (<Text style={styles.textStar}>Valid Clinic fees</Text>)}
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						{this.state.new ? <TouchableOpacity
						onPress={this.updateProfile}
						>
							<LinearGradient
							colors={['#00B2B6', '#00B2B6']}
							style={[style.commonAppButton, style.buttonD]}
							>
							<Text style={[style.commonAppButtonText]}>Update</Text>
							</LinearGradient>
						</TouchableOpacity>
						:
							<TouchableOpacity
							onPress={this.requestSent}
							>
								<LinearGradient
								colors={['#00B2B6', '#00B2B6']}
								style={[style.commonAppButton, style.buttonD]}
								>
								<Text style={[style.commonAppButtonText]}>Request for edit</Text>
								</LinearGradient>
							</TouchableOpacity>
						}

						<TouchableOpacity
						onPress={() => this.props.navigation.navigate('DoctorProfileScreen', {clinic: true})}
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

DoctorLocation.contextType = LocalizationContext; 
function mapStateToProps(state) { 
  const { loader, clinicUpdate, errorMsg } = state.clinicReducer;
  const { cityList } = state.videoReducer;
  // // console.log("cityList",cityList)
  return {
  	clinicUpdate,
  	errorMsg,
    loader,
    cityList
  };    
}

export default connect(mapStateToProps)(DoctorLocation);

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
	paddingLeft: 0,
	marginLeft: 5,
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
	textStar: {
		marginTop: 8,
		color: 'red'
	},
	textStar1: {
		marginLeft: 20,
		marginTop: 8,
		color: 'red'
	}
});
