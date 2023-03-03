import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView , Alert, Dimensions, CheckBox, Linking, RefreshControl } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem } from 'native-base';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import jwtdecode from 'jwt-decode'
import {medicalActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import {LocalizationContext} from '../screens/Translations';
import DateTimePicker from '@react-native-community/datetimepicker';
import SkeletonLoader from '../components/SkeletonLoader';
import { configConstants } from '../constant';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';


class InquiriesHistory extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            specialization: '',
            specialization_key: '',
            myMedicinList: [],
            appoinementList: [],
            allChecked: false,
            field: "from_date",
            date: new Date(),
            from_date: new Date(),
            to_date: new Date(),
            mode: 'datetime',
            show: false,
            showAlert: false,
            Orderid: '',
            clinic_id: '',
            loading: false
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.setState({myMedicinList: []})
          let data = {
                      state_date: new Date().toISOString().substr(0, 10),
                      end_date: new Date().toISOString().substr(0, 10),
                      clinic_id: ''
                  }
          // // console.log("data",data)        
          const { dispatch } = this.props;
          dispatch(medicalActions.getSharePrescriptionList());
      });
    }

    loadMoreData = () => {
        // // console.log("=========")     
        this.setState({loading: true})        
        const { dispatch } = this.props;
        dispatch(medicalActions.getSharePrescriptionList());

        setTimeout(() => {
          this.setState({loading: false})
        }, 2000);
          
    }

    

    UNSAFE_componentWillReceiveProps(nextProps){
      // console.log("nextProps.MedicalHistory",nextProps.MedicalHistory)
        if(nextProps.MedicalHistory && nextProps.myMedicinList.length > 0){
             nextProps.myMedicinList.map((row) => 
              {
                 row.isChecked = false 
                 return row
              }
            ) 
            this.setState({ myMedicinList: nextProps.myMedicinList, appoinementList: nextProps.myMedicinList }) // <- this is setState equivalent
            const { dispatch } = this.props;
            dispatch(medicalActions.resetFirstState())
        }
    }
    

    
    render() {
        
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;

        const { showAlert, show, date, mode, from_date, to_date, clinic_id } = this.state;
        // // console.log(this.state.allChecked)
      return (
        <Container>
          <Header style={styles.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>Order History</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={style.container}>
            <ScrollView>
              <View style={styles.containerView}>
               
                <View style={styles.searchHead}>
                   

                </View>
                <View style={styles.listOfAllCards}>
                  {this.props.loader && 
                          <SkeletonLoader />
                      }
                  <ScrollView refreshControl={
                          <RefreshControl
                            enabled={true}
                            refreshing={this.state.loading}
                            onRefresh={this.loadMoreData}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                          />
                        }>
                  <FlatList  
                      data={this.state.myMedicinList}  
                      numColumns = {1}
                      renderItem={({ item, index }) => {
                        let colorsCode = '#000080'
                        let status = 'Pending'
                            if(item.status === 2){
                              colorsCode = '#FF3333'
                              status = 'Cancel'
                            }else if(item.status === 1){
                              colorsCode = '#008000'
                              status = 'Completed'
                            }else{
                              colorsCode = '#000080'
                              status = 'Pending'
                            }
                          // // console.log(index,'----', item)
                        return(
                        <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                            <Card style={styles.cardListView} >
                              <Card.Content>
                                  <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'center', padding: 10}}>
                                      
                                      <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start'}}>
                                          <Paragraph>Name: {item.name} </Paragraph>
                                          <Paragraph>Address: {item.address}</Paragraph>
                                          <Paragraph>Date: {utilityHelper.DateFormat(item.created_at)}</Paragraph>
                                          <Paragraph>Prescription: <Icon name="download" size={25} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon></Paragraph>
                                          <View style={{flexDirection:'row'}}>
                                          <Paragraph>Status: </Paragraph>

                                          <TouchableOpacity>
                                              <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}>{status}</Text>
                                              </LinearGradient>
                                          </TouchableOpacity>
                                          </View>
                                      </View>
                                      
                                  </View>
                              
                              </Card.Content>
                            </Card>
                          </Animatable.View>)
                      }}

                      ListEmptyComponent={(<Card >
                                                <CardItem  header style={style.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Present In... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
                  />  
                  </ScrollView>
                </View>
              </View> 
            </ScrollView>
           </Content>
        </Container>
      );
    }
}

InquiriesHistory.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, myMedicinList, MedicalHistory } = state.medicalReducer;
  // // console.log("myMedicinList",myMedicinList)
  return {
    myMedicinList,
    MedicalHistory,
    loader
  };    
}

export default connect(mapStateToProps)(InquiriesHistory);



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
    backgroundColor:'#00CBCC',
    paddingBottom:5,
    paddingTop:5

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
    height:180,
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
      marginRight:15,
      marginBottom: 70
  },
  trashButton:{
    color:'red',
    marginTop:7,
    marginLeft:0
  },
  trashButtonH: {
    color:'red',
    // marginRight: 25
  },
  checkbox: {
    // marginBottom:150
  },
  search: {
    marginTop: 5,
    marginRight: 30
  }
});
