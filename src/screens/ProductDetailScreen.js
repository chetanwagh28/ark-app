import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, TouchableOpacity , Dimensions, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, RadioButton, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { Rating, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Button, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import style from '../assets/style.js';
import {productActions} from '../action';
import {utilityHelper} from '../helper/utilityHelper'
var {width, height} = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTML from "react-native-render-html";



class ProductDetailScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            user_id: '',
            quantity: '1',
            productDetail: '',
            submit: false
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){

      
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        const { dispatch } = this.props;
        if(this.props.route.params?.type){
          let userDetail = null;
          try {
              userDetail = await AsyncStorage.getItem('userDetail');
              // // console.log("userDetail-->>",userDetail)
              let user_id = JSON.parse(userDetail).user_id
              this.setState({user_id: user_id})
          } catch(e) {
              // console.log(e);
          }
          dispatch(productActions.getProduct(this.props.route.params.id))
        }else{
          this.setState({
            productDetail: this.props.route.params.product,
            user_id: this.props.route.params.user_id,
          })
        }
      });

    }

    handleChange = (value, name) => {
      this.setState({ [name] : value})
    }

    addToKart = () => {
      let data = {
                "user_id" : this.state.user_id,
                "product_id" : this.state.productDetail.product_id,
                "quantity" : this.state.quantity
              }
      const { dispatch } = this.props;
      dispatch(productActions.addProduct(data)).then(res => {
        // // console.log('====',res)
        Alert.alert("Add To Cart", "", [
              {text: 'Close'}
          ]);
        let d = utilityHelper.AddTOKartCount(this.state.productDetail.product_id)
        // dispatch(productActions.setKart(d))
        // .checkKartCount(this.state.productDetail.product_id)
      })
    }

    buy = () => {
      let data = {
                "user_id" : this.state.user_id,
                "product_id" : this.state.productDetail.product_id,
                "quantity" : this.state.quantity
              }
      const { dispatch } = this.props;
      dispatch(productActions.addProduct(data)).then(res => {
        // // console.log('====',res)
        Alert.alert("Add To Cart", "", [
              {text: 'Close', onPress: () =>  this.props.navigation.navigate('ShippingScreen')}
          ]);
        utilityHelper.AddTOKartCount(this.state.productDetail.product_id)

      })
    }

 
    render() {
        
      var productDetail = this.state.productDetail;
        
      if(this.props.productDetail){
        productDetail = this.props.productDetail;
      }

      const { goBack } = this.props.navigation;
      // console.log('productDetail',productDetail)

      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{productDetail !== '' && productDetail.title }</Title></>}
                rightComponent={<>
                  </>}
              />
              <ScrollView>
                <View>
                    {productDetail !== '' &&
                      <Card>
                        <Card.Cover  resizeMode="contain" source={{ uri: utilityHelper.ProfilePic(productDetail.product_image) }}/>
                        <Card.Title title={productDetail.product_name} titleVariant={'titleMedium'} titleNumberOfLines={3}/>
                        <Card.Content style={{padding: 5, margin: 5}}>
                            
                            <View style={{flexDirection:'column'}}>
                                <Paragraph style={{fontSize: 14, color:'#000',marginTop:5}}>Price: Rs.<Text style={{ fontSize: 16, fontWeight: 'bold', textDecorationLine: 'line-through' }}>{productDetail.price}  </Text> 
                                  <Text style={{fontSize: 18, fontWeight: 'bold'}} >{productDetail.sale_price}</Text>
                                </Paragraph>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:'center',marginTop:5}}>
                              <View style={{marginRight:10, marginTop: 10}}><Text>Discount On Product</Text></View>
                                  <View
                                    style={{
                                      width: 75,
                                      padding: 10,
                                      paddingLeft: 20,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: '#fc6203',
                                      height: 40,
                                      borderRadius:12.5
                                    }}>
                                    <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>{productDetail.discount_percent}%</Text>
                                  </View>
                            </View>     
                            <View style={{flexDirection:'row',backgroundColor:'#ffffff',marginRight:10, marginTop:30,marginBottom:10,borderColor:'grey',borderWidth:0.5,borderRadius:5,height:50}}>
                                  <Text style={{marginLeft:10,marginTop:13}}>Quantity: </Text>
                                  <Picker
                                    style={{ height: 30, width:200 }}
                                    itemTextStyle={{fontSize: 8}}
                                    activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                    iosHeader="Select Qty"
                                    placeholder="Select Qty"
                                    mode="popup"
                                    selectedValue={this.state.quantity}
                                    onValueChange={(quantity) => this.handleChange(quantity, 'quantity')}
                                  >
                                  <Picker.Item label="1" value="1" />
                                  <Picker.Item label="2" value="2" />
                                  <Picker.Item label="3" value="3" />
                                  <Picker.Item label="4" value="4" />
                                  <Picker.Item label="5" value="5" />
                                  <Picker.Item label="6" value="6" />
                                  <Picker.Item label="7" value="7" />
                                  <Picker.Item label="8" value="8" />
                                  <Picker.Item label="9" value="9" />
                                  <Picker.Item label="10" value="10" />
                                                                    
                                </Picker> 
                              </View>
                              
                            <View style={{flexDirection:'column', paddingHorizontal: 10, alignItems: 'center', justifyContent : 'flex-start'}}>
                                <Text>{productDetail.product_description}</Text>
                                {productDetail.content && (<HTML source={{ html: JSON.parse(productDetail.content)}} />)}
                                

                            </View>
                          </Card.Content>

                          <Card.Actions>  
                            <Button Press={() => this.addToKart()}>Add to cart</Button>
                            <Button Press={() => this.buy()}>Buy</Button>
                            
                            {/*<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginBottom: 20 }}>
                              <TouchableOpacity>
                                <Btn textColor='black' bgColor={lightgreen} btnLabel={"Add to cart"} Press={() => this.addToKart()} width={120}/>
                              </TouchableOpacity>

                              <TouchableOpacity>
                                <Btn textColor='black' bgColor={lightgreen} btnLabel={"Buy"} Press={() => this.buy()} width={120}/>
                              </TouchableOpacity>
                            </View>*/}
                          </Card.Actions>
                      </Card>
                    }

                </View>
            </ScrollView>

          {/*<Footer style={styles.footerContainer}>
            <FooterTab 
              style={styles.footerTabs} 
              >
                <Button style={styles.footerTabsButton} onPress={() => this.addToKart()}>
                  <Text style={styles.commonAppButton}>Add to cart</Text>
                </Button>
            </FooterTab>
            <FooterTab 
              style={styles.footerTabs} 
              >
                <Button style={styles.footerTabsButton} onPress={() => this.buy()}>
                  <Text style={styles.commonAppButton}>Buy</Text>
                </Button>
            </FooterTab>
           
          </Footer>*/}
        </SafeAreaView>
      );
    }
}
function mapStateToProps(state) { 
  const { loader, productDetail } = state.productReducer;
  // console.log("productDetail",productDetail)
  return {
    productDetail,
    loader
  };    
}
export default connect(mapStateToProps)(ProductDetailScreen);

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: '100%',
    height: 500,
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    width: 200,
    flexWrap:'wrap',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerView: {
    margin: 0,
    padding: 0,
    marginTop: 0,
    width: '100%'
    // backgroundColor:'#ffffff'
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
  categroy: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  cardListView: {
    borderWidth: 0,
    marginHorizontal:5,
    marginVertical:5,
    alignItems: 'flex-start',
    height:'auto',
    backgroundColor: 'white',    
    borderColor:'#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    width: width-10,
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    // textAlign:'left',
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
  health_tips_details_banner_image:{
    width:"100%",
    height: 200,
    marginBottom:10,
    backgroundColor: '#ffffff'
  },
  footerContainer:{
    borderRadius: 15,
    backgroundColor:'#dcf7fa',
  },
  footerTabs:{
    backgroundColor:'#dcf7fa',
    borderWidth: 0,
    borderRadius: 15,
  },
  footerTabsButton:{
    flexDirection: 'row',
    backgroundColor:'#00B2B6',
    borderTopColor: '#00B2B6',
    borderTopWidth: 1,
    borderRightColor: '#00B2B6',
    borderRightWidth: 1,      
    borderBottomColor: '#00B2B6',
    borderBottomWidth: 1,
    borderLeftColor: '#00B2B6',
    borderLeftWidth: 1,     
    borderRadius: 15,
    marginLeft:10,
    marginRight:10,
  },
 
});
