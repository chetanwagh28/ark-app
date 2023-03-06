import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Platform, TouchableOpacity ,SafeAreaView, Dimensions, ScrollView, Linking, Modal, ActivityIndicator, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, TextInput, Paragraph, RadioButton, Button } from 'react-native-paper';
import { Rating, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {profileActions, doctorActions, clinicActions, clinicSlotActions} from '../action';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, Card.Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import {LocalizationContext} from './Translations';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
import RazorpayCheckout from 'react-native-razorpay';
import { configConstants } from '../constant';
// import SvgUri from 'react-native-svg-uri';

var {width, height} = Dimensions.get('window')
class DoctorDetail extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
            appointment_type: 'cash',
            categroyKey: 'doctor',
            doctorDetail: '',
            video:0,
            appointment_date: new Date().toISOString().slice(0, 10),
            appointment_time: '',
            date: new Date(),
            currentDate: new Date().toJSON().slice(0,10),
            mode: 'datetime',
            show: false,
            text: '',
            doc_id: '',
            patient_id: '',
            clinic_id: '',
            ref_id: '',
            member_id: '',
            errors: {
              appointment_date: '',
              appointment_time: '',
              appointment_type: ''
            },
            submit: false,
            clinicData: '',
            days: [],
            user: '',
            members: [],
            modalVisible: false
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){
      
     
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log('----------', this.props.route.params)

        const { dispatch } = this.props;
        if(this.props.route.params?.type){
          let doc_id = this.props.route.params.id
          this.setState({
            doc_id: id
          })
          dispatch(doctorActions.getDoctorsDetail(doc_id));
          dispatch(clinicActions.getClinicList(doc_id));
        }else{
          this.setState({
            categroyKey: this.props.route.params.categroyKey,
            doctorDetail: this.props.route.params.doctorDetail,
            video:this.props.route.params.video,
            doc_id: this.props.route.params.doctorDetail.doc_id || this.props.route.params.doctorDetail.referred_to_id,
            ref_id: this.props.route.params.doctorDetail.ref_id || ''
          })
          
          let doc_id = this.props.route.params.doctorDetail.doc_id || this.props.route.params.doctorDetail.referred_to_id
          
          dispatch(doctorActions.getDoctorsDetail(doc_id));
          dispatch(clinicActions.getClinicList(doc_id));
        }

        
      });

      let userToken;
      let user;
          userToken = null;
          try {
            userToken = await AsyncStorage.getItem('userToken');
            this.setState({patient_id: jwtdecode(userToken).patient_id});
            user = jwtdecode(userToken)
            this.setState({user: user})
            let contact_no = user.contact_no
            const { dispatch } = this.props;
            dispatch(profileActions.getProfileByNumber(contact_no)).then(res=>{
              if(res.status === 200 && !Array.isArray(res.data)){
                  // // console.log("res",res)
                  this.setState({
                    members: res.data.linkedUser
                  })            
              }
            })
          } catch(e) {
            // console.log(e);
          }
    }
    setModalVisible = (visible) => {
      if(this.state.members.length > 0){
        this.setState({ modalVisible: visible });
      }else{
        this.bookAppointment()
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
          appointment_date: formattedDate
        });  
      }else{
        let formattedDate = date.getHours()+ ': '+date.getMinutes()
             
        this.setState({
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          appointment_time: formattedDate
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

    checkPaymentOption = (appointment_type) => {
        // // console.log("checkPaymentOption",appointment_type)
        this.setState({appointment_type: appointment_type})
        let {errors} = this.state
        errors.appointment_type = ""
        this.setState({errors})
    }

    checkEmpty = (dataToCheck) => {
      let stopApicall = false
      let {errors} = this.state
      for (var key in dataToCheck) {
        // // console.log("dataToCheck",key,dataToCheck[key])
          if(dataToCheck[key] === ''){
            stopApicall = true
            errors[key] = "Field can't be blank"
            this.setState({errors, submit: false})
          }
          else{
            errors[key] = ""
          }
          // console.log("dataToCheck",key,dataToCheck[key])
        }

      return stopApicall
    }

    bookAppointment = ()  => {
      this.setState({submit: true})
        if(this.state.ref_id){
          var data = {
                doc_id: this.state.doc_id,
                patient_id: this.state.patient_id,
                appointment_date: this.state.appointment_date,
                appointment_time: this.state.appointment_time,
                appointment_type: this.state.categroyKey==='video' ? "online" : this.state.appointment_type,
                clinic_id: this.state.clinic_id,
                member_id: this.state.member_id === 'primary' ? '' : this.state.member_id,
                ref_id: this.state.ref_id,
                appointment_method: this.state.categroyKey==='video' ? 1 : 0,

                paid: this.state.appointment_type === 'cash' ?  0 :  1 ,
                amount: this.state.clinicData && this.state.clinicData.clinic_fees,
               }  
        }else{
          var data = {
                doc_id: this.state.doc_id,
                patient_id: this.state.patient_id,
                appointment_date: this.state.appointment_date,
                appointment_time: this.state.appointment_time,
                clinic_id: this.state.clinic_id,
                member_id: this.state.member_id === 'primary' ? '' : this.state.member_id,
                appointment_type: this.state.categroyKey==='video' ? "online" : this.state.appointment_type,
                appointment_method: this.state.categroyKey==='video' ? 1 : 0,

                paid: this.state.appointment_type === 'cash' ?  0 : 1,
                amount: this.state.clinicData && this.state.clinicData.clinic_fees,
               }
        }
        // console.log("bookAppointment",data)
        // console.log("this.state", this.checkEmpty(data))
        let errorCheck = {
          appointment_date: this.state.appointment_date,
          appointment_time: this.state.appointment_time,
        }
      if(!this.checkEmpty(errorCheck)){
        if(this.state.categroyKey === 'video'){  
            this.payout(data, this.state.doctorDetail.video_charge)
        }else{
          if(this.state.appointment_type === 'online'){  
            this.payout(data, this.state.clinicData && this.state.clinicData.clinic_fees)
          }else{
            const { dispatch } = this.props;
            dispatch(doctorActions.bookDoctorAppointment(data));
          }
        }
      }else{
        Alert.alert("Error", "Select Appointment Date and Time", [
                            {text: 'Close'}
                        ]);
        this.setState({ modalVisible: false });
      }
      
    }

    payout = (param, amount) => {

      let data = {"amount": parseInt(amount)*100 ,"currency":"INR", "receipt":"su001", "payment_capture":"1"}
        const { dispatch } = this.props;
        dispatch(doctorActions.getAppointmentOrderId(data)).then(res => {
          if(res.status === 200){
                let response = res.data
                var options = {
                    description: 'AVARK pvt ltd',
                    image: 'https://avark.in/wp-content/uploads/2020/08/avark-logo.png',
                    currency: 'INR',
                    key: configConstants.PAYMENT_KEY, // Your api key
                    amount: response.amount,
                    name: 'AVARK',
                    order_id: response.id,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
                    prefill: {
                      email: this.state.user.email,
                      contact: this.state.user.contact_no,
                      name: this.state.user.name
                    },
                    theme: {color: '#00B2B6'}
                }
                RazorpayCheckout.open(options).then((data) => {
                  // handle success
                  let newParam = {...param, ...data}
                  const { dispatch } = this.props;
                  dispatch(doctorActions.verifyAppointmentOrder(newParam)).then(res => {
                      if(res.status === 200){
                        Alert.alert("Appointment Booked", "", [
                            {text: 'Close', onPress: () =>  this.props.navigation.navigate("Home")}
                        ]);
                        const { dispatch } = this.props;
                        dispatch(doctorActions.resetFirstState());
                      }
                  })
                }).catch((error) => {
                  // handle failure
                  Alert.alert("Cancel", "Payment has been cancelled", [
                            {text: 'Close'}
                        ]);
                });
          }else{
            Alert.alert("Server Down", "Try again after some time", [
                            {text: 'Close'}
                        ]);
          }        
        })
    }

    onSelectDate = (appointment_date) => {
        // // console.log('appointment_date',appointment_date)
        this.setState({appointment_date: appointment_date, appointment_time: ''})
        let {errors} = this.state
        errors.appointment_date = ""
        this.setState({errors})


        let data = {
                  clinic_id: this.state.clinic_id,
                  date: appointment_date
                }
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.getClinicSlotForAppointment(data));
    }

    onSelectSlot = (appointment_time) => {
      // // console.log('appointment_time',appointment_time)
        this.setState({appointment_time: appointment_time})
        let {errors} = this.state
        errors.appointment_time = ""
        this.setState({errors})
    }

    onSelectClinic = (clinic_id) => {
      this.setState({clinic_id: clinic_id})
      let data = {
                  clinic_id: clinic_id,
                  date: this.state.date
                }
      const { dispatch } = this.props;
      dispatch(clinicSlotActions.getClinicSlotDate(data));
      dispatch(clinicSlotActions.getClinicSlotForAppointment(data));

      this.props.clinicList.length > 0 && this.props.clinicList.map((row) => {
          // // console.log('row', row)
        if(row.id === clinic_id){
          this.setState({clinicData: row})
        }
      })

    }

    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.bookDApp){

          const { dispatch } = this.props;
          dispatch(doctorActions.resetFirstState());

          Alert.alert("Appointment Booked", "", [
              {text: 'Close', onPress: () =>  this.props.navigation.navigate("Home")}
          ]);
          // this.props.navigation.navigate("Summary", {
          //   doctorDetail: nextProps.doctorDetail
          // })

      }
      if(nextProps.dateSlot){
          this.setState({days: nextProps.clinicSlotDate})            
          
          const { dispatch } = this.props;
          dispatch(clinicSlotActions.resetClinicSlotState())
      }
    }

    format = (time) => {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'PM' : 'AM';
        
        min = (min+'').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour+'').length == 1 ? `0${hour}` : hour;

        return (`${hour}:${min} ${part}`)  
    }

    openGps = (lat, lng) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${this.state.clinicData.lat},${this.state.clinicData.lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
      }
    render() {
      
      const { show, date, mode, appointment_date, appointment_time, errors, days ,video} = this.state;
      const translations = this.context.translations;
      const { goBack } = this.props.navigation;
      const { doctorDetail } = this.props;


      let clinicSlotManage = []
      if(this.props.clinicSlotManage.length > 0){
        if(this.state.appointment_date === new Date().toISOString().slice(0, 10)){
          clinicSlotManage = this.props.clinicSlotManage.filter(r => {
            if(`${this.state.appointment_date} ${r.start}` > `${this.state.currentDate} ${new Date().toLocaleTimeString()}`){
              r.available = 1
            }else{
              r.available = 0
            }
            return r
          })
        }else{
          clinicSlotManage = this.props.clinicSlotManage
        }
      }
      
      // this.state.clinicData ? this.state.clinicData.clinic_number : doctorDetail[0].appointment_method;
      // console.log(this.props.doctorDetail)
      return (
        <SafeAreaView style={{flex: 1}}>
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
                      borderRadius: 30
                    }}
                  barStyle="light-content" // or directly

                // leftComponent={<><Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon></>}
                // centerComponent={<><Title style={styles.logoText}>{translations['doctor_details']}</Title></>}
                // rightComponent={<></>}
              >
              <View><Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon></View>
              <View>
                {doctorDetail.length > 0 ?
                  <View style={{flexDirection:'row', alignItems: 'center', width: '100%'}}>
                      <View style={{flexDirection:'column', alignItems: 'center', marginRight: 10, marginTop: 40 }} >
                        <Text style={{color:'#fff', fontWeight:'bold', fontSize: 20}}>Dr. {doctorDetail[0].name}  </Text>  
                        <Text style={{color:'#fff', fontWeight:'400', fontSize: 18, alignItems: 'center'}}>{utilityHelper.EducationComma(doctorDetail[0].educational_qualification)}</Text>
                        <Text style={{color:'#fff', fontSize: 16}}>{doctorDetail[0].en_spec}</Text>
                      </View>
                      <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(doctorDetail[0].display_pic) }} style={styles.profile_image} size={120} />
                  </View>
                  :
                  ""
                }
              </View>
            </Header>
            <ScrollView>
            {doctorDetail.length > 0 ?
              <>
                  <Card>
                    <Card.Content style={{width: "95%"}}>
                        <View>
                            {/*
                            <View style={{flexDirection:'row', width: "100%", padding:5, justifyContent : 'space-between'}}>
                              <View style={{
                                          padding: 5,  
                                          marginTop: 10,
                                          width: "20%",
                                          backgroundColor: '#ffcf5e',    
                                          borderColor:'#ffcf5e',
                                          shadowColor: '#ffcf5e',
                                          shadowOffset: {
                                            width: 2,
                                            height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 5.84,
                                          elevation: 5,
                                          borderRadius: 10,
                                          flexDirection:'row',
                                          justifyContent: 'center'
                                        }}>
                                <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>5.0 </Text>
                                <MaterialIcons color={'#ffffff'} size={20} name="star"/>
                              </View>
                              <View style={{
                                          padding: 5,  
                                          marginTop: 10,
                                          width: "30%",
                                          backgroundColor: '#ffcf5e',    
                                          borderColor:'#ffcf5e',
                                          shadowColor: '#ffcf5e',
                                          shadowOffset: {
                                            width: 2,
                                            height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 5.84,
                                          elevation: 5,
                                          borderRadius: 10,
                                          flexDirection:'row',
                                          justifyContent: 'center'
                                        }}>
                                <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>0 {translations['reviews']}</Text>
                              </View>

                              <View style={{
                                          padding: 5,  
                                          marginTop: 10,
                                          backgroundColor: '#ffcf5e',    
                                          borderColor:'#ffcf5e',
                                          shadowColor: '#ffcf5e',
                                          shadowOffset: {
                                            width: 2,
                                            height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 5.84,
                                          elevation: 5,
                                          borderRadius: 10,
                                          flexDirection:'row',
                                          justifyContent: 'center'
                                        }}>
                                <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>{doctorDetail[0].expirience}+ Yrs {translations['experience']}</Text>
                              </View>
                            </View>
                            */}
                            {doctorDetail[0].about && 
                              <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#273f61', fontWeight:'bold', fontSize: 16}}>About:</Text>
                                <Paragraph> {doctorDetail[0].about}</Paragraph>
                              </View>
                            }           
                        </View>
                    
                        <View style={{width: '100%', flexDirection: 'row'}}>
                          <View style={[style.dropdown,{width:"70%", borderRadius: 20}]}>
                           <Picker
                                style={{ height: 35, width: "100%" ,color:'#ffffff',backgroundColor: '#2E7475', borderRadius: "20%"}}
                                itemTextStyle={{fontSize: 16 ,color:'#2E7475'}}
                                activeItemTextStyle={{fontSize: 16, fontWeight: 'bold',color:'#2E7475'}}
                                iosHeader="Clinic List"
                                placeholder="Clinic List"
                                selectedValue={this.state.clinic_id}
                                mode="dropdown"
                                onValueChange={(clinic_id) => this.onSelectClinic(clinic_id)} >
                                <Picker.Item label="Select Clinic" value="0" />
                                {this.props.clinicList.length > 0 && this.props.clinicList.map((row) => { 
                                    return (<Picker.Item label={row.clinic_name} value={row.id}/>)
                                  })
                                }
                            </Picker>

                          </View>
                          <View>
                          {
                            this.state.categroyKey === "doctor" &&
                              (
                              <View style={{ flexDirection: 'row', marginTop:10 }}>

                                  <View style={{paddingLeft:10, paddingVertical: 10}}>
                                    <MaterialCommunityIcons name="phone" size={30} color={'#2E7475'} backgroundColor="#red"
                                      // onPress={() => Communications.phonecall(this.state.clinicData ? this.state.clinicData.clinic_number : doctorDetail[0].contact_no, true)} 
                                      />
                                  </View>

                                  <View style={{paddingLeft:10, paddingVertical: 10}}>
                                      <MaterialIcons color={'#2E7475'} size={30} 
                                        onPress={() => this.openGps("22.7533","75.8937")} backgroundColor="#red" name="location-pin"/>
                                  </View>                    
                                  
                              </View>
                              )
                            }
                          </View>
                        </View>
                        <View style={{marginTop:20}}>
                          <Paragraph style={{color:'#273f61', fontSize: 14}}>{this.state.clinicData && this.state.clinicData.clinic_address} </Paragraph>
                          <Paragraph style={{color:'#273f61', fontSize: 16}}>Consultation : Rs. {this.state.categroyKey !== 'video' ? this.state.clinicData && this.state.clinicData.clinic_fees : this.state.doctorDetail && this.state.doctorDetail.video_charge} </Paragraph>                            
                        </View>
                        
                    
                      <View style={{marginTop:20, flexDirection:'column', }}>
                        
                        <Text  style={{marginBottom:10,fontWeight:'bold', color: '#273f61', fontSize: 16}}>Select Date</Text>

                        <View style={{ flexDirection: 'row'}}>
                            <FlatList  
                                  data={days.length > 0 ? days.filter(r => r.active === 1) : []}  
                                  renderItem={({ item, index }) => {
                                      let select = false
                                      if(item.day === this.state.appointment_date){  
                                         select = true
                                      }  
                                      return(
                                        <TouchableOpacity onPress={() => this.onSelectDate(item.day)}>
                                          <LinearGradient colors={select ? ['#273f61', '#273f61'] : ['#7AB3B7', '#ffffff', '#7AB3B7']}  style={[styles.commonAppButton, styles.commonAppButtonRadio]}>
                                            <Text style={select ? styles.morningTimeSelectLabel : styles.morningTimeLabel}>{utilityHelper.DateFormat(item.day)}</Text>
                                          </LinearGradient>
                                        </TouchableOpacity>)
                                      
                                    }}
                                  ListEmptyComponent={(<Card>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center', color: '#273f61'}}>  No Date Slots Available.</Text>
                                                </Card.Content>
                                            </Card>)}
                        
                                  horizontal={true}
                              />  

                        </View>
                        <Text style={{color: 'red'}}>{this.state.errors.appointment_date}</Text>

                        <Text  style={{marginTop:10,marginBottom:10,fontWeight:'bold', color: '#273f61', fontSize: 16}}>Select Time</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                            <FlatList  
                                  data={clinicSlotManage}  
                                  renderItem={({ item, index }) => {
                                    let select = false
                                    if(item.start === this.state.appointment_time){  
                                       select = true
                                    }
                                      return(
                                      <TouchableOpacity onPress={() => item.available === 1 ? this.onSelectSlot(item.start) : ''}>
                                        <LinearGradient colors={item.available === 1 ? select ? ['#273f61', '#273f61'] : ['#7AB3B7', '#ffffff', '#7AB3B7'] : ['#757E90', '#757E90']}  style={[styles.commonAppButton, styles.commonAppButtonRadio]}>
                                          <Text style={item.available === 1 ? select ? styles.morningTimeSelectLabel : styles.morningTimeLabel : styles.notAvailableTimeLabel}>{this.format(item.start)}</Text>
                                        </LinearGradient>
                                      </TouchableOpacity> )
                                      
                                    }}
                                  ListEmptyComponent={(<Card>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center', color: '#273f61'}}>  No Time Slots Available.</Text>
                                                </Card.Content>
                                            </Card>)}
                                  horizontal={true}
                              />

                        </View>

                        <Text style={{color: 'red'}}>{this.state.errors.appointment_time}</Text>  
                      </View>
                      

                  

                  {this.state.categroyKey === "doctor" &&  
                    <>
                     <Text  style={{marginTop:10,marginBottom:10,fontWeight:'bold', color: '#273f61', fontSize: 16}}>Select a Payment Method</Text>              
                     <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5 }}>

                        {/*<TouchableOpacity onPress={() => this.checkPaymentOption('online')}>
                          <LinearGradient colors={this.state.appointment_type === 'online' ? ['#273f61', '#273f61'] : ['#7AB3B7', '#ffffff', '#7AB3B7']}  style={[style.commonAppButton, styles.commonAppButtonRadio]}>
                            <Text style={this.state.appointment_type === 'online' ? styles.commonAppButtonSelectText  : styles.commonAppButtonSelectTextNot}>{translations['pay_now']} (Online)</Text>
                            
                          </LinearGradient>
                        </TouchableOpacity>*/} 
                        <TouchableOpacity onPress={() => this.checkPaymentOption('cash')}>
                          <LinearGradient colors={this.state.appointment_type === 'cash' ? ['#273f61', '#273f61'] : ['#7AB3B7', '#ffffff', '#7AB3B7']}  style={[style.commonAppButton, styles.commonAppButtonRadio]}>
                            <Text style={this.state.appointment_type === 'cash' ? styles.commonAppButtonSelectText  : styles.commonAppButtonSelectTextNot}>{"Pay at Clinic ("+translations['cash']+")"}</Text>
                            
                          </LinearGradient>
                        </TouchableOpacity> 
                        
                    </View>  
                    </>
                  }
                  <Text>{this.state.errors.appointment_type}</Text>
                  {this.state.categroyKey === "doctor" ?
                    (
                    <Button style={[style.commonAppButton, {backgroundColor: '#ffcf5e', alignItems: 'center', width: '100%', padding:5, justifyContent: 'center'}]} onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                      <Text style={[styles.commonAppButton, {color:"#000", fontSize: 16, fontWeight: 'bold'}]}>{translations['book_appointment']} </Text>
                      <ActivityIndicator size="small" color="#00B2B6" animating={this.state.submit}/>
                    </Button>
                    )
                    :
                    (
                      <Button style={styles.commonAppButton} onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                        <Text style={styles.commonAppButton}>{translations['pay_now']}</Text>
                      </Button>
                    )
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
                  </Card.Content>  
                </Card>
              </>
              :
              <Card>
                  <Card.Content  header style={style.containerCard1}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Present In... Try Again.</Text>
                  </Card.Content>
              </Card>
            }

            </ScrollView>            
              <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                      <View style={{ width:"85%", backgroundColor: "#ebebeb", padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                        <View style={{alignItems: 'center'}}>
                          <Text style={{ fontWeight:'bold', fontSize:14}}>Select Member</Text>
                        </View>

                        
                      </View>

                      <View style={{ width:"85%", backgroundColor: "#ebebeb", padding:10 }}>
                        
                          <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <RadioButton.Group onValueChange={(member_id) => this.setState({member_id})} value={this.state.member_id}>
                              <View style={{ flexDirection:'row', width:'100%'}}>
                                <RadioButton value="primary" />
                                <Text style={{margin:7}}>{this.state.user.name}</Text>
                              </View>
                              {this.state.members.length > 0 && this.state.members.map(row=>{
                                return(
                                  <View style={{ flexDirection:'row', width:'100%'}}>
                                    <RadioButton value={row.id} />
                                    <Text style={{margin:7}}>{row.member_name}</Text>
                                  </View>  
                                )
                              })}
                              
                            </RadioButton.Group>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <TouchableOpacity onPress={() => this.bookAppointment()}>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']} style={styles.commonAppButton}>
                              <Text style={[styles.commonAppButtonText]}>Book Appointment</Text>
                            </LinearGradient>
                          </TouchableOpacity>


                          <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                            <LinearGradient
                              colors={['#00B2B6', '#00B2B6']}
                              style={styles.commonAppButton}
                            >
                            <Text style={[styles.commonAppButtonText]}>Close</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>


                      </View>
                  </View>
                </Modal>
        {/*
          <Footer style={styles.footerContainer}>
            <FooterTab 
              style={styles.footerTabs} 
              >
              {this.state.categroyKey === "doctor" ?
                (
                <Button style={styles.footerTabsButton} onPress={() => this.bookAppointment()}>
                  <Text style={styles.commonAppButton}>{translations['book_appointment']} </Text>
                  <ActivityIndicator size="small" color="#fff" animating={this.state.submit}/>
                </Button>
                )
                :
                (
                <Button style={styles.footerTabsButton} onPress={() => this.props.navigation.navigate("Summary", {
                          doctorDetail: doctorDetail
                        })}>
                  <Text style={styles.commonAppButton}>{translations['pay_now']}</Text>
                </Button>
                )
              }
            </FooterTab>
           
          </Footer>
          */}
        </SafeAreaView>
      );
    }
}

