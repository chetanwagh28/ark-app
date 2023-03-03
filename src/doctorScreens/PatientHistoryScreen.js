import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView, Modal, Alert, Linking } from 'react-native';
import { Avatar, Button, Card, Title, TextInput, Paragraph, RadioButton } from 'react-native-paper';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import {patientActions} from '../action';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
var {width, height} = Dimensions.get('window')
import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import jwtdecode from 'jwt-decode'
import { configConstants } from '../constant';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';



class PatientHistory extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
            patientDetail: '',
            show: false,
            text: '',
            doc_id: '',
            modalVisible: false,            
            patient_id: '',
            prescriptionData: []
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log('----------'55da94a8-00a6-41aa-af0b-70273cdc8091)
        if(this.props.route.params){
          this.setState({
            patientDetail: this.props.route.params.patientDetail,
            patient_id: this.props.route.params.patientDetail.patient_id
          })
        }
        let patient_id = this.props.route.params.patientDetail.patient_id

        // // console.log("data",doc_id)
        const { dispatch } = this.props;
        dispatch(patientActions.getPatientHistory(patient_id));
      });

    }
    
    setModalVisible = (visible, data) => {
      // // console.log(data)
      this.setState({ modalVisible: visible, prescriptionData: data });
    }

    render() {
        
      const { show, patientDetail } = this.state;
      const { goBack } = this.props.navigation;
      // // console.log("patientDetail",patientDetail)

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>{patientDetail && patientDetail.name}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right> 
          </Header>
          <Content style={style.container}>
            {patientDetail ?
              <ScrollView>
                <View style={styles.containerView}>
                  <Card style={styles.cardListView}>
                    <Card.Content>
                        <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between'}}>
                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between'}}>
                                <Avatar.Image  source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }} style={styles.profile_image} size={60} />
                            </View>
                            <View>
                                <Paragraph>{patientDetail.name} </Paragraph>
                                <Paragraph>Age: {patientDetail.age}</Paragraph>
                                <Paragraph>Issue: {patientDetail.health_problems}</Paragraph>
                                <Paragraph>Date: {utilityHelper.DateFormat(patientDetail.appointment_date)}</Paragraph>
                                <Paragraph>Time: {utilityHelper.TimeFormat(patientDetail.appointment_time)}</Paragraph>
                                <Paragraph>Fees: {patientDetail.appointment_type}</Paragraph>
                            </View>
                            
                        </View>
                    </Card.Content>
                  </Card>
                  <Tabs >
                  <Tab heading="Shared"
                    style={styles.TabHead}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.Tab}
                    textStyle={styles.Tabtext}
                    activeTabStyle={styles.ActiveTabs}
                    activeTextStyle={styles.ActiveTabText}
                  >
                    <LinearGradient colors={['#04898c', '#04898c', '#5fd9d9']}>
                    
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                      <FlatList  
                        data={this.props.patientHistory.shared}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                          // console.log('shared-->>>>',item)
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView}>
                                  <Card.Content>
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                                <View style={styles.profileImageContainer}>
                                                    <Avatar.Image  source={{ uri: utilityHelper.ProfilePic(item.doctor_profile_pic) }} style={styles.profile_image} size={90} />
                                                </View>
                                                
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
                                                </View>
                                          </View>
                                          
                                          <View style={{width: '60%'}}>
                                              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Dr. {item.doctor_name} </Paragraph>
                                              <Paragraph> {item.en_spec}</Paragraph>
                                              
                                              <TouchableOpacity onPress={() => {
                                                                        this.setModalVisible(!this.state.modalVisible, item.prescriptions);
                                                                      }}>
                                                  <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                    <Text style={style.commonAppButtonText}>Show Prescriptions</Text>
                                                  </LinearGradient>
                                              </TouchableOpacity>                            
                                          </View>  

                                      </View>

                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )
                        }
                      }
                      /> 
                    </LinearGradient>
                  </Tab>
                  <Tab heading="Saved"
                    style={styles.TabHead}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.Tab}
                    textStyle={styles.Tabtext}
                    activeTabStyle={styles.ActiveTabs}
                    activeTextStyle={styles.ActiveTabText}
                  >
                    <LinearGradient colors={['#04898c', '#04898c', '#5fd9d9']}>
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                      <FlatList  
                        data={this.props.patientHistory.saved}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                          // // console.log('saved====',item)
                          // // console.log(configConstants.API_BASE_PATH +'/'+ item.prescription_url)
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView1}>
                                  <Card.Content>
                                      <View style={styles.appointmentDateTimeButtonContainer}>
                                        <Text  style={styles.appointment_date_button}>
                                          {item.date}
                                        </Text>
                                      </View>
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                          
                                          <View style={{width: '70%', fontWeight: 'bold'}}>
                                              {item.member_name && <Paragraph style={{fontSize: 14}}>Member: {item.member_name} </Paragraph>}
                                              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Dr. {item.doctorname} </Paragraph>
                                          </View>                            
                                          <View style={{ flexDirection:'row',  justifyContent: 'center', margin:10 }}>
                                              <Icon name="eye" size={35} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon>
                                          </View>
                                      </View>

                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )
                        }
                      }
                      />  
                    </LinearGradient>
                  </Tab>
                </Tabs>
                </View> 
              </ScrollView>
              :
              <Card>
                  <CardItem  header style={style.containerCard1}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Present In... Try Again.</Text>
                  </CardItem>
              </Card>
            }

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
                  <View style={styles.centeredView}>
                      <View style={{ width:"85%", backgroundColor: "#00B2B6", padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                        <View style={{flexDirection:'row',  alignItems: 'center', marginRight:10, borderRadius:5}}>
                          <Text style={{ fontWeight:'bold', fontSize:18, backgroundColor:'orange',padding:5,color:'#fff' }}>Prescription</Text>
                        </View>

                          <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible, []);}}>
                            <LinearGradient
                              colors={['#ffffff', '#ffffff']}
                              style={styles.modelCloseButton}
                            >
                            <Text style={[styles.commonAppButtonText]}>X</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                      </View>

                      <View style={{ width:"85%", height: "100%", backgroundColor: "#00B2B6", padding:10 }}>
                      <ScrollView>  
                        {this.state.prescriptionData.length > 0 && this.state.prescriptionData.map((item,i)=>{
                          return(<Card key={i} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius:5, borderWidth:1 }}>
                            <Card.Content>
                                <View style={styles.appointmentDateTimeButtonContainer}>
                                  <Text  style={styles.appointment_date_button}>
                                    {utilityHelper.DateFormat(item.appointment_date) +" "+ utilityHelper.TimeFormat(item.appointment_time)}
                                  </Text>
                                </View>
                                <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                    
                                    <View style={{width: '70%', fontWeight: 'bold'}}>
                                        <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Clinic:{item.clinic_name} </Paragraph>
                                        <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Address: {item.clinic_address} </Paragraph>
                                    </View>                            
                                    <View style={{ flexDirection:'row',  justifyContent: 'center', margin:10 }}>
                                        <Icon name="eye" size={35} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon>
                                    </View>
                                </View>

                            </Card.Content>
                          </Card>)
                        })}
                      </ScrollView>  
                      </View>
                  </View>
            </Modal>  
          </Content>
        </Container>
      );
    }
}
function mapStateToProps(state) { 
  const { loader, patientHistory } = state.patientReducer;
  // // console.log("patientHistory",patientHistory)
  return {
    patientHistory,
    loader
  };    
}

