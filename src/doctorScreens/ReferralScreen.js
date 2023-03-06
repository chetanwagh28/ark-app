import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,ScrollView,StatusBar,SafeAreaView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Badge } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {doctorActions} from '../action';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
var {width, height} = Dimensions.get('screen')


class Referral extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            status: '',
            getList: false,
            doctorReferral: [],
            filterList: [],
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.setState({getList: false})
          const { dispatch } = this.props;
          dispatch(doctorActions.getDoctorReferrals());
      });
    }

    filter = (text) => {
      if(text === 'all'){
        this.setState({
          doctorReferral: this.state.filterList,
          status: text,
        });
        return false
      }
      //passing the inserted text in textinput
      const newData = this.state.filterList.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.status ? item.status.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        doctorReferral: newData,
        status: text,
      });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      // // console.log(nextProps.doctorReferral) 
      if (nextProps.doctorReferral !== prevState.doctorReferral && !prevState.getList) {
        if(nextProps.doctorReferral.length > 0){
          return ({ 
            doctorReferral: nextProps.doctorReferral,
            filterList: nextProps.doctorReferral,
            getList: true
          })
        } 
      }
      return null
    }
    render() {
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
              leftComponent={<>
                      <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                    </>}
              centerComponent={<><Title style={style.PageTitle}>Referral</Title></>}
              rightComponent={<></>}
            />
            <ScrollView style={style.container}>
              <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
                <View style={styles.containerView}>
                  <View>
                     <Picker
                          style={{ height: 30, width: "100%", color:'grey', fontWeight: 'bold' }}
                          itemTextStyle={{fontSize: 8}}
                          activeItemTextStyle={{fontSize: 8, fontWeight: 'bold'}}
                          iosHeader="Choose Status"
                          placeholder="Choose Status"
                          selectedValue={this.state.status}
                          mode="dialog"
                          onValueChange={(status) => this.filter(status)} >
                            <Picker.Item label="All" value="all" />
                            <Picker.Item label="Booked" value="booked" />
                            <Picker.Item label="Cancelled" value="cancelled" />
                            <Picker.Item label="Completed" value="completed" />
                          
                      </Picker>
                  </View>
                {/*
                <View style={styles.searchHead}>

                  <View style={{ width: "100%"}}>
                    <TextInput 
                        placeholder="Search, Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        name="search"
                        onChangeText={(search) => setState(search)}
                    />
                    
                  </View>  

                </View>  
                */}
                  <View style={styles.listOfAllCards}>
                  {this.props.loader && 
                            <SkeletonLoader />
                        }
                    <FlatList  
                        data={this.state.doctorReferral}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                           // // console.log(item)
                          let colorsCode = '#000080'
                          if(item.status === 'cancelled'){
                            colorsCode = '#FF3333'
                          }else if(item.status === 'completed'){
                            colorsCode = '#008000'
                          }else if(item.status === 'booked'){
                            colorsCode = '#F7A000'
                          }else{
                            colorsCode = '#000080'
                          }
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView}>
                                  <Card.Content>
                                      <View style={{flexDirection:'row', width: '90%',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff' ,marginHorizontal: 5}}>
                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff'}}>
                                                <View style={styles.profileImageContainer}>
                                                    <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.display_pic) }} style={styles.profile_image} size={90} />
                                                </View>
                                                <TouchableOpacity>
                                                  <LinearGradient colors={[colorsCode, colorsCode]}  style={styles.commonAppButton}>
                                                    <Text style={styles.commonAppButtonText}>{utilityHelper.capitalize(item.status === null ? 'pending' : item.status)}</Text>
                                                  </LinearGradient>
                                              </TouchableOpacity>
                                          </View>
                                          
                                          <View style={{flexDirection: 'column', width: '70%' ,marginHorizontal: 5}}>
                                            <LinearGradient colors={['#00B2B6', '#00B286']}  style={style.commonAppButton}>
                                              <Text style={styles.commonAppButtonText}>Dr. {item.referred_doc_name} </Text>
                                            </LinearGradient>
                                            <Paragraph>Specilization: {item.en_spec} </Paragraph>

                                            <Paragraph>Name: {item.patient_name} </Paragraph>
                                            <Paragraph>Information: {item.health_problem_title} </Paragraph>

                                            <Paragraph>Date :  {new Date(item.created_at).toDateString()}</Paragraph>
                                            
                                                                    
                                          </View>                            
                                      </View>
                                    {/*
                                      <View style={styles.contentList}>
                                        <View style={styles.buttonContainer}>
                                              <TouchableOpacity>
                                                  <LinearGradient colors={[colorsCode, colorsCode]}  style={styles.commonAppButton}>
                                                    <Text style={styles.commonAppButtonText}>{utilityHelper.capitalize(item.status === null ? 'pending' : item.status)}</Text>
                                                  </LinearGradient>
                                              </TouchableOpacity>
                                              
                                              <TouchableOpacity>
                                                  <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                                    <Text style={styles.commonAppButtonText}>Ref: Dr. {item.referred_doc_name} </Text>
                                                  </LinearGradient>
                                              </TouchableOpacity>

                                          </View>  
                                      </View>
                                    */}
                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )}
                        }

                        ListEmptyComponent={(<Card>
                                                  <Card.Content>
                                                    <Text style={{textAlign: 'center', color: '#000'}}>  No Data Found.</Text>
                                                  </Card.Content>
                                              </Card>)}
                    />  
                  </View>
                </View> 
            </ScrollView>
        </SafeAreaView>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, doctorReferral } = state.doctorReducer;
  // // console.log("doctorReferral",doctorReferral)
  return {
    doctorReferral,
    loader
  };    
}

export default connect(mapStateToProps)(Referral);

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
    backgroundColor: '#ffffff'
  },
  containerView: {
    margin: 0,
    marginTop: 0
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
    marginHorizontal: 10
  },
  cardListView: {
    borderWidth: 0,
    alignItems: 'flex-start',
    height:200,
    backgroundColor: '#ffffff',    
    borderColor:'#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    width: width-30,
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    textAlign:'left',
    padding:5,
    marginTop:5,
    borderRadius:5,
    marginHorizontal: 2,
    color:'#fff'
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
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12,
  },
  pending:{
    height: 35,
    backgroundColor: '#000080',
    shadowColor: '#000080',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  booked:{
    height: 35,
    backgroundColor: '#F7A000',
    shadowColor: '#F7A000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  cancelled:{
    height: 35,
    backgroundColor: '#FF3333',
    shadowColor: '#FF3333',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  completed:{
    height: 35,
    backgroundColor: '#008000',
    shadowColor: '#008000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  }
});
