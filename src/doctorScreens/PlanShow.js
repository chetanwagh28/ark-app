import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Avatar,  Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem, Button } from 'native-base';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import {planActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocalizationContext} from './Translations';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import jwtdecode from 'jwt-decode'
import {_, isEmpty} from 'lodash';
import style from '../assets/style.js';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1.5) ;


class PlanShow extends Component {
 
    constructor(props){
        super(props);
        this.state={
            name: '',
            planList: [],
            ss:"Basic Plan",
            activeIndex:0,
        }
        //console.disableYellowBox = true;
        this.referToDoctor = this.referToDoctor.bind(this)
        this._renderItem = this._renderItem.bind(this)
    }
    componentDidMount(){
      // this.getProfile()
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        // // console.log("data",this.props.route.params)
        this.apiCall()
      });
    }
    apiCall = () => {
        const { dispatch } = this.props;
        dispatch(planActions.getPlanList(1))
    }

    referToDoctor(item){
        let data = {
                      "referred_by": this.state.referDetail.doc_id,
                      "referred_to_id": item.doc_id,
                      "referred_to_name": item.name,
                      "patient_id": this.state.referDetail.patient_id
                  }
        // // console.log(data)
        const { dispatch } = this.props;
        dispatch(planActions.getLabList(data));

        Alert.alert('Successfully Referred!', '', [
            { text: 'OK', onPress: () =>  this.props.navigation.navigate("PatientDetail", { patientDetail: this.state.referDetail})}
        ]);
    }

    _renderItem = ({ item }) => {
      const {activeIndex } =this.state;
      // // console.log("Chintu",activeIndex);
      return (
        <View>
          <LinearGradient colors={item.color} style={styles.itemContainer}>
            <Text style={activeIndex==0 ? styles.itemLabel:activeIndex==1 ? styles.itemLabel1: activeIndex==2 ?styles.itemLabel2:styles.itemLabel3}>{item.title}</Text>     
            <View style={{flexDirection:'row'}}>
              <Text style={activeIndex==0?styles.priceStyle:activeIndex==1 ?styles.priceStyle1: activeIndex==2 ?styles.priceStyle2:styles.priceStyle3}>Price: </Text> 
              <Text style={[activeIndex==0?styles.priceStyle:activeIndex==1 ?styles.priceStyle1: activeIndex==2 ?styles.priceStyle2:styles.priceStyle3,{textDecorationLine: 'line-through' }]}> {item.price === 0 ? 'Free' : item.price} </Text> 
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={activeIndex==0?styles.priceStyle:activeIndex==1 ?styles.priceStyle1: activeIndex==2 ?styles.priceStyle2:styles.priceStyle3}>{"          :"} </Text> 
            <Text style={[activeIndex==0?styles.priceStyle:activeIndex==1 ?styles.priceStyle1: activeIndex==2 ?styles.priceStyle2:styles.priceStyle3]}>{item.sale_price === 0 ? 'Free' : item.sale_price} </Text>
            </View> 
            
            <Text style={styles.itemDetail}>{item.details}</Text>   
            <Text style={styles.rightLabel}>Days: {item.days}</Text> 
            
            <TouchableOpacity style={{marginTop: 30}}>
              {/* <Text style={styles.rightLabel}>Buy Now</Text> */}
            <View style={{ backgroundColor:'#cca31d',width:111,height:40,borderBottomEndRadius:15,borderBottomStartRadius:15,borderTopLeftRadius:15,borderTopRightRadius:15}}>
              <Text style={{fontSize:15,fontWeight:'bold',alignSelf:'center',marginTop:9}}>Buy Now</Text> 
            </View>
            </TouchableOpacity>
          </LinearGradient>      
        </View>
      );
    }
    containerBkgColor = function(title) {
       return {
        background: "red" 
       }
       
      
      
    }
    render() {
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const translations = this.context.translations;
        const { goBack } = this.props.navigation;
        const {activeIndex } =this.state;
       
        var carouselItems = []
        for(var i=0;i<this.props.planList.length;i++){
          // // console.log("chintu",utilityHelper.ProfilePic(this.props.catProducts[i].image));
          const obj = {
              title: this.props.planList[i].plan_name,
              color: ['#ffffff', '#ffffff', '#ffffff'],
              width: ITEM_WIDTH + 50,
              height: ITEM_HEIGHT ,
              price: this.props.planList[i].price,
              sale_price: this.props.planList[i].sale_price,
              days: this.props.planList[i].days,
              details: this.props.planList[i].details,
              plan_id: this.props.planList[i].id
          };
          carouselItems.push( obj );
          
        }

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>Plans</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={activeIndex==0?style.container:activeIndex==1 ?styles.containerBkgColor: activeIndex==2 ?styles.containerBkgColor2:styles.containerBkgColor3}>
            <ScrollView>
              <View style={styles.containerView}>
                
                <View style={styles.listOfAllCards}>
                    {this.props.loader && 
                          <SkeletonLoader />
                      }
                    <Carousel
                      // ref={(c) => this.carousel = c}
                      data={carouselItems}
                      renderItem={(item) => this._renderItem(item)}
                      sliderWidth={SLIDER_WIDTH}
                      itemWidth={ITEM_WIDTH}
                      containerCustomStyle={styles.carouselContainer}
                      inactiveSlideShift={0}
                      onSnapToItem={(index) => this.setState({ index })}
                      useScrollView={true}    
                      layout={'stack'} 
                      layoutCardOffset={`24`}   
                      onSnapToItem = { index => this.setState({activeIndex:index})}   
                    />
                  
                </View>
                </View> 
            
            </ScrollView>
           </Content>
        </Container>
      );
    }
}

