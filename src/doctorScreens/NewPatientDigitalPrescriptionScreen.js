import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView, TouchableHighlight, Alert, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title,  Paragraph, RadioButton,List,Menu } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
import { Input as TextInput } from 'react-native-elements';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem, Button, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import { Col, Row, Grid } from "react-native-easy-grid";
import {doctorActions, patientActions, clinicActions, clinicSlotActions, profileActions} from '../action';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'
var {width, height} = Dimensions.get('window')



class NewPatientDigitalPrescription extends Component {

    constructor(props){
        super(props);
        this.state={
            name: "",
            contact_no: "",
            typeing_area: "",
            purpose: "",
            details: "",
            age: "",
            gender: "",
            is_first_time: "",
            is_followup: "",
            appointment_id: "",
            appointment_type: "",
            appointment_date: "",
            appointment_time: "",
            health_problem_id: "",
            paid: "",
            amount: "",
            email: "",
            clinic_id: "",
            doc_id: "",
            digitalPrescription: '',
            textInput : [],
            inputData : [],
            days: '3',
            medicine: '',
            whentotake: '0-0',
            mobileV: false,
            days: [],
            errors: {
              appointment_date: '',
              appointment_time: '',
              appointment_type: ''
            },
            modalVisible: false,
            members: [],
            member: {},
            member_id: ''
        }
        //console.disableYellowBox = true;

    }
    async componentDidMount(){
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log('----------')
        this.getProfile();
      });

      const { dispatch } = this.props;
      dispatch(patientActions.getHealthProblem());
    }

    getProfile = async() => {
      let doc_id = '';
      let userToken = null;
      try {
          userToken = await AsyncStorage.getItem('userToken');
          // // console.log(jwtdecode(userToken))
          doc_id = jwtdecode(userToken).doc_id
          // // console.log("===========doc_id",doc_id)

          this.setState({doctor_id: doc_id})
          const { dispatch } = this.props;
          dispatch(clinicActions.getClinicList(doc_id));
      } catch(e) {
          // console.log(e);
      }
    }

    //function to add TextInput dynamically
    addTextInput1 = (index) => {
      // // console.log(index)
      let textInput = this.state.textInput;
      let dataArray = this.state.inputData;

      dataArray.push({
                      index: index,
                      medicine: '',
                      days: '3',
                      whentotake: '0-0'
                    });
      this.setState({
        inputData: dataArray
      });

      // // console.log('fun----',this.state.inputData[index])

      textInput.push(
        <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems:'flex-start',
                  marginTop:10

                }}>
          <View>
            <TextInput 
              style={{ width:150}}
              placeholder='Medicine Name'
              onChangeText={(medicine) => this.addValues(medicine, 'medicine', index)}
            />
          </View>
          <View>
            <Text>{this.state.inputData[index].days}</Text>
            <Picker
              style={{ height: 40, width:80}}
              itemTextStyle={{fontSize: 8}}
              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
              iosHeader="Select Days"
              placeholder="Select Days"
              mode="dialog"
              selectedValue={this.state.inputData[index].days}
              onValueChange={(days) => this.addValues(days, 'days', index)}
            >
              <Picker.Item label="Days" value="Days" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />

            </Picker>
          </View>
          <View>
            <Text>{this.state.inputData[index].whentotake}</Text>
            <Picker
              style={{ height: 40,width:90 }}
              itemTextStyle={{fontSize: 8}}
              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
              iosHeader="Select when to take"
              placeholder="Select when to take"
              mode="dialog"
              selectedValue={this.state.inputData[index].whentotake}
              onValueChange={(whentotake) => this.addValues(whentotake, 'whentotake', index)}
            >
              <Picker.Item label="When To Take" value="When To Take" />
              <Picker.Item label="0--" value="0--" />
              <Picker.Item label="-0-" value="-0-" />
              <Picker.Item label="--0" value="--0" />

              <Picker.Item label="00-" value="00-" />
              <Picker.Item label="-00" value="-00" />
              <Picker.Item label="0-0" value="0-0" />

              <Picker.Item label="000" value="000" />
            </Picker>
          </View>
          <View>
            <Icon name="ios-trash" onPress={() => this.removeTextInput(index)} size={20} style={styles.trashButton}></Icon>

          </View>
        </View>
      );
      this.setState({ textInput });

    }

    //function to remove TextInput dynamically
    removeTextInput = (index) => {

      // const textInput = this.state.textInput;
      // textInput.splice(index, 1);
      // this.setState(textInput);

      const inputData = this.state.inputData;
      inputData.splice(index, 1);
      this.setState(inputData);
    }

    //function to add text from TextInputs into single array
    addValues1 = (text, field, index) => {
      // // console.log('===>>>>>>',text, field, index)
      let dataArray = this.state.inputData;
      if (dataArray.length !== 0){
        dataArray.forEach(element => {
          if (element.index === index ){
            element[field] = text;
          }
        });
      }
      this.setState({
        inputData: dataArray
      });
    }

    //function to add text from TextInputs into single array
    addValues = (text, field) => {
      this.setState({
        [field]: text
      });
    }

    addTextInput = () => {
      if(this.state.medicine !== ''){
        let dataArray = this.state.inputData;
        dataArray.push({
            days: this.state.days,
            medicine: this.state.medicine,
            whentotake: this.state.whentotake 
        })
        this.setState({inputData: dataArray, days: '3', medicine: '', whentotake: '0-0' });
        return true
      }else{
        Alert.alert("Enter Medicine name", '', [
            { text: 'OK'}
        ]);
        return false
      }
      
    }
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }
    //function to console the output
    submitNewPatient = () => {
      if(this.state.name !== '' && this.state.contact_no !== ''){
        // if(this.state.inputData.length > 0 || this.addTextInput()){

          let data = {
                    "name": this.state.name,
                    "contact_no": this.state.contact_no,
                    "age": this.state.age,
                    "health_problem_id": this.state.health_problem_id,
                    "clinic_id": this.state.clinic_id,
                    "doc_id": this.state.doctor_id,
                    "member_id": this.state.member_id,
                    // "typeing_area": this.state.typeing_area,
                    "purpose": this.state.purpose,
                    "gender": this.state.gender,
                    "is_first_time": this.state.is_first_time,
                    "is_followup": this.state.is_followup,
                    "appointment_type": this.state.appointment_type,
                    "appointment_date": this.state.appointment_date,
                    "appointment_time": this.state.appointment_time,
                    "paid": this.state.paid,
                    "amount": this.state.amount,
                    "email": this.state.email,
                    // "details": this.state.inputData
                  }

          // console.log("----------",data)
          const { dispatch } = this.props;
          dispatch(doctorActions.newPatientAppointment(data));
        // }
      }else{
        Alert.alert("Enter name and valid contact number", '', [
            { text: 'OK'}
        ]);
      }

    }
    phonenumber = (contact_no) => {
      this.setState({contact_no: contact_no})
      // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(contact_no)) {
      // if(contact_no.value.match(phoneno)) {
        this.setState({mobileV: false})

        const { dispatch } = this.props;
        dispatch(profileActions.getProfileByNumber(contact_no)).then(res=>{
          if(res.status === 200 && !Array.isArray(res.data)){
              // // console.log("res",res)
              this.setState({
                gender: res.data.gender,
                age: res.data.age,
                name: res.data.name,
                members: res.data.linkedUser
              })
            // this.setModalVisible(true)
          }
        })
        
      }
      else {
        this.setState({mobileV: true})
      }
    }
    selectMember = (res) =>{
        this.setState({
              gender: res.gender,
              age: res.age,
              name: res.name,
              member_id: res.id
            })
    }


    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.newPatient){
        setTimeout(function(){
              Alert.alert('Successfully Save', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(doctorActions.resetFirstState())

              Alert.alert("Appointment Booked", '', [
                  { text: 'OK', onPress: () =>  this.props.navigation.navigate("MyUpcomingAppointment")}
              ]);

              // this.props.navigation.navigate('DoctorProfileScreen', {clinic: true})
            }.bind(this),1500);
      }
        // // console.log('error--',nextProps)
      if(nextProps.errorMsg){
        Alert.alert(nextProps.errorMsg, '', [
              {text: 'Close'}
          ]);
          const { dispatch } = this.props;
            dispatch(doctorActions.resetFirstState())
      }
      if(nextProps.dateSlot){
          this.setState({days: nextProps.clinicSlotDate})            
          
          const { dispatch } = this.props;
          dispatch(clinicSlotActions.resetClinicSlotState())
      }
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
    format = (time) => {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'PM' : 'AM';
        
        min = (min+'').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour+'').length == 1 ? `0${hour}` : hour;

        return (`${hour}:${min} ${part}`)  
    }
    
    render() {
        
      // const { show, digitalPrescription } = this.state;
      const { show, digitalPrescription, appointment_date, appointment_time, days } = this.state;
      const { goBack } = this.props.navigation;
      // // console.log("digitalPrescription--->>",this.state)

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:3, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Book New Appointment</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right> 
          </Header>
          <Content style={style.container}>

                     <Card>
                      <Card.Content>
                          <View>
                            <TextInput 
                              bordered
                              // style={{borderWidth: 1, borderColor: 'grey', borderRadius: 5, color: '#ffffff'}}
                              placeholder='Contact Number'
                              keyboardType="phone-pad"
                              onChangeText={(contact_no) => this.phonenumber(contact_no)}
                            />
                            {this.state.mobileV ? 
                               <Text style={styles.textStar}>Enter valid mobile number</Text> : null
                              }
                          </View>

                            <TextInput 
                              bordered
                              // style={{borderWidth: 1, borderColor: 'grey', borderRadius: 5, color: '#ffffff'}}
                              placeholder='Patient Name'
                              value={this.state.name}
                              onChangeText={(name) => this.setState({name})}
                            />
                        
                          <View style={{ flex:1, flexDirection:'row', width:'100%'}}>
                            <View style={{width:'40%'}}>
                              <TextInput 
                                bordered
                                // style={{borderWidth: 1, borderColor: 'grey', borderRadius: 5, color: '#ffffff'}}
                                placeholder='Patient Age'
                                keyboardType="phone-pad"
                                value={this.state.age}
                                onChangeText={(age) => this.setState({age})}
                              />
                            </View>

                            <View style={{width:'60%', marginLeft: 5, color: '#ffffff'}}>
                                  <Picker
                                  style={{  width: "100%" , color: '#000'}}
                                  itemTextStyle={{fontSize: 8}}
                                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                  iosHeader="Select Gender"
                                  placeholder="Select Gender"
                                  selectedValue={this.state.gender}
                                  mode="dialog"
                                  onValueChange={(gender) => this.setState({gender})} >
                                    <Picker.Item label="Select Gender" value="0" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                    <Picker.Item label="Transgender" value="Transgender" />
                                  </Picker>
                            </View>
                          </View>
                          <View >
                            <Textarea 
                              rowSpan={3} 
                              bordered
                              style={{borderWidth: 1, borderColor: 'grey', borderRadius: 5, color: '#ffffff'}}
                              placeholder='Purpose'
                              onChangeText={(purpose) => this.setState({purpose})}
                            />
                          </View>
                          <View style={{ marginTop: 5, flex:1, flexDirection:'row', width:'100%'}}>
                            <View style={{ flex:1}}>
                              <Text style={{marginTop:7, marginRight: 10, color: '#000'}}>First Time Visit</Text>
                              <View style={{ flex:1, flexDirection:'row', width:'100%'}}>
                                <RadioButton.Group onValueChange={(is_first_time) => this.setState({is_first_time})} value={this.state.is_first_time}>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>Yes</Text>
                                    <RadioButton value="1" />
                                  </View>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>No</Text>
                                    <RadioButton value="0" />
                                  </View>
                                </RadioButton.Group>
                              </View>
                            </View>

                            <View style={{ flex:1}}>
                              <Text style={{marginTop:7, marginRight: 10, color: '#000'}}>Follow Up Visit?</Text>
                              <View style={{ flex:1, flexDirection:'row', width:'100%'}}>
                                <RadioButton.Group onValueChange={(is_followup) => this.setState({is_followup})} value={this.state.is_followup}>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>Yes</Text>
                                    <RadioButton value="1" />
                                  </View>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>No</Text>
                                    <RadioButton value="0" />
                                  </View>
                                </RadioButton.Group>
                              </View>
                            </View>
                          </View>

                          <View style={{ marginTop: 5, flex:1, flexDirection:'row', width:'100%'}}>
                            <View style={{ flex:1}}>
                              <Text style={{marginTop:7, marginRight: 10, color: '#000'}}>Appointment Type</Text>
                              <View style={{ flex:1, flexDirection:'row', width:'100%'}}>
                                <RadioButton.Group onValueChange={(appointment_type) => this.setState({appointment_type})} value={this.state.appointment_type}>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>Cash</Text>
                                    <RadioButton value="cash" />
                                  </View>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>Online</Text>
                                    <RadioButton value="online" />
                                  </View>
                                </RadioButton.Group>
                              </View>
                            </View>

                            <View style={{ flex:1}}>
                              <Text style={{marginTop:7, marginRight: 10, color: '#000'}}>Visit Charge</Text>
                              <View style={{ flex:1, flexDirection:'row', width:'100%'}}>
                                <RadioButton.Group onValueChange={(paid) => this.setState({paid})} value={this.state.paid}>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>Paid</Text>
                                    <RadioButton value="1" />
                                  </View>
                                  <View style={{ flex: 2, flexDirection:'row', width:'100%'}}>
                                    <Text style={{marginTop:7, color: '#000'}}>Unpaid</Text>
                                    <RadioButton value="0" />
                                  </View>
                                </RadioButton.Group>
                              </View>
                            </View>
                          </View>

                          <View style={{ flex:1, flexDirection:'row', width:'100%'}}>
                              <View style={{width:'50%', color: '#000'}}>
                                  <Picker
                                  style={{ width: "100%", marginRight: 1 , color: '#000'}}
                                  itemTextStyle={{fontSize: 8}}
                                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                  iosHeader="Select Health Problem"
                                  placeholder="Select Health Problem"
                                  selectedValue={this.state.health_problem_id}
                                  mode="dialog"
                                  onValueChange={(health_problem_id) => this.setState({health_problem_id})} >
                                    <Picker.Item label="Select Health Problem" value="0" />
                                    {this.props.healthProblem.length > 0 && this.props.healthProblem.map((row) => { 
                                      return (<Picker.Item label={row.health_problem_title} value={row.health_problem_id} />)
                                      })
                                    }
                                  </Picker>
                              </View>

                              <View style={{marginLeft: 1, width:'50%', color: '#000'}}>
                                  <Picker
                                      style={{ width: "100%", color: '#000' }}
                                      itemTextStyle={{fontSize: 8}}
                                      activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                      iosHeader="Clinic List"
                                      placeholder="Clinic List"
                                      selectedValue={this.state.clinic_id}
                                      mode="dialog"
                                      onValueChange={(clinic_id) => this.onSelectClinic(clinic_id)} >
                                      <Picker.Item label="Select Clinic" value="0" />
                                      {this.props.clinicList.length > 0 && this.props.clinicList.map((row) => { 
                                          return (<Picker.Item label={row.clinic_name} value={row.id} />)
                                        })
                                      }
                                  </Picker>
                              </View>
                          </View>
                          <View>
                            <Text>{this.state.amount}</Text>
                          </View>
                          

                          {/*<View >
                            <Textarea 
                              rowSpan={3} 
                              bordered
                              placeholder='Typing Area'
                              onChangeText={(typeing_area) => this.setState({typeing_area})}
                            />
                          </View>
                          <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems:'flex-start',
                                        flex:1,
                                        marginTop: 10

                            }}>
                              <View>
                                <TextInput 
                                  style={{ width:150, marginLeft: "10%"}}
                                  placeholder='Medicine Name'
                                  value={this.state.medicine}
                                  onChangeText={(medicine) => this.addValues(medicine, 'medicine')}
                                />
                              </View>
                              <View>
                                <Picker
                                  style={{ height: 40, width:90}}
                                  itemTextStyle={{fontSize: 8}}
                                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                  iosHeader="Select Days"
                                  placeholder="Select Days"
                                  mode="dialog"
                                  selectedValue={this.state.days}
                                  onValueChange={(days) => this.addValues(days, 'days')}
                                >
                                  <Picker.Item label="Days" value="Days" />
                                  <Picker.Item label="1" value="1" />
                                  <Picker.Item label="2" value="2" />
                                  <Picker.Item label="3" value="3" />
                                  <Picker.Item label="4" value="4" />
                                  <Picker.Item label="5" value="5" />
                                  <Picker.Item label="6" value="6" />
                                  <Picker.Item label="7" value="7" />
                                  <Picker.Item label="10" value="10" />
                                  <Picker.Item label="15" value="15" />
                                  <Picker.Item label="20" value="20" />
                                  <Picker.Item label="30" value="30" />

                                </Picker>
                              </View>
                              <View>
                                <Picker
                                  style={{ height: 40,width:90 }}
                                  itemTextStyle={{fontSize: 8}}
                                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                  iosHeader="Select when to take"
                                  placeholder="Select when to take"
                                  mode="dialog"
                                  selectedValue={this.state.whentotake}
                                  onValueChange={(whentotake) => this.addValues(whentotake, 'whentotake')}
                                >
                                  <Picker.Item label="When To Take" value="When To Take" />
                                  <Picker.Item label="0--" value="0--" />
                                  <Picker.Item label="-0-" value="-0-" />
                                  <Picker.Item label="--0" value="--0" />

                                  <Picker.Item label="00-" value="00-" />
                                  <Picker.Item label="-00" value="-00" />
                                  <Picker.Item label="0-0" value="0-0" />

                                  <Picker.Item label="000" value="000" />
                                </Picker>
                              </View>
                              
                          </View>*/}
                          <View style={styles.customCard} >
                                
                                <Text  style={{textAlign:'center',marginBottom:10,marginHorizontal: 2, fontWeight:'bold', color: '#fff'}}>Select Date / Day</Text>

                                <View style={{ flexDirection: 'row'}}>
                                    <FlatList  
                                          data={days}  
                                          renderItem={({ item, index }) => {
                                              let select = false
                                              if(item.day === this.state.appointment_date){  
                                                 select = true
                                              }  
                                              return(
                                                <TouchableOpacity onPress={() => this.onSelectDate(item.day)}>
                                                  <LinearGradient colors={select ? ['#ffcf5e', '#ffcf5e'] : ['#ffffff', '#ffffff']}  style={[styles.commonAppButton, styles.commonAppButtonRadio]}>
                                                    <Text style={select ? styles.morningTimeSelectLabel : styles.morningTimeLabel}>{utilityHelper.DateFormat(item.day)}</Text>
                                                  </LinearGradient>
                                                </TouchableOpacity>)
                                              
                                            }}
                                
                                          horizontal={true}
                                      />  

                                </View>
                                

                                <Text  style={{textAlign:'center',marginTop:20,marginBottom:10,fontWeight:'bold', color: '#fff'}}>Available Time Slot</Text>

                                <View style={{ flexDirection: 'row', marginHorizontal: 2, alignItems: 'center', justifyContent:'space-between'}}>
                                    <FlatList  
                                          data={this.props.clinicSlotManage}  
                                          numColumns={3}
                                          renderItem={({ item, index }) => {
                                            let select = false
                                            if(item.start === this.state.appointment_time){  
                                               select = true
                                            }
                                              return(
                                              <TouchableOpacity onPress={() => item.available === 1 ? this.onSelectSlot(item.start) : ''}>
                                                <LinearGradient colors={item.available === 1 ? select ? ['#ffcf5e', '#ffcf5e'] : ['#ffffff', '#ffffff'] : ['#757E90', '#757E90']}  style={[styles.commonAppButton, styles.commonAppButtonRadio]}>
                                                  <Text style={item.available === 1 ? select ? styles.morningTimeSelectLabel : styles.morningTimeLabel : styles.notAvailableTimeLabel}>{this.format(item.start)}</Text>
                                                </LinearGradient>
                                              </TouchableOpacity> )
                                              
                                            }}
                                          ListEmptyComponent={(<Card >
                                                        <CardItem  header style={style.containerCard1}>
                                                          <Text style={{textAlign: 'center', color: '#fff'}}>  No Time Slots Available.</Text>
                                                        </CardItem>
                                                    </Card>)}
                                      />

                                </View>                               
                            </View>
                      </Card.Content>
                    </Card>


                {
                this.state.inputData.length > 0 && this.state.inputData.map((value, index) => {
                  return (

                    <Card style={styles.medicineListCard}>
                      <Card.Content>

                        <Grid style={{
                          justifyContent: 'center',
                          alignItems:'flex-start',
                        }}>
                          <Row> 
                            <Col style={styles.tableColumn1}>
                               <Row style={styles.tableRow1}><Text>{value.medicine} </Text></Row>
                            </Col>
                            <Col style={styles.tableColumn2}>
                               <Row style={styles.tableRow1}><Text>{value.days}</Text></Row>
                            </Col>
                            <Col style={styles.tableColumn3}>
                               <Row style={styles.tableRow1}><Text>{value.whentotake}</Text></Row>
                            </Col>
                            <Col style={styles.tableColumn4}>
                              <Row style={styles.tableRow1}><Icon name="ios-trash" onPress={() => this.removeTextInput(index)} size={20} style={styles.trashButton}></Icon></Row>  
                            </Col>
                          </Row>
                       </Grid>
                      </Card.Content>
                    </Card>


                  )  
                })}
              {/*
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.addTextInput(this.state.textInput.length)}>
                      <LinearGradient
                      colors={['#00B2B6', '#00B2B6']}
                      style={styles.commonAppButtonA}
                      >
                      <Text style={[styles.commonAppButtonText]}>Add</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                </View>*/}
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
                            <RadioButton.Group onValueChange={(member_id) => this.selectMember(member_id)} value={this.state.member}>
                              <View style={{ flexDirection:'row', width:'100%'}}>
                                <RadioButton value="" />
                                <Text style={{margin:7}}>{this.state.name}</Text>
                              </View>
                              {this.state.members.length > 0 && this.state.members.map(row=>{
                                return(
                                  <View style={{ flexDirection:'row', width:'100%'}}>
                                    <RadioButton value={row} />
                                    <Text style={{margin:7}}>{row.member_name}</Text>
                                  </View>  
                                )
                              })}
                              
                            </RadioButton.Group>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          {/*<TouchableOpacity onPress={() => this.bookAppointment()}>
                                                      <LinearGradient colors={['#00B2B6', '#00B2B6']} style={styles.commonAppButton}>
                                                        <Text style={[styles.commonAppButtonText]}>Book Appointment</Text>
                                                      </LinearGradient>
                                                    </TouchableOpacity>*/}


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
          </Content>
          <Footer>
            <FooterTab 
              style={styles.footerTabs} 
              >
                <Button style={styles.footerTabsButton} onPress={() => this.submitNewPatient()}>
                  <Text style={styles.commonAppButton}>Submit</Text>
                </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
}


