import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
// import { Container, Header, Left, Icon, Body, Right, Content } from 'native-base';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from 'react-native-elements';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../assets/style.js';
import {connect} from 'react-redux'
// import { informationActions } from '../action';
import { informationActions } from '../action/informationAction';
import {LocalizationContext} from './Translations';

// const dispatch = useDispatch();
const Item = Picker.Item;

class InformationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userDetail:{},
            total: '',
            email:'',
            firstName:'',
            contactNo:'',
            lastName:'',
            address:'',
            apartment:'',
            city:'',
            state:'',
            pincode:'',
            data:[],
            stateArg: [
                       {value: 'ANDHRA PRADESH', label: 'ANDHRA PRADESH' },
                       {value: 'ASSAM' , label: 'ASSAM' },
                       {value: 'ARUNACHAL PRADESH', label: 'ARUNACHAL PRADESH' },
                       {value: 'BIHAR' , label: 'BIHAR' },
                       {value: 'GUJRAT' , label: 'GUJRAT' },
                       {value: 'HARYANA' , label: 'HARYANA' },
                       {value: 'HIMACHAL PRADESH', label: 'HIMACHAL PRADESH' },
                       {value: 'JAMMU & KASHMIR', label: 'JAMMU & KASHMIR' },
                       {value: 'KARNATAKA' , label: 'KARNATAKA' },
                       {value:  'KERALA' , label: 'KERALA' },
                       {value:  'MADHYA PRADESH', label: 'MADHYA PRADESH' },
                       {value:  'MAHARASHTRA' , label: 'MAHARASHTRA' },
                       {value:  'MANIPUR' , label: 'MANIPUR' },
                       {value:  'MEGHALAYA' , label: 'MEGHALAYA' },
                       {value:  'MIZORAM' , label: 'MIZORAM' },
                       {value:  'NAGALAND' , label: 'NAGALAND' },
                       {value:  'ORISSA' , label: 'ORISSA' },
                       {value:  'PUNJAB' , label: 'PUNJAB' },
                       {value:  'RAJASTHAN' , label: 'RAJASTHAN' },
                       {value:  'SIKKIM' , label: 'SIKKIM' },
                       {value:  'TAMIL NADU', label: 'TAMIL NADU' },
                       {value:  'TRIPURA' , label: 'TRIPURA' },
                       {value:  'UTTAR PRADESH', label: 'UTTAR PRADESH' },
                       {value:  'WEST BENGAL', label: 'WEST BENGAL' },
                       {value:  'DELHI' , label: 'DELHI' },
                       {value:  'GOA' , label: 'GOA' },
                       {value:  'PONDICHERY' , label: 'PONDICHERY' },
                       {value:  'LAKSHDWEEP' , label: 'LAKSHDWEEP' },
                       {value:  'DAMAN & DIU', label: 'DAMAN & DIU' },
                       {value:  'DADRA & NAGAR', label: 'DADRA & NAGAR' },
                       {value:  'CHANDIGARH' , label: 'CHANDIGARH' },
                       {value:  'ANDAMAN & NICOBAR', label: 'ANDAMAN & NICOBAR' },
                       {value:  'UTTARANCHAL' , label: 'UTTARANCHAL' },
                       {value:  'JHARKHAND' , label: 'JHARKHAND' },
                       {value:  'CHATTISGARH' , label: 'CHATTISGARH' }
                ]
        }
    }
    
  // componentDidMount(){
  //   this.setState({
  //       total: this.props.route.params.total,
  //     })
  // } 
  getProfile = async() => {
    let userDetail = null;
    try {
        userDetail = await AsyncStorage.getItem('userDetail');
        userDetail = JSON.parse(userDetail)
        this.setState({userDetail: userDetail });
    } catch(e) {
        // console.log(e);
    }
  }

  UNSAFE_componentWillMount(){
    this.setState({
      total: this.props.route.params.total,
    })
    this.getProfile();
  }
  handleEmail = (text) => {
    this.setState({ email: text })
    // console.log("JitaJagataPramanHai",text);
  } 
  handleFirstName = (text) => {
    this.setState({ firstName: text })
  } 
  handleContactNo = (text) => {
    this.setState({ contactNo: text })
  } 
  handleAddress = (text) => {
    this.setState({ address: text })
  } 
  handleApartment = (text) => {
    this.setState({ apartment: text })
  } 
  handleCity = (text) => {
    this.setState({ city: text })
  } 
  handleCountry = (text) => {
    this.setState({ state: text })
  }
  handlePincode = (text) => {
    this.setState({ pincode: text })
  }
  
  informationUpdate = () => {
    const {total,firstName,email,address,apartment,city,state,pincode,userDetail,contactNo} = this.state;

    if(address==""){ 
      alert('Please Enter Address');
    }else if(apartment==""){
      alert('Please Enter Apartment');
    }else if(city==""){
      alert('Please Enter City');
    }else if(state==""){
      alert('Please Enter State');
    }else if(pincode==""){
      alert('Please Enter Pincode');
    }else{
      const params = {
        "user_id": userDetail.user_id, 
        "email": email!=''?email:this.state.userDetail.email, 
        "name": firstName!=''?firstName:this.state.userDetail.name,
        "phone_number":contactNo!=''?contactNo:this.state.userDetail.contact_no,
        "city" : city,
        "state" : state,
        "pincode" : pincode,
        "address_details" : address,
        "landmark" : apartment,
        "is_default" : 0
        }
      const { dispatch } = this.props;
      dispatch(informationActions.information(params));
      this.props.navigation.navigate('ShippingScreen',{total:total,email: email!=''?email:this.state.userDetail.email,address:address,apartment:apartment,city:city,state:state});
     }
    }
  render(){
    const { goBack } = this.props.navigation;
      return(
      <SafeAreaView style={style.container}>
          <Header 
                  // backgroundColor="#00b2b6"
                  // placement={"center"}
                  ViewComponent={LinearGradient} // Don't forget this!
                  linearGradientProps={{
                              colors: ['#7AB3B7', '#C2CD3F', '#2E7475'],
                              start: { x: 2.5, y: 0.8 },
                              end: { x: 1, y: 1.5 },
                            }}
                  containerStyle={{
                      // backgroundColor: '#3D6DCC',
                      justifyContent: 'space-around',
                      // height: 200,
                    }}
                  barStyle="light-content" // or directly

                // leftComponent={<><Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon></>}
                // centerComponent={<><Title style={styles.logoText}>{translations['doctor_details']}</Title></>}
                // rightComponent={<></>}
              >
              <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" style={{color:"#fff"}} onPress={() => goBack()}></Icon>
              <Title style={{color: "#fff"}}>Information</Title>
            </Header>
        <ScrollView> 
          {/*<View style={{flexDirection:'row', justifyContent: 'space-between',marginTop:50,backgroundColor:'#fafafa',height:60,borderTopWidth:1,borderBottomWidth:1,borderTopColor:'#e7e7e7',borderBottomColor:'#e7e7e7'}}>
              <View style={{flexDirection:'row'}}>
                <Icon name="md-cart" style={{color:'#2279b6',marginTop:13,marginLeft:20}}></Icon>      
                <Text style={{color:'#2279b6',marginTop:20,marginLeft:20,fontWeight:'bold'}}> Show order summary </Text>
              </View>
             <Text style={{fontWeight:'bold',marginRight:10,marginTop:20,fontSize:16}}>Rs. {this.state.total}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
            <Text style={{color:'#ffffff',marginLeft:20,fontWeight:'bold'}}> Cart </Text>
            <Icon name="" style={{color:'#2279b6'}}></Icon> 
            <Text style={{fontWeight:'bold',color:'orange'}}> Information </Text>
            <Icon name="" style={{color:'#2279b6'}}></Icon>
            <Text style={{color:'grey'}}> Shipping </Text>
            <Icon name="" style={{color:'#2279b6'}}></Icon>
            <Text style={{color:'grey'}}> Payment </Text>
         </View>*/}
         <View>
           <Text style={{marginTop:20,fontSize:20,marginLeft:20,color:'#2b2b2b'}}> Shipping address </Text>
          <View style={style.textbox}>
            <TextInput 
                placeholder={this.state.userDetail.name}
                placeholderTextColor = "#000000"
                name="firstName"
                autoCapitalize="none"
                onChangeText = {this.handleFirstName}
                value={this.state.firstName}
            />
          </View>
          <View style={style.textbox}>
            <TextInput 
                placeholder={this.state.userDetail.contact_no}
                placeholderTextColor = "#000000"
                keyboardType="phone-pad"
                name="contactNo"
                autoCapitalize="none"
                onChangeText = {this.handleContactNo}
                value={this.state.contactNo}
            />
          </View>
          <View style={style.textbox}>
            <TextInput 
                placeholder="Address"
                placeholderTextColor = "#000000"
                name="address"
                autoCapitalize="none"
                onChangeText = {this.handleAddress}
                value={this.state.address}
            />
          </View>
          <View style={style.textbox}>
            <TextInput
                placeholder="Apartment,suite,etc"
                placeholderTextColor = "#000000"
                name="apartment"
                autoCapitalize="none"
                onChangeText = {this.handleApartment}
                value={this.state.apartment}
            />
          </View>
          <View style={style.textbox}>
            <TextInput 
                placeholder="City"
                placeholderTextColor = "#000000"
                name="city"
                autoCapitalize="none"
                onChangeText = {this.handleCity}
                value={this.state.city}
            />
          </View>
          <View style={style.textbox}>
            <Picker
              style={{ height: 40, width: "100%" }}
              itemTextStyle={{fontSize: 8}}
              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
              iosHeader="Select State"
              placeholder="Select State"
              selectedValue={this.state.state}
              mode="dialog"
              enabled = {this.state.new}
              onValueChange={(state) => this.handleCountry(state)}
             >
              <Picker.Item label="Select State" value="" />
              {this.state.stateArg.map(row=>
                <Picker.Item label={row.label} value={row.value} />
              )}
            </Picker>
          </View>
          <View style={style.textbox}>
            <TextInput 
                placeholder="Pincode"
                placeholderTextColor = "#000000"
                keyboardType="numeric"
                name="pincode"
                autoCapitalize="none"
                onChangeText = {this.handlePincode}
                value={this.state.pincode}
            />
          </View>
          <View style={{borderRadius: 15,marginTop:50,borderColor:'#00B2B6',borderWidth:1,height:46,marginLeft:20,marginRight:20,marginBottom:30}}> 
             <TouchableOpacity onPress={() => this.informationUpdate()}>
               <Text style={{color:'#00B2B6',alignSelf:'center',marginTop:10,fontSize:15,fontWeight:'bold'}}>Continue to Shipping</Text>
             </TouchableOpacity>        
          </View>
          
         </View>
        </ScrollView>
      </SafeAreaView>
      )
  }
}

function mapStateToProps(state) { 
  const { loader} = state.informationReducer;
  return {
       loader
  };    
}

export default connect(mapStateToProps)(InformationScreen);
const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    appHeader:{
      backgroundColor:'#00B2B6',
    },
    textbox: {
      marginTop: 15,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#2279b6',
      backgroundColor: '#ffffff',
      paddingBottom: 0,
      marginHorizontal:10,
      marginLeft:20,
      marginRight:20
  },
});