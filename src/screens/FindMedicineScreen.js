import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import {doctorActions, videoActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocalizationContext} from './Translations';
import medical1 from '../assets/images/medical/1-medical.png';
import style from '../assets/style.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from "@react-native-community/geolocation";

class FindMedicine extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            value: 5,
            sharePrescription: '',
            // categroy: 'doctor',
            categroyKey: '',
            categroy_type: 2,
            distance: 5,
            lat: '',
            lng: '',
            city_id: '',
            state_id: '',
            showState: false,
            cityArg: '',
            stateArg : [
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
    async componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        this.setState({
          sharePrescription: this.props.route.params.sharePrescription || ''
        })
        try {
            let city_id = await AsyncStorage.getItem('city_id');
            let state_id = await AsyncStorage.getItem('state_id');
            if(state_id){
              // let data = JSON.parse(cityArg)
              this.setState({city_id: city_id || ''});
              this.setState({state_id: state_id || ''});
              const { dispatch } = this.props;
              dispatch(videoActions.gitCity(state_id));
            }
          } catch(e) {
          // console.log(e);
        }
        let that = this
        Geolocation.getCurrentPosition(
           //get the current location
           position => {
               this.setState({ 
                 lat: position.coords.latitude,
                 lng: position.coords.longitude 
               });
           },
           error => alert(error.message),
           { enableHighAccuracy: true, timeout: 20000 },
        );
        setTimeout(async() => {
          this.apiCall();
        }, 1000);
      });
    }
    apiCall = () => {
      
      let data = {
                  category_type: this.state.categroy_type,
                  km: this.state.distance,
                  city_id: this.state.city_id,
                  name: this.state.name,
                  lat: this.state.lat,
                  lng: this.state.lng
                }
                
        const { dispatch } = this.props;
        dispatch(doctorActions.getDoctorsBySpecialization(data));
    }


    searchFilter = () => {
      setTimeout(async() => {
          this.apiCall();
      }, 300);
    }

    stateSet = (state_id) => {
      console.log("stateSet")
      if(state_id){
        this.setState({state_id: state_id})
        try {
          const { dispatch } = this.props;
          dispatch(videoActions.gitCity(state_id));
        } catch(e) {
          // console.log(e);
        }
      }
    }

    citySelect = (city_id) => {
      if(city_id){
        this.searchFilter();
        this.setState({city_id: city_id})
      }
    }

    onSlidingComplete = (distance) => {
      let data = {
                  category_type: 1,
                  km: distance,
                  city_id: this.state.city_id,
                  name: this.state.name,
                  lat: this.state.lat,
                  lng: this.state.lng,
                }
      const { dispatch } = this.props;
      dispatch(doctorActions.getDoctorsBySpecialization(data));
    }

    render() {
      // console.log("state_id", this.state.state_id)
        const translations = this.context.translations;
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>{translations['Medical Store']}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>   
          </Header>
         <Content style={style.container}>
          <ScrollView>

            <View style={styles.containerView}>
            
            <View style={styles.searchHead}>
                {/*<View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={styles.distanceLabel}>{translations['distance']}</Text>
                    <Text style={styles.distanceLabel}>(KM)</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center',marginLeft:10}}>
                      <Text style={ { width: 50, textAlign: 'center', left: left } }>
                        {Math.floor( this.state.value )}
                      </Text>
                    <Slider
                      value={this.state.value}
                      thumbTintColor={'#ffffff'}
                      minimumTrackTintColor="#00B2B6"
                      maximumTrackTintColor="#ffffff"
                      step={1}
                      minimumValue={0}
                      maximumValue={100}
                      onValueChange={(value) => this.setState({ value })}
                      onSlidingComplete={(value) => this.onSlidingComplete(value)}
                    />
                  </View>

                </View>*/}
                <View style={{flexDirection: 'row', width: "100%" , margin: 5}}>
                  <TextInput 
                      placeholder={translations['search_by_name']}
                      style={styles.textInput}
                      autoCapitalize="none"
                      name="name"
                      onChangeText={(name) => this.setState({name: name})}
                      onEndEditing={() => this.searchFilter()}
                  />
                  <View style={{ marginHorizontal: 5 }}>
                    <TouchableOpacity onPress={() => this.setState({showState: !this.state.showState})}>
                      <MaterialCommunityIcons color={'#ffffff'} size={40} backgroundColor="#04898c" name={!this.state.showState ? "filter-menu" : "filter-remove"}/> 
                    </TouchableOpacity>
                  </View>
                </View>  
                  {!this.state.showState && 

                    <View style={{ flexDirection: 'row', width: "100%",  justifyContent:'space-between' }}>
                      <View style={{ width: "48%"}}>
                          <Picker
                            style={{ height: 32, width: "100%", color: 'grey',  fontWeight: 'bold', marginBottom:5 }}
                            itemTextStyle={{fontSize: 8}}
                            activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                            iosHeader="Select State"
                            placeholder="Select State"
                            selectedValue={this.state.state_id}
                            mode="dialog"
                            onValueChange={(state_id) => this.stateSet(state_id)}
                           >  
                            <Picker.Item label="Select State" value="" />
                            {this.state.stateArg.map((state) =>{
                              return (<Picker.Item label={state.label} value={state.value} />)
                              })
                            }
                          </Picker>
                      </View>    
                      <View style={{ width: "48%"}}>
                          <Picker
                              style={{ height: 32, width: "100%", color: 'grey', fontWeight: 'bold', marginBottom:5 }}
                              itemTextStyle={{fontSize: 8}}
                              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                              iosHeader="Select City"
                              placeholder="Select City"
                              selectedValue={this.state.city_id}
                              mode="dropdown"
                              onValueChange={(city_id) => this.citySelect(city_id)}
                             >
                                <Picker.Item label="Select City" value="" />
                                {this.props.cityList.map((cityArg) =>{
                                  return (<Picker.Item label={cityArg.label.toUpperCase()} value={cityArg.value.toString()} />)
                                  })
                                }
                          </Picker>
                      </View>
                    </View>
                  }
            </View>  

            <View style={styles.listOfAllCards}>
              <FlatList  
                  data={this.props.doctorList || []}
                  renderItem={({item}) =>  
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("UploadMedicalPrescription", {medicalDetail: item, sharePrescription: this.state.sharePrescription})}>
                    <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                      <Card key={item.key} style={styles.cardListView}>
                        <Card.Content>
                            <View style={{flexDirection:'row',  width: '100%'}}>
                                <View style={{ width: '10%'}}>
                                    <Avatar.Image  source={medical1} style={styles.profile_image} size={60} />
                                </View>
                                
                                <View style={{marginLeft:35, justifyContent: 'flex-end', flexDirection: 'column', width: '80%'}}>
                                    <Paragraph>{item.name}  </Paragraph>
                                    <Paragraph>{item.address} </Paragraph>
                                </View>                            
                            </View>

                            <View style={styles.contentList}>
                                <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'center',alignItems:'center' }}>
                                    <TouchableOpacity 
                                      // onPress={() => Communications.phonecall(item.contact_no, true)}
                                      >
                                        <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                            <Text style={style.commonAppButtonText}>{translations['call']} {translations['Now']}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat", {chatData: item})}>
                                        <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                          <Text style={style.commonAppButtonText}>{translations['chat']} {translations['Now']}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>  
                                </View>    
                            </View>
                        
                        </Card.Content>
                      </Card>
                    </Animatable.View>
                  </TouchableOpacity>
                  }
                  ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <CardItem  header>
                                                  <Text style={{textAlign: 'center'}}>  No Data Present In... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
              />  
            </View>
            
            
            </View> 
        
        
          </ScrollView>
        </Content>
       </Container>
      );
    }
}
FindMedicine.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, doctorList } = state.doctorReducer;
  const { cityList } = state.videoReducer;
  // console.log("doctorList",doctorList)
  return {
    doctorList,
    loader,
    cityList
  };    
}