function mapStateToProps(state) { 
  const { loader, errorMsg, newPatient } = state.doctorReducer;
  const { healthProblem } = state.patientReducer;
  const { clinicList } = state.clinicReducer;
  const { clinicSlotManage, clinicSlotDate, sendingRequest, dateSlot } = state.clinicSlotReducer;
  // // console.log("uploaded",uploaded)
  return {
    errorMsg,
    loader,
    newPatient,
    healthProblem,
    clinicList,
    clinicSlotManage, 
    clinicSlotDate, 
    sendingRequest,
    dateSlot
  };    
}

export default connect(mapStateToProps)(NewPatientDigitalPrescription);



const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1

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
    backgroundColor: '#00B2B6'
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
  medicineListCard:{
    borderWidth: 0,
    
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
  commonAppButtonA:{
    borderWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:5,
    marginVertical:5,
  },
  commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  },
  footerContainer:{
  },
  footerTabs:{
    backgroundColor:'#ffffff',
  },
  footerTabsButton:{
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
    height: "40%"
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
  },
  trashButton:{
    color:'red',
    // marginTop:20
  },
  footerTabs:{
    backgroundColor:'#ffffff',
  },
  footerTabsButton:{
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textStar: {
    color: 'red'
  },
  customCard:{
    borderWidth: 0,
    alignItems: 'center',
    justifyContent:'center',
    height:'auto',
    backgroundColor: '#00B2B6',    
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
    color:'#00B2B6',
    textAlign:'center',
    // borderRadius:8,
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
    // borderRadius:8,
    borderWidth: 0,
    lineHeight:28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});