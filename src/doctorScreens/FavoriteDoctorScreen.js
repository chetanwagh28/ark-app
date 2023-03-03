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
import jwtdecode from 'jwt-decode'
import AwesomeAlert from 'react-native-awesome-alerts';
import {_, isEmpty} from 'lodash';
import style from '../assets/style.js';


class FavoriteDoctor extends Component {

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
            cityArg: '',
            favoriteList: [],
            favorite_id: ''
        }
        //console.disableYellowBox = true;
        this.referToDoctor = this.referToDoctor.bind(this)
    }
    componentDidMount(){
      // this.getProfile()
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        // // console.log("data",this.props.route.params)
        if(this.props.route.params){
          this.setState({
            referDetail: this.props.route.params.referDetail,
          })
        }
        this.apiCall()

      });
    }
    apiCall = () => {
        const { dispatch } = this.props;
        dispatch(doctorActions.getfavorite()).then((res) => {
            // // console.log("res",res)
            if(res.status === 200){
                if(res.data.length > 0){
                  this.setState({favoriteList: res.data})
                }else{
                  this.props.navigation.navigate('FindCategory',{referDetail: this.state.referDetail})
                }
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

        this.setState({
          showAlert: true,
          favorite_id: item.favorite_id
        })
    }
    hideAlert(){

        this.setState({
          showAlert: false,
          favorite_id: ""
        })
    }
    deleteFavorite(){

        const { dispatch } = this.props;
        dispatch(doctorActions.removefavorite(this.state.favorite_id)).then((res) => {
            // // console.log("res",res)
            if(res.status === 200){
              
                Alert.alert('Removed Favorite!', '', [
                    { text: 'OK'}
                ]);
                this.hideAlert();
                this.apiCall();
            }
        })
    }

    render() {
        // // console.log("referDetail",this.state.referDetail)
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>Favorite Doctors</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={style.container}>
            <ScrollView>
              <View style={styles.containerView}>
                <AwesomeAlert
                  show={this.state.showAlert}
                  showProgress={false}
                  title="Remove from favorite"
                  message="Are you sure?"
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="No, cancel"
                  confirmText="Yes, removed it"
                  confirmButtonColor="#DD6B55"
                  onCancelPressed={() => {
                    this.hideAlert();
                  }}
                  onConfirmPressed={() => {
                    this.deleteFavorite();
                  }}
                />
                
                <View style={styles.listOfAllCards}>
                {this.props.loader && 
                          <SkeletonLoader />
                      }
                  <FlatList  
                      data={this.state.favoriteList}  
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
                                             
                                              <MaterialIcons size={30} name={"favorite"} color='#ed8b40' onPress={() => this.removedTOFavorite(item)}/> 
                                            </View>
                                      </View>
                                      
                                      <View style={{width: "75%"}}>
                                          <Paragraph>Dr. {item.name} </Paragraph>
                                          <Paragraph>{item.expirience || 0} Years Experience</Paragraph>
                                          <Paragraph>{item.en_spec || ''}</Paragraph>
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

                                  <View style={styles.contentList}>
                                           
                                      <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems:'center',width:'100%' }}>
                                          <View style={styles.button}>
                                             
                                          </View>
                                      </View>    
                                  </View>
                              
                              </Card.Content>
                            </Card>
                        </Animatable.View>
                      }

                      ListEmptyComponent={(<Card >
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#ffffff'}}>  No Data Present In... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
                  />  
                </View>
                </View> 
            
            </ScrollView>
           </Content>
           <Footer>
            <FooterTab style={{backgroundColor:"#00B2B6", justifyContent:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('FindCategory',{referDetail: this.state.referDetail})}>  
                <Icon name="add-circle-outline" size={50} color="#ffffff" backgroundColor="#ffffff" ></Icon>
              </TouchableOpacity>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
}

FavoriteDoctor.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, doctorList } = state.doctorReducer;
  // // console.log("doctorList",doctorList)
  return {
    doctorList,
    loader
  };    
}

export default connect(mapStateToProps)(FavoriteDoctor);



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
    backgroundColor:'#00CBCC',
    paddingLeft:10,
    paddingRight:10

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
    borderRadius: 15,
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
