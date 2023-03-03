import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Modal, SafeAreaView, TouchableHighlight } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Rating, Slider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {vendorActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from "react-native-easy-grid";
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'

var {width, height} = Dimensions.get('screen')
 width = width

class BestDeal extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            vendorData: '',
            value: 5,
            modalVisible: false,
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // console.log("data",this.props.route.params)
        this.setState({
          name: this.props.route.params.vendorName,
          vendorData: this.props.route.params.vendorData
        })
      });
    }

    

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    render() {
        // console.log("categroy",this.props.route.params.vendorData)
        const vendorData = this.props.route.params.vendorData || ''
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{vendorData.name}</Title></>}
                rightComponent={<>
                  </>}
              />
            <ScrollView>

                      {vendorData ?
                        <>
                          <Animatable.View>
                            <Card style={styles.cardListView}>
                              <Card.Content>

                                  <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>

                                      <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',marginRight:10}}>
                                            <View style={styles.profileImageContainer}>
                                            <Image source={{ uri: utilityHelper.BestDealPic(vendorData.image) }} style={styles.profile_image} />
                                            </View>
                                            {/*<TouchableOpacity>
                                                                                          <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                                                                              <Text style={styles.commonAppButtonText}>Call</Text>
                                                                                          </LinearGradient>
                                                                                        </TouchableOpacity> */}
                                      </View>
                                      
                                      <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start',marginRight:10}}>
                                          <Paragraph style={{fontSize:14, color:'#fff'}}>{vendorData.cat_name}</Paragraph>
                                          <Paragraph style={{fontSize:14, color:'#fff'}}>Location: {vendorData.address}</Paragraph>
                                          <Paragraph style={{fontSize:14, color:'#fff'}}>Contact Detail: {vendorData.contact_no}</Paragraph>
                                      </View> 


                                      
                                  </View>

                                {vendorData.data.length > 0 && vendorData.data.map(row=>{
                                  return(
                                    <Card style={styles.cardListView1} onPress={() => this.props.navigation.navigate('BestDealDetailScreen', {offerDetail: row, vendorCat: vendorData.cat_name})}>
                                      <Card.Content>
                                          <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff', width: '100%', margin:5}}>
                                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff', width: '23%'}}>
                                                    <View style={styles.profileImageContainer}>
                                                    <Image  source={{uri: utilityHelper.BestDealPic(row.image)}} style={styles.profile_image} />
                                                    </View>
                                              </View>
                                              
                                              <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start',backgroundColor:'#fff', marginLeft: 5, width: '50%'}}>
                                                  <Paragraph style={styles.doctorName}>{row.offer_title} </Paragraph>
                                                  <Paragraph style={styles.doctorName}>Price: {row.original_price} </Paragraph>
                                                  
                                              </View> 
                                              <View style={{width: '27%'}}>
                                                  <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff'}}>
                                                  <Text>{row.discount_percent}%</Text>  
                                                  </View>

                                                  <View style={styles.dealsValueContainer} >
                                                    <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center'}}>
                                                      <Text style={styles.dealsValueAmount}>Rs. {row.discounted_price}</Text>
                                                      <Text style={styles.dealsValueMessage}>Onwards</Text>
                                                    </View>
                                                  </View>
                                              </View>
                                          </View> 
                                      </Card.Content>
                                    </Card>
                                  )
                                })}
                                
                                
                              </Card.Content>
                            </Card>
                          </Animatable.View>
                        </>
                        :
                        ''
                      }
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
                        <View style={{flexDirection:'row',  alignItems: 'center', marginRight:10}}>
                          <Text style={{ fontWeight:'bold', fontSize:18, backgroundColor:'orange',padding:5,color:'#fff' }}>Shop Name</Text>
                        </View>

                        <View style={styles.dealsValueContainer} >
                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',marginRight:10}}>
                              <Text style={styles.dealsValueAmount}>Rs. 550</Text>
                              <Text style={styles.dealsValueMessage}>Onwards</Text>
                            </View>
                        </View>
                      </View>

                      <View style={{ width:"85%", backgroundColor: "#ebebeb", padding:10 }}>
                        <View style={styles.action}>
                          <TextInput
                            placeholder='name'
                            style={[styles.textInput]}
                            autoCapitalize="none"
                            
                          />
                        </View>

                        <View style={styles.action}>
                          <TextInput
                            placeholder='Email'
                            style={[styles.textInput]}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            
                          />
                        </View>

                        <View style={styles.action}>
                          <TextInput
                            placeholder='Phone Number'
                            style={[styles.textInput]}
                            autoCapitalize="none"
                            keyboardType="phone-pad"
                          />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <TouchableOpacity>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']} style={styles.commonAppButton}>
                              <Text style={[styles.commonAppButtonText]}>Submit</Text>
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
            
            
            </ScrollView>
        </SafeAreaView>
      );
    }
}

// function mapStateToProps(state) { 
//   const { loader, vendorList } = state.vendorReducer;
//   console.log("vendorList",vendorList)
//   return {
//     vendorList,
//     loader
//   };    
// }

export default BestDeal;



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
    width: "100%",
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardListView: {
    borderWidth: 0,
    // height:height-100,
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
    borderRadius:5,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    marginTop:5,
    width:width-20
  },
  cardListView1: {
    borderWidth: 0,
    // height:150,
    // backgroundColor: '#00B2B6',    
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
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    marginTop:10,
  },
  HealthTipTitleStyle:{
    width:'100%'
  },
  rating_container:{
    marginTop:10,
    marginRight:15
  },
  contentList:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
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
      width:80,
      height:80,
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
  iconsHealthTipDateTime:{
    marginLeft:5,
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center',

  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
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
  dealsValueContainer:{
    backgroundColor:'#fc6203',
    color:'#fff',
    borderRadius:5,
    padding:5,
    
  },
  dealsValueAmount:{
    color:'#fff'
  },
  dealsValueMessage:{
    color:'#fff'
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
