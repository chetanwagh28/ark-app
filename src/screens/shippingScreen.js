import React, {Component} from 'react';
import {connect} from 'react-redux'
import { View, Text, StyleSheet, Dimensions, TextInput, CheckBox, ScrollView, Alert, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
// import { Container, Header, Left, Icon, Body, Right, Content, CardItem } from 'native-base';
import { Title, RadioButton, Divider, Card, Paragraph } from 'react-native-paper';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from 'react-native-elements';
import styles from '../assets/style.js';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { productActions, profileActions } from '../action';
import { informationActions } from '../action/informationAction';
import RazorpayCheckout from 'react-native-razorpay';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configConstants } from '../constant';
import _ from 'lodash';
import {utilityHelper} from '../helper/utilityHelper'



var {width, height} = Dimensions.get('screen')
 width = width
class ShippingScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            total: '',
            email:'',
            address:'',
            apartment:'',
            city:'',
            country:'',
            user: '',
            checked: ''
        }
    }
    getProfile = async() => {
      let user = '';
      let user_id = '';
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            user = jwtdecode(userToken)
            this.setState({user: user})

            user_id = jwtdecode(userToken).user_id
            const { dispatch } = this.props;
            dispatch(profileActions.getWallet(user_id));
        } catch(e) {
            // console.log(e);
        }
    }
  myKart = () => {
      this.setState({getCat: false})
      const { dispatch } = this.props;
      dispatch(productActions.myProducts())
    }
  componentDidMount(){
    this.getProfile()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        const { dispatch } = this.props;
        dispatch(informationActions.getAddressList())
        this.myKart()
    });
  } 

  payout = () => {
      let amount = this.props.myproducts?.amountAfterAalletApply*100

      let data = {"walletDiscount": this.props.myproducts?.walletDiscount, "amount": amount ,"currency":"INR", "receipt":"su001", "payment_capture":"1", "address_id": this.state.checked ? this.state.checked : this.props.addressList.length > 0 ? this.props.addressList[0].id : ""}
        const { dispatch } = this.props;
        dispatch(productActions.getOrderId(data)).then(res => {
          if(res.status === 200){
                let response = res.data
                var options = {
                    description: 'AVARK pvt ltd',
                    image: 'https://avark.in/wp-content/uploads/2020/08/avark-logo.png',
                    currency: 'INR',
                    key: configConstants.PAYMENT_KEY, // Your api key
                    amount: response.amount,
                    name: 'AVARK',
                    order_id: response.id,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
                    prefill: {
                      email: this.state.user.email,
                      contact: this.state.user.contact_no,
                      name: this.state.user.name
                    },
                    theme: {color: '#00B2B6'}
                }
                RazorpayCheckout.open(options).then((data) => {
                  // handle success
                  const { dispatch } = this.props;
                  dispatch(productActions.verifyOrder(data)).then(res => {
                      if(res.status === 200){
                        Alert.alert("Successfully", "Order booked", [
                            {text: 'Close'}
                        ]);
                        this.myKart();
                        this.props.navigation.navigate('kartScreen')
                      }
                  })
                }).catch((error) => {
                  // handle failure
                  Alert.alert("Cancel", "Payment has been cancelled", [
                            {text: 'Close'}
                        ]);
                });
          }else{
            Alert.alert("Server Down", "Try again after some time", [
                            {text: 'Close'}
                        ]);
          }        
        })
    }

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


                        <View style={{flexDirection:'row', paddingVertical:10, marginTop: 10, justifyContent : 'flex-start', width: "100%", height:80, borderTopWidth:1,borderBottomWidth:1,borderTopColor:'#e7e7e7',borderBottomColor:'#e7e7e7'}}>
                            <View style={{flexDirection:'row', width: "85%"}}>
                              <Icon name="md-cart" style={{color:'#2279b6',marginTop:13}}></Icon>      
                              <Text style={{color:'#2279b6',marginTop:20,marginLeft:20,fontWeight:'bold'}}>Show order summary </Text>
                            </View>
                            <View style={{flexDirection:'column'}}>
                              <Text style={{fontWeight:'bold',marginRight:10,marginTop:20,fontSize:16}}><FontAwesome name="rupee" size={16}/>{this.props.myproducts?.amountAfterAalletApply}</Text>
                            </View>
                        </View>

                      </View>
      }
    }  

    totalPrice = (price, qty) => {
     
      return price * qty
    }
  
  render(){
      const { goBack } = this.props.navigation;
      return(
        <SafeAreaView style={style.container}>
          <Header 
                  // backgroundColor="#00b2b6"
                  // placement={"center"}
                  ViewComponent={LinearGradient} // Don't forget this!
                  linearGradientProps={{
                              colors: ['#7AB3B7', '#C2CD3F', '#2E7475'],
                              start: { x: 2.5, y: 0.8 },
                              end: { x: 1, y: 1.5 },
                            }}
                  containerStyle={{
                      // backgroundColor: '#3D6DCC',
                      justifyContent: 'space-around',
                      // height: 200,
                    }}
                  barStyle="light-content" // or directly

                // leftComponent={<><Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon></>}
                // centerComponent={<><Title style={styles.logoText}>{translations['doctor_details']}</Title></>}
                // rightComponent={<></>}
              >
              <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => this.props.navigation.navigate('kartScreen')}></Icon>
              <Title style={{color: "#fff"}}>Payment</Title>
            </Header>
        <ScrollView style={style.textbox}>

          <View style={styles.listOfAllCards}>
            <ScrollView>
              <FlatList  
                  data={this.props.myproducts?.products || []}  
                  // columnWrapperStyle={styles.cardRow}
                  renderItem={({item, index}) =>{
                    // console.log("item.product_image", item.product_image)
                    return(
                        <Card style={styles.cardListView}>
                          <Card.Content>


                            <View style={{flexDirection:'row', justifyContent : 'flex-start', width: "100%"}}>

                                <View style={{ alignItems: 'center', justifyContent : 'center', width: "15%"}}>
                                    <Image source={{ uri: utilityHelper.ProfilePic(item.product_image) }} style={{height: 40, width: 40}} />
                                </View>

                                <View style={{flexDirection:'column', width: "100%"}}>
                                    <Paragraph style={{fontSize: 10, width: "85%"}}>{item.product_name}</Paragraph>
                                  <View style={{flexDirection:'row'}}>
                                    <Paragraph style={{fontSize: 10,marginLeft:5, marginRight: 10}}>QTY: {item.quantity}</Paragraph>
                                    <Paragraph style={{fontSize: 10,marginLeft:5, marginRight: 10}}>Price: <FontAwesome name="rupee" size={10}/><Text style={{ fontSize: 10, fontWeight: 'bold', textDecorationLine: 'line-through' }}>{this.totalPrice(item.price, item.quantity)}</Text></Paragraph>
                                    <Paragraph><FontAwesome name="rupee" size={12}/>{this.totalPrice(item.sale_price, item.quantity)}</Paragraph>  
                                  </View> 
                                </View> 
                              </View>
                          </Card.Content>
                        </Card>
                    )
                    }
                  }
                  keyExtractor={item => item.cart_id}
              />  
            </ScrollView>  
          </View>
          <Divider />
          {this.renderPrice()}

            
                        
          
        {/*
          <View style={{flexDirection:'row', justifyContent: 'space-between',backgroundColor:'#fafafa',height:80,borderTopWidth:1,borderBottomWidth:1,borderTopColor:'#e7e7e7',borderBottomColor:'#e7e7e7'}}>
          <Text style={{fontWeight:'bold',marginRight:10,marginTop:20,fontSize:16}}>Reward: {_.get(this.props, 'walletBalance[0].amount', [''])}</Text>       
          </View>
        */}  
          <View style={{flexDirection:'row',marginTop:20}}>
            <Text style={{color:'#00B2B6',marginLeft:20,fontWeight:'bold'}}> Cart </Text>
            <Icon name="" style={{color:'#2279b6'}}></Icon> 
            <Text style={{color:'#00B2B6',fontWeight:'bold'}}> Information </Text>
            <Icon name="" style={{color:'#2279b6'}}></Icon>
            <Text style={{fontWeight:'bold',color:'orange'}}> Shipping </Text>
            <Icon name="" style={{color:'#2279b6'}}></Icon>
            <Text style={{color:'grey'}}> Payment </Text>
         </View>

         <View>

           
           <View style={{height: 1.5, backgroundColor:'#e7e7e7',marginLeft:10,marginRight:10}}></View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:20,marginRight:20}}>
                    <Text style={{fontWeight:'bold'}}>Ship to</Text>
                    <Text style={{color:'#2279b6',fontWeight:'bold'}} onPress={()=> this.props.navigation.navigate('InformationScreen',{total:0})}>Change</Text>
                </View>

                <Divider />
                {this.props.addressList.length > 0 ? this.props.addressList.map(row=>{
                  return(
                  <>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '85%'}}>
                    <Text style={{marginLeft:20,marginTop:5}}>Name: {row.name}  </Text>
                    <Text style={{marginLeft:20,marginTop:5}}>Contact No: {row.phone_number} </Text>
                    <Text style={{marginLeft:20,marginTop:5}}>Email: {row.email}</Text>
                    <Text style={{marginLeft:20,marginTop:5}}>Address: {row.address_details},{row.landmark} {row.city}  {row.state}-{row.pincode}</Text>
                    </View>
                    <View>
                     <RadioButton
                      value={row.id}
                      status={ this.state.checked === row.id ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({checked: row.id})}
                    />
                    </View>
                  </View>
                  <Divider />
                  </>
                  )
                }) : 
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('InformationScreen',{total:0})}>
                    <Text>Add address</Text>
                  </TouchableOpacity>
                }
          
          <View style={style.textbox2}>
              <View style={{flexDirection:'row'}}>
                <Icon name="" style={{color:'#2279b6',marginTop:13,marginLeft:20}}></Icon>      
                <Text style={{color:'#2279b6',marginTop:20,marginLeft:20,fontWeight:'bold'}}> Standard Shipping </Text>
              </View>
             <Text style={{fontWeight:'bold',marginRight:20,marginTop:20,fontSize:16}}></Text>
          </View>
          <View style={{flexDirection:'column', justifyContent: 'center', padding:10}}>

            <TouchableOpacity onPress={() => this.payout()}>
              <View style={{borderRadius: 15,backgroundColor:'#00B2B6',borderWidth:1,height:46,marginBottom:10}}> 
                 <Text style={{color:'#ffffff',alignSelf:'center',marginTop:10,fontSize:15,fontWeight:'bold'}}>On-line Payment</Text>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => Alert.alert("Cash on delivery", "COD not available for this product", [
                            {text: 'Close'}
                        ])}>
              <View style={{borderRadius: 15, backgroundColor:'#00B2B6',borderWidth:1,height:46,marginBottom:10}}> 
                 <Text style={{color:'#ffffff',alignSelf:'center',marginTop:10,fontSize:15,fontWeight:'bold'}}>Cash Payment</Text>
              </View>
            </TouchableOpacity> 
          </View>
          <TouchableOpacity style={{alignSelf:'center', marginBottom: 20}} onPress={() => this.props.navigation.goBack()}>
            <Text style={{color:'#2279b6'}}>
              Return to information
            </Text>
          </TouchableOpacity>
         </View>
        </ScrollView>
      </SafeAreaView>
      )
  }
}


function mapStateToProps(state) { 
  const { loader, addressList} = state.informationReducer;
  const {  myproducts } = state.productReducer;
  const { walletBalance } = state.profileReducer;
  return {
      addressList,
      myproducts,
      loader,
      walletBalance
  };    
}

export default connect(mapStateToProps)(ShippingScreen);


const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    appHeader:{
      backgroundColor:'#00B2B6',
    },
    textbox: {
     // height:140,
      marginTop: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: '#e7e7e7',
      backgroundColor: '#ffffff',
      paddingBottom: 0,
      marginHorizontal:10,
  },
    textbox2: {
        flexDirection:'row',
        justifyContent:'space-between',
        height:70,
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#e7e7e7',
        backgroundColor: '#ffffff',
        paddingBottom: 0,
    },
    listOfAllCards:{
      // flex: 1,
      padding: 15,
      height:100
    },
    cardListView: {
      borderWidth: 0,
      padding: 10,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
      borderColor:'#ffffff',
      shadowColor: '#ffffff',
      borderRadius: 15,
      margin:10,
      // marginVertical:10,
      width:width-20
    },
    profile_image:{
      width:40,
      height:40
    },
});