import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,SectionList, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Modal, TouchableHighlight } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';
import { Rating, Slider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {vendorActions} from '../action';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'

var {width, height} = Dimensions.get('screen')
 width = width

class VendorList extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            value: 5,
            modalVisible: false,
            expanded: false,
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log("data",data)
        this.setState({
          name: this.props.route.params.name,
          category_id: this.props.route.params.category_id
        })
        const { dispatch } = this.props;
        dispatch(vendorActions.getVendorList(this.props.route.params.category_id));
      });
    }

    

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }
    handlePress = (visible) => {
      this.setState({ modalVisible: visible });
    }

    render() {
        // // console.log("categroy",this.state.categroy)
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{this.state.name}</Title></>}
                rightComponent={<>
                  </>}
              />
            <ScrollView>

              <View style={styles.containerView}>
                


                    <View style={styles.listOfAllCards}>
                          <Animatable.View>

                          <FlatList  
                            data={this.props.vendorList}
                            renderItem={({item}) =>  {
                              // console.log("item", item)
                               return( 
                                <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                                  <Card  style={styles.cardListView} onPress={() => this.props.navigation.navigate('BestDeal', {vendorData: item, vendorName: item.name})}
                                   >
                                    <Card.Content>
                                        <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between', width: "100%"}}>
                                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between', width: '23%'}}>
                                                <Image source={{ uri: utilityHelper.BestDealPic(item.image) }} style={styles.profile_image} resizeMode={'center'} />
                                                  <View style={styles.rating_container}>
                                                    <Rating
                                                        type='custom'
                                                        fractions="{1}" 
                                                        startingValue={5}
                                                        imageSize={17}
                                                        ratingBackgroundColor ='transparent'
                                                        count="{5}"
                                                        readonly
                                                        /> 
                                                  </View>
                                            </View>
                                            <View style={{width: "60%"}}>
                                                <>
                                                  <Paragraph style={{fontSize:12}}>Name: {item.name}</Paragraph>
                                                  <Paragraph style={{fontSize:12}}>Address: {item.address}</Paragraph>
                                                  <Paragraph style={{fontSize:12}}>Contact Detail: {item.contact_no}</Paragraph>
                                                </>
                                                
                                            </View>
                                            <View>
                                              {item.data.length > 0 &&
                                                <>
                                                <View style={{backgroundColor: '#fc6203', padding: 10, borderRadius: 5}}> 
                                                  <Paragraph style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>{item.data[0].discount_percent +'%'}</Paragraph> 
                                                <Paragraph style={{fontWeight:'bold', color:'#fff'}}>off </Paragraph>
                                                </View>
                                                </>
                                              }
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', justifyContent : 'space-between', width: "100%"}}>
                                            <Paragraph style={{fontSize:16, fontWeight: 'bold'}}>No. of {item.data.length > 1 ? 'discounts' : 'discount'} : {item.data.length} </Paragraph>
                                        </View>

                                    </Card.Content>
                                  </Card>
                              </Animatable.View>
                            
                               ) 
                              }
                            }    
                              horizontal={false}
                              ListEmptyComponent={(<Card style={styles.containerCard}>
                                                        <Card.Content  header>
                                                          <Text style={{textAlign: 'center'}}> Coming Soon....</Text>
                                                        </Card.Content>
                                                    </Card>)}
                          />   

                          </Animatable.View>

                    </View>

              </View> 
            
            </ScrollView>
        </SafeAreaView>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, vendorList } = state.vendorReducer;
  // console.log("vendorList",vendorList)
  return {
    vendorList,
    loader
  };    
}

export default connect(mapStateToProps)(VendorList);



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
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    marginTop:5,
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
  commonAppButtonText: {
      color: '#fff',
      fontSize:12
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
    borderRadius: 20,
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
  sectionHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#F55145',
  },

});

{/*
                                <Card style={styles.cardListView}>
                                  <Card.Content>
                                    <List.Section title={item.name}>
                                      {item.data.length > 0 && item.data.map(row=>{
                                        // console.log("row", row)
                                        return(
                                          <List.Accordion
                                            title={row.offer_title}
                                            left={props => <MaterialIcons name="local-offer" color="#00B2B6" size={25} />}>
                                              <TouchableOpacity onPress={() => this.props.navigation.navigate('BestDealDetailScreen', {
                                              offerDetail: row,
                                              name: row.offer_title
                                              })}>
                                                <View style={{flexDirection:'row', justifyContent : 'flex-start', backgroundColor:'#fff'}}>

                                                  <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                                        <View style={styles.profileImageContainer}>
                                                        <Image  source={bestDealOffer1} style={styles.profile_image} />
                                                        </View>
                                                  </View>
                                                  
                                                  <View style={{flexDirection:'column',  alignItems: 'flex-start', justifyContent : 'flex-start',backgroundColor:'#fff',marginRight:10}}>
                                                      <Paragraph>Price: Rs {row.discounted_price}</Paragraph>
                                                      <Paragraph>Discount: {row.discount_percent}%</Paragraph>
                                                      <Paragraph style={styles.doctorName}>Orignal Price:Rs {row.original_price} </Paragraph>
                                                  </View> 

                                              </View> 
                                            </TouchableOpacity> 
                                          </List.Accordion>
                                          )
                                      })}
                                      
                                    </List.Section>
                                  </Card.Content>
                                </Card>*/}