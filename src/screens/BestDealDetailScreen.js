import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView, Alert, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, TextInput, Paragraph, RadioButton } from 'react-native-paper';
import { Rating, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {vendorActions} from '../action';
var {width, height} = Dimensions.get('window')
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'
import HTML from "react-native-render-html";
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';



class BestDealDetailScreen extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
            categroy: 'Best Deal',
            doctorDetail: '',
            text: '',
            detail: ''
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        const { dispatch } = this.props;
        if(this.props.route.params?.type){
          dispatch(vendorActions.offerDetail(this.props.route.params.id));
        }else{
          this.setState({
            categroy: this.props.route.params.vendorCat,
            detail: this.props.route.params.offerDetail 
          })
          dispatch(vendorActions.offerDetail(this.props.route.params.offerDetail.id));
        }

      });

    }
    
    generateCode = () => {

      const { dispatch, offerData } = this.props;
      let offer_info = {offer_info: offerData, offer_id: offerData.offer_id}
      dispatch(vendorActions.offerCode(offer_info)).then(res=>{
        if(res.status === 200){
          console.log("res.data", res.data)
          Alert.alert("Coupon Code", res.data.coupon, [
              {text: 'Close', onPress: () =>  this.props.navigation.navigate("Home")}
          ]);  
        }
      })
      
    }
    render() {
      const {offerData} = this.props
      // console.log("detail", detail)  
      const { goBack } = this.props.navigation;
      
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{this.state.categroy}</Title></>}
                rightComponent={<>
                  </>}
              />
          <ScrollView>
                <View style={styles.containerView}>
                    {offerData !== '' &&
                      <Card style={styles.cardListView}>
                        <Card.Content>
                            
                            <View style={{flexDirection:'row', width: "100%"}}>
                                
                              <View style={{width: "30%"}}>  
                                <Image style={styles.profile_image}  source={{ uri: utilityHelper.BestDealPic(offerData.image) }} />
                              </View>  
                              <View style={{width: "50%", padding: 3}}>
                                <Paragraph style={{color:'#000',  fontSize: 20, marginTop: 5, padding:1}}> {offerData.offer_title}</Paragraph>
                              </View>  
                              <View style={{flexDirection:'column', marginTop: 5, backgroundColor:'#fff'}}>
                                <Text style={{fontSize: 20, backgroundColor: '#fc6203', padding: 10, borderRadius: 5}}>{offerData.discount_percent}%</Text>  
                                <Text style={{fontSize: 14, marginLeft:25}}>Off</Text>  
                              </View>
                            </View>
                            
                            <View>
                              <Text>{offerData.description}</Text>
                              {offerData.content && (<HTML source={{ html: JSON.parse(offerData.content)}} />)}
                            </View>



                            <View style={{flexDirection:'column', width: '100%'}}>
                              <View style={{flexDirection:"row",flex:1, marginTop:5, width: '100%', backgroundColor: '#00B2B6', padding: 10, borderRadius: 5}}>
                                <View style={{marginRight:10, justifyContent: 'flex-start', width: '65%'}}><Text style={{fontSize: 14, color: '#ffffff'}}>Use your Reward money</Text></View>
                                  <View
                                    style={{
                                      width: 105,
                                      padding: 2,
                                      paddingLeft: 20,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      height: 25}}>
                                    <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>Rs. {offerData.rewards}</Text>
                                  </View>
                                
                              </View>


                              <View style={{flexDirection:"row",flex:1, marginTop:5,  width: '100%'}}>
                                <View style={{marginRight:10, justifyContent: 'flex-start', width: '65%'}}><Text style={{fontSize: 20, color: '#00B2B6'}}>Payable Amount</Text></View>
                                
                              </View>

                              <View style={{flexDirection:"row",flex:1, marginTop:5, width: '100%'}}>
                                <View style={{marginRight:10, justifyContent: 'flex-start', width: '65%'}}><Text>Original Price</Text></View>
                                  <View
                                    style={{
                                      width: 105,
                                      padding: 2,
                                      paddingLeft: 20,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: '#fc6203',
                                      height: 25,
                                      borderRadius:12.5
                                    }}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>{offerData.original_price}</Text>
                                  </View>
                              </View>
                              <View style={{flexDirection:"row",flex:1, marginTop:5, width: '100%'}}>
                                <View style={{marginRight:10, justifyContent: 'flex-start', width: '65%'}}><Text>Discount ({offerData.rewards} + {offerData.normal_discounted_amount})</Text></View>
                                  <View
                                    style={{
                                      width: 105,
                                      padding: 2,
                                      paddingLeft: 20,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: '#fc6203',
                                      height: 25,
                                      borderRadius:12.5
                                    }}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>-{parseInt(offerData.rewards) + parseInt(offerData.normal_discounted_amount)}</Text>
                                    
                                  </View>
                              </View>
                              

                              <View style={{flexDirection:"row",flex:1, marginTop:5, width: '100%'}}>
                                <View style={{marginRight:10, justifyContent: 'flex-start',  width: '65%'}}><Text>Total</Text></View>
                                <View
                                  style={{
                                    width: 105,
                                    padding: 2,
                                    paddingLeft: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fc6203',
                                    height: 25,
                                    borderRadius:12.5
                                  }}>
                                  <Text style={{color: '#FFF', fontWeight: 'bold'}}>{offerData.payable_amount}</Text>
                                </View>
                              </View>
                            </View>


                            
                        </Card.Content>
                      </Card>
                    }

                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 50}}>
                  <TouchableOpacity>
                    <Btn textColor='black' bgColor={lightgreen} btnLabel={"Generate Coupon Code"} Press={() => this.generateCode()} width={250}/>
                  </TouchableOpacity>
                  <Text style={{marginTop: 5, padding: 10, color: '#000'}}>Coupon Code is valid for only 30 days</Text>
                </View>
            </ScrollView>
          {/*
          <Footer style={styles.footerContainer}>
            <FooterTab 
              style={styles.footerTabs} 
              >
                <Button style={styles.footerTabsButton} onPress={() => this.generateCode()}>
                  <Text style={styles.commonAppButton}>Generate Coupon Code</Text>
                </Button>
            </FooterTab>
           
          </Footer>*/}
        </SafeAreaView>
      );
    }
}
function mapStateToProps(state) { 
  const { loader, offerData, codeGenerate } = state.vendorReducer;
  // console.log("offerData",offerData)
  return {
    offerData,
    loader,
    codeGenerate
  };    
}

export default connect(mapStateToProps)(BestDealDetailScreen);

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerView: {
    margin: 0,
    marginTop: 0,
  },
  searchHead:{

  },
  textInput: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 20,
    backgroundColor: '#ffffff'
  },
  profile_image:{
      width:100,
      height:100,
 
  },
  categroy: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  cardListView: {
    borderWidth: 0,
    margin: 5,
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
    padding:1,
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
    width:60,
    height:60,
    borderWidth:1,
    borderRadius:60/2
  },
  titleView:{
    fontSize:14,
    width: 60
  },
  call_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  clinic_photo_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  direction_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  select_date_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  select_time_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  book_appointment_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  pay_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',    
  },
  review_textarea:{
    marginLeft:10,
    marginRight:10
  },
  commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#000000',
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  },
  iconsHealthTipDateTime:{
    marginLeft:10
  },

  footerContainer:{
    borderRadius: 100,
    backgroundColor:'#00B2B6',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  footerTabs:{
    backgroundColor:'#00B2B6',
    borderWidth: 0,
    borderRadius:300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTabsButton:{
    flexDirection: 'row',
    backgroundColor:'#ffffff',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1,      
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 1,     
    borderRadius: 5,
    marginLeft:10,
    marginRight:10,
  },
 
});
