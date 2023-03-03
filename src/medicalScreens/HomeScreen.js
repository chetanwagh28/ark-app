import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView, StatusBar, RefreshControl, Linking } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Communications from 'react-native-communications';
import {requestMultiple, PERMISSIONS, requestNotifications} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgUri from 'react-native-svg-uri';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import order_medicines from '../assets/images/icons/medinice.png';
import SkeletonLoader from '../components/SkeletonLoader';
import {medicalActions, productActions, videoActions, vendorActions} from '../action';
import style from '../assets/style.js';
import { configConstants } from '../constant';
import {utilityHelper} from '../helper/utilityHelper'
import AwesomeAlert from 'react-native-awesome-alerts';
import News from '../screens/News';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) - 50;


class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            activeIndex:0,
            userDetail: '',
            data1 : [  
                      {name: "Inquiries",    key: 'inquiries',   route: 'MyInquiriesScreen',  image: order_medicines}
                  ],
            showAlert: false,
            Orderid: '',
            loading: false,
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
        } catch(e) {
            // console.log(e);
        }
    }

    componentDidMount(){
      this.getProfile()
      this.setState({upcomingOrderMedicines: []})
      const { dispatch } = this.props;
      dispatch(medicalActions.upcomingPrescriptionList());
      dispatch(productActions.getCatProductList("params")) ;
      dispatch(vendorActions.getVendorCatList("params"))
      this.requestContactPermission();
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
        const { dispatch } = this.props;
        dispatch(videoActions.saveContacts(trimmedContacts));
      });
    }

    _renderItem({ item }) {
      return (
        <TouchableHighlight onPress={() => this.props.navigation.navigate('InHouseProductScreen', { product_id: item.product_id })}>
          <LinearGradient colors={item.color} style={styles.itemContainer}>
          
            {item.title !== "" && <Text style={styles.itemLabel}>{item.title}</Text>}      
            <Image resizeMode={'center'} source={item.image} style={{width: item.width, height: item.height}} />
            {item.right !== "" && <Text style={styles.rightLabel}>{item.right}</Text>}      
          
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

    changeStatus = (data) => { 
        const { dispatch } = this.props;
        dispatch(medicalActions.OrderStatusChange(data.id, 1)).then((res)=> {
            if(res.status === 200){
              // // console.log("res==",res.status)
              this.props.navigation.navigate("Chat", {chatData: data})
              // Alert.alert('Ordered Accept for chating', '', [
              //   {text: 'Close', onPress: () =>  this.props.navigation.navigate("Chat", {chatData: data})}
              // ]);
            }
        })
    }

    cancelAll = () => {
        const { dispatch } = this.props;
        dispatch(medicalActions.OrderStatusChange(this.state.Orderid, 2)).then((res)=> {
            if(res.data){
              Alert.alert('Ordered Ignore', '', [
                {text: 'Close'}
              ]);
              dispatch(medicalActions.upcomingPrescriptionList());
            }
        })
        this.hideAlert();
    }

    showAlert = (id) => {
      this.setState({
        showAlert: true,
        Orderid: id
      });
    };
   
    hideAlert = () => {
      this.setState({
        showAlert: false,
        Orderid: ''
      });
    };

    loadMoreData = () => {
        // // console.log("=========")     
        this.setState({loading: true})        
        const { dispatch } = this.props;
        dispatch(medicalActions.upcomingPrescriptionList());

        setTimeout(() => {
          this.setState({loading: false})
        }, 2000);
          
    }

    render() {
      let data = this.state.userDetail && this.state.userDetail.practioner === 1 ? this.state.data2 : this.state.data1
      var carouselItems = []
      for(var i=0;i<this.props.catProducts.length;i++){
        var img ={uri:utilityHelper.ProfilePic(this.props.catProducts[i].image)};
        const obj = {
            title:"",
            color: ['#ffffff', '#ffffff', '#ffffff'],
            image: img,
            width: ITEM_WIDTH + 50,
            height: ITEM_HEIGHT ,
            right: this.props.catProducts[i].name,
            product_id: this.props.catProducts[i].id
        };
        carouselItems.push( obj );
        
      }
      return (
        <Container>
          <Header style={styles.appHeader}>
            <Left style={{ flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
              <Icon name="menu" size={30} onPress={() => this.props.navigation.openDrawer()} color='#fff'/>
            </Left>
            <Body style={{ flex:1,flexDirection:'row', justifyContent:'center'}}>
              <Title style={styles.headerTitleText}>Dashboard</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              <MaterialCommunityIcons name="phone" size={35} backgroundColor="#00B2B6" color="red" onPress={this.checkSOS}></MaterialCommunityIcons>
            </Right>
            
          </Header>
          <Content style={styles.container}>
          <ScrollView>
            <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
            {/*
            <News 
                ITEM_WIDTH= {ITEM_WIDTH}
                ITEM_HEIGHT= {ITEM_HEIGHT}
                SLIDER_WIDTH= {SLIDER_WIDTH}
              />
            */}
              <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center'
              // backgroundColor: "#00B2B6"
            }}>
            <AwesomeAlert
                  show={this.state.showAlert}
                  showProgress={false}
                  title="Cancel Order"
                  message="Are you sure?"
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="No"
                  confirmText="Yes, Cancel it"
                  confirmButtonColor="#DD6B55"
                  onCancelPressed={() => {
                    this.hideAlert();
                  }}
                  onConfirmPressed={() => {
                    this.cancelAll();
                  }}
                />
              <Animatable.View  animation="fadeInUp" direction="alternate" duration={1000} style={styles.containerView1}>
                {this.props.loader && 
                    <SkeletonLoader />
                }
                <View style={{flexDirection: 'row', marginHorizontal: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', marginVertical:10}}>
                  <Text style={styles.heading}>Inquiry Request / Record</Text>
                </View>
                
                  <FlatList  
                      data={this.props.upcomingOrderMedicines}  
                      // maxHeight={300}
                      nestedScrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
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
                        return(
                          
                            <Card  >
                              <LinearGradient colors={['#00B2B6', '#65eba8']} style={styles.cardListView}>
                              <Card.Content>
                                  <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'center', padding: 10, width: "100%"}}>
                                      
                                      <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start', width: "65%"}}>
                                          <Paragraph style={{color:'#ffffff', fontWeight:'bold'}}>Name: {item.name} </Paragraph>
                                          <Paragraph style={{color:'#ffffff', fontWeight:'bold'}}>Contact No: {item.contact_no}</Paragraph>
                                          <Paragraph style={{color:'#ffffff', fontWeight:'bold'}}>Address: {item.address}</Paragraph>
                                          <Paragraph style={{color:'#ffffff', fontWeight:'bold'}}>Date: {utilityHelper.DateFormat(item.created_at)}</Paragraph>
                                          <Paragraph style={{color:'#ffffff', fontWeight:'bold'}}>Prescription: <Icon name="document" size={20} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon></Paragraph>
                                      </View>
                                      <View style={{flexDirection:'column',  width: "35%", alignItems: 'flex-end'}}>
                                        {item.is_accept === 0 &&
                                          <React.Fragment> 
                                            <TouchableOpacity onPress={() => this.changeStatus(item) }>
                                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}>Accept</Text>
                                              </LinearGradient>
                                            </TouchableOpacity> 
                                            <TouchableOpacity onPress={() => this.showAlert(item.id)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                  <Text style={style.commonAppButtonText}> Ignore</Text>
                                                </LinearGradient>
                                            </TouchableOpacity> 
                                          </React.Fragment>
                                        }

                                        {item.is_accept === 1 &&
                                          <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat", {chatData: item})}>
                                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}>Chat</Text>
                                              </LinearGradient>
                                          </TouchableOpacity> 
                                        }


                                          <TouchableOpacity>
                                              <LinearGradient colors={[colorsCode, colorsCode]}  style={style.commonAppButton}>
                                                <Text style={style.commonAppButtonText}>{status}</Text>
                                              </LinearGradient>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              </Card.Content>
                              </LinearGradient>
                            </Card>
                          )
                      }}

                      ListEmptyComponent={(<Card >
                                                <CardItem  header style={styles.containerCard1}>
                                                  <Text style={{textAlign: 'center', color: '#fff'}}>  No Data Present In... Try Again.</Text>
                                                </CardItem>
                                            </Card>)}
                      refreshControl={
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
                        }
                  />   
              </Animatable.View>
              {/*<
                <Animatable.View>
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
                  SvgUri
                    width="200"
                    height="200"
                    source={market2}
                  />
                </Animatable.View>*/}
                <View>
                <Text style={styles.headingMain1}>Products</Text>  
                 <FlatList  
                        data={this.props.catProducts} 
                        horizontal={false}
                        columnWrapperStyle={{justifyContent: 'space-between',marginLeft:20,marginRight:20,marginBottom:20}}
                        numColumns={2}
                        renderItem={({item}) =>  {
                             return(
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InHouseProductScreen', { product_id: item.id })}> 
                              <Animatable.View animation="fadeInRight"> 
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
                              </Animatable.View> 
                            </TouchableOpacity>  
                          )
                        }
                        }    
                    /> 
                    </View>
                <View style={styles.containerView}>
                <Animatable.View>
                  <Text style={styles.heading}>Best Deals</Text>  
                  <View style={styles.categroy}>

                  <FlatList  
                      data={this.props.vendorCat}
                      renderItem={({item}) =>  {
                         return( 
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('VendorList', {
                                  category_id: item.id,
                                  name: item.name
                                  })}> 
                                 <Card style={styles.categroyCardH}>
                                   <View>
                                      <Image style={styles.cardIconH} resizeMode={'center'} source={{uri: utilityHelper.ProfilePic(item.image)}} />
                                   </View>
                                   <View>
                                     <Text style={styles.titleViewMain}>{item.name}</Text>
                                   </View>
                                 </Card>
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
                </Animatable.View>
              </View>    
            </View>
            </ScrollView>
          </Content>
        </Container>
      )
    }
}

