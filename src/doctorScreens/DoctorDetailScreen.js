import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, TextInput, Paragraph, RadioButton } from 'react-native-paper';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import {doctorActions} from '../action';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
var {width, height} = Dimensions.get('window')
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import style from '../assets/style.js';


class DoctorDetail extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
            typePayment: '',
            categroy: 'Doctors',
            doctorDetail: '',
            app_date: '',
            app_time: '',
            date: new Date(),
            mode: 'datetime',
            show: false,
            text: '',
            doc_id: '',
            patient_id: ''
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){
      

      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log('----------')
        this.setState({
          categroy: this.props.route.params.categroy,
          doctorDetail: this.props.route.params.doctorDetail,
          doc_id: this.props.route.params.doctorDetail.doc_id
        })
        let doc_id = this.props.route.params.doctorDetail.doc_id || ''

        // // console.log("data",doc_id)
        const { dispatch } = this.props;
        dispatch(doctorActions.getDoctorsDetail(doc_id));
      });

      let userToken;
          userToken = null;
          try {
            userToken = await AsyncStorage.getItem('userToken');
            this.setState({patient_id: jwtdecode(userToken).patient_id});
          } catch(e) {
            // console.log(e);
          }
    }
    setDate = (event, date) => {
      // // console.log("date",date)
      date = date || this.state.date;
      
      if(this.state.mode === 'date'){
        
        let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
              
        this.setState({
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          app_date: formattedDate
        });  
      }else{
        let formattedDate = date.getHours()+ ': '+date.getMinutes()
             
        this.setState({
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          app_time: formattedDate
        }); 
      } 
    }

    show = mode => {
      this.setState({
        show: true,
        mode,
      });
    }

    datepicker = () => {
      this.show('date');
    }

    timepicker = () => {
      this.show('time');
    }

    checkPaymentOption = (typePayment) => {
        // // console.log("checkPaymentOption",typePayment)
        this.setState({typePayment: typePayment})
    }

    bookAppointment = () => {
      var data = {
                doc_id: this.props.doctorDetail[0].doc_id,
                patient_id: this.state.patient_id,
                appointment_date: this.state.app_date,
                appointment_time: this.state.app_time,
                appointment_type: this.state.typePayment
               }
              
      // // console.log('data-----',data)
      const { dispatch } = this.props;
      dispatch(doctorActions.bookDoctorAppointment(data));

      this.props.navigation.navigate("Summary", {
        doctorDetail: this.props.doctorDetail
      })
    }

    render() {
        
      const { show, date, mode, app_date, app_time } = this.state;
      const { goBack } = this.props.navigation;
      const { doctorDetail } = this.props;

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Doctor Detail</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right> 
          </Header>
          <Content style={style.container}>
            {doctorDetail.length > 0 ?
              <ScrollView>
                <View style={styles.containerView}>
       
                      <Card style={styles.cardListView}>
                        <Card.Content>
                            <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between'}}>
                                <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between'}}>
                                    <Avatar.Image  source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }} style={styles.profile_image} size={60} />
                                      <View style={styles.rating_container}>
                                        <Rating
                                            type='custom'
                                            fractions="{1}" 
                                            startingValue="{5}" 
                                            imageSize={17}
                                            ratingBackgroundColor ='transparent'
                                            count="{5}"
                                            readonly
                                            /> 
                                      </View>
                                      <View style={styles.review_container}>
                                      <Paragraph>0 Review</Paragraph>
                                      </View>

                                </View>
                                
                                <View>
                                    <Paragraph>{doctorDetail[0].name}  </Paragraph>
                                    <Paragraph>Specialist: {doctorDetail[0].en_spec}</Paragraph>
                                    <Paragraph>Experience: {doctorDetail[0].expirience}</Paragraph>
                                    <Paragraph>Clinic: {doctorDetail[0].hospital}</Paragraph>
                                    <Paragraph>Clinic Fees: Rs. {doctorDetail[0].visit_charge} </Paragraph>
                                </View>                            
                            </View>
                        </Card.Content>
                      </Card>


                    {
                    this.state.categroy === "Doctors" &&
                      (
                      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:10 }}>

                          <View style={styles.button}>
                              <TouchableOpacity onPress={() => Communications.phonecall(doctorDetail[0].contact_no, true)}>
                                  <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                    <Text style={styles.commonAppButtonText}>Call Now</Text>
                                  </LinearGradient>
                              </TouchableOpacity>
                          </View>

                          {/*<View style={styles.button}>
                              <TouchableOpacity>
                                  <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                    <Text style={styles.commonAppButtonText}>Clinic Photo</Text>
                                  </LinearGradient>
                              </TouchableOpacity>
                          </View>*/}

                          <View style={styles.button}>
                              <TouchableOpacity>
                                  <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                    <Text style={styles.commonAppButtonText}>Direction</Text>
                                  </LinearGradient>
                              </TouchableOpacity>
                          </View>                    
                          
                      </View>
                      )
                    }
                    
                    
                    {
                    this.state.categroy === "Doctors" &&
                      (
                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>    

                              <View style={styles.button}>
                                  <TouchableOpacity onPress={this.datepicker}>
                                      <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton} >
                                        <Text style={styles.commonAppButtonText}>Select Date</Text>
                                      </LinearGradient>
                                  </TouchableOpacity>
                              </View>  


                              <View style={styles.button}>
                                  <TouchableOpacity onPress={this.timepicker}>
                                      <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton} >
                                        <Text style={styles.commonAppButtonText}>Select Time</Text>
                                      </LinearGradient>
                                  </TouchableOpacity>
                              </View>  


                            { 
                            show && <DateTimePicker 
                                        minimumDate={new Date()}
                                        value={date}
                                        mode={mode}
                                        format="YYYY-MM-DD HH:mm"
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.setDate} />
                            }
                      </View>
                      )
                    }
                    {this.state.categroy === "Doctors" &&    
                      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:25}}>
                          <Text style={{fontSize: 14,fontWeight: 'bold'}}>Appointment Date: {app_date}</Text>
                      </View>
                    }
                    {this.state.categroy === "Doctors" &&  
                      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom:10}}>
                          <Text style={{fontSize: 14,fontWeight: 'bold'}}>Appointment Time: {app_time}</Text>
                      </View>   
                    }

                  {/*<View style={{flex: 1,marginTop:15}}>
                                      <TextInput
                                        style={styles.review_textarea}
                                        underlineColorAndroid="transparent"
                                        label="Write Stories/ Reviews "
                                        numberOfLines={8}
                                        multiline={true}
                                        Type= {'TextInputOutlined'}
                  
                                      />
                                  </View>*/}


                  {this.state.categroy === "Doctors" &&                
                     <View style={{ flexDirection: 'row', justifyContent: 'center',  }}>
                        <TouchableOpacity onPress={() => this.checkPaymentOption('cash')}>
                          <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                            <Text style={styles.commonAppButtonText}>Cash</Text>
                            {this.state.typePayment === "cash" &&  
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
                          </LinearGradient>
                        </TouchableOpacity> 

                        <TouchableOpacity onPress={() => this.checkPaymentOption('online')}>
                          <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                            <Text style={styles.commonAppButtonText}>Pay Now</Text>
                            {this.state.typePayment === "online" &&  
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
                          </LinearGradient>
                        </TouchableOpacity> 

                    </View>  
                  }
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:10 }}>
                    {this.state.categroy === "Doctors" ?
                      (
                        <TouchableOpacity onPress={this.bookAppointment}>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                              <Text style={styles.commonAppButtonText}>Book Appointment</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                      )
                      :
                      (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Summary", {
                          doctorDetail: doctorDetail
                        })}>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                              <Text style={styles.commonAppButtonText}>Pay Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View> 
              </ScrollView>
              :
              <Card style={styles.containerCard1}>
                  <CardItem  header>
                    <Text style={{textAlign: 'center'}}>  No Data Present In... Try Again.</Text>
                  </CardItem>
              </Card>
            }
          </Content>
        </Container>
      );
    }
}
function mapStateToProps(state) { 
  const { loader, doctorDetail } = state.doctorReducer;
  // // console.log("doctorDetail",doctorDetail)
  return {
    doctorDetail,
    loader
  };    
}

export default connect(mapStateToProps)(DoctorDetail);

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerView: {
    margin: 0,
    marginTop: 0,
  },
  searchHead:{

  },
  textInput: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 20,
    backgroundColor: '#ffffff'
  },
  categroy: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    alignItems: 'flex-start',
    height:170,
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
    width:60,
    height:60,
    borderWidth:1,
    borderRadius:60/2
  },
  titleView:{
    fontSize:14,
    width: 60
  },
  call_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  clinic_photo_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  direction_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  select_date_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  select_time_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  book_appointment_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  pay_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',    
  },
  review_textarea:{
    marginLeft:10,
    marginRight:10
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
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  }


});
