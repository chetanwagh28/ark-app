import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Modal, TouchableHighlight, Alert } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Rating, Slider, Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Btn from '../Constants/Btn';
import {black, darkGreen, lightgreen} from '../Constants/Constants';
import {productActions} from '../action';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, Button, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from "react-native-easy-grid";
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'
import InputSpinner from "react-native-input-spinner";


var {width, height} = Dimensions.get('screen')
 width = width

class kartScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            user: '',
            name: '',
            city: '',
            value: 5,
            modalVisible: false,
            getCat: false,
            myproducts: '',
            total:''
        }
        //console.disableYellowBox = true;
    }

   

    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.myKart()
      });
    }

    myKart = () => {
      // this.setState({getCat: false})
      const { dispatch } = this.props;
      dispatch(productActions.myProducts())
    }

    removeFromKart= (item) => {
      let data = {
                  "user_id" : item.user_id, 
                  "cart_id" : item.cart_id
                }
      const { dispatch } = this.props;
      dispatch(productActions.removeProduct(data)).then(res => {
        // // console.log('====',res)
        // Alert.alert("Remove From Cart", "", [
        //       {text: 'Close'}
        //   ]);
        this.myKart();
      })
    }
    
    editKart= (num,item,index) => {
      // console.log(num,item)
      let data = {
                  "user_id" : item.user_id, 
                  "cart_id" : item.cart_id,
                  "quantity" : num,
                  "product_id" : item.product_id
                }
      // let myproducts = Object.assign(this.state.myproducts); // Pull the entire myproducts object out. Using object.assign is a good idea for objects.
      // myproducts.products[index].quantity = num; // update the myproducts object as needed
   
      const { dispatch } = this.props;
      dispatch(productActions.editProduct(data)).then(res => {
        // console.log('====',res)
        this.myKart()
      })
    }

    checkout = (total) => {
        this.props.navigation.navigate('ShippingScreen');
    }

    
    totalPrice = (price, qty) => {
     
      return price * qty
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   // console.log("nextProps.myproducts", nextProps.myproducts)
    //   if (nextProps.myproducts.amount !== prevState.myproducts.amount && !prevState.getCat) {
    //     // if(nextProps.myproducts.amount){
    //       return ({ 
    //         myproducts: nextProps.myproducts,
    //         getCat: true
    //       })
    //     // } 
    //   }
    //   return null
    // }

    // {"amount":"500","currency":"INR","receipt":"su001","payment_capture":"1"}

    renderPrice = () => {
      if(this.props.myproducts){
         return <View style={{marginVertical: 10, padding: 16, marginBottom: 10, width: "100%"}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Price Details</Text>
                        <View style={{flexDirection:'row', marginVertical:10, justifyContent : 'flex-start', width: "100%"}}>

                          <View style={{flexDirection:'column', width: "85%"}}>
                              <Text>Price ({this.props.myproducts?.products && this.props.myproducts?.products.length || ''} items)</Text>
                              <Text>Discount</Text>
                          </View>

                          <View style={{flexDirection:'column'}}>
                              <Text><FontAwesome name="rupee" size={16}/>{this.props.myproducts?.amount}</Text>                            
                              <Text style={{color: '#00B2B6'}}>-<FontAwesome name="rupee" size={16}/>{this.props.myproducts?.walletDiscount}</Text>                            
                          </View> 
                        </View>
                        <View style={{flexDirection:'row', paddingVertical:10, justifyContent : 'flex-start', width: "100%", borderTopWidth: 1, borderTopColor: '#00B2B6', borderBottomWidth: 1, borderBottomColor: '#00B2B6'}}>

                          <View style={{flexDirection:'column', width: "85%"}}>
                              <Text>Total Amount</Text>
                          </View>

                          <View style={{flexDirection:'column'}}>
                              <Text><FontAwesome name="rupee" size={16}/>{this.props.myproducts?.amountAfterAalletApply}</Text>                            
                          </View> 
                        </View>
                      </View>
      }
    }

    render() {
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
        var total;
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>Products</Title></>}
                rightComponent={<>
                  </>}
              />

            <ScrollView>
              <View style={styles.containerView}>
                    <View style={styles.listOfAllCards}>
                      {this.props.loader && 
                          <SkeletonLoader />
                      } 
                        <FlatList  
                            data={this.props.myproducts?.products || []}  
                            columnWrapperStyle={styles.cardRow}
                            renderItem={({item, index}) =>{
                              total=item.sale_price*item.quantity;
                              return(
                                  <Card style={styles.cardListView}>
                                    <Card.Content>

              
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#ffffff'}}>

                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#ffffff',marginRight:10}}>
                                                <View style={styles.profileImageContainer}>
                                                <Image source={{ uri: utilityHelper.ProfilePic(item.product_image) }} style={styles.profile_image} />
                                                </View>
                                          </View>

                                          <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start',backgroundColor:'#ffffff',marginRight:10}}>
                                              <Paragraph style={styles.doctorName}>{item.product_name}</Paragraph>
                                              <Paragraph style={{fontSize: 16,marginLeft:5}}><FontAwesome name="rupee" size={16}/><Text style={{ fontSize: 14, fontWeight: 'bold', textDecorationLine: 'line-through' }}>{this.totalPrice(item.price, item.quantity)}</Text></Paragraph>
                                              <Paragraph><Text style={{}} ><FontAwesome name="rupee" size={16}/>{this.totalPrice(item.sale_price, item.quantity)}</Text></Paragraph>
                                              
                                          </View> 
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                              <InputSpinner
                                                height={35}
                                                width={100}
                                                max={10}
                                                min={0}
                                                step={1}
                                                colorMax={"#00B2B6"}
                                                colorMin={"#00B2B6"}
                                                value={item.quantity}
                                                onChange={(num) => this.editKart(num,item,index)}
                                              />
                                              <TouchableOpacity  onPress={() => this.removeFromKart(item)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                    <Text style={styles.commonAppButtonText}>Remove</Text>
                                                </LinearGradient>
                                              </TouchableOpacity> 
                                        </View>
                                      
                                    </Card.Content>
                                  </Card>
                              )
                              }
                            }
                            keyExtractor={item => item.cart_id}
                            ListEmptyComponent={(<Card>
                                                <Card.Content>
                                                  <Text> Cart is empty </Text>
                                                </Card.Content>
                                                </Card>)}
                        />  
                    </View>
                    {this.props.myproducts?.amount && this.renderPrice()}
              </View> 
            {this.props.myproducts?.amount &&
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {/*<TouchableOpacity>
                  <Btn textColor='black' bgColor={lightgreen} btnLabel={<Text style={[styles.commonAppButton,{color:'#cca31d'}]}>Total: <FontAwesome name="rupee" size={16}/>{this.props.myproducts?.amountAfterAalletApply}</Text>} width={250}/>
                </TouchableOpacity>*/}

                <TouchableOpacity>
                  <Btn textColor='black' bgColor={darkGreen} btnLabel={<Text style={styles.commonAppButton}>Checkout</Text>} Press={() => this.checkout(total)} width={250}/>
                </TouchableOpacity>
              </View>
            }

            </ScrollView>
        </SafeAreaView>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, myproducts } = state.productReducer;
  // console.log("myproducts",myproducts)
  return {
    myproducts,
    loader
  };    
}

export default connect(mapStateToProps)(kartScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    backgroundColor: '#ffffff'
  },
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
  containerView: {
    margin: 0,
    marginTop: 0
  },
  distanceLabel:{
    lineHeight:35,
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
    width: "100%",
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardListView: {
    borderWidth: 0,
    // backgroundColor: '#00B2B6',  
    // height:150,
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
  HealthTipTitleStyle:{
    width:'100%'
  },
  rating_container:{
    marginTop:10,
    marginRight:15
  },
  contentList:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo:{
    width:80,
    height:80,
    borderWidth:1,
    borderRadius:60/2
  },
  fees_display_text:{
      fontSize:14,
      color:'black'
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
    textAlign:'center'
  },
  book_appointment_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
  },

  profile_image:{
      width:80,
      height:80,
      marginRight:15
  },
  commonAppButton:{
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
  commonAppButtonText: {
    color: '#ffffff',
    fontSize:14,
    fontWeight:'bold'
      // color: '#fff',
      // fontSize:12
  },  
  iconsHealthTipDateTime:{
    marginLeft:5,
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center',

  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
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
  dealsValueContainer:{
    backgroundColor:'#C91975',
    color:'#fff',
    borderRadius:5,
    padding:5,
    
  },
  dealsValueAmount:{
    color:'#fff'
  },
  dealsValueMessage:{
    color:'#fff'
  },

  centeredView: {
    marginTop:"50%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
       
  },
  modalView: {
    margin: 5,
    backgroundColor: "#ffffff",
    // borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '85%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  footerContainer:{
    borderRadius: 15,
    backgroundColor:'#dcf7fa',
  },
  footerTabs:{
    backgroundColor:'#dcf7fa',
    borderWidth: 0,
    // backgroundColor:'#ffffff',
    // borderWidth: 0,
    // borderRadius:200,

  },
  footerTabsButton:{
    flexDirection: 'row',
    borderTopColor: '#00B2B6',
    borderTopWidth: 1,
    borderRightColor: '#00B2B6',
    borderRightWidth: 1,      
    borderBottomColor: '#00B2B6',
    borderBottomWidth: 1,
    borderLeftColor: '#00B2B6',
    borderLeftWidth: 1,     
    borderRadius: 15 ,
    marginLeft:15,
    marginRight:15,
    marginBottom:35
  },
});