function mapStateToProps(state) { 
  const { loader, upcomingOrderMedicines } = state.medicalReducer;
  const { catProducts } = state.productReducer;
  const { vendorCat } = state.vendorReducer;
  return {
    upcomingOrderMedicines,
    loader,
    catProducts,
    vendorCat
  };    
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1
  },
  headerTitleText:{
    color:'#ffffff',
    fontSize:18,
    fontWeight:'bold'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerView: {
    margin: 5,
    marginTop: 15,
  },
  heading:{
    fontSize:16,
    fontWeight: 'bold',
    textAlign:'center',
    color:'#000',
    textTransform:'uppercase'
  },
  categroy: {
    marginTop: 15,
    // display:'flex',
    flexDirection:'column',
    textAlign:'center',
    justifyContent:'center',
  },
  categroyCard: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
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
    borderRadius:5,
    width:120,
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'wrap',
    alignSelf:'center',
    alignContent:'center'

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
    borderRadius: 5,
    width:100,
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'wrap',
    alignSelf:'center',
    alignContent:'center'
  },
  cardIconsS:{
    width:30,
    height:30,
    marginRight:5
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
    borderRadius: 5
    // backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    marginTop:20,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  rightLabel: {
    marginBottom:15,
    color: '#ed8b40',
    fontSize: 24,
    fontWeight: 'bold'
  },
  cardListView: {
    fontSize: 10,
    borderRadius: 5,
    borderWidth: 0,
    marginHorizontal: 10,
    marginTop:5
  },
  containerView1: {
    flex: 0.2,
    alignItems: 'center'
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
    width:120,
    height:120,
  },
});
