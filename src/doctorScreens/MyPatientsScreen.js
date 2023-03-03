import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,ScrollView,StatusBar } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab, CardItem,Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Badge } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import {patientActions} from '../action';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
var {width, height} = Dimensions.get('screen')
 width = width

class MyPatients extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            status: '',
            getList: false,
            patientsList: [],
            filterList: [],
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.setState({getList: false})
        const { dispatch } = this.props;
        dispatch(patientActions.getMyPatientsList());
      });
    }

    check = (status) => {
      if(status === 'cancelled'){
        return (<FontAwesome name="ban" size={20} color="#FF3333"></FontAwesome>)
      }else if(status === 'completed'){
        return (<Icon name="checkmark-circle-outline" size={20} color="#06D755"></Icon>)
      }else{
        return (<FontAwesome name="address-book" size={20} color="#F7A000"></FontAwesome>)
      }
    }

    filter = (text) => {
      if(text === 'all'){
        this.setState({
          patientsList: this.state.filterList,
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
        patientsList: newData,
        status: text,
      });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      // // console.log(nextProps.patientsList) 
      if (nextProps.patientsList !== prevState.patientsList && !prevState.getList) {
        if(nextProps.patientsList.length > 0){
          return ({ 
            patientsList: nextProps.patientsList,
            filterList: nextProps.patientsList,
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
                  <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                    <Icon name="ios-arrow-back" size={25} color="#ffffff" onPress={() => goBack()}></Icon>
                  </Left>
                  <Body style={{ flex:4, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                    <Title style={styles.PageTitle}>My Patients</Title>
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
                      <View style={{flexDirection: 'row', width: "100%"}}>
                        <TextInput 
                            placeholder="Search, City"
                            style={styles.textInput}
                            autoCapitalize="none"
                            name="search"
                            onChangeText={(search) => setState(search)}
                        />
                        <TextInput 
                            placeholder="Search, Symptoms"
                            style={styles.textInput1}
                            autoCapitalize="none"
                            name="search"
                            onChangeText={(search) => setState(search)}
                        />
                      </View>  

                    </View>  */}

                    <View style={styles.listOfAllCards}>
                    {this.props.loader && 
                          <SkeletonLoader />
                      }
                      <FlatList  
                          data={this.state.patientsList}  
                          numColumns = {1}
                          columnWrapperStyle={styles.cardRow}
                          renderItem={({item}) =>  {
                            // // console.log("item",item)
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
                            return(
                              <Animatable.View>
                                  <Card key={item.key} style={styles.cardListView} onPress={() => this.props.navigation.navigate('PatientHistory', {
                                  patientDetail: item
                                })}>
                                    <Card.Content>

                                        <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                                  <View style={styles.profileImageContainer}>
                                                    <Avatar.Image source={{ uri: utilityHelper.ProfilePic(item.display_pic) }} style={styles.profile_image} size={90} />
                                                  </View>
                                                  <TouchableOpacity>
                                                      <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                        <Text style={styles.commonAppButtonText}>{utilityHelper.capitalize(item.status === null ? 'pending' : item.status)}</Text>
                                                      </LinearGradient>
                                                  </TouchableOpacity>
                                            </View>
                                            
                                            <View>
                                                <Paragraph style={styles.doctorName}>Name: {item.name} </Paragraph>
                                                
                                                <Paragraph>Information :  {item.health_problem_title}</Paragraph>
                                                <Paragraph>Payment :  {item.appointment_type}</Paragraph>
                                                
                                                <Paragraph>Clinic :  {item.clinic_name}</Paragraph>
                                                <Paragraph style={{width: 200, flexWrap: "wrap"}}>Date/Time :  {utilityHelper.DateFormat(item.appointment_date) + ' / ' + item.appointment_time}</Paragraph>
                                                <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>  
                                                 
                                                </View> 

                                            </View>                            
                                        </View>

                                       
                                    
                                    </Card.Content>
                                  </Card>
                              </Animatable.View>
                            )}
                          }
                          ListEmptyComponent={(<Card >
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No My Patients.</Text>
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
  const { loader, patientsList } = state.patientReducer;
  // // console.log("patientsList",patientsList)
  return {
    patientsList,
    loader
  };    
}

export default connect(mapStateToProps)(MyPatients);

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
    backgroundColor: '#fff'
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
    // width: "85%",
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
    margin:5,
    width:width-20
  },
  rating_container:{
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  doctorName:{
    fontWeight:'bold'
  },
  contentList:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center'
  },

  buttonContainer:{
    flex: 1,
    alignItems:'center'
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
  commonAppButton:{
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