DoctorDetail.contextType = LocalizationContext; 
function mapStateToProps(state) { 
  const { loader, doctorDetail, bookDApp } = state.doctorReducer;
  const { clinicList } = state.clinicReducer;
  const { clinicSlotManage, clinicSlotDate, sendingRequest, dateSlot } = state.clinicSlotReducer;
  // // console.log("clinicSlotManage",clinicSlotManage)
  return {
    doctorDetail,
    loader,
    clinicList,
    bookDApp,
    clinicSlotManage, 
    clinicSlotDate, 
    sendingRequest,
    dateSlot
  };    
}

export default connect(mapStateToProps)(DoctorDetail);

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#273f61',
    borderBottomColor: '#ffffff',
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
    backgroundColor: '#3ec3cf',
    width: width
  },
  containerCard1:{
    backgroundColor: '#3ec3cf',
  },
  containerView: {
    margin: 0,
    padding:5,
    backgroundColor: '#3ec3cf'
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
    margin: 5,
    padding:5,
    alignItems: 'flex-start',
    // height:190,
    height:'auto',
    backgroundColor: '#dcf7fa',    
    borderColor:'#dcf7fa',
    shadowColor: '#dcf7fa',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    textAlign:'left',
    borderRadius:5,
    color:'#fff'
  },
  doctorCardView: {
    minHeight:140,
    alignItems: 'flex-start',
    backgroundColor: '#00B2B6',    
    // borderColor:'#ffffff',
    shadowOpacity: 0.25,
    borderRadius:5,
    textAlign:'left',
    padding:5,
    color:'#fff'
  },
  rating_container:{
    marginTop:10,
    // marginRight:15
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
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 15,
    color:'#fff',
    marginHorizontal:6,
    marginVertical:6
  },
  commonAppButtonRadio: {
    borderWidth: 0,
    padding:20
  },
  commonAppButtonText:{
    color:'#ffffff',
    fontSize:16,
    padding:10    
  },
  commonAppButtonSelectTextNot:{
    color:'#091023',
    fontSize:14,
    padding:10
  },
  commonAppButtonSelectText:{
    color:'#fff',
    fontSize:16,
    padding:10   
  },
  customCard:{
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    // alignItems: 'center',
    // justifyContent:'center',
    height:'auto',
    backgroundColor: '#e8b368',    
    borderColor:'#e8b368',
    shadowColor: '#e8b368',
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
  },
  titleView: {
    fontSize:14,
    width: 80,
    height:30,
    backgroundColor:'#00CBCC',
    color:'#fff',
    marginRight:10,
    textAlign:'center',
    lineHeight:30
  },
  appointmentDateLabel:{
    width: 100,
    height:30,
    backgroundColor:'#ffffff',
    marginHorizontal:8,
    marginVertical: 20,
    borderRadius:5,
    // borderWidth: 1
  },
  appointmentTimeLabel:{
    width: 80,
    height:30,
    backgroundColor:'#ffffff',
    marginHorizontal:5,
    marginVertical: 15,
    borderRadius:5,
    alignItems: 'center',
    // borderWidth: 1
  },
  appointmentSelectDate:{
    fontSize:14,
    fontWeight: 'bold',
    borderColor:'#fff',
    color:'#000',
    textAlign:'center',
    lineHeight:30,
  },
  appointmentSelectDateLabel:{
    fontSize:14,
    fontWeight: 'bold',
    borderColor:'#ffcf5e',
    color:'#ffcf5e',
    textAlign:'center',
    lineHeight:28,
    borderRadius:5,
    borderWidth: 2
  },
  morningTimeLabel:{
    fontSize:14,
    borderColor:'#ffffff',
    color:'#091023',
    textAlign:'center',
    // borderRadius:5,
    borderWidth: 0,
    lineHeight:28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAvailableTimeLabel:{
    fontSize:14,
    borderColor:'#00B2B6',
    color:'#ffffff',
    textAlign:'center',
    // borderRadius:15,
    borderWidth: 0,
    lineHeight:28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  morningTimeSelectLabel:{
    fontSize:14,
    fontWeight: 'bold',
    borderColor:'#ffcf5e',
    color:'#ffffff',
    textAlign:'center',
    // borderRadius:5,
    borderWidth: 0,
    lineHeight:28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashButton:{
    color: '#ffffff'
  },
  footerContainer:{
    borderRadius: 100
  },
  footerTabs:{
    backgroundColor:'#ffffff',
    borderWidth: 1,
    borderRadius:200
  },
  footerTabsButton:{
    flexDirection: 'row',
    backgroundColor:'#00B2B6',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1,      
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 1,      
  },
  centeredView: {
    marginTop:"50%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
       
  },
  modalView: {
    margin: 5,
    backgroundColor: "#ffffff",
    // borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '85%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
