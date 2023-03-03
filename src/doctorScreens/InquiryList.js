import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,ScrollView,StatusBar,Linking } from 'react-native';
import { Avatar, Card,  Title, TextInput, Paragraph, Button } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import {adsActions} from '../action';
import * as Animatable from 'react-native-animatable';
import { Badge } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
// import {LocalizationContext} from './Translations';
import style from '../assets/style.js';
import { configConstants } from '../constant';
import {isEmpty} from 'lodash';
var {width, height} = Dimensions.get('screen')
 width = width
import {utilityHelper} from '../helper/utilityHelper'

class InquiryList extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            myAdsInquiry:   [
        {
            "id": 2,
            "user_id": "13137880",
            "adds_id": 6,
            "subject": "dddd",
            "message": "dsgsgsgdsg",
            "created_at": "2022-04-08T12:55:38.000Z",
            "updated_at": "2022-04-08T13:11:20.000Z",
            "is_deleted": 0,
            "name": "Anchal Singh",
            "adds_title": "ttttttttttttttt",
            "company_name": "test company1"
        },
        {
            "id": 1,
            "user_id": "13137880",
            "adds_id": 6,
            "subject": "dddd",
            "message": "josn@gds.in",
            "created_at": "2022-04-08T12:54:35.000Z",
            "updated_at": "2022-04-08T13:11:20.000Z",
            "is_deleted": 0,
            "name": "Anchal Singh",
            "adds_title": "ttttttttttttttt",
            "company_name": "test company1"
        }
    ]
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          const { dispatch } = this.props;
          dispatch(adsActions.myInquries());
      });
    }

    render() {
      // const translations = this.context.translations;
        const { goBack } = this.props.navigation;
      return (
        <ScrollView style={style.container}>
          <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
            <View >
              
                <Header style={style.appHeader} >
                  <Left style={{ flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
                    <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                  </Left>
                  <Body style={{ flex:4,flexDirection:'row', justifyContent:'center'}}>
                    <Title style={styles.PageTitle}>My Inquiries</Title>
                  </Body>
                  <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              
                  </Right>                     
                </Header>
                

                <View >
              
               
                <LinearGradient colors={['#dcf7fa', '#dcf7fa']} style={styles.listOfAllCards}>
                  <FlatList  
                      data={this.props.myAdsInquiry}  
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
                                              
                                              <View>
                                                  <Paragraph>Company: {item.company_name} </Paragraph>
                                                  <Paragraph>Title: {item.adds_title} </Paragraph>
                                                  <Paragraph>Subject: {item.subject} </Paragraph>
                                                  <Paragraph>Message: {item.message} </Paragraph>

                                                    <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>  
                                                      <Paragraph>Status: </Paragraph>
                                                      <TouchableOpacity>
                                                              <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                                <Text style={[style.commonAppButtonText, {color: colorsFont}]}>{status}</Text>
                                                              </LinearGradient>
                                                      </TouchableOpacity>
                                                      <Paragraph>Date;  {utilityHelper.DateFormat(item.created_at)}</Paragraph>
                                                    </View>
                                              </View>                            
                                          </View>
                                      
                                      </Card.Content>
                                    </Card>
                                </Animatable.View>
                              )
                          }
                      }
                      ListEmptyComponent={(<Card style={style.containerCard1}>
                                                <CardItem>
                                                  <Text> No Inquiries Found </Text>
                                                </CardItem>
                                                </Card>)}
                  />  
                </LinearGradient>
                </View> 
        


              
            </View>
        </ScrollView>
      );
    }
}


function mapStateToProps(state) { 
  const { loader, myAdsInquiry } = state.adsReducer;
  console.log("myAdsInquiry",myAdsInquiry)
  return {
    myAdsInquiry,
    loader
  };    
}

export default connect(mapStateToProps)(InquiryList);

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
    marginVertical:10,
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
