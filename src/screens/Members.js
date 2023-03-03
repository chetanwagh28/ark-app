import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,ScrollView,StatusBar, SafeAreaView, Alert } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab, CardItem,Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating, Header } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import {profileActions} from '../action';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';



var {width, height} = Dimensions.get('screen')
width = width

class Members extends Component {

    constructor(props){
        super(props);
        this.state={
            members: [],
            loader: false,
            showAlert: false,
            id: ''
        }
        //console.disableYellowBox = true;
        this.deleteMember = this.deleteMember.bind(this)
        this.getProfile = this.getProfile.bind(this)
        
    }
    showAlert = (id) => {
      this.setState({
        showAlert: true,
        id: id
      });
    };
   
    hideAlert = () => {
      this.setState({
        showAlert: false,
        id: ''
      });
    };

    async getProfile(){
      let contact_no = '';
      let userToken = null;
      try {
          userToken = await AsyncStorage.getItem('userToken');
          // // console.log(jwtdecode(userToken))
          contact_no = jwtdecode(userToken).contact_no
          const { dispatch } = this.props;
          dispatch(profileActions.getProfileByNumber(contact_no)).then(res=>{
            if(res.status === 200 && !Array.isArray(res.data)){
                // // console.log("res",res)
                this.setState({
                  members: res.data.linkedUser,
                  loader: false
                })            
            }
          })
      } catch(e) {
          // console.log(e);
      }
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.setState({loader: true})
        this.getProfile()
      });
    }

    deleteMember = () =>{
      // // console.log("cancelled-->>",id)
      const { dispatch } = this.props;
      dispatch(profileActions.removeMember(this.state.id)).then(res=>{
        if(res.status ===200){
          this.getProfile()
          Alert.alert(res.data, '', [
                  {text: 'Close'}
              ]);  
          this.hideAlert()
        }
      });
    }

    UNSAFE_componentWillReceiveProps(nextProps){    
       
        if(nextProps.serverDown){
            setTimeout(function(){
              Alert.alert('Server Down', '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(profileActions.resetFirstState())
            }.bind(this),1500); 
        }
     
    }


    render() {
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
            leftComponent={<>
                    <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                  </>}
            centerComponent={<><Text style={style.PageTitle}>Members</Text></>}
            rightComponent={<><Icon name="add-circle-outline" size={25} color="#fff" onPress={() => this.props.navigation.navigate("AddMember")}></Icon></>}
          />
          
            <ScrollView>
                <View style={styles.containerView}>
                    <View style={styles.listOfAllCards}>
                      {this.state.loader && 
                          <SkeletonLoader />
                      }
                      <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Remove Member"
                        message="Are you sure?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No"
                        confirmText="Yes, Remove it"
                        confirmButtonColor="#DD6B55"
                        onCancelPressed={() => {
                          this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                          this.deleteMember();
                        }}
                      />
                      <FlatList  
                          data={this.state.members}  
                          numColumns = {1}
                          columnWrapperStyle={styles.cardRow}
                          renderItem={({item}) =>  {
 
                            return(
                              <Animatable.View>
                                <Card key={item.key} style={styles.cardListView}>
                                  <Card.Content>
                                     
                                      <View style={{width: '100%', flexDirection:'row',  alignItems:'center'}}>
                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',marginRight:10,width: '20%'}}>
                                                <View style={styles.profileImageContainer}>
                                                  <Avatar.Image  source={{ uri: utilityHelper.ProfilePic(item.display_pic) }} style={styles.profile_image} size={60} />
                                                </View>
                                          </View>
                                          
                                          <View style={{flexDirection:'column', marginRight:10,width: '65%'}}>
                                              <Paragraph style={styles.doctorName}>Name: {item.member_name} </Paragraph>
                                              <Paragraph style={styles.doctorName}>Relationship: {item.relationship} </Paragraph>
                                              <Paragraph style={styles.doctorName}>Problem: {item.health_problem_title || ''} </Paragraph>
                                              <Paragraph style={styles.doctorName}>Age: {item.age || ''} </Paragraph>
                                              <Paragraph style={styles.doctorName}>Weight: {item.weight || ''} </Paragraph>
                                              <Paragraph style={styles.doctorName}>Height: {item.height || ''} </Paragraph>
                                                                     
                                          </View>
                                          <View style={{justifyContent : 'flex-end', width: '10%', marginTop:0}}>
                                            <Icon name="ios-trash" size={20} style={styles.trashButton} onPress={() => this.showAlert(item.id) }></Icon>
                                          </View>
                                      </View>
                                  
                                  </Card.Content>
                                </Card>
                              
                              </Animatable.View>
                            )}
                          }
                          ListEmptyComponent={(<Card>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}>  No Members.</Text>
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

Members.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, serverDown } = state.profileReducer;
  // // console.log("myAppoinementList",loader)
  return {
    loader,
    serverDown
  };    
}

export default connect(mapStateToProps)(Members);

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
    justifyContent: 'center',
    alignItems: 'center',

  },
  doctorName:{
    fontWeight:'bold'
  },
  contentList:{
    marginTop: 10,
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
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
  trashButton:{
    color:'red',
    marginRight:5
  },
});
