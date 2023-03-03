import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Image, Switch, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Button, Card, Title, Paragraph,List, DataTable } from 'react-native-paper';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import {clinicActions, clinicSlotActions } from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from "react-native-easy-grid";
import {utilityHelper} from '../helper/utilityHelper'
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../assets/style.js';


const Item = Picker.Item;
class TimeSlot extends Component {

    constructor(props){
        super(props);
        this.state={
            doc_id: '',
            clinic_id: '',
            day: 'Monday',
            from_time: '09:00:00',
            to_time: '12:00:00',
            id: '',
            clinicSlotData: [],
            showAlert: false,
            slot_id: '',
            time: ['00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00']
        }
        //console.disableYellowBox = true;
        
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log("data",data)
        this.setState({doc_id: this.props.route.params.doctor_id, clinicSlotData: [], clinic_id: ''})
        // let url = `/lab/getlabs?distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
        const { dispatch } = this.props;
        dispatch(clinicActions.getClinicList(this.props.route.params.doctor_id));
      });
    }

    getClinicSlot = (clinic_id) => {
        this.setState({clinic_id: clinic_id});
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.clinicSlot(clinic_id));
    }

    SlotInterval = (interval) => {
        const newState = Object.assign({}, this.state);
        newState.slot.slotInterval = interval;
        this.setState(newState);
    }
    SlotHandle = (key, value) => {
        this.setState({ [key] : value})
        
    }

    validSlotCheck = () => {
        if(this.state.clinicSlotData.length > 0){ 
          let check = this.state.clinicSlotData.map(row => {
            if(row.day === this.state.day){
              if(row.from_time === this.state.from_time || (row.from_time < this.state.from_time && row.to_time > this.state.from_time)){
                  // // console.log("error")
                  return 1
              }else
              if(row.to_time === this.state.to_time || (row.to_time > this.state.to_time && row.from_time > this.state.to_time) || (row.to_time > this.state.to_time && row.from_time < this.state.to_time)){
                  // // console.log("error==")
                  return 2
              }else{
                return 0  
              }
            }else{
              return 0
            }
          })
          if(check.indexOf(1) !== -1){
            // // console.log("Value 1 exists!",this.allEqual(check))
            Alert.alert('Check Clinic from time, its already in interval', '', [
                {text: 'Close'}
            ]);
            return false
          }else if(check.indexOf(2) !== -1){
            Alert.alert('Check Clinic to time, its already in interval', '', [
                {text: 'Close'}
            ]);
            // // console.log("Value 2 exists!",this.allEqual(check))
            return false
          }else if(check.indexOf(0) !== -1){
            // // console.log("Value 0 exists!",this.allEqual(check))
            // this.allEqual(check)
            if(this.allEqual(check)){
                return true
            }
          }
          // // console.log("check",check)
        }else{
          return true
        }
    }
    allEqual = (arr) => {
      return new Set(arr).size == 1;
    }

    
    saveSlot =() =>{
      if(this.state.clinic_id !== ''){
        // // console.log("this.validSlotCheck()",this.validSlotCheck())
        if(this.validSlotCheck() === true){
          let data = [{
                      clinic_id: this.state.clinic_id,
                      day: this.state.day,
                      from_time: this.state.from_time,
                      to_time: this.state.to_time,
                      id: ""
                    }]
          // // console.log('param',data)
          const { dispatch } = this.props;
          dispatch(clinicSlotActions.saveClinicSlotProfile(data));
        }
      }else{
        Alert.alert('Select Clinic', '', [
            {text: 'Close'}
        ]);
      }
    }

    showAlert = (id) => {
      this.setState({
        showAlert: true,
        slot_id: id
      });
    };
   
    hideAlert = () => {
      this.setState({
        showAlert: false,
        slot_id: ''
      });
    };

    deleteClinicSlot = () => {
      let data = {id: this.state.slot_id}
      // console.log(data)
      const { dispatch } = this.props;
      dispatch(clinicSlotActions.deleteClinicSlotProfile(data));

      // const educational_qualification = this.state.educational_qualification;
      // educational_qualification.splice(index, 1);
      // this.setState(educational_qualification);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // // console.log("nextProps",nextProps.deleteClinicSlot)
      if(nextProps.addClinicSlot){
            setTimeout(function(){
              Alert.alert('Successfully Save', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(clinicSlotActions.resetClinicSlotState())
              
              this.getClinicSlot(this.state.clinic_id);
            }.bind(this),1500);
      }
      if(nextProps.deleteClinicSlot){
            this.hideAlert();
            setTimeout(function(){
              Alert.alert('Successfully Deleted', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(clinicSlotActions.resetClinicSlotState())
              this.getClinicSlot(this.state.clinic_id);
            }.bind(this),1500);
      }
      if(nextProps.statusClinicSlot){
            setTimeout(function(){
              Alert.alert('Successfully Status changed', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(clinicSlotActions.resetClinicSlotState())
              this.getClinicSlot(this.state.clinic_id);
            }.bind(this),1500);
      }  
      if(nextProps.fetchSlot){  
        this.setState({clinicSlotData: nextProps.clinicSlotData})
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.resetClinicSlotState())
      }
    }

    toggleStatus = (value, row) => {
      let status = 0
      if(value){
        status = 1
      }
      let data = {
                  id: row.id,
                  status: status.toString()
                }
      // // console.log(data)
      const { dispatch } = this.props;
      dispatch(clinicSlotActions.clinicSlotStatusChange(data))
      
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
        
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
        const { slot, clinic_id, day, from_time, to_time, showAlert } = this.state
        // // console.log("categroy",slot,slot.monday.morning.start)
        
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => this.props.navigation.navigate('DoctorProfileScreen')}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Time Slot</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>   
          </Header>

          <Content style={style.container}>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="ANY BOOKED APPOINTMENTS WILL BE CANCEL"
              message="ARE YOU SURE WANT TO EDIT OR DELETE?"
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
                this.deleteClinicSlot();
              }}
            />
            <ScrollView>
              <View style={styles.containerView}>
                <View style={style.dropdown}>
                    
                   <Picker
                        style={{ height: 30, width: "100%" }}
                        itemTextStyle={{fontSize: 8}}
                        activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                        iosHeader="Clinic List"
                        placeholder="Clinic List"
                        selectedValue={clinic_id}
                        mode="dialog"
                        onValueChange={(clinic_id) => this.getClinicSlot(clinic_id)} >
                        <Picker.Item label="Select Clinic" value="0" />
                        {this.props.clinicList.length > 0 && this.props.clinicList.map((row) => { 
                            return (<Picker.Item label={row.clinic_name} value={row.id} />)
                          })
                        }
                    </Picker>
                </View>    

                <List.Section title="Time Slot">

                        <DataTable>
                          <DataTable.Row>
                            <DataTable.Title>Slot</DataTable.Title>
                            <DataTable.Cell>
                              <Picker
                                style={{ height: 30, width: 120, color: "#000" }}
                                itemTextStyle={{fontSize: 6, color: "#000"}}
                                activeItemTextStyle={{fontSize: 8, fontWeight: 'bold', color: "#000"}}
                                itemStyle={{ backgroundColor: "grey", color: "black" }}

                                iosHeader="Start Day"
                                placeholder="Start Day"
                                selectedValue={day}
                                mode="dropdown"
                                onValueChange={(day) => this.SlotHandle('day',day)} >

                                <Picker.Item label="Monday" value="Monday" />
                                <Picker.Item label="Tuesday" value="Tuesday" />
                                <Picker.Item label="Wednesday" value="Wednesday" />
                                <Picker.Item label="Thursday" value="Thursday" />
                                <Picker.Item label="Friday" value="Friday" />
                                <Picker.Item label="Saturday" value="Saturday" />
                                <Picker.Item label="Sunday" value="Sunday" />
                              </Picker>
                            </DataTable.Cell>
                          </DataTable.Row>

                          <DataTable.Header>
                            
                            <DataTable.Title>Start Time</DataTable.Title>
                            <DataTable.Title>End Time</DataTable.Title>
                          </DataTable.Header>

                          <DataTable.Row>
                            <DataTable.Cell>
                              <Picker
                                style={{ height: 30, width: 140, color: "#000" }}
                                itemTextStyle={{fontSize: 8}}
                                activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                iosHeader="From Time"
                                placeholder="From Time"
                                selectedValue={from_time}
                                mode="dropdown"
                                onValueChange={(from_time) => this.SlotHandle('from_time',from_time)} >
                                {this.state.time.map((row) => { 
                                    return (<Picker.Item label={this.format(row)} value={row} />)
                                  })
                                }
                              </Picker>
                            </DataTable.Cell>
                            <DataTable.Cell>
                              <Picker
                                style={{ height: 30, width: 140, color: "#000" }}
                                itemTextStyle={{fontSize: 8}}
                                activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                iosHeader="To Time"
                                placeholder="To Time"
                                selectedValue={to_time}
                                mode="dropdown"
                                onValueChange={(to_time) => this.SlotHandle('to_time',to_time)} >
                                {this.state.time.map((row) => { 
                                    return (<Picker.Item label={this.format(row)} value={row} />)
                                  })
                                }
                              </Picker>
                            </DataTable.Cell>

                          </DataTable.Row>
                        </DataTable>
                </List.Section>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={this.saveSlot}
                    >
                      <LinearGradient
                        colors={['#00B2B6', '#00B2B6']}
                        style={[style.commonAppButton, style.buttonD]}
                       >
                        <Text style={[style.commonAppButtonText]}>Save</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                  </View>
                </View>
                <View style={{marginTop:10, marginLeft:10, paddingVertical:10 }}>
                  {
                      this.state.clinicSlotData.length > 0 &&
                      <React.Fragment>
                        <Grid style={{
                                justifyContent: 'center',
                                alignItems:'flex-start',
                                marginVertical:10,
                              }}>
                              <Row> 
                                <Col style={styles.tableColumn1}>
                                   <Row ><Text style={styles.tableRow1}>Day </Text></Row>
                                </Col>
                                <Col style={styles.tableColumn2}>
                                   <Row ><Text style={styles.tableRow1}>From</Text></Row>
                                </Col>
                                <Col style={styles.tableColumn2}>
                                   <Row ><Text style={styles.tableRow1}>To</Text></Row>
                                </Col>
                                <Col style={styles.tableColumn4}>
                                  <Row ><Text style={styles.tableRow1}>Action</Text></Row>  
                                </Col>
                              </Row>
                           </Grid>

                      {this.state.clinicSlotData.map((row, index) => {

                          return (                            
                              <Grid style={{
                                justifyContent: 'center',
                                alignItems:'flex-start',
                                marginVertical:10,
                              }}>
                                <Row> 
                                  <Col style={styles.tableColumn1}>
                                     <Row ><Text style={styles.tableRow2}>{utilityHelper.capitalize(row.day)} </Text></Row>
                                  </Col>
                                  <Col style={styles.tableColumn2}>
                                     <Row ><Text style={styles.tableRow2}>{this.format(row.from_time)}</Text></Row>
                                  </Col>
                                  <Col style={styles.tableColumn2}>
                                     <Row ><Text style={styles.tableRow2}>{this.format(row.to_time)}</Text></Row>
                                  </Col>
                                  <Col style={styles.tableColumn4}>
                                    <Row style={styles.tableRow1}>
                                      <Switch
                                        trackColor={{ false: "#767577", true: "#ffffff" }}
                                        thumbColor={(row.schedulestatus === 1) ? "#008000" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange = {(value) => this.toggleStatus(value, row)}
                                        value={(row.schedulestatus === 1) ? true : false}
                                      />
                                      <Icon name="ios-trash" onPress={() => this.showAlert(row.id)} size={20} style={styles.trashButton}></Icon></Row>  
                                  </Col>
                                </Row>
                             </Grid>
                          )  
                        })}
                      </React.Fragment>
                  }   
              </View>
                 
            </ScrollView>
          </Content>
        </Container>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, clinicList } = state.clinicReducer;
  const { clinicSlotData, addClinicSlot, sendingRequest, fetchSlot, deleteClinicSlot, statusClinicSlot } = state.clinicSlotReducer;
  // // console.log("addClinicSlot",addClinicSlot)
  return {
    clinicList,
    clinicSlotData,
    addClinicSlot,
    loader,
    fetchSlot,
    sendingRequest,
    deleteClinicSlot,
    statusClinicSlot
  };    
}

export default connect(mapStateToProps)(TimeSlot);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
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
    width: "30%",
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
  trashButton:{
    color:'red',
  },
  tableRow1: {
    color: "#000",
    fontSize:16,
    fontWeight: 'bold'
  },
  tableRow2: {
    color: "#000",
    fontSize:13,
    fontWeight: 'bold'
  }
});
