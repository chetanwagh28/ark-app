import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView, Modal,Alert, TouchableHighlight } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-picker';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doctorActions} from '../action';
import { configConstants } from '../constant';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
var {width, height} = Dimensions.get('window')



class PatientDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            patientDetail: '',
            show: false,
            text: '',
            doc_id: '',
            patient_id: '',
            uploaded_url: '',
            modalVisible: false,
            userDetail: ''
        }
        //console.disableYellowBox = true;
    }

    componentDidMount(){
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log('----------')
        this.setState({
          patientDetail: this.props.route.params.patientDetail
        })

      });
      this.getProfile();
    }

    getProfile = async() => {
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userDetail');
            userToken = JSON.parse(userToken)
            // // console.log('=======',userToken)
            this.setState({userDetail: userToken }) 
        } catch(e) {
            // console.log(e);
        }
    }

    digitalPrescription = () => {
      this.setState({ modalVisible: false });
      this.props.navigation.navigate('DigitalPrescription', {digitalPrescription: this.state.patientDetail})
    }

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    selectFile = () => {
      // // console.log("selectFile")
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          base64: true,
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5
        };

        ImagePicker.showImagePicker(options, res => {
          // // console.log('Response = ', res);
          if (res.didCancel) {
            // console.log('User cancelled image picker');
          } else if (res.error) {
            // console.log('ImagePicker Error: ', res.error);
          } else if (res.fileSize > 60000) {
            Alert.alert('Upload document max size 5 mb', '', [
                  {text: 'Close'}
              ]); 
          } else {
            let image = res.data;
            let ext = res.type.split("/")
            
            const formData = new FormData();
            formData.append('appointment_id', this.state.patientDetail.appointment_id)
            formData.append('patient_id', this.state.patientDetail.patient_id)
            formData.append('member_id', this.state.patientDetail.member_id)
            formData.append('doctor_id', this.state.patientDetail.doc_id)
            formData.append('details', "")
            formData.append('typing_area', "")
            formData.append('prescription', image);
            formData.append('prescription_ext', ext[1]);

            let url = '/doctor/uploadprescription/'
            const { dispatch } = this.props;
            dispatch(doctorActions.uploadPrescription(formData, url));
            
            // this.completedApi();
          }
        });
    }

    completedApi = () => {
        const { dispatch } = this.props;
        dispatch(doctorActions.completeAppointment(this.state.patientDetail.appointment_id));
        Alert.alert("Completed", '', [
            { text: 'Close', onPress: () =>  this.props.navigation.navigate("MyUpcomingAppointment")}
        ]);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // // console.log("nextProps",nextProps.uploaded_url)
        if(nextProps.uploaded){
            this.setState({uploaded_url: nextProps.uploaded_url.url})
              this.setState({ modalVisible: false })
            setTimeout(function(){
              Alert.alert("Upload successfuly", '', [
                { text: 'Close', onPress: () =>  this.setState({ modalVisible: false })}
              ]);  
              const { dispatch } = this.props;
              dispatch(doctorActions.resetFirstState())
            }.bind(this),1500);
        }
    }

    render() {
        
      const { show, patientDetail } = this.state;
      const { goBack } = this.props.navigation;
      // // console.log("patientDetail",configConstants.API_BASE_PATH_Slash+this.state.uploaded_url)

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Patient Detail</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              <Title style={styles.logoText} onPress={() => this.props.navigation.navigate('PatientHistory', {
                                  patientDetail: patientDetail
                                })}>History</Title>
            </Right> 
          </Header>
          <Content style={style.container}>
            {patientDetail ?
              <ScrollView>
                <View style={styles.containerView}>
                  <Card style={styles.cardListView}>
                        <View style={{flexDirection:'row', justifyContent : 'flex-start',  width: "100%"}}>
                            <View style={{flexDirection:'column',  width: "38%", marginRight:10, alignItems: 'center', justifyContent : 'center'}}>
                                <Avatar.Image  source={{ uri: utilityHelper.ProfilePic(patientDetail.display_pic) }} style={{marginBottom:10}} size={85} />

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FavoriteDoctor', {referDetail: patientDetail})}>
                                  <LinearGradient
                                  colors={['#00B2B6', '#00B2B6']}
                                  style={style.commonAppButton}
                                  >
                                  <Text style={styles.commonAppButtonText1}>Refer to Doctor</Text>
                                  </LinearGradient>
                                </TouchableOpacity>



                            </View>
                            <View style={{flexDirection:'column', backgroundColor:'#fff'}}>
                                <Paragraph>Name: {patientDetail.member_id ? patientDetail.member_name : patientDetail.name} </Paragraph>
                                <Paragraph>Age: {patientDetail.member_id ? patientDetail.member_age : patientDetail.age}</Paragraph>
                                <Paragraph>Information: {patientDetail.member_id ? patientDetail.member_health_problem_title : patientDetail.health_problem_title}</Paragraph>
                                <Paragraph>Date: {utilityHelper.DateFormat(patientDetail.appointment_date)}</Paragraph>
                                <Paragraph>Time: {patientDetail.appointment_time}</Paragraph>
                                <Paragraph>Fees: {patientDetail.appointment_type}</Paragraph>
                            </View>
                        </View>

                  </Card>
                  {this.state.uploaded_url !== '' &&
                    <View style={{ margin:10 }}>
                      <Text>Check uploaded prescription</Text>
                      <Image animation="fadeInUp" duraton="1500"
                          source={{ uri: configConstants.API_BASE_PATH_Slash+this.state.uploaded_url }}
                          style={{ width: width, margin:10 }}
                          resizeMode="center"
                      />
                    </View>  
                  }
                </View> 
              </ScrollView>
              :
              <Card >
                  <CardItem  header style={style.containerCard1}>
                    <Text style={{textAlign: 'center', color:'#fff'}}>  No Data Present In... Try Again.</Text>
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
                        <View style={{flexDirection:'row',  alignItems: 'center', borderRadius:5}}>
                          <Text style={{ fontWeight:'bold', fontSize:18, backgroundColor:'orange',padding:5,color:'#fff' }}>Prescription</Text>
                        </View>

                        {/* <View style={styles.dealsValueContainer} >
                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',marginRight:10}}>
                              <Text style={styles.dealsValueAmount}>Rs. 550</Text>
                              <Text style={styles.dealsValueMessage}>Onwards</Text>
                            </View>
                        </View> */}
                          <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                            <LinearGradient
                              colors={['#fff', '#fff']}
                              style={styles.modelCloseButton}
                            >
                            <Text style={[styles.commonAppButtonText]}>X</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                      </View>

                      <View style={{ width:"85%", backgroundColor: "#00B2B6", padding:10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                          <TouchableOpacity onPress={this.digitalPrescription}>
                            <LinearGradient colors={['#fff', '#fff']} style={style.commonAppButton}>
                              <Text style={[styles.commonAppButtonText]}>Digital</Text>
                            </LinearGradient>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={this.selectFile}>
                            <LinearGradient colors={['#fff', '#fff']} style={style.commonAppButton}>
                              <Text style={[styles.commonAppButtonText]}>Manual</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                  </View>
            </Modal>    

          </Content>
          {this.state.userDetail && this.state.userDetail.practioner !== 1 ? 
            <Footer style={styles.footerContainer}>
              <FooterTab 
                style={styles.footerTabs} 
                >
                <Button style={styles.footerTabsButton} 
                  onPress={this.completedApi}>
                  <Text style={styles.footerTabsButtonText}>Complete</Text>
                </Button>
                  <Button style={styles.footerTabsButton} 
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                    <Text style={styles.footerTabsButtonText}>Upload Prescription</Text>
                  </Button>
              </FooterTab>
            </Footer>
            :
            <Footer style={styles.footerContainer}>
              <FooterTab 
                style={styles.footerTabs} 
                >
                <Button style={styles.footerTabsButton} 
                  onPress={this.completedApi}>
                  <Text style={styles.footerTabsButtonText}>Complete</Text>
                </Button>
              </FooterTab>
            </Footer>
          }
         
        </Container>
      );
    }
}

function mapStateToProps(state) { 
  const { loader,uploaded, uploaded_url } = state.doctorReducer;
  // // console.log("uploaded",uploaded)
  return {
    uploaded,
    uploaded_url,
    loader
  };    
}

export default connect(mapStateToProps)(PatientDetail);


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
    marginHorizontal:10,
    marginVertical:10,
    width:width-20
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
  commonAppButtonText1:{
    color:'#fff',
    fontSize:10    
  },
  commonAppButtonText:{
    color:'#000',
    fontSize:16    
  },
  footerContainer:{
    borderRadius: 100,
    backgroundColor:'#00B2B6',
  },
  footerTabs:{
    backgroundColor:'#00B2B6',
    borderWidth: 0,
    borderRadius:200,
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
    borderRadius: 5 
  },
  footerTabsButtonText:{
    color:'#fff'
  },
  centeredView: {
    marginVertical:"50%",
    marginHorizontal: '20%',
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
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