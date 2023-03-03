import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView,StatusBar, BackHandler ,ImageBackground, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { productActions, vendorActions, videoActions, adsActions } from '../action';
import { connect } from 'react-redux';
import {LocalizationContext} from './Translations';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Communications from 'react-native-communications';
import jwtdecode from 'jwt-decode'
import {requestMultiple, PERMISSIONS, requestNotifications} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgUri from 'react-native-svg-uri';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import style from '../assets/style.js';
import Clinic from '../assets/images/icons/1-doctor.png';
import Chatting from '../assets/images/icons/chatting.png';
import Queue from '../assets/images/icons/37-Queue.png';
import Manage_Calender from '../assets/images/icons/managecalendar.png';
import Referral from '../assets/images/icons/36-Referral.png';
import Report from '../assets/images/icons/report.png';
import Report2 from '../assets/images/icons/report2.png';
import salon from '../assets/images/daily-deals/1-Salon.png';
import yoga_center from '../assets/images/daily-deals/2-Yoga-center.png';
import spa_therapy from '../assets/images/daily-deals/3-Spa-therapy.png';
import ayurvedic_therapy from '../assets/images/daily-deals/4-Ayurvedic-Therapy.png';
import gymnasium from '../assets/images/daily-deals/5-Gymnasium.png';
import supplements from '../assets/images/daily-deals/6-Supplements.png';
import cosmetics from '../assets/images/daily-deals/7-Cosmetics.png';
import {utilityHelper} from '../helper/utilityHelper'
import News from '../screens/News';
import shop from '../assets/images/images/shop.png';




const SLIDER_WIDTH = Dimensions.get('window').width;
const isLargeScreen = (SLIDER_WIDTH >= 768) ? true : false;
const ITEM_WIDTH = isLargeScreen ? Math.round(SLIDER_WIDTH * 0.5) : Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) - 50;

// import bestDealOffer1 from '../assets/product/p1.jpeg';
// import market1 from '../assets/marketing/m1.png';
// import market3 from '../assets/marketing/m3.jpeg';
// import market4 from '../assets/marketing/m4.png';



