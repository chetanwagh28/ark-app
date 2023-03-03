import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,ScrollView,SafeAreaView,StatusBar, Alert } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import {doctorActions} from '../action';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';



var {width, height} = Dimensions.get('screen')
width = width

class MyAppointment extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            appointment_id: '',
            showAlert: false
        }
        //console.disableYellowBox = true;
        this.cancelApi = this.cancelApi.bind(this)
        
    }



    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        const { dispatch } = this.props;
        dispatch(doctorActions.myDoctorAppointment());
      });
    }

    cancelApi = () =>{
      // // console.log("cancelled-->>",appointment_id)
      const { dispatch } = this.props;
      dispatch(doctorActions.cancleMyDoctorAppointment(this.state.appointment_id));
      this.hideAlert();
    }

    showAlert = (appointment_id) => {
      this.setState({
        showAlert: true,
        appointment_id: appointment_id
      });
    };
   
    hideAlert = () => {
      this.setState({
        showAlert: false,
        appointment_id: ''
      });
    };

    UNSAFE_componentWillReceiveProps(nextProps){    
        if(nextProps.cancelMessage){
            setTimeout(function(){
              Alert.alert('Appointment Cancelled  Successfully', '', [
                  {text: 'Close'}
              ]);  
              this.hideAlert();
              const { dispatch } = this.props;
              dispatch(doctorActions.resetFirstState())
              dispatch(doctorActions.myDoctorAppointment());
            }.bind(this),1500);
        }

        if(nextProps.serverDown){
            setTimeout(function(){
              Alert.alert('Server Down', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(doctorActions.resetFirstState())
            }.bind(this),1500); 
        }
     
    }


    render() {
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>

            <ScrollView style={styles.containerView}>
              <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{translations['my_appointments']}</Title></>}
                rightComponent={<>
                  </>}
              />
                
                <View style={styles.containerView}>
                  <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Cancel Appointment"
                    message="Are you sure?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes, Cancel it"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                      this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                      this.cancelApi();
                    }}
                  />
                    <View style={styles.searchHead}>
                      <View style={{ width: "100%"}}>
                        <TextInput 
                            placeholder={translations['search_by_name']}
                            style={styles.textInput}
                            autoCapitalize="none"
                            name="search"
                            onChangeText={(search) => setState(search)}
                        />
                      </View>  

                    </View>  


                    <View style={styles.listOfAllCards}>
                      {this.props.loader && 
                          <SkeletonLoader />
                      }
                      
                      <FlatList  
                          data={this.props.myAppoinementList.data}  
                          numColumns = {1}
                          columnWrapperStyle={styles.cardRow}
                          renderItem={({item}) =>  {
                            let colorsCode = '#000080'
                            if(item.status === 'cancelled'){
                              colorsCode = '#FF3333'
                            }else if(item.status === 'completed'){
                              colorsCode = '#008000'
                            }else if(item.status === 'booked'){
                              colorsCode = '#F7A000'
                            }else{
                              colorsCode = '#000080'
                            }
                            // // console.log("item", item)
                            return(
                              <Animatable.View>
                                <Card key={item.key} style={styles.cardListView} onPress={() => this.props.navigation.navigate("DoctorDetail", { 
                                                                                      categroy: "doctor", 
                                                                                      categroyKey: "doctor", 
                                                                                      doctorDetail: item,
                                                                                      video:1,
                                                                                      spec_id:item.spec_id}
                                                                                  )}>
                                  <Card.Content>
                                     
                                      <View style={{flexDirection:'row', width: '100%' , alignItems:'center', justifyContent : 'flex-start'}}>
                                          <View style={{flexDirection:'column', width: '30%',  alignItems: 'center', justifyContent : 'center',marginRight:10}}>
                                                <View style={styles.profileImageContainer}>
                                                  <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.display_pic) }} style={styles.profile_image} size={80} />
                                                </View>
                                                <View style={styles.buttonContainer}>
                                            {item.status === 'booked'  &&
                                              <TouchableOpacity  onPress={() => this.showAlert(item.appointment_id)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                    <Text style={style.commonAppButtonText}>{translations['cancel']}</Text>
                                                </LinearGradient>
                                              </TouchableOpacity> 
                                            }
                                                                                    

                                          </View>  
                                                
                                          </View>
                                          
                                          <View style={{flexDirection:'column', width: '70%'}}>
                                              {item.member_name && <Paragraph style={styles.doctorName}>Member: {item.member_name} </Paragraph>}
                                              
                                              <Paragraph style={styles.doctorName}>Dr. {item.name} </Paragraph>
                                              <Paragraph>{translations['hospital_clinic']}: {item.clinic_name}</Paragraph>
                                              <Paragraph>{translations['Clinic_Address']}: {item.clinic_address}</Paragraph>
                                              <Paragraph>{translations['Date_Time']} :  {utilityHelper.DateFormat(item.appointment_date) + '  ' + item.appointment_time}</Paragraph>
                                            <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>  
                                              <Paragraph>{translations['status']} :  </Paragraph>
                                              <TouchableOpacity>
                                                      <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                        <Text style={style.commonAppButtonText}>{utilityHelper.capitalize(item.status === null ? 'pending' : item.status)}</Text>
                                                      </LinearGradient>
                                                  </TouchableOpacity>
                                            </View>                            
                                          </View>
                                      </View>

                                  
                                  </Card.Content>
                                </Card>
                              
                              </Animatable.View>
                            )}
                          }
                          ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}>  No Appointment Booked.</Text>
                                                </Card.Content>
                                            </Card>)}
                      />  
                    </View>

                </View> 
            </ScrollView>
        </SafeAreaView>
      );
    }
}

MyAppointment.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, myAppoinementList, cancelMessage, serverDown } = state.doctorReducer;
  // // console.log("myAppoinementList",loader)
  return {
    myAppoinementList,
    loader,
    cancelMessage,
    serverDown
  };    
}

export default connect(mapStateToProps)(MyAppointment);

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
    backgroundColor: '#00B2B6'
  },
  searchHead:{
    marginLeft: 0,
    marginRight: 0,
    backgroundColor:'#273f61',
    paddingLeft:10,
    paddingRight:10

  },
  textInput: {
    height: 40,
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
    // height:130,
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
    // marginLeft:5,
    // marginRight:5,
    // marginBottom:5,
    // marginTop:5,
    marginHorizontal:10,
    marginVertical: 5,
    width:width-20
  },
  rating_container:{
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  doctorName:{
    fontWeight:'bold'
  },
  contentList:{
    marginTop: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center'
  },

  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
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
  commonAppButton:{
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
    backgroundColor: '#008000',
    shadowColor: '#008000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  }
});
