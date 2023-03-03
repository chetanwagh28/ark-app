import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Rating, Slider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {healthTipsActions} from '../action';
import * as Animatable from 'react-native-animatable';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'
import SkeletonLoader from '../components/SkeletonLoader';




class HealthTipsScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            category: '',
            city: '',
            value: 5,
            listData: ''
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log("data",data)
        
        this.setState({category:this.props.route.params.name})
        // let url = `/lab/getlabs?distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
        const { dispatch } = this.props;
        dispatch(healthTipsActions.getHealthTipsList(this.props.route.params.healthtips_category_id));
      });
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
                centerComponent={<><Title style={style.PageTitle}>{this.state.category}</Title></>}
                rightComponent={<>
                  </>}
              />

            <ScrollView>

              <View style={styles.containerView}>
                

                <View style={styles.listOfAllCards}>
                  {this.props.loader ? 
                      <SkeletonLoader />
                      :
                  
                  <FlatList  
                      data={this.props.healthTipsList}  
                      numColumns = {1}
                      renderItem={({item}) =>  
                      <Animatable.View>
                          <Card key={item.key} style={styles.cardListView} onPress={() => this.props.navigation.navigate('HealthTipsDetailScreen', {detail: item})}>

                                <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between'}}>
                                    <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between'}}>
                                      {item.image_url ?
                                        <Image style={styles.profile_image} source={{ uri: utilityHelper.ProfilePic(item.image_url) }} />
                                        :
                                        <Image style={styles.profile_image} source={{uri: 'data:image/png;base64,'+ item.image}} />
                                      }
                                    </View>
                                    
                                    <View style={{flexDirection:'column', alignItems: 'flex-start', justifyContent : 'space-between'}}>
                                      
                                      <View style={{flexDirection:'row'}}> 
                                        <Text numberOfLines={5} style={styles.HealthTipTitleStyle}>{item.title} </Text>
                                      </View>

                                        <View style={{flexDirection:'column',   justifyContent : 'flex-start'}}>
                                            <Paragraph style={styles.iconsHealthTipAuthor}><Icon name="person-outline" size={15}  /> {item.author_name}</Paragraph>
                                            <Paragraph style={styles.iconsHealthTipDateTime}><Icon name="time-outline" size={15} /> {new Date(item.created_at).toDateString()}</Paragraph>
                                        </View>                            
                                    </View>  
                                </View>
                          </Card>
                      </Animatable.View>
                      }
                      ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}>  No Data Present In... Try Again.</Text>
                                                </Card.Content>
                                            </Card>)}
                  />  
                }
                </View>
                </View> 
            
            
            </ScrollView>
        </SafeAreaView>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, healthTipsList } = state.healthTipsReducer;
  // console.log("healthTipsList",healthTipsList)
  return {
    healthTipsList,
    loader
  };    
}

export default connect(mapStateToProps)(HealthTipsScreen);



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
    // height:120,
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
    borderRadius:5,
    color:'#fff'
  },
  HealthTipTitleStyle:{
    // width:'100%',
    flex: 1,
    flexWrap: "wrap",
    letterSpacing:1,
    marginLeft:10,
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
      width:120,
      height:120,
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
    marginTop:5,
    marginBottom:10
  },
  iconsHealthTipAuthor:{
    marginLeft:5,
    marginTop:5
  }
});