class DHomeScreen extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
            activeIndex:0,
            userDetail: '',
            data1 : [  
                      {name: "Appointments",    key: 'Doctors',   route: 'MyUpcomingAppointment',  image: Clinic},
                      {name: "Video",                key: 'Video',      route: 'MyUpcomingAppointment',  image: Chatting},
                      // {name: "Manage Calendar",         key: 'Calendar',       route: 'ManageCalendarSlot',         image: Manage_Calender},
                      // {name: "Referral",                key: 'Referral',       route: 'Referral',         image: Referral},
                      {name: "Report",                  key: 'Report',       route: 'Report',         image: Report2}
                  ],
            data2 : [  
                      {name: "Appointments",    key: 'Doctors',   route: 'MyUpcomingAppointment',  image: Clinic},
                      {name: "Video",                key: 'Video',      route: 'MyUpcomingAppointment',  image: Chatting},
                      // {name: "Manage Calendar",         key: 'Calendar',       route: 'ManageCalendarSlot',         image: Manage_Calender},
                      // {name: "Referral",                key: 'Referral',       route: 'Referral',         image: Referral},
                  ],
            contacts: []

        }

        this._renderItem = this._renderItem.bind(this)

        //console.disableYellowBox = true;
    } 

    getProfile = async() => {
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userDetail');
            userToken = JSON.parse(userToken)
            // // console.log('=======',userToken)

            this.setState({userDetail: userToken })
            if(userToken && userToken.is_approved === 0 && userToken.practioner === 0){
              // // console.log("--------------------------------------------")
                this.props.navigation.navigate('DoctorProfileScreen', {clinic: true})
            } 
        } catch(e) {
            // console.log(e);
        }
    }

    UNSAFE_componentWillMount(){
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getProfile();
       });
    }

    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          // // console.log("========",this.props.route.params.clinic)
          this.getProfile();
          

       });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.requestContactPermission();
        const { dispatch } = this.props;
        dispatch(productActions.getCatProductList("params")) ;
        dispatch(vendorActions.getVendorCatList("params"))
        dispatch(adsActions.getAdsByCategory())
    }
        //Contact permission
    requestContactPermission = async () => {

      requestMultiple([ PERMISSIONS.ANDROID.READ_CONTACTS]).then((statuses) => {
        switch (statuses[PERMISSIONS.ANDROID.READ_CONTACTS]) {
          case 'unavailable':
            console.log('This feature is not available (on this device / in this context)');
            break;
          case 'denied':
            console.log('The permission has not been requested / is denied but requestable');
            requestContactPermission();
            break;
          case 'limited':
            console.log('The permission is limited: some actions are possible');
            break;
          case 'granted':
            console.log('The permission is granted Contact');
            this.getContact()
            break;
          case 'blocked':
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      });
    }

    getContact = () => {
      if(this.state.contacts.length > 0){
        return false
      }
      Contacts.getAll().then(contacts => {
        const trimmedContacts = contacts
                .filter(c => c.phoneNumbers.length > 0)
                .map(c => {
                    return {
                        "hasThumbnail": c["hasThumbnail"],
                        "thumbnailPath": c["thumbnailPath"],
                        "displayName": c["displayName"],
                        "recordID": c["recordID"],
                        "phoneNumbers": c["phoneNumbers"][0]?.number,
                    }
                })
        this.setState({contacts: trimmedContacts});
        // console.log("trimmedContacts", trimmedContacts)
        const { dispatch } = this.props;
        dispatch(videoActions.saveContacts(trimmedContacts));
      });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }
    
   
    _renderItem = ({ item }) => {
              // {item.description !== "" && <Text style={styles.rightLabel}>{item.description}</Text>}      
      return (
        <TouchableHighlight onPress={() => this.props.navigation.navigate('POSTInquiry', { ads_detail: item })}>
          <LinearGradient colors={item.color} style={styles.itemContainer}>
              {item.title !== "" && <Text style={styles.itemLabel}>{item.title}</Text>}      
            <ImageBackground source={item.image} resizeMode="cover" style={{width: item.width, height: item.height}}/>

          </LinearGradient>
        </TouchableHighlight>          
      );
    }

    checkSOS = () => {
        if(this.state.userDetail !== null && this.state.userDetail.sos ){
            Communications.phonecall(this.state.userDetail.sos, true)
        }else{
            this.props.navigation.navigate('SOSScreen')    
        }
    }
    render() {
      let data = this.state.userDetail && this.state.userDetail.practioner === 1 ? this.state.data2 : this.state.data1
      // console.log("Chintu----",this.props.adsData);
      var carouselItems = []
      for(var i=0;i<this.props.adsData.length;i++){
        // // console.log("chintu",utilityHelper.ProfilePic(this.props.adsData[i].image));
        var img ={uri:utilityHelper.ProfilePic(this.props.adsData[i].image)};
        const obj = {
            title: this.props.adsData[i].company_name,
            description: this.props.adsData[i].description,
            color: ['#273f61', '#273f60', '#273f61'],
            image: img,
            width: ITEM_WIDTH-1,
            height: ITEM_HEIGHT ,
            right: '',
            id: this.props.adsData[i].id
        };
        carouselItems.push( obj );
        
      }

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="menu" size={30} onPress={() => this.props.navigation.openDrawer()} color='#fff'/>
            </Left>
            <Body style={{ flex:1,flexDirection:'row', justifyContent:'center'}}>
              <Title style={styles.headerTitleText}>Dashboard</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              <Icon name="notifications-sharp" size={35}  color="#ffffff"></Icon>
              <MaterialCommunityIcons name="phone" size={35} backgroundColor="#00B2B6" color="red" onPress={this.checkSOS}></MaterialCommunityIcons>
            </Right>
            
          </Header>
          <Content style={style.container}>
            <ScrollView>
              <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>

              {/*
              <News 
                ITEM_WIDTH= {ITEM_WIDTH}
                ITEM_HEIGHT= {ITEM_HEIGHT}
                SLIDER_WIDTH= {SLIDER_WIDTH}
              />
              */}
              <View >
                <Carousel
                  // ref={(c) => this.carousel = c}
                  data={carouselItems}
                  renderItem={this._renderItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  containerCustomStyle={styles.carouselContainer}
                  inactiveSlideShift={0}
                  onSnapToItem={(index) => this.setState({ index })}
                  useScrollView={true}          
                />
                {/*<SvgUri
                  width="200"
                  height="200"
                  source={market2}
                />*/}
              </View>

              <View style={styles.newhead}>
                <View style={{width: "85%", textAlign:'flex-start', justifyContent: 'flex-start'}}><Text style={{color: '#FFF', fontSize:18, fontWeight: 'bold', marginTop:10}}>Appointment Request / Record</Text></View>  
                <View ><Image style={{width:50, height:50}} resizeMode={'center'} source={Clinic} /></View>
              </View>  

              <View>
                  <FlatList  
                      data={data}  
                      renderItem={({item}) => 
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.route, { categroy: item.name})}>
                              <Animatable.View>
                              <Card style={styles.categroyCardH}>
                                <View>
                                  {item.key !== 'Video' ?
                                    <Image style={styles.cardIconH} resizeMode={'center'} source={item.image} />
                                    :
                                    <Icon name="videocam" size={100} color='#00B2B6'/>
                                  }
                                </View>                     
                                <View>
                                  <Text style={styles.titleViewMain}>{item.name}</Text>
                                </View>
                              </Card>
                                </Animatable.View>
                            </TouchableOpacity>
                      }  
                      horizontal={true}
                  />  
              </View>

              
              <TouchableOpacity>  
                <View style={styles.newhead}>
                  <View style={{width: "80%" }}><Image style={{width:50, height:50}} resizeMode={'center'} source={shop} /></View>
                  <View style={{}}><Text style={{color: '#FFF', fontSize:18, fontWeight: 'bold', marginTop:10}}>Products</Text></View>  
                </View>
              </TouchableOpacity>
              <View>
                 <FlatList  
                        data={this.props.catProducts}  
                        renderItem={({item}) =>  {
                          return(
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InHouseProductScreen', { product_id: item.id, product_name: item.label })}> 
                              <Animatable.View animation="fadeInRight"> 
                              <Card style={styles.categroyCardH}>
                                <View>
                                  {item.image ?
                                    <Image style={styles.cardIconH} resizeMode={'center'} source={{uri: utilityHelper.ProfilePic(item.image)}} />
                                    :
                                    <Image style={styles.cardIconH} resizeMode={'center'} source={{uri: 'data:image/png;base64,'+ item.image}} />
                                  }
                                </View>                     
                                <View>
                                  <Text style={styles.titleViewMain}>{item.label}</Text>
                                </View>
                              </Card>
                              </Animatable.View> 
                            </TouchableOpacity>  
                          )
                        }
                        }    
                        horizontal={true}
                    />  
              </View>      
              
              <View style={styles.newhead}>
                <View style={{width: "85%", textAlign:'flex-start', justifyContent: 'flex-start'}}><Text style={{color: '#FFF', fontSize:18, fontWeight: 'bold', marginTop:10}}>Best Deals</Text></View>  
                <View ><Image style={{width:50, height:50}} resizeMode={'center'} source={shop} /></View>
              </View>  
              
              <View>
                  <FlatList  
                      data={this.props.vendorCat}
                      renderItem={({item}) =>  {
                         return( 
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('VendorList', {
                                  category_id: item.id,
                                  name: item.name
                                  })}> 
                                <Animatable.View>
                                 <Card style={styles.categroyCardH}>
                                   <View>
                                      <Image style={styles.cardIconH} resizeMode={'center'} source={{uri: utilityHelper.ProfilePic(item.image)}} />
                                   </View>
                                   <View>
                                     <Text style={styles.titleViewMain}>{item.name}</Text>
                                   </View>
                                 </Card>
                                </Animatable.View>
                              </TouchableOpacity>) 
                           }
                      }    
                      horizontal={true}
                      ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <CardItem  header>
                                                  <Text style={{textAlign: 'center'}}> Coming Soon....</Text>
                                                </CardItem>
                                            </Card>)}
                  />    
                </View>
            </ScrollView>
          </Content>
        </Container>
      )
    }
}

