import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {patientActions} from '../action';
import { Rating, Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {LocalizationContext} from './Translations';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../assets/style.js';
var {width, height} = Dimensions.get('screen')
width = width


class ReferedByDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            status: '',
            getList: false,
            doctorReferralP: [],
            filterList: [],
            showAlert: false,
            doctorDetail: ''
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          const { dispatch } = this.props;
          dispatch(patientActions.getReferralsDoctorList());
      });
    }

    filter = (text) => {
      if(text === 'all'){
        this.setState({
          doctorReferralP: this.state.filterList,
          status: text,
        });
        return false
      }
      //passing the inserted text in textinput
      const newData = this.state.filterList.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.status ? item.status.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        doctorReferralP: newData,
        status: text,
      });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      // // console.log(nextProps.doctorReferralP) 
      if (nextProps.doctorReferralP !== prevState.doctorReferralP && !prevState.getList) {
        if(nextProps.doctorReferralP.length > 0){
          return ({ 
            doctorReferralP: nextProps.doctorReferralP,
            filterList: nextProps.doctorReferralP,
            getList: true
          })
        } 
      }
      return null
    }

    videoSet = () =>{
      this.props.navigation.navigate("DoctorDetail", { categroyKey: 'video', doctorDetail: this.state.doctorDetail})
      this.hideAlert();
    }

    showAlert = (item) => {
      this.setState({
        showAlert: true,
        doctorDetail: item
      });
    };
    
    hideAlert = () => {
      this.setState({
        showAlert: false,
        doctorDetail: ''
      });
    };

    visitSet = () => {
      this.props.navigation.navigate("DoctorDetail", { categroyKey: 'doctor', doctorDetail: this.state.doctorDetail})
      this.hideAlert();
    };

    render() {
      const translations = this.context.translations;
        const { goBack } = this.props.navigation;
        // // console.log("this.state.showAlert",this.state.showAlert)
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{translations['You_are_Referred']}</Title></>}
                rightComponent={<>
                  </>}
              />
            <ScrollView >
              <AwesomeAlert
                show={this.state.showAlert}
                showProgress={false}
                title="Select Appointment mode"
                // message="Are you sure?"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                // showConfirmButton={true}
                cancelText="Close"
                cancelButtonColor="#00B2B6"
                // confirmButtonColor="#00B2B6"
                // confirmText="Video"
                titleStyle={{fontSize: 16, marginBottom: 20}}
                cancelButtonStyle={{fontSize: 12}}
                onCancelPressed={() => {
                  this.hideAlert();
                }}

                customView={<View style={styles.buttonContainerPopup}>
                                <TouchableOpacity onPress={() => this.visitSet()}>
                                    <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                      <Text style={style.commonAppButtonText}>In Clinic</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.videoSet()}>
                                    <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                      <Text style={style.commonAppButtonText}>Video</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>}
              />
                  <View>
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                    <View style={style.dropdown}>
                     <Picker
                          style={{ height: 30, width: "100%", color:'grey', fontWeight: 'bold' }}
                          itemTextStyle={{fontSize: 8}}
                          activeItemTextStyle={{fontSize: 8, fontWeight: 'bold'}}
                          iosHeader="Choose Status"
                          placeholder="Choose Status"
                          selectedValue={this.state.status}
                          mode="dropdown"
                          themeVariant="dark"
                          onValueChange={(status) => this.filter(status)} >
                            <Picker.Item label="All" value="all" />
                            <Picker.Item label="Booked" value="booked" />
                            <Picker.Item label="Cancelled" value="cancelled" />
                            <Picker.Item label="Completed" value="completed" />
                          
                      </Picker>
                  </View>
                    <FlatList  
                      data={this.state.doctorReferralP}  
                      numColumns = {1}
                      renderItem={({item}) =>  {
                        // // console.log(item)
                        let colorsCode = '#000080'
                        if(item.status === 'cancelled'){
                          colorsCode = '#FF3333'
                        }else if(item.status === 'completed'){
                          colorsCode = '#00FFFF'
                        }else if(item.status === 'booked'){
                          colorsCode = '#F7A000'
                        }else{
                          colorsCode = '#000080'
                        }
                        // // console.log("colorsCode",item)
                        return (
                          <Animatable.View>
                              <Card key={item.key} style={styles.cardListView}>
                                <Card.Content>
                                    <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                        <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                              <View style={styles.profileImageContainer}>
                                                  <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.refer_display_pic) }} style={styles.profile_image} size={80} />
                                              </View>
                                              {/*
                                              <View style={styles.rating_container}>
                                                <Rating
                                                    type='custom'
                                                    fractions="{1}" 
                                                    startingValue="{5}" 
                                                    imageSize={17}
                                                    ratingBackgroundColor ='transparent'
                                                    ratingTextColor='#00B2B6'
                                                    count="{5}"
                                                    readonly
                                                    /> 
                                              </View>*/}
                                        </View>
                                        
                                        <View>
                                            <Paragraph>Dr. {item.refer_doc_name} </Paragraph>
                                            <Paragraph>{new Date(item.created_at).toDateString()} </Paragraph>
                                            <Paragraph>{item.expirience || 0} {translations['years']} {translations['experience']}</Paragraph>
                                            <Paragraph>Qualification: {utilityHelper.EducationComma(item.educational_qualification)}</Paragraph>
                                            <Paragraph>{translations['speciality']} : {item.en_spec} </Paragraph>
                                            <Paragraph>{item.about}</Paragraph>
                                        </View>                            
                                    </View>

                                    <View style={styles.contentList}>
                                      <View style={styles.buttonContainer}>
                                          {item.status === null ?
                                            <TouchableOpacity onPress={() => this.showAlert(item)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                  <Text style={style.commonAppButtonText}>{translations['book_appointment']}</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity>
                                                <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                  <Text style={style.commonAppButtonText}>{utilityHelper.capitalize(item.status)}</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                          }
                                        </View>  
                                    </View>
                                
                                </Card.Content>
                              </Card>
                          </Animatable.View>
                        )
                      }
                    }

                    ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <Card.Content >
                                                  <Text style={{textAlign: 'center'}}>  No Data Found.</Text>
                                                </Card.Content>
                                            </Card>)}
                    /> 
                  </View>
                
          </ScrollView>
        </SafeAreaView>
      );
    }
}

