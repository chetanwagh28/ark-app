import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator, Switch, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Card, Title, Paragraph,List } from 'react-native-paper';
import { Rating, Slider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {clinicActions, clinicSlotActions } from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtdecode from 'jwt-decode'
import { color } from 'react-native-reanimated';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'



class ManageCalendarSlot extends Component {

    constructor(props){
        super(props);
        this.state={
            doc_id: '',
            clinic_id: '',
            date: new Date().toJSON().slice(0,10),
            days: [],
            slots: [],
            clinicSlotManage: [],
            dateStatus: '',
            currentDate: [],
            selectDateData: ''
        }
        //console.disableYellowBox = true;
    }

    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log("data",data)
        this.getClinicList()
      });
    }

    getClinicList = async() => {
      let doc_id = '';
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            // // console.log(jwtdecode(userToken))
            doc_id = jwtdecode(userToken).doc_id
            // // console.log("===========doc_id",doc_id)
            this.setState({doc_id: doc_id})
            const { dispatch } = this.props;
            dispatch(clinicActions.getClinicList(doc_id));

        } catch(e) {
            // console.log(e);
        }
    }

    getClinicSlot = (clinic_id) => {
      console.log("=======================")
        this.setState({clinic_id: clinic_id});
        let data = {
                  clinic_id: clinic_id,
                  date: this.state.date
                }
        // // console.log("data",data)
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.getClinicSlotManage(data));
        dispatch(clinicSlotActions.getClinicSlotDate(data));
    }

    getClinicSlotbyDate = (row) => {
        this.setState({date: row.day, selectDateData: row});
        let data = {
                  clinic_id: this.state.clinic_id,
                  date: row.day
                }
        // // console.log("data",data)
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.getClinicSlotManage(data));
        dispatch(clinicSlotActions.getClinicSlotDate(data));
    }

    dateToggleStatus = (value) => {
      let status = 'inactive'
      let statusValue = 0
      if(value){
          status = 'active'
          statusValue = 1
      }
      let data = {
                clinic_id: this.state.clinic_id,
                status: status,
                inactive_date: this.state.date,
                doc_id: this.state.doc_id,
                slots: [] 
            }
      let changeStatus = {"active": statusValue, "day": this.state.date}      
      // // console.log('======>>> ', data)
      this.setState({dateStatus: value, selectDateData: changeStatus})
      const { dispatch } = this.props;
      dispatch(clinicSlotActions.slotTimeStatusChange(data));

    }

    onSelectSlot = (index, slot, active) => {
        let value = 0
        if(active === 1){
          value = 0
        }else{
          value = 1
        }
        let clinicSlotManage = Object.assign(this.state.clinicSlotManage); // Pull the entire clinicSlotManage object out. Using object.assign is a good idea for objects.
        clinicSlotManage[index].active = value; // update the clinicSlotManage object as needed
        this.setState({ clinicSlotManage });
        
        let {slots} = this.state

        if(slots.indexOf(slot) !== -1){
          var indexId = slots.indexOf(slot);//get  "car" index
          //remove car from the colors array
          slots.splice(indexId, 1); // colors = ["red","blue","green"]
          // // console.log("Value exists!")
        } else{
          slots.push(slot)
          // // console.log("Value does not exists!")
        }
        this.setState({slots})
    }

    slotStatusChange = (status) => {
        let data = {
                clinic_id: this.state.clinic_id,
                status: status,
                inactive_date: this.state.date,
                doc_id: this.state.doc_id,
                slots: this.state.slots 
            }
        const { dispatch } = this.props;
        dispatch(clinicSlotActions.slotTimeStatusChange(data));
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // console.log("nextProps",nextProps)
        if(nextProps.timeSlot){
            this.setState({clinicSlotManage: nextProps.clinicSlotManage})            
            const { dispatch } = this.props;
            dispatch(clinicSlotActions.resetClinicSlotState())
        }
        if(nextProps.dateSlot){
            this.setState({days: nextProps.clinicSlotDate})            
            if(this.state.selectDateData === ''){
              this.setState({selectDateData: nextProps.clinicSlotDate[0]})
            }
            const { dispatch } = this.props;
            dispatch(clinicSlotActions.resetClinicSlotState())
        }
        if(nextProps.statusClinicTimeSlot){
            setTimeout(function(){
              Alert.alert(nextProps.statusMsg, '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(clinicSlotActions.resetClinicSlotState())
              this.getClinicSlot(this.state.clinic_id);
            }.bind(this),1500);
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
    
    render() {
        
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
        const {clinic_id, date, dateStatus, days, selectDateData} = this.state
        // // console.log("categroy",slot,slot.monday.morning.start)

        // var currentDate = new Date();
        
        // var future = new Date();
        // future.setDate(future.getDate() + 30);    

        // let days = []
        // while(currentDate < future){
        //    days.push(currentDate.toJSON().slice(0,10))
        //    var newDate = currentDate.setDate(currentDate.getDate() + 1);
        //    currentDate = new Date(newDate);
        // }

        // console.log(this.props.clinicList)
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
              leftComponent={<>
                      <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                    </>}
              centerComponent={<><Title style={style.PageTitle}>Manage Calendar</Title></>}
              rightComponent={<></>}
            />
            
              <View style={styles.containerView}>

                  <Picker
                      style={{ height: 30, width: "100%", color:'grey', fontWeight: 'bold' }}
                      itemTextStyle={{fontSize: 8}}
                      activeItemTextStyle={{fontSize: 8, fontWeight: 'bold'}}
                      iosHeader="Clinic List"
                      placeholder="Clinic List"
                      selectedValue={clinic_id}
                      mode="dropdown"
                      onValueChange={(clinic_id) => this.getClinicSlot(clinic_id)} >
                      <Picker.Item label="Select Clinic" value="" key={0}/>
                      {this.props.clinicList.length > 0 && this.props.clinicList.map((row) => { 
                          return (<Picker.Item label={row.clinic_name} value={row.id} key={row.id} />)
                        })
                      }
                  </Picker>
                {this.state.days.length > 0 &&
                  <ScrollView>
                      <Card>  
                        <Card.Content style={styles.customCard}>  
                          <Text  style={{textAlign:'center',marginBottom:10,fontWeight:'bold'}}>Select Date / Day</Text>

                          <View style={{ flexDirection: 'row', justifyContent:'space-between',marginLeft:15 }}>
                              <FlatList  
                                    data={days}  
                                    renderItem={({item}) => 
                                    {
                                      // // console.log("item",item)
                                      let select = false
                                      if(item.day === date){  
                                         select = true
                                      }  

                                      let dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(item.day).getDay()]
                                      // // console.log(dayName)
                                      var month = new Date(item.day).getMonth()+1
                                      var day = new Date(item.day).getDate() +"-" +month;
                                      return(<TouchableOpacity onPress={() => this.getClinicSlotbyDate(item)}>
                                        <Card style={styles.categroyCard}>
                                          <View>
                                            <Text style={select ? styles.titleViewSelect : styles.titleView}>{dayName+" "+day}</Text>
                                          </View>
                                        </Card>
                                      </TouchableOpacity>)  
                                      }
                                    }  
                                    horizontal={true}
                                />  
                          </View>
                        </Card.Content>  
                      
                        <Card.Content style={styles.customCardSlotInterval}> 
                            <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                              <Text  style={{marginTop:10}}>Change Status of date: {utilityHelper.DateFormat(date)} </Text>
                              {selectDateData !== '' && 
                                <Switch
                                  trackColor={{ false: "#767577", true: "#00B2B6" }}
                                  thumbColor={(selectDateData.active === 1) ? true : false ? "#00B2B6" : "#f4f3f4"}
                                  ios_backgroundColor="#3e3e3e"
                                  onValueChange = {(value) => this.dateToggleStatus(value)}
                                  value={(selectDateData.active === 1) ? true : false}
                                />
                              }
                            </View>
                        </Card.Content>  
                      </Card>
                      <Card>
                        <Card.Content style={styles.cardListView}> 
                            <Text  style={{textAlign:'center',marginBottom:10,fontWeight:'bold', padding: 5}}>Update Your Availability</Text>
                              
                              <FlatList  
                                    data={this.state.clinicSlotManage}  
                                    numColumns={4}

                                    renderItem={({ item, index }) => {
                                      let select = false
                                      if(item.active === 1){  
                                         select = true
                                      }
                                      // console.log(item.start)
                                      // if(item.start <= '07:00:00'   && item.start  >= '11:50:00'){
                                        return(
                                          <TouchableOpacity onPress={() => this.onSelectSlot(index, item.start, item.active)}>
                                            {/* <Card style={styles.categroyCard}> */}
                                              <View style={{marginTop:10}}>
                                                <Text style={select ? styles.morningTimeSelectLabel : styles.morningTimeLabel}>{this.format(item.start)}</Text>
                                              </View>
                                            {/* </Card> */}
                                          </TouchableOpacity> )
                                      // 
                                        
                                      }}

                                    ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                  <Card.Content  header>
                                                    <Text style={{textAlign: 'center'}}>  No Data found.</Text>
                                                  </Card.Content>
                                              </Card>)}
                                />
                                <FlatList  
                                    data={this.state.clinicSlotManage}  
                                    numColumns={4}

                                    renderItem={({ item, index }) => {
                                      let select = false
                                      if(item.active === 1){  
                                         select = true
                                      }
                                      if('11:50:00' < item.start && item.start  > '03:50:00'){
                                        return(
                                          <TouchableOpacity onPress={() => this.onSelectSlot(index, item.start, item.active)}>
                                            {/* <Card style={styles.categroyCard}> */}
                                              <View style={{marginTop:10}}>
                                                <Text style={select ? styles.morningTimeSelectLabel : styles.morningTimeLabel}>{this.format(item.start)}</Text>
                                              </View>
                                            {/* </Card> */}
                                          </TouchableOpacity> )
                                      }
                                        
                                      }}

                                    ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                  <Card.Content  header>
                                                    <Text style={{textAlign: 'center'}}>  No Data found.</Text>
                                                  </Card.Content>
                                              </Card>)}
                                />
                              
                        </Card.Content>  
                        
                        <Card.Actions>  
                          {this.state.clinicSlotManage.length > 0 &&
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                  <TouchableOpacity
                                    onPress={() => this.slotStatusChange('active')}
                                  >
                                    <LinearGradient
                                    colors={['#00B2B6', '#00B2B6']}
                                    style={styles.commonAppButton}
                                    >
                                    <Text style={[styles.commonAppButtonText]}>Active</Text>
                                    </LinearGradient>
                                  </TouchableOpacity>


                                  <TouchableOpacity
                                    onPress={() => this.slotStatusChange('inactive')}
                                  >
                                    <LinearGradient
                                    colors={['#ffffff', '#ffffff']}
                                    style={styles.commonAppButton}
                                    >
                                    <Text style={[styles.commonAppButtonTextInactive]}>Inactive</Text>
                                    </LinearGradient>
                                  </TouchableOpacity>

                                </View>
                              }
                        </Card.Actions>  


                      </Card>
                  </ScrollView> 
                }
              </View>
        </SafeAreaView>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, clinicList } = state.clinicReducer;
  const { clinicSlotManage, clinicSlotDate, sendingRequest, statusClinicTimeSlot, statusMsg, timeSlot, dateSlot } = state.clinicSlotReducer;
  // // console.log(clinicSlotDate, "statusClinicTimeSlot", clinicSlotManage)
  return {
    clinicList,
    clinicSlotManage,
    clinicSlotDate,
    loader,
    sendingRequest,
    statusClinicTimeSlot,
    statusMsg,
    timeSlot,
    dateSlot
  };    
}

export default connect(mapStateToProps)(ManageCalendarSlot);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  activeInActiveButton:{
    backgroundColor:'#00B2B6',
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5,
    width:50,
    color:'#fff'
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
  customCard:{
    backgroundColor:'#f7f7f7',
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    alignItems: 'center',
    justifyContent:'center',
    height:100,
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
    borderRadius: 15,
  },
  customCardSlotInterval:{
    backgroundColor:'#f7f7f7',
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    height:80,
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
    borderRadius: 15, 
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
    borderRadius: 15,

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
    borderRadius: 15,
  },
  listOfAllCards:{
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5
  },
  cardListView: {
    borderWidth: 0,
    margin: 5,
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
    borderRadius: 15,
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
    width: 80,
    height:30,
    backgroundColor:'#00CBCC',
    color:'#fff',
    marginRight:5,
    borderRadius:5,
    textAlign:'center',
    lineHeight:30
  },
  titleViewSelect:{
    fontSize:14,
    width: 80,
    height:30,
    backgroundColor:'#fff',
    color:'#000',
    marginRight:5,
    borderRadius:5,
    borderColor:'#000',
    textAlign:'center',
    borderWidth: 1,
    lineHeight:30
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
    borderRadius: 15,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginHorizontal:2,
    marginVertical:2,
    borderWidth: 1
  },
  commonAppButtonText: {
      color: '#fff',
      fontSize:14
  },
  commonAppButtonTextInactive: {
      color: '#000',
      fontSize:14
  },  
    appointmentSelectDateLabel:{
    fontSize:14,
    width: 110,
    height:30,
    backgroundColor:'#00CBCC',
    color:'#fff',
    marginRight:10,
    textAlign:'center',
    lineHeight:30,
    borderRadius:5
  },
  morningTimeLabel:{
    fontSize:14,
    width: 70,
    height:30,
    backgroundColor:'#ffffff',
    color:'#000',
    marginRight:10,
    textAlign:'center',
    lineHeight:30,
    borderRadius:5,
    borderWidth: 1  
  },
  morningTimeSelectLabel:{
    fontSize:14,
    width: 70,
    height:30,
    backgroundColor:'#00CBCC',
    color:'#fff',
    marginRight:10,
    textAlign:'center',
    lineHeight:30,
    borderRadius:5  
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
