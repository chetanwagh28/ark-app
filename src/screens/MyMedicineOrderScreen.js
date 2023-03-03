import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Dimensions,ScrollView,StatusBar,Linking } from 'react-native';
import { Avatar, Card,  Title, TextInput, Paragraph, Button } from 'react-native-paper';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {medicalActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';
import { configConstants } from '../constant';
import {isEmpty} from 'lodash';
var {width, height} = Dimensions.get('screen')
 width = width


class MyMedicineOrder extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            listData: [  
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}
                  ]
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          const { dispatch } = this.props;
          dispatch(medicalActions.getPatientOrderList());
      });
    }

    render() {
      const translations = this.context.translations;
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>{translations['My_Order_Medicines']}</Title></>}
                rightComponent={<>
                  </>}
              />
          <ScrollView >
            <View style={styles.containerView}>
              <LinearGradient colors={['#dcf7fa', '#dcf7fa']} style={styles.listOfAllCards}>
                <FlatList  
                    data={this.props.medicalOrderList}  
                    numColumns = {1}
                    renderItem={({item, index}) =>{
                        // // console.log(item)
                        let colorsCode = '#000080'
                        let colorsFont = '#fff'
                        let status = ""
                        if(item.status === 2){
                          colorsCode = '#FF3333'
                          status = "Cancel"
                        }else if(item.status === 1){
                          colorsCode = '#008000'
                          status = "Complete"
                        }else if(item.status === 0){
                          colorsFont = '#000'
                          colorsCode = '#FFFF00'
                          status = "Pending"
                        }
                        return(
                              <Animatable.View>
                                  <Card key={item.key} style={styles.cardListView}>
                                    <Card.Content>
                                      
                                        <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                                  
                                            </View>
                                            
                                            <View>
                                                <Paragraph>Medical: {item.medical_name} </Paragraph>
                                                <Paragraph>Patient Name: {item.name} </Paragraph>
                                                <Paragraph>Mobile No: {item.contact_no} </Paragraph>
                                                <Paragraph>Address: {item.address} </Paragraph>
                                                <Paragraph>Pincode: {item.pincode} </Paragraph>

                                                  <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>  
                                                    <Paragraph>{translations['status']} :  </Paragraph>
                                                    <TouchableOpacity>
                                                            <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                              <Text style={[style.commonAppButtonText, {color: colorsFont}]}>{status}</Text>
                                                            </LinearGradient>
                                                        </TouchableOpacity>
                                                  </View>
                                            </View>                            
                                        </View>

                                        <View style={styles.contentList}>
                                          <View style={styles.buttonContainer}>
                                                

                                                <TouchableOpacity 
                                                  // onPress={() => Communications.phonecall('8817837860', true)}
                                                  >
                                                    <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                      <Text style={style.commonAppButtonText}>{translations['call']}</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                                {/*<TouchableOpacity onPress={() => this.props.navigation.navigate("Chat", {chatData: item})}>
                                                    <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                      <Text style={style.commonAppButtonText}>{translations['chat']}</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>*/}

                                                {!isEmpty(item.prescription_url) && 
                                                  <TouchableOpacity onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}>
                                                      <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                        <Text style={style.commonAppButtonText}>{"View prescription"}</Text>
                                                      </LinearGradient>
                                                  </TouchableOpacity>
                                                }
                                            </View>  
                                        </View>
                                    
                                    </Card.Content>
                                  </Card>
                              </Animatable.View>
                            )
                        }
                    }
                    ListEmptyComponent={(<Card style={style.containerCard1}>
                                              <Card.Content>
                                                <Text> No Medicine Order Found </Text>
                                              </Card.Content>
                                              </Card>)}
                />  
              </LinearGradient>
            </View> 
          </ScrollView>
        </SafeAreaView>
      );
    }
}

MyMedicineOrder.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, medicalOrderList } = state.medicalReducer;
  // // console.log("medicalOrderList",medicalOrderList)
  return {
    medicalOrderList,
    loader
  };    
}

export default connect(mapStateToProps)(MyMedicineOrder);

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerLogoContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'space-between'
  },
  PageTitle:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#00B2B6'
  },
  searchHead: {
    marginLeft: 10,
    marginRight: 10,
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
    width: "49%",
    marginTop: 10,
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
    width: "49%",
    marginTop: 10,
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
    marginHorizontal:10,
    marginVertical:5,
    width:width-20
  },
  rating_container:{
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentList:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center'
  },

  cancel_button:{
      marginRight: 5,
      backgroundColor:'#00B2B6',
  },
  
  call_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  
  direction_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
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
commonAppButtonText:{
  color:'#fff',
  fontSize:12  
},
});