export default connect(mapStateToProps)(PatientHistory);

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
    color:'#000',
    fontSize:16    
  },
  centeredView: {
    marginVertical:"30%",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    borderWidth:1,
    borderColor: '#fff',
    borderRadius: 5
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
  modelCloseButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 5,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,
  },
  cardListView1: {
    borderWidth: 1,
    height:120,
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
    marginTop:5,
    borderRadius:5,
    marginHorizontal: 10
  },
  titleHeading:{
    width:'100%',
    textAlign:'center',
    fontWeight:'400',
    fontSize:20,
    marginTop:10
  },
  titleHeadingSubHeading:{
    width:'100%',
    textAlign:'center'
  },
  titleHeadingDescription:{
    width:'100%',
    textAlign:'center'
  },
  TabHead:{
    backgroundColor:'#00B2B6',
  },
  tabsContainerStyle:{
    backgroundColor:'#00B2B6',
    // borderRadius: 15
  },
  categroy: {
    backgroundColor:'#00B2B6',
  },
  Tab:{
    backgroundColor:'#ffffff',
    borderRadius: 5
  },
  ActiveTabs:{
    backgroundColor:'#ed8b40',
    borderRadius: 5
  },
  Tabtext:{
    color:'#ed8b40',
  },
  ActiveTabText:{
    color:'#ffffff',
  },
});