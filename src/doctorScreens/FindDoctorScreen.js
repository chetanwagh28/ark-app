import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem } from 'native-base';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import {doctorActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocalizationContext} from './Translations';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import {_, isEmpty} from 'lodash';
import style from '../assets/style.js';


class FindDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            categroy: '',
            specialization: '',
            specialization_key: '',
            referDetail: '',
            value: 5,
            user_id: '',
        }
        //console.disableYellowBox = true;
        this.referToDoctor = this.referToDoctor.bind(this)
    }
    componentDidMount(){

      this.getProfile();
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        // // console.log("data",this.props.route.params)
        this.setState({
          categroy: this.props.route.params.categroy,
          specialization: this.props.route.params.specialization,
          specialization_key: this.props.route.params.specialization_key,
          referDetail: this.props.route.params.referDetail,
        })
        // let url = `/doctor/getdoctorsbyspecialization?specialization=${this.props.route.params.specialization_key}&distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
        // const { dispatch } = this.props;
        // dispatch(doctorActions.getDoctorsBySpecializationD(url));
      });
    }

    apiCall = () => {
      
      let url = `/doctor/getdoctorsbyspecialization/${this.state.user_id}?specialization=${this.state.specialization_key}&distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
      const { dispatch } = this.props;
      dispatch(doctorActions.getDoctorsBySpecializationD(url));
    }

    getProfile = async() => {
      let userDetailData;
          userDetailData = null;
          try {
            userDetailData = await AsyncStorage.getItem('userDetail');
            // // console.log(userDetailData)
            this.setState({user_id: JSON.parse(userDetailData).user_id});

            this.apiCall()
          } catch(e) {
            // console.log(e);
          }
    }

    addTOFavorite(item){
        // let data = {
        //           doctor_id: item.doc_id,
        //           user_id : this.state.user_id
        //         }
        // // console.log(item.doc_id,'------')
        const { dispatch } = this.props;
        dispatch(doctorActions.addfavorite(item.doc_id)).then((res) => {
            // // console.log("res",res)
            if(res.status === 200){
                Alert.alert('Favorite Successfully!', '', [
                    { text: 'OK'}
                ]);
                this.apiCall()
            }
        })
    }

    referToDoctor(item){
        let data = {
                      "referred_by": this.state.referDetail.doc_id,
                      "referred_to_id": item.doc_id,
                      "referred_to_name": item.name,
                      "patient_id": this.state.referDetail.patient_id
                  }
        // // console.log(data)
        const { dispatch } = this.props;
        dispatch(doctorActions.referToDoctor(data));

        Alert.alert('Successfully Referred!', '', [
            { text: 'OK', onPress: () =>  this.props.navigation.navigate("PatientDetail", { patientDetail: this.state.referDetail})}
        ]);
    }
    
    removedTOFavorite(item){
        // let data = {
        //           id: item.id,
        //           user_id : this.state.user_id
        //         }
        // // console.log(item.doc_id,'------')
        const { dispatch } = this.props;
        dispatch(doctorActions.removefavorite(item.favorite_id)).then((res) => {
            // // console.log("res",res)
            if(res.status === 200){
                Alert.alert('Removed Favorite!', '', [
                    { text: 'OK'}
                ]);
                this.apiCall()
            }
        })
    }

    render() {
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;

        // // console.log("referDetail--",this.state.referDetail)
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:4, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>{this.state.specialization}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={style.container}>
            <ScrollView>
                
                <View style={styles.searchHead}>

                  <View style={{flexDirection: 'row', width: "100%"}}>
                    <TextInput 
                        placeholder="Search, City"
                        style={styles.textInput}
                        autoCapitalize="none"
                        name="city"
                        onChangeText={(city) => this.setState({city: city})}
                        onEndEditing={this.searchFilter}
                    />
                    <TextInput 
                        placeholder="Search, Doctor Name"
                        style={styles.textInput1}
                        autoCapitalize="none"
                        name="name"
                        onChangeText={(name) => this.setState({name: name})}
                        onEndEditing={this.searchFilter}
                    />
                  </View>  

                </View>  

                <View style={styles.listOfAllCards}>
                {this.props.loader && 
                          <SkeletonLoader />
                      }
                  <FlatList  
                      data={this.props.doctorList.data}  
                      numColumns = {1}
                      renderItem={({item}) =>  
                      (this.state.referDetail.doc_id !== item.doc_id) &&
                        <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                            <Card key={item.key} style={styles.cardListView}>
                              <Card.Content>
                                  <View style={{flexDirection:'row', width: "100%"}}>
                                      <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between'}}>
                                          <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.display_pic) }} style={styles.profile_image} size={60} />
                                            <View style={styles.rating_container}>
                                              <MaterialIcons size={30} name={(item.favorite === 1) ? "favorite" : "favorite-border"} color='#ed8b40' onPress={() => this.addTOFavorite(item)}/>
                                            </View>
                                      </View>
                                      
                                      <View style={{width: "75%"}}>
                                          <Paragraph>Dr. {item.name} </Paragraph>
                                          <Paragraph>{item.expirience || 0} Years Experience</Paragraph>
                                          <Paragraph>Qualification: {utilityHelper.EducationComma(item.educational_qualification)}</Paragraph>
                                          {!_.isEmpty(this.state.referDetail) &&
                                            (<View>
                                              <TouchableOpacity onPress={this.referToDoctor.bind(this,item)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                  <Text style={styles.commonAppButtonText}>Refer</Text>
                                                </LinearGradient>
                                              </TouchableOpacity>
                                            </View>)
                                          }
                                      </View>
                                  </View>

                                  
                              </Card.Content>
                            </Card>
                        </Animatable.View>
                      }

                      ListEmptyComponent={(<Card >
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Present In... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
                  />  
                </View>
            
            </ScrollView>
           </Content>
        </Container>
      );
    }
}

FindDoctor.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, doctorList } = state.doctorReducer;
  // // console.log("doctorList",doctorList)
  return {
    doctorList,
    loader
  };    
}

export default connect(mapStateToProps)(FindDoctor);



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
    marginLeft: 0,
    marginRight: 0,
    backgroundColor:'#273f61',
    paddingLeft:10,
    paddingRight:10,
    padding:5

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
    height:150,
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
    flexDirection: 'row',
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
      marginRight:15
  }
});