export default connect(mapStateToProps)(FindMedicine);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B2B6'
  },
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
  containerView: {
    margin: 0,
    marginTop: 0
  },
  distanceLabel:{
    lineHeight:35,
    color:'#fff',
    fontWeight:'bold',
  },
  searchHead:{
    marginLeft: 0,
    marginRight: 0,
    backgroundColor:'#00CBCC',
    paddingLeft:10,
    paddingRight:10

  },
  textInput: {
    height: 40,
    width: "85%",
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
    borderRadius:5,

  },
  textInput1: {
    height: 40,
    width: "67%",
    marginTop: 0,
    marginBottom:10,
    marginLeft: 5,
    marginRight: 10,
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
    borderRadius:5,
  },
  listOfAllCards:{
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    alignItems: 'flex-start',
    height:150,
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
    textAlign:'left',
    padding:5,
    borderRadius:5,
    color:'#fff',
    width: '100%'
  },
  rating_container:{
    marginTop:10,
    marginRight:15
  },
  contentList:{
    flexDirection:'row',
    justifyContent:'center',
  },
  appLogo:{
    width:80,
    height:80,
    borderWidth:1,
    borderRadius:60/2
  },
  fees_display_text:{
      fontSize:14,
      color:'black'
  },
  titleView:{
    fontSize:14,
    width: 100
  },
  call_now_button:{
    margin: 5,
    fontSize:5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center',

  },
  chat_button:{ 
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center',

  },
  upload_prescription_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
  },
  book_appointment_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
  },

  profile_image:{
      width:60,
      height:60,
      marginRight:15
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
      color: '#fff',
      fontSize:12
  },   
});