PlanShow.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, planList } = state.planReducer;
  // // console.log("planList",planList)
  return {
    planList,
    loader
  };    
}

export default connect(mapStateToProps)(PlanShow);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerBkgColor:{
    backgroundColor:"#1cb49f"
  },
  containerBkgColor2:{
    backgroundColor:"#533968"
  },
  containerBkgColor3:{
    backgroundColor:"#6187ce"
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  itemLabel: {
    marginTop:30,
    color: "#00B2B6",
    fontSize: 30,
    fontWeight: 'bold'
  },
  itemLabel1: {
    marginTop:30,
    color: "#1cb49f",
    fontSize: 30,
    fontWeight: 'bold'
  },
  itemLabel2: {
    marginTop:30,
    color: "#533968",
    fontSize: 30,
    fontWeight: 'bold'
  },
  itemLabel3: {
    marginTop:30,
    color: "#6187ce",
    fontSize: 30,
    fontWeight: 'bold'
  },
  priceStyle:{
     flexDirection:"row",
     fontSize: 15,
     color:"#00B2B6",
     fontWeight:"bold"
  },
  priceStyle1:{
    flexDirection:"row",
    fontSize: 15,
    color:"#1cb49f",
    fontWeight:"bold"
 },
 priceStyle2:{
  flexDirection:"row",
  fontSize: 15,
  color:"#533968",
  fontWeight:"bold"
},
priceStyle3:{
  flexDirection:"row",
  fontSize: 15,
  color:"#6187ce",
  fontWeight:"bold"
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
    marginLeft: 0,
    marginRight: 0,
    backgroundColor:'#00CBCC',
    paddingLeft:10,
    paddingRight:10

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
    alignItems: 'flex-start',
    height:170,
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
    color:'#fff',
    paddingHorizontal: 10,
    marginHorizontal: 40,
    marginVertical:5
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
    flexDirection: 'row',
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
      marginRight:15
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
 
  rightLabel: {
    marginBottom:15,
    color: '#ed8b40',
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDetail:{
    marginBottom:15,
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    color: '#ed8b40',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
