import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Modal, SafeAreaView, TouchableHighlight, Alert } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Rating, Slider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {productActions} from '../action';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'
import SkeletonLoader from '../components/SkeletonLoader';

var {width, height} = Dimensions.get('screen')
 width = width

class orderList extends Component {

    constructor(props){
        super(props);
        this.state={
            user: '',
            name: '',
            city: '',
            value: 5,
            modalVisible: false,
            getCat: false,
            myproducts: [],
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
      this.setState({getCat: false})
      const { dispatch } = this.props;
      dispatch(productActions.myOrders())
    }

    
    static getDerivedStateFromProps(nextProps, prevState) {
      // // console.log(nextProps.categroyList.data) 
      if (nextProps.myproducts !== prevState.myproducts && !prevState.getCat) {
        if(nextProps.myproducts.length > 0){
          return ({ 
            myproducts: nextProps.myproducts,
            getCat: true
          })
        } 
      }
      return null
    }

    // {"amount":"500","currency":"INR","receipt":"su001","payment_capture":"1"}


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
                centerComponent={<><Title style={styles.logoText}>Orders</Title></>}
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
                            data={this.state.myproducts}  
                            columnWrapperStyle={styles.cardRow}
                            renderItem={({item, index}) =>{
                              // // console.log(index)
                              let colorsCode = '#000080'
                              let colorsFont = '#fff'
                              if(item.status === 'Cancel'){
                                colorsCode = '#FF3333'
                              }else if(item.status === 'Complete' || item.status === 'Completed'){
                                colorsCode = '#008000'
                              }else if(item.status === 'Accepted'){
                                colorsCode = '#F7A000'
                              }else if(item.status === 'Dispatched'){
                                colorsCode = '#FFB6C1'
                                colorsFont = '#000'
                              }else{
                                colorsFont = '#000'
                                colorsCode = '#FFFF00'
                              }

                              return(
                                  <Card style={styles.cardListView}>
                                    <Card.Content>

              
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#ffffff'}}>

                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#ffffff',marginRight:10}}>
                                                <View style={styles.profileImageContainer}>
                                                <Image source={{ uri: utilityHelper.ProfilePic(item.product_image) }} resizeMode={'cover'} style={styles.profile_image} />
                                                </View>
                                          </View>

                                          <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start',backgroundColor:'#ffffff',marginRight:10}}>
                                              <Paragraph style={styles.doctorName}> {item.product_name} </Paragraph>
                                              <Paragraph>Quantity: <Text style={{fontSize: 16, fontWeight: 'bold'}} >{item.quantity}</Text></Paragraph>
                                              <Paragraph>  <Text style={{fontSize: 16, fontWeight: 'bold'}} >Rs : {item.price}</Text></Paragraph>
                                              <Paragraph>  <Text style={{fontSize: 14}} >{new Date(item.created_at).toDateString()}</Text></Paragraph>
                                              <Paragraph>  <Text style={{fontSize: 14}} >{item.address_details +' '+ item.landmark}</Text></Paragraph>
                                              <Paragraph>  <Text style={{fontSize: 14}} >{item.city +' '+ item.state +'-'+ item.pincode}</Text></Paragraph>

                                              <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>  
                                                <Paragraph>Status :  </Paragraph>
                                                <TouchableOpacity>
                                                        <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                          <Text style={[style.commonAppButtonText, {color: colorsFont}]}>{item.status}</Text>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                              </View>
                                              
                                          </View> 
                                        </View>
                                      
                                    </Card.Content>
                                  </Card>
                              )
                              }
                            }
                            ListEmptyComponent={(<Card style={style.containerCard1}>
                                                <Card.Content>
                                                  <Text> No Product Found </Text>
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

function mapStateToProps(state) { 
  const { loader, myproducts } = state.productReducer;
  // // console.log("myproducts",myproducts)
  return {
    myproducts,
    loader
  };    
}

export default connect(mapStateToProps)(orderList);



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius:5,
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
    fontSize: 14,
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
    borderRadius: 100,
    backgroundColor:'#00B2B6',
  },
  footerTabs:{
    backgroundColor:'#00B2B6',
    borderWidth: 0,
    // backgroundColor:'#ffffff',
    // borderWidth: 0,
    // borderRadius:200,

  },
  footerTabsButton:{
    flexDirection: 'row',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1,      
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 1,     
    borderRadius: 5 ,
    marginLeft:15,
    marginRight:15,
    marginBottom:35
  },
});
