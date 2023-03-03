import React, { Component ,PureComponent} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView , Alert, Dimensions, CheckBox , ActivityIndicator, PermissionsAndroid, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Button, Right, Body, Tabs , Tab, CardItem } from 'native-base';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import jwtdecode from 'jwt-decode'
import {doctorActions, clinicActions, videoActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import {LocalizationContext} from './Translations';
import DateTimePicker from '@react-native-community/datetimepicker';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
// import axios from "react-native-axios";
import axios from 'axios';
import { each } from "underscore";
import PropTypes from "prop-types";
import { truncate } from 'lodash';


class MyUpcomingAppointment extends Component {
  
  static propTypes = {
    componentId: PropTypes.string
  };
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true,
        title: {
          text: "Enablex",
          fontSize: 20,
          color: "white"
        },
        background: {
          color: "#6f5989"
        }
      },
      statusBar: {
        backgroundColor: "#534367",
        visible: true,
        style: "light"
      }
    };
  }
    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            categroy: '',
            specialization: '',
            specialization_key: '',
            doctorAppoinementList: [],
            appoinementList: [],
            allChecked: false,
            field: "from_date",
            date: new Date(),
            from_date: new Date(),
            to_date: new Date(),
            mode: 'datetime',
            show: false,
            showAlert: false,
            appointment_id: '',
            clinic_id: '',
            user_name: "Avark",
            room_id:"",
            permissionsError: false,
            // infos:"",
            res_token:"",
            data:{},
            videoCall: '',
            doc_id: '',
            clinic_id: '',
            doc_name: '',
            display_pic: '',
            loading: false,
            buttonDisabled:true
        }
        //console.disableYellowBox = true;
        this._onCreate_Room = this._onCreate_Room.bind(this);
        this.getRoomIDWebCall = this.getRoomIDWebCall.bind(this);
        this.getRoomTokenWebCall = this.getRoomTokenWebCall.bind(this);
        this.navigateToVideo = this.navigateToVideo.bind(this);
        this.renderFooter = this.renderFooter.bind(this)
        this.loadMoreData = this.loadMoreData.bind(this)
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          
          this.setState({categroy: this.props.route.params.categroy})
          let data = {
                      start_date: new Date().toISOString().substr(0, 10),
                      end_date: new Date().toISOString().substr(0, 10),
                      clinic_id: ''
                  }
          // // console.log("data",data)        
          const { dispatch } = this.props;
          dispatch(doctorActions.doctorAppointmentList(data));
      });
          this.getClinicList();
    }

    renderFooter = () => {
      // // console.log("=====================")
        if(this.state.doctorAppoinementList.length > 0){
          return (
          //Footer View with Load More button
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.loadMoreData}
                //On Click of button calling loadMoreData function to load more data
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Loading</Text>
                {this.props.loader ? (
                  <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                ) : null}
              </TouchableOpacity>
            </View>
          );
      }else{
        return null
      }
    }

    loadMoreData=()=>{
        let data = {
                    start_date: this.state.from_date.toISOString().substr(0, 10),
                    end_date: this.state.to_date.toISOString().substr(0, 10),
                    clinic_id: ''
                }
        this.setState({loading: true})        
        // // console.log("data",data)        
        const { dispatch } = this.props;
        dispatch(doctorActions.doctorAppointmentList(data));
    }

   
    getClinicList = async() => {
      let doc_id = '';
      let doc_name = '';
      let display_pic = '';
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            // // console.log("jwtdecode======",jwtdecode(userToken))
            doc_id = jwtdecode(userToken).doc_id
            doc_name = jwtdecode(userToken).name
            display_pic = jwtdecode(userToken).display_pic
            // // console.log("===========doc_id",doc_id)
            this.setState({doc_id: doc_id, doc_name: doc_name, display_pic: display_pic})
            const { dispatch } = this.props;
            dispatch(clinicActions.getClinicList(doc_id));

        } catch(e) {
            // // console.log(e);
        }
    }

    searchFilter = () => {
        let data = {
                      start_date: this.state.from_date.toISOString().substr(0, 10),
                      end_date: this.state.to_date.toISOString().substr(0, 10),
                      clinic_id: ''
                  }
          // // console.log("data",data)        
          const { dispatch } = this.props;
          dispatch(doctorActions.doctorAppointmentList(data));
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // // console.log("nextProps.cancelMessage",nextProps.cancelMessage)
        if(nextProps.dAppointment){
            nextProps.doctorAppoinementList.map((row) => 
              {
                 row.isChecked = false 
                 return row
              }
            ) 
            this.setState({ doctorAppoinementList: nextProps.doctorAppoinementList, appoinementList: nextProps.doctorAppoinementList }) // <- this is setState equivalent
            this.setState({loading: false}) 
            const { dispatch } = this.props;
            dispatch(doctorActions.resetFirstState())
        }
        if(nextProps.cancelMessage){
            setTimeout(function(){
              Alert.alert("Succefully cancelled", '', [
                  {text: 'Close'}
              ]);  

              const { dispatch } = this.props;
              dispatch(doctorActions.resetFirstState())
              this.searchFilter()
            }.bind(this),1500);
            this.setState({loading: false}) 
        }
    }
    
    checkBox_Test = (appointment_id, value) => { 
      let { doctorAppoinementList, allChecked } = this.state;  
      if (appointment_id === "checkAll") {
        allChecked = !value;
        doctorAppoinementList = doctorAppoinementList.map(item =>  ({ ...item, isChecked: allChecked }));
        this.setState({doctorAppoinementList, allChecked})
      } else {
        doctorAppoinementList = doctorAppoinementList.map(item =>
          item.appointment_id === appointment_id ? { ...item, isChecked: !value } : item
        );
        allChecked = doctorAppoinementList.every(item => item.isChecked);
        this.setState({doctorAppoinementList, allChecked})
      }
    }

    cancelAll = () => {
      let data = ''
      if (this.state.appointment_id === "checkAll") {
        let arg= []
        const newData = this.state.appoinementList.filter(function(item) {
          //applying filter for the inserted text in search bar
          arg.push(item.appointment_id)
        });
        data = {appointment_ids: arg}
      }else{
        // appointment_ids
        data = {appointment_ids: [this.state.appointment_id]}
      }
        const { dispatch } = this.props;
        dispatch(doctorActions.cancleByDoctorAppointment(data));
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

    show = mode => {
      this.setState({
        show: true,
        mode,
      });
    }

    showTo = mode => {
      this.setState({
        showTo: true,
        mode,
      });
    }

    datepicker = (field) => {
      // // console.log(field)
      this.show('date');
      this.setState({field:field})
    }

    datepickerTo = (field) => {
      // // console.log(field)
      this.showTo('date');
      this.setState({field:field})
    }

    setDateFrom = (event, date) => {
      // // console.log("date",date)
      date = date || this.state.date;
      const field = this.state.field
      // // console.log(field === 'from_date' ,'&&', this.state.from_date.toLocaleDateString(), '>', this.state.to_date.toLocaleDateString())
      if(field === 'from_date' && date.toLocaleDateString() > this.state.to_date.toLocaleDateString()){
        this.setState({
          [field]: date,
          to_date: date,
          showTo: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
        })
      }else{
        // let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
        this.setState({
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          // showTo: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          [field]: date
        }); 
      } 
    }

    setDateTo = (event, date) => {
      // // console.log("date",date)
      date = date || this.state.date;
      const field = this.state.field
      // // console.log(field === 'from_date' ,'&&', this.state.from_date.toLocaleDateString(), '>', this.state.to_date.toLocaleDateString())
      if(field === 'from_date' && date.toLocaleDateString() > this.state.to_date.toLocaleDateString()){
        this.setState({
          [field]: date,
          to_date: date,
          showTo: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
        })
      }else{
        // let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
        this.setState({
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          showTo: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          [field]: date
        }); 
      } 
    }

    getAppointmentbyClinic = (clinic_id) => {
        this.setState({clinic_id: clinic_id});
        const newData = this.state.appoinementList.filter(function(item) {
          //applying filter for the inserted text in search bar
          if(item.clinic_id === clinic_id){
            return item
          }
        });
        this.setState({
          doctorAppoinementList: newData
        });
    }


    async _onCreate_Room (data) {
      // return false;
      if (Platform.OS === "android") {
        checkAndroidPermissions()
          .then(() => {
             this.setState({ permissionsError: false });
          })
          .catch(error => {
            this.setState({ permissionsError: true });
            // // console.log("checkAndroidPermissions", error);
            return;
          });
      } 
        await this.getRoomIDWebCall(data);
    };
    _onJoin_Room = () => {
      if (this.state.user_name == "" && this.state.room_id == "") {
        alert("Please enter your details");
      } else if (this.state.user_name == "") {
        alert("Please enter your name");
      } else if (this.state.room_id == "") {
        alert("Please enter roomId");
      }  else {
          this.navigateToVideo();
        }
    };
    async getRoomIDWebCall (row)  {

      var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
      const options = {
        headers: header
      };  
     
      var data =  await axios
          .post(kBaseURL+"createRoom/", {} , options)
          .then(function(response) {
            // this.setState({data: response.data});
            return response.data;
            // // console.log("axiosResponseinfo", response.data);
          })
          .catch(function(error) {
            // // console.log("axiosRoomIdCatchError", error);
          });

        this.setState({room_id:data.room.room_id});
        
        let parama = {
                    "room_id" : data.room.room_id,
                    "receiver_id" : row.patient_id,
                    "appointment_id" : row.appointment_id,
                    "user_id": row.doc_id,
                    "name": this.state.doc_name,
                    "profile_url": utilityHelper.ProfilePic(this.state.display_pic)
                  }

        this.setState({
          videoCall: {
                    "roomId" : data.room.room_id,
                    "user_ref" : row.patient_id,
                    "appointment_id" : row.appointment_id,
                    "name": row.name,
                    // "role": "participant"
                    "role": "moderator"
                  }
        })
        const { dispatch } = this.props;
        dispatch(videoActions.sendVideoCallByServer(parama));
        // Chetan following line is printing room id you have to pass this to server using API developed by Vikas ji
        // // console.log("Room Id", data.room.room_id);
        await this.getRoomTokenWebCall();
    }
    async getRoomTokenWebCall() {
    //  // console.log("DoctorRoomId",this.state.videoCall.roomId);
      var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
      const options = {
        headers: header
      };
      let token = await axios
        .post(kBaseURL+"createToken/", {
          name: this.state.videoCall.name,
          role: this.state.videoCall.role,
          user_ref: this.state.videoCall.user_ref,
          roomId: this.state.videoCall.roomId
        },options)
        .then(function(response) {
          return  response.data;         
        })
        .catch(function(error) {
          // // console.log("axiosCreateTokenCatch", error);
        });
        // // console.log("token Jai RAM",token)
        this.setState({res_token:token.token});

        await this.navigateToVideo();
    }
    async navigateToVideo() {
       // const { navigate } = this.props.navigation;
        // // console.log("this.state.res_token",this.state.res_token)
        try {
          if (this.state.res_token) {
            // this.props.navigation.navigate('EnxConferenceScreen', {
            //   username: this.state.videoCall.name,
            //   token: this.state.res_token
             
            //  });
          } else {
            // // console.log(res_token.error);
          }
        } catch (error) {
          // // console.log("navigationError", error);
        }
    }

    render() {
        
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;

        const { showAlert, show, date, mode, from_date, to_date, clinic_id } = this.state;
        
        var cdate = new Date().getDate(); //To get the Current Date
        var cmonth = new Date().getMonth() + 1; //To get the Current Month
        var cyear = new Date().getFullYear(); //To get the Current Year
        var chours = new Date().getHours(); //To get the Current Hours
        var cmin = new Date().getMinutes(); //To get the Current Minutes
        var csec = new Date().getSeconds(); //To get the Current Seconds
        
        
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>{this.state.categroy === 'Video' && 'Video'} Appointments</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              {/*<Icon.Button name="add-circle-outline" size={25} backgroundColor="#00B2B6" onPress={() => this.props.navigation.navigate("NewPatientDigitalPrescription")}></Icon.Button>*/}
            </Right>            
          </Header>
          <Content style={style.container}>
            <ScrollView >
              <View style={styles.containerView}>
                <AwesomeAlert
                  show={showAlert}
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
                    this.cancelAll();
                  }}
                />
                <View style={styles.searchHead}>
                  <View style={{flexDirection: 'row', width: "100%", marginLeft:10, marginRight: 10}}>
                    <Left>  
                      <View style={{ width: "100%"}}>
                      <Text style={{textAlign: 'center', color: '#ffffff'}}>From</Text>
                          <TouchableOpacity onPress={() => this.datepicker('from_date')}>
                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton} >
                                <Text style={style.commonAppButtonText}>{utilityHelper.DateFormat(from_date)} </Text>
                              </LinearGradient>
                          </TouchableOpacity>
                      </View>

                    </Left>  
                    <Body>
                      <Text style={{color:'#ffffff'}}>To</Text>
                      <View style={{width: "100%"}}>
                          <TouchableOpacity onPress={() => this.datepickerTo('to_date')}>
                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton} >
                                <Text style={style.commonAppButtonText}>{utilityHelper.DateFormat(to_date)}</Text>
                              </LinearGradient>
                          </TouchableOpacity>

                      </View>

                      { 
                        this.state.show && <DateTimePicker 
                                    minimumDate={new Date()}
                                    value={this.state.from_date}
                                    mode={mode}
                                    format="YYYY-MM-DD"
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.setDateFrom} />
                        }
                      { 
                        this.state.showTo && <DateTimePicker 
                                    minimumDate={this.state.from_date}
                                    value={this.state.to_date}
                                    mode={mode}
                                    format="YYYY-MM-DD"
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.setDateTo} />
                        }
                    </Body>    
                    <Right>    
                      <Text></Text>
                      <View style={{flexDirection: 'row'}}>
                          <Icon name="search-sharp" size={20} style={styles.search} color='#ffffff' onPress={() => this.searchFilter() }></Icon>
                      
                      <CheckBox 
                        value = { this.state.allChecked }
                        onChange = {() => this.checkBox_Test('checkAll', this.state.allChecked) }
                        style={{color: '#ffffff'}} 
                      />
                      <Icon name="ios-trash" size={20} style={styles.trashButtonH} onPress={() => this.showAlert('checkAll') }></Icon>
                      </View>
                    </Right>
                  </View>  
                  

                  <View style={style.dropdown}>
                     <Picker
                          style={{ height: 30, width: "100%", color:'grey', fontWeight: 'bold' }}
                          itemTextStyle={{fontSize: 8}}
                          activeItemTextStyle={{fontSize: 8, fontWeight: 'bold'}}
                          iosHeader="Choose Clinic"
                          placeholder="Choose Clinic"
                          selectedValue={clinic_id}
                          mode="dialog"
                          onValueChange={(clinic_id) => this.getAppointmentbyClinic(clinic_id)} >
                          <Picker.Item label="Choose Clinic" value="" />
                          {this.props.clinicList.length > 0 && this.props.clinicList.map((row) => { 
                              return (<Picker.Item label={row.clinic_name} value={row.id} />)
                            })
                          }
                      </Picker>
                  </View>
                </View>
                <View style={styles.listOfAllCards}>
                  {this.props.loader && 
                          <SkeletonLoader />
                      }
                  <FlatList  
                      data={(this.state.categroy === "Video") ? this.state.doctorAppoinementList.filter(row => row.appointment_method === 1) : this.state.doctorAppoinementList}  
                      numColumns = {1}
                      renderItem={({ item, index }) => {
                        // // console.log("MyUpcomingAppointment",item)
                        return(
                        <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                            <Card style={styles.cardListView} onPress={() => this.props.navigation.navigate("PatientDetail", { patientDetail: item})}>
                              <Card.Content>
                                  <View style={{flexDirection:'row', width: '100%' , alignItems:'center', justifyContent : 'flex-start'}}>
                                      <View style={{flexDirection:'column', width: '20%',  alignItems: 'center', justifyContent : 'center',marginRight:10}}>
                                           <Avatar.Image  source={{ uri: utilityHelper.ProfilePic(item.display_pic) }} style={styles.profile_image} size={85} />
                                            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                                                      
                                            {
                                               item.appointment_method != 1 ?
                                              <Image style={styles.cardIcons} resizeMode={'center'} source={item.image} />
                                              : //{this._onCreate_Room}
                                              // <Card onPress={() => this.props.navigation.navigate("EnxJoinScreen")} style={{height:45}}>
                                             ( item.appointment_date.split('-')[0]==cyear && item.appointment_date.split('-')[1]==cmonth && item.appointment_date.split('-')[2]==cdate && item.appointment_time.split(':')[1]==0 && item.appointment_time.split(':')[0]-1==chours && cmin>=55 ) || ( item.appointment_date.split('-')[0]==cyear && item.appointment_date.split('-')[1]==cmonth && item.appointment_date.split('-')[2]==cdate && item.appointment_time.split(':')[1]-5<=cmin && item.appointment_time.split(':')[0]<=chours  )
                                            ? <Button style={{backgroundColor:'white'}}  disabled={false} onPress={() => this._onCreate_Room(item)}>
                                                <Icon name="videocam" size={55} color='#00B2B6' />
                                              </Button> :<Button style={{backgroundColor:'white'}}  disabled={true} onPress={() => this._onCreate_Room(item)}>
                                                <Icon name="videocam" size={55} color='#00B2B6' />
                                              </Button>
                                            }
                                          </View> 
                                      </View>
                                      
                                      <View style={{flexDirection:'column', width: "60%"}}>
                                          <Paragraph>Name: {item.member_id ? item.member_name : item.name} </Paragraph>
                                          <Paragraph>Age: {item.member_id ? item.member_age : item.age}</Paragraph>
                                          <Paragraph>Information: {item.member_id ? item.member_health_problem_title : item.health_problem_title}</Paragraph>
                                          <Paragraph>Date: {utilityHelper.DateFormat(item.appointment_date)}</Paragraph>
                                          <Paragraph>Time: {item.appointment_time}</Paragraph>
                                          <Paragraph>Fees: {item.appointment_type}</Paragraph>

                                          <Paragraph>Clinic :  {item.clinic_name}</Paragraph>
                                      </View>
                                      <View style={{flexDirection:'row',  width: "18%"}}>
                                         
                                          <CheckBox 
                                            value = { item.isChecked }
                                            onChange = {() => this.checkBox_Test(item.appointment_id) }
                                            style={styles.checkbox} 
                                          />
                                        <Icon name="ios-trash" size={20} style={styles.trashButton} onPress={() => this.showAlert(item.appointment_id) }></Icon>
                                      
                                      </View>
                                  </View>
                              </Card.Content>
                            </Card>
                          </Animatable.View>)
                      }}

                      ListEmptyComponent={(<Card>
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No {this.state.categroy === 'Video' && 'Video'} Appointments Booked... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
                      // ListFooterComponent={this.renderFooter}
                      refreshControl={
                          <RefreshControl
                            enabled={true}
                            refreshing={this.state.loading}
                            onRefresh={this.loadMoreData}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                          />
                        }
                  />  
                </View>
              </View> 
            </ScrollView>

          </Content>
          {this.state.categroy !== 'Video' &&
          <Footer>
            <FooterTab style={{backgroundColor:"#273f61", justifyContent:'center', flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("NewPatientDigitalPrescription")}>  
               <Text style={{color:'white', fontSize: 20}}>Book New Appointment <Icon name="add-circle-outline" size={30} color="#ffffff" backgroundColor="#ffffff" /></Text>
              </TouchableOpacity>
            </FooterTab>
          </Footer>
          }
        </Container>
      );
    }
}

MyUpcomingAppointment.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, doctorAppoinementList, dAppointment, cancelMessage } = state.doctorReducer;
  const { clinicList } = state.clinicReducer;
  // // console.log("doctorAppoinementList",doctorAppoinementList)
  return {
    doctorAppoinementList,
    dAppointment,
    cancelMessage,
    clinicList,
    loader
  };    
}

export default connect(mapStateToProps)(MyUpcomingAppointment);


const checkAndroidPermissions = () =>
  new Promise((resolve, reject) => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ])
      .then(result => {
        const permissionsError = {};
        permissionsError.permissionsDenied = [];
        each(result, (permissionValue, permissionType) => {
          if (permissionValue === "denied") {
            // // console.log("denied Permission");
            permissionsError.permissionsDenied.push(permissionType);
            permissionsError.type = "Permissions error";
          }
        });
        if (permissionsError.permissionsDenied.length > 0) {
          // // console.log("denied Permission");
          reject(permissionsError);
        } else {
          // // console.log("granted Permission");
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });

const kBaseURL = "https://demo.enablex.io/";
// const kBaseURL = "https://api.enablex.io/";
const kTry = true;

const  kAppId = "623d57c2a1e6cc69b932ce53";
const  kAppkey = "eBeQybyhudy6uYy3aLaXy9ubyhyPeVuXeNua";
// const  kAppId = "6035f5edeff23c10ca6ce4e2";
// const  kAppkey = "hytySa8uHezy6ePaya4uEa2ueeqeAy4eyaea";



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
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
    paddingBottom:5,
    paddingTop:5,

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
    paddingBottom:5,
    backgroundColor:'#00B2B6',
  },
  cardListView: {
    borderWidth: 0,
    marginTop:5,
    alignItems: 'flex-start',
    height:220,
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
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,
},
commonAppButtonText:{
    color:'#fff',
    fontSize:12
},
  profile_image:{
      marginRight:15,
      marginBottom: 12
  },
  trashButton:{
    color:'red',
    marginTop:7,
    marginLeft:0
  },
  trashButtonH: {
    color:'red',
    marginRight: 25
  },
  checkbox: {
    marginBottom:150
  },
  search: {
    marginTop: 5,
    marginRight: 20
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#1d346d',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },

});