function mapStateToProps(state) { 
  const { loader, catProducts } = state.productReducer;
  const { vendorCat } = state.vendorReducer;
  const { adsData } = state.adsReducer;
  return {
    catProducts,
    vendorCat,
    adsData,
    loader,
  };    
}

export default connect(mapStateToProps)(DHomeScreen);

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerTitleText:{
    color:'#ffffff',
    fontSize:18,
    fontWeight:'bold'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection:'column',
  },
  containerView: {
    margin: 5,
    marginTop: 15,
  },
  heading:{
    fontSize:16,
    fontWeight: 'bold',
    width:'100%',
    textAlign:'center',
    color:'#000',
    textTransform:'uppercase'
  },
  categroy: {
    marginTop: 15,
    display:'flex',
    flexDirection:'column',
    textAlign:'center',
    justifyContent:'center',
  },
  categroyCard: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width:150,
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
    textAlign:'center',
    padding:10,
    borderRadius: 15,
    margin:5

  },
  titleViewMain:{
    fontSize:14,
    textAlign:"center",
    color:'#04898c',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    marginBottom:5,
    marginLeft:10,
    marginRight:10
  },
  cardIconH:{
    width:100,
    height:100,
  },
  categroyCardMain: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:25,
    marginRight: 5,
    marginBottom:5,

    backgroundColor: '#ffffff',    
    borderColor:'#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    
    padding:10,
    borderRadius: 15,
    width:100,
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'wrap',
    alignSelf:'center',
    alignContent:'center'
  },
  cardIcons:{
    width:80,
    height:80,
    marginBottom:5
  },
  titleView:{
    fontSize:14,
    textAlign:"center",
    color:'#000',
    flexWrap: 'wrap',
  },
  headingMain1:{
    marginTop: 15,
    marginBottom:15,
    fontSize:18,
    fontWeight: 'bold',
    width:'100%',
    textAlign:'center',
    // color:'#ffffff',
    color:'#04898c',
    textTransform:'uppercase'
  },
  appLogo:{
    width:50,
    height:50,
    marginTop:0
  },
  marketingImage: {
    marginTop:10,
    width:400,
    height:200,
  },

   carouselContainer: {
    marginTop: 30
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT+40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    padding:5,
    margin:5
  },
  itemLabel: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  rightLabel: {
    marginLeft: 10,
    color: '#ffffff',
    fontSize: 12,
  },
  categroyCardH: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width:130,
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
    textAlign:'center',
    padding:10,
    borderRadius: 15,
    margin:5
  },
  newhead: {
    borderWidth: 0,
    marginHorizontal:10,
    marginVertical:20,

    backgroundColor: '#273f61',    
    borderColor:'#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    flexDirection: 'row',
    
    padding:15,
    borderRadius:15,
  },
});
