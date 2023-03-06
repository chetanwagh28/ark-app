import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
// import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem } from 'native-base';
import { Rating, Slider, Image, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {doctorActions, videoActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalizationContext} from './Translations';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
import Geolocation from "@react-native-community/geolocation";



class FindDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            specialization: '',
            categroy: 'doctor',
            categroyKey: '',
            name: '',
            clinic_name: '',
            categroy_type: 1,
            specialization_key: '',
            distance: 0,
            lat: '22.718670',
            lng: '75.855713',
            city_id: '',
            state_id: '11',
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
        this.citySelect = this.citySelect.bind(this)
    }
    async componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {        
        this.setState({
          categroy: this.props.route.params.categroy,
          categroyKey: this.props.route.params.categroyKey,
          specialization: this.props.route.params.specialization,
          specialization_key: this.props.route.params.specialization_key,
        })
        const { dispatch } = this.props;
        var city_id = await AsyncStorage.getItem('city_id');
        var state_id = await AsyncStorage.getItem('state_id');
        if(state_id){
          // let data = JSON.parse(cityArg)
          this.setState({city_id: city_id || ''});
          this.setState({state_id: state_id || ''});
          dispatch(videoActions.gitCity(state_id));
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

        await this.searchFilter();
      });
    }

    componentWillUnmount(){
      this._unsubscribe()
    }

    apiCall = () => {
      var videoOption;
      if(this.state.categroyKey=='doctor'){
        videoOption=0;
      }else{
        videoOption=1;
      }
      let data = {
                  category_type: 1,
                  km: this.state.distance,
                  city_id: this.state.city_id,
                  clinic_name: this.state.clinic_name,
                  name: this.state.name,
                  lat: this.state.lat,
                  lng: this.state.lng,
                  spec_id: this.state.specialization_key ,
                  is_video:videoOption
                }
        // console.log("api", data)    
        const { dispatch } = this.props;
        dispatch(doctorActions.getDoctorsBySpecialization(data));
    }

    videoApi = (type) => {
      this.setState({categroyKey: type})
      var videoOption;
      if(this.state.categroyKey=='doctor'){
        videoOption=0;
      }else{
        videoOption=1;
      }
      this.searchFilter()
    }

    searchFilter = async () => {
      setTimeout(async() => {
         await this.apiCall();
      }, 300);
    }

    stateSet = (state_id) => {
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

    async citySelect (city_id) {
      if(city_id){
        this.setState({city_id: city_id})
        await this.searchFilter();
      }
    }

    onSlidingComplete = (distance) => {
      // var videoOption;
      // if(this.state.categroyKey=='doctor'){
      //   videoOption=0;
      // }else{
      //   videoOption=1;
      // }
      // let data = {
      //             category_type: 1,
      //             km: distance,
      //             city_id: this.state.city_id,
      //             clinic_name: this.state.clinic_name,
      //             name: this.state.name,
      //             lat: this.state.lat,
      //             lng: this.state.lng,
      //             spec_id: this.state.specialization_key,
      //             is_video:videoOption
      //           }
      // // console.log("city_id", data)                
      // const { dispatch } = this.props;
      // dispatch(doctorActions.getDoctorsBySpecialization(data));
    }
    
    render() {
        //  No Connection. Please check your network
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.distance * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>{this.state.specialization}</Title></>}
                rightComponent={<>
                  </>}
              />
        
            
              <View style={styles.containerView}>
                
                <View style={styles.searchHead}>

                  <View style={{flexDirection: 'row', width: "100%" , margin: 5}}>
                    <TextInput 
                        placeholder={translations['search_by_name']}
                        style={styles.textInput}
                        autoCapitalize="none"
                        name="name"
                        onChangeText={(name) => this.setState({name: name})}
                        onEndEditing={() => this.searchFilter()}
                    />
                    <View style={{flexDirection: 'row', width: "35%",  marginHorizontal: 5, backgroundColor: '#ffffff', borderRadius: 5}}>
                      <TouchableOpacity onPress={() => this.videoApi("doctor")} 
                          style={{padding:5, border: 1, backgroundColor: this.state.categroyKey=='doctor' ? '#fa9225': '#ffffff', width:"55%", borderRadius: 5}}>
                        <Text style={{marginTop: 5, fontSize:12, fontWeight: this.state.categroyKey=='doctor' ? 'bold' : 'none'}}>At Clinic</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.videoApi("video")}
                          style={{padding:5, border: 1, backgroundColor: this.state.categroyKey=='video' ? '#fa9225': '#ffffff', width:"45%", borderRadius: 5}}>
                        <Text style={{marginTop: 5, fontSize:12, fontWeight: this.state.categroyKey=='video' ? 'bold' : 'none'}}>Online</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 5 }}>
                      <TouchableOpacity onPress={() => this.setState({showState: !this.state.showState})}>
                        <MaterialCommunityIcons color={'#ffffff'} size={30} backgroundColor="#04898c" name={!this.state.showState ? "filter-menu" : "filter-remove"}/> 
                      </TouchableOpacity>
                    </View>
                  </View>  
                  {!this.state.showState && 

                    <View style={{ flexDirection: 'row', width: "100%",  justifyContent:'space-between' }}>
                      <View style={{ width: "48%"}}>
                          <Picker
                            style={{ height: 32, width: "100%", color: '#fff',  fontWeight: 'bold', marginBottom:5 }}
                            itemTextStyle={{fontSize: 8}}
                            activeItemTextStyle={{fontSize: 10, fontWeight: 'bold', color: '#fff'}}
                            iosHeader="Select State"
                            placeholder="Select State"
                            selectedValue={this.state.state_id}
                            mode="dialog"
                            onValueChange={(state_id) => this.stateSet(state_id)}
                           >  
                            <Picker.Item label="Select State" value="" />
                            {this.state.stateArg.map((state) =>{
                              return (<Picker.Item label={state.label} value={state.value.toString()} />)
                              })
                            }
                          </Picker>
                      </View>    
                      <View style={{ width: "48%"}}>
                          <Picker
                              style={{ height: 32, width: "100%", color: '#fff', fontWeight: 'bold', marginBottom:5 }}
                              itemTextStyle={{fontSize: 8}}
                              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold', color: '#fff'}}
                              iosHeader="Select City"
                              placeholder="Select City"
                              selectedValue={this.state.city_id}
                              mode="dropdown"
                              onValueChange={(city_id) => this.citySelect(city_id)}
                             >
                                {this.props.cityList.map((cityArg) =>{
                                  return (<Picker.Item label={cityArg.label.toUpperCase()} value={cityArg.value.toString()} />)
                                  })
                                }
                          </Picker>
                      </View>
                    </View>
                  }

                </View>  

                <ScrollView style={styles.listOfAllCards}>
                  {this.props.loader && 
                      <SkeletonLoader />
                  }
                  <FlatList  
                      data={this.props.doctorList || []}
                      renderItem={({item}) =>
                      {
                        return(<Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                            <Card key={item.key} style={styles.cardListView} 
                              onPress={() => this.props.navigation.navigate("DoctorDetail", { 
                                  categroy: this.state.categroy, 
                                  categroyKey: this.state.categroyKey, 
                                  doctorDetail: item,
                                  video:1,
                                  spec_id:item.spec_id}
                              )}>
                              <Card.Content>
                                  <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between', width: "100%"}}>
                                      <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'space-between'}}>
                                          <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.display_pic) }} style={styles.profile_image} size={80} />
                                            {/*<View style={styles.rating_container}>
                                                  <Rating
                                                      type='custom'
                                                      fractions="{1}" 
                                                      startingValue={item.ratings || 5}
                                                      imageSize={17}
                                                      ratingBackgroundColor ='transparent'
                                                      count="{5}"
                                                      readonly
                                                      /> 
                                                </View>*/}
                                            
                                      </View>
                                      <View style={{width: "70%"}}>
                                          <Paragraph>Dr. {item.name} </Paragraph>
                                          <Paragraph>{item.expirience || 0} {translations['years']} {translations['experience']}</Paragraph>
                                          <Paragraph>{utilityHelper.EducationComma(item.educational_qualification)}</Paragraph>
                                          {item.clinic_list.length > 0 &&
                                            <React.Fragment>
                                              <Paragraph>Clinic: {item.clinic_list[0]?.clinic_name}</Paragraph>
                                              {/*<Paragraph style={{flexWrap:'wrap'}}>Address {item.clinic_list[0]?.clinic_address}</Paragraph>*/}
                                            </React.Fragment>
                                          }
                                      </View>                            
                                  </View>
                                  <View >
                                      <TouchableOpacity 
                                        onPress={() => this.props.navigation.navigate("DoctorDetail", { 
                                                      categroy: this.state.categroy, 
                                                      categroyKey: this.state.categroyKey, 
                                                      doctorDetail: item,
                                                      video:1,
                                                      spec_id:item.spec_id}
                                                  )}
                                        >
                                          <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                            <Text style={style.commonAppButtonText}>{translations['book_appointment']}</Text>
                                          </LinearGradient>
                                      </TouchableOpacity>
                                  </View> 
                              </Card.Content>
                            </Card>
                        </Animatable.View>)}
                      }
                      ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <Card.Content>
                                                  <Text> No Doctor Available </Text>
                                                </Card.Content>
                                            </Card>)} 
                  />  
                </ScrollView>
              </View> 
        </SafeAreaView>
      );
    }
}

FindDoctor.contextType = LocalizationContext; 

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

export default connect(mapStateToProps)(FindDoctor);



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#04898c'
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerTitleText:{
    color:'#ffffff',
    fontSize:14
  },
  containerView: {
    margin: 0,
    marginTop: 0
  },
  distanceLabel:{
    color:'#fff',
    fontWeight:'bold',
  },
  searchHead:{
    backgroundColor:'#273f61',
    padding: 10,
    margin: 10,
    borderRadius: 15
  },
  textInput: {
    height: 40,
    width: "50%",
    marginTop: 0,
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
    // paddingLeft:5,
    // paddingRight:5,
    paddingVertical:5,
    marginBottom: 10
  },
  cardListView: {
    borderWidth: 0,
    alignItems: 'flex-start',
    backgroundColor: '#fff',    
    borderColor:'#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 50,
      height: 5,
    },
    shadowOpacity: 5.50,
    shadowRadius: 10.84,
    elevation: 5,
    textAlign:'left',
    padding:5,
    marginTop:15,
    borderRadius: 15,
    marginHorizontal: 10,
    color:'#fff'
  },
  rating_container:{
    marginTop:10,
    marginRight:15
  },
  contentList:{
    flexDirection:'row'
  },
  appLogo:{
    width:80,
    height:80,
    borderWidth:1,
    borderRadius:60/2
  },
  fees_display_text:{
      fontSize:14,
      color:'#00B2B6'
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
    textAlign:'center',

  },
  commonAppButton: {
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
  commonAppButtonText:{
      color:'#fff',
      width:60,
      fontSize:12
  },
  profile_image:{
      width:80,
      height:80,
      marginRight:15,
      backgroundColor: '#d9e376'
  },
  containerCard1: {
      marginTop: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0
  }
});
