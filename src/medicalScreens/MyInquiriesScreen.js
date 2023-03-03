import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView , Alert, Dimensions, CheckBox, Linking, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem } from 'native-base';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import jwtdecode from 'jwt-decode'
import {medicalActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import {LocalizationContext} from '../screens/Translations';
import DateTimePicker from '@react-native-community/datetimepicker';
import SkeletonLoader from '../components/SkeletonLoader';
import { configConstants } from '../constant';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';


class MyInquiriesScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            specialization: '',
            specialization_key: '',
            upcomingOrderMedicines: [],
            appoinementList: [],
            allChecked: false,
            field: "from_date",
            date: new Date(),
            from_date: new Date(),
            to_date: new Date(),
            mode: 'datetime',
            show: false,
            showAlert: false,
            Orderid: '',
            clinic_id: '',
            loading: false
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.setState({upcomingOrderMedicines: []})
          let data = {
                      state_date: new Date().toISOString().substr(0, 10),
                      end_date: new Date().toISOString().substr(0, 10),
                      clinic_id: ''
                  }
          // // console.log("data",data)        
          const { dispatch } = this.props;
          dispatch(medicalActions.upcomingPrescriptionList());
      });
    }

    loadMoreData = () => {
        // // console.log("=========")     
        this.setState({loading: true})        
        const { dispatch } = this.props;
        dispatch(medicalActions.upcomingPrescriptionList());

        setTimeout(() => {
          this.setState({loading: false})
        }, 2000);
          
    }

    searchFilter = () => {
        let data = {
                      state_date: this.state.from_date.toISOString().substr(0, 10),
                      end_date: this.state.to_date.toISOString().substr(0, 10),
                      clinic_id: ''
                  }
          // // console.log("data",data)        
          const { dispatch } = this.props;
          dispatch(medicalActions.upcomingPrescriptionList(data));
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // // console.log("nextProps.cancelMessage",nextProps.cancelMessage)
        if(nextProps.MedicalUser && nextProps.upcomingOrderMedicines.length > 0){
             nextProps.upcomingOrderMedicines.map((row) => 
              {
                 row.isChecked = false 
                 return row
              }
            ) 
            this.setState({ upcomingOrderMedicines: nextProps.upcomingOrderMedicines, appoinementList: nextProps.upcomingOrderMedicines }) // <- this is setState equivalent
            const { dispatch } = this.props;
            dispatch(medicalActions.resetFirstState())
        }
        if(nextProps.cancelMessage){
            setTimeout(function(){
              Alert.alert("Succefully cancelled", '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(medicalActions.resetFirstState())
              dispatch(medicalActions.upcomingPrescriptionList())
            }.bind(this),1500);
        }
    }
    
    handleAccept = (data, status) => { 
        // // console.log("OrderStatusChange",data.id)
        const { dispatch } = this.props;
        dispatch(medicalActions.OrderStatusChange(data.id, status)).then((res)=> {
            if(res.data){
                Alert.alert('Ordered Accept for chating', '', [
                  {text: 'Close', onPress: () =>  this.props.navigation.navigate("Chat", {chatData: data})}
                ]);
            }
        })
    }

    changeStatus = (id, status) => { 
        // // console.log("OrderStatusChange",data.id)
        const { dispatch } = this.props;
        dispatch(medicalActions.OrderStatus({id: id, status: status})).then((res)=> {
            if(res.data){
              dispatch(medicalActions.upcomingPrescriptionList());
            }
        })
    }

    cancelAll = () => {
        const { dispatch } = this.props;
        dispatch(medicalActions.OrderStatusChange(this.state.Orderid, 2)).then((res)=> {
            // // console.log("OrderStatusChange",res)
            if(res.data){
              Alert.alert('Ordered Ignore', '', [
                {text: 'Close'}
              ]);
              dispatch(medicalActions.upcomingPrescriptionList());
            }
        })
        this.hideAlert();
    }

    showAlert = (id) => {
      this.setState({
        showAlert: true,
        Orderid: id
      });
    };
   
    hideAlert = () => {
      this.setState({
        showAlert: false,
        Orderid: ''
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


    render() {
        
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;

        const { showAlert, show, date, mode, from_date, to_date, clinic_id } = this.state;
        // // console.log(this.state.allChecked)
      return (
        <Container>
          <Header style={styles.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>Inquiries</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={style.container}>
            <ScrollView>
              <View style={styles.containerView}>
                <AwesomeAlert
                  show={showAlert}
                  showProgress={false}
                  title="Cancel Order"
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
                      </View>
                    </Right>
                  </View>  

                </View>
                <View style={styles.listOfAllCards}>
                  {this.props.loader && 
                          <SkeletonLoader />
                      }
                  <ScrollView refreshControl={
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
                        }>
                  <FlatList  
                      data={this.state.upcomingOrderMedicines}  
                      numColumns = {1}
                      renderItem={({ item, index }) => {
                        
                          // // console.log(index,'----', item)
                        return(
                        <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                            <Card style={styles.cardListView} >
                              <Card.Content>
                                  <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'center', padding: 10}}>
                                      
                                      <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start', width: "65%"}}>
                                          <Paragraph>Name: {item.name} </Paragraph>
                                          <Paragraph>Address: {item.address}</Paragraph>
                                          <Paragraph>Date: {utilityHelper.DateFormat(item.created_at)}</Paragraph>
                                          <Paragraph>Prescription: <Icon name="download" size={25} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon></Paragraph>
                                      </View>
                                      <View style={{flexDirection:'column',  width: "35%", alignItems: 'flex-end',}}>
                                        {item.is_accept === 0 &&
                                          <React.Fragment> 
                                            <TouchableOpacity onPress={() => this.handleAccept(item, 1) }>
                                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}>Accept</Text>
                                              </LinearGradient>
                                            </TouchableOpacity> 
                                            <TouchableOpacity onPress={() => this.showAlert(item.id)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                  <Text style={style.commonAppButtonText}> Ignore</Text>
                                                </LinearGradient>
                                            </TouchableOpacity> 
                                          </React.Fragment>
                                        }
                                      </View>
                                      
                                  </View>
                                  {item.is_accept === 1 &&
                                          <View style={{flexDirection:'row'}}>
                                          <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat", {chatData: item})}>
                                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}>{translations['chat']}</Text>
                                              </LinearGradient>
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => this.changeStatus(item.id, 1) }>
                                            <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                              <Text style={style.commonAppButtonText}>Complete</Text>
                                            </LinearGradient>
                                          </TouchableOpacity> 
                                          <TouchableOpacity onPress={() => this.changeStatus(item.id, 2)}>
                                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}> Cancel</Text>
                                              </LinearGradient>
                                          </TouchableOpacity> 
                                          </View>
                                        }
                              </Card.Content>
                            </Card>
                          </Animatable.View>)
                      }}

                      ListEmptyComponent={(<Card >
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Present In... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
                  />  
                  </ScrollView>
                </View>
              </View> 
            </ScrollView>
           </Content>
        </Container>
      );
    }
}

MyInquiriesScreen.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, upcomingOrderMedicines, MedicalUser, cancelMessage } = state.medicalReducer;
  // // console.log("upcomingOrderMedicines",upcomingOrderMedicines)
  return {
    upcomingOrderMedicines,
    MedicalUser,
    cancelMessage,
    loader
  };    
}

export default connect(mapStateToProps)(MyInquiriesScreen);



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
    backgroundColor:'#00CBCC',
    paddingBottom:5,
    paddingTop:5

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
    height:180,
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
      width:60,
      height:60,
      marginRight:15,
      marginBottom: 70
  },
  trashButton:{
    color:'red',
    marginTop:7,
    marginLeft:0
  },
  trashButtonH: {
    color:'red',
    // marginRight: 25
  },
  checkbox: {
    // marginBottom:150
  },
  search: {
    marginTop: 5,
    marginRight: 30
  }
});
