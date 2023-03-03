import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, TextInput, Paragraph, RadioButton } from 'react-native-paper';
import { Rating, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {healthTipsActions} from '../action';
import LinearGradient from 'react-native-linear-gradient';
var {width, height} = Dimensions.get('window')
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import style from '../assets/style.js';
import HTML from "react-native-render-html";
import {utilityHelper} from '../helper/utilityHelper'



class HealthTipsDetailScreen extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
            typePayment: '',
            categroy: 'Doctors',
            healthTipDetail: ''
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){
      

      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        const { dispatch } = this.props;
        if(this.props.route.params?.type){
          dispatch(healthTipsActions.getHealthTip(this.props.route.params.id));
        }else{
          this.setState({
            healthTipDetail: this.props.route.params.detail,
          })
          // dispatch(healthTipsActions.getHealthTip(this.props.route.params.detail.health_tip_id));
        }
      });

    }
 
    render() {
      var healthTipDetail = this.state.healthTipDetail;
        
      if(this.props.healthTipDetail.length > 0){
        healthTipDetail = this.props.healthTipDetail[0];
      }
      const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={{fontSize: 14, fontWeight: 'bold', color: '#ffffff', flexWrap: 'wrap' }}>{healthTipDetail !== '' && healthTipDetail.title}</Title></>}
              />
              <ScrollView>
                <View style={styles.containerView}>
                    {healthTipDetail !== '' &&
                      <Card style={styles.cardListView}>
                        <Card.Content>
                            <View>
                                  {healthTipDetail.image_url ?
                                    <Image style={styles.health_tips_details_banner_image} source={{ uri: utilityHelper.ProfilePic(healthTipDetail.image_url) }} />
                                    :
                                    <Image style={styles.health_tips_details_banner_image} source={{uri: 'data:image/png;base64,'+ healthTipDetail.image}} />
                                  }
                            </View>  
                            <View style={{flexDirection:'row',  justifyContent:'center', alignItems:'center',}}>
                                <Paragraph style={styles.iconsHealthTipAuthor}><Icon name="person-outline" size={15}  /> {healthTipDetail.author_name}</Paragraph>
                                <Paragraph style={styles.iconsHealthTipDateTime}><Icon name="time-outline" size={15} /> {new Date(healthTipDetail.created_at).toDateString()}</Paragraph>
                            </View>
                            <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'flex-start'}}>
                                <Text>{healthTipDetail.desc_en}</Text>
                                {healthTipDetail.content && (<HTML source={{ html: JSON.parse(healthTipDetail.content) }} />)}
                            </View>
                        </Card.Content>
                      </Card>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
      );
    }
}
function mapStateToProps(state) { 
  const { loader, healthTipDetail } = state.healthTipsReducer;
  // console.log("healthTipDetail",healthTipDetail)
  return {
    healthTipDetail,
    loader
  };    
}

export default connect(mapStateToProps)(HealthTipsDetailScreen);


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
    fontSize:14,
    flexWrap: 'wrap',
    lineHeight: 20
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
  categroy: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    alignItems: 'flex-start',
    height:'auto',
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
    color:'#fff',
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
    width:'100%',
    height:150,
    marginBottom:10

  }
  
});