ReferedByDoctor.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, doctorReferralP } = state.patientReducer;
  // // console.log("doctorReferralP",doctorReferralP)
  return {
    doctorReferralP,
    loader
  };    
}

export default connect(mapStateToProps)(ReferedByDoctor);

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerLogoContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'space-between'
  },
  PageTitle:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  searchHead: {
    marginLeft: 10,
    marginRight: 10,
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
    width: "49%",
    marginTop: 10,
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
    width: "49%",
    marginTop: 10,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardListView: {
    borderWidth: 0,
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
    borderRadius: 15,
    marginHorizontal:10,
    marginVertical: 5,
    width:width-20
  },
  rating_container:{
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentList:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonContainerPopup:{
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center',

  },

  cancel_button:{
      marginRight: 5,
      backgroundColor:'#00B2B6',
  },
  
  call_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  
  direction_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },

  appointment_date_button:{
    backgroundColor:'#ebebeb',
    color:'#00B2B6',
    marginRight:5,
    width:'auto',
    marginBottom:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    fontWeight:'bold',
    borderRadius:5
  },
  appointment_time_button:{
    backgroundColor:'#ebebeb',
    color:'#00B2B6',
    width:'auto',
    marginBottom:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    fontWeight:'bold',
    borderRadius:5
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
  commonAppButtonText:{
    color:'#fff',
    fontSize:12  
  },
  pending:{
    height: 35,
    backgroundColor: '#000080',
    shadowColor: '#000080',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  booked:{
    height: 35,
    backgroundColor: '#F7A000',
    shadowColor: '#F7A000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  cancelled:{
    height: 35,
    backgroundColor: '#FF3333',
    shadowColor: '#FF3333',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  completed:{
    height: 35,
    backgroundColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  }
});
