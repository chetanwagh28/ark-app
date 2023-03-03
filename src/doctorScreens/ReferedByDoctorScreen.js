import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,ScrollView,StatusBar } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Badge } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
import {doctorActions} from '../action';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
var {width, height} = Dimensions.get('screen')


class ReferedDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            status: '',
            getList: false,
            doctorReferred: [],
            filterList: [],
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.setState({getList: false})
          const { dispatch } = this.props;
          dispatch(doctorActions.getDoctorReferred());
      });
    }

    filter = (text) => {
      if(text === 'all'){
        this.setState({
          doctorReferred: this.state.filterList,
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
        doctorReferred: newData,
        status: text,
      });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      // // console.log(nextProps.doctorReferred) 
      if (nextProps.doctorReferred !== prevState.doctorReferred && !prevState.getList) {
        if(nextProps.doctorReferred.length > 0){
          return ({ 
            doctorReferred: nextProps.doctorReferred,
            filterList: nextProps.doctorReferred,
            getList: true
          })
        } 
      }
      return null
    }

    render() {
        const { goBack } = this.props.navigation;
      return (
        <ScrollView style={style.container}>
          <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
            <View style={styles.containerView}>
              
                <Header style={style.appHeader} >
                  <Left style={{ flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
                    <Icon name="ios-arrow-back" size={25} color="#ffffff" onPress={() => goBack()}></Icon>
                  </Left>
                  <Body style={{ flex:4,flexDirection:'row', justifyContent:'center'}}>
                    <Title style={styles.PageTitle}>Referred Patient</Title>
                  </Body>
                  <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              
                  </Right>                     
                </Header>
                

                <View style={styles.containerView}>
                  <View style={style.dropdown}>
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
                {/*<View style={styles.searchHead}>

                  <View style={{ width: "100%"}}>
                    <TextInput 
                        placeholder="Search, Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        name="search"
                        onChangeText={(search) => setState(search)}
                    />
                    
                  </View>  

                </View>*/}  

                <View style={styles.listOfAllCards}>
                {this.props.loader && 
                    <SkeletonLoader />
                }
                  <FlatList  
                      data={this.state.doctorReferred}  
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
                                  
                                  <View style={{flexDirection:'row', width: '90%',marginHorizontal: 5,  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                      <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                            <View style={styles.profileImageContainer}>
                                                <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.display_pic) }} style={styles.profile_image} size={90} />
                                            </View>
                                            <TouchableOpacity>
                                                <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                  <Text style={styles.commonAppButtonText}>{utilityHelper.capitalize(item.status === null ? 'pending' : item.status)}</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            
                                      </View>
                                      
                                      <View style={{flexDirection: 'column', width: '70%' ,marginRight: 5}}>
                                          <LinearGradient colors={['#00B2B6', '#00B286']}  style={style.commonAppButton}>
                                            <Text style={styles.commonAppButtonText}>Dr. {item.refer_doc_name} </Text>
                                          </LinearGradient>

                                          <Paragraph>{item.en_spec} </Paragraph>

                                          <Paragraph>Name: {item.patient_name} </Paragraph>
                                          <Paragraph>Information: {item.health_problem_title} </Paragraph>
                                          <Paragraph>Date :  {new Date(item.created_at).toDateString()}</Paragraph>
                                         
                                      </View>                            
                                  </View>

                              
                              </Card.Content>
                            </Card>
                        </Animatable.View>)
                        }
                      }

                      ListEmptyComponent={(<Card >
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Found.</Text>
                                                </CardItem>
                                            </Card>)}
                  />  
                </View>
                </View> 
            </View>
        </ScrollView>
      );
    }
}


function mapStateToProps(state) { 
  const { loader, doctorReferred } = state.doctorReducer;
  // // console.log("doctorReferred",doctorReferred)
  return {
    doctorReferred,
    loader
  };    
}

export default connect(mapStateToProps)(ReferedDoctor);

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
  },
  cardListView: {
    borderWidth: 0,
    alignItems: 'flex-start',
    // height:200,
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
    borderRadius: 15,
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
