import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions,StatusBar,ScrollView } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph,Button } from 'react-native-paper';
import { Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';

class Summary extends Component {

    constructor(props){
        super(props);
        this.state={
            doctorDetail: {}
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.setState({doctorDetail: this.props.route.params.doctorDetail[0]})
      });
    }


    render() {
      // // console.log("doctorDetail", this.state.doctorDetail)
        const translations = this.context.translations;
        const { doctorDetail } = this.state;
        const { goBack } = this.props.navigation;
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => this.props.navigation.navigate("Home")}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>{translations['Summary']}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right> 
            
            
          </Header>
          <Content style={style.container}>
            <ScrollView >
              <View style={styles.containerView}>
                  <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
                  <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>

                      <Card style={styles.cardListView}>
                          <Card.Content>
                              <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between'}}>
                                  <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between'}}>
                                      <Avatar.Image  source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }} style={styles.profile_image} size={60} />
                                        <View style={styles.rating_container}>
                                          <Rating
                                              type='custom'
                                              fractions="{1}" 
                                              startingValue="{5}" 
                                              imageSize={17}
                                              ratingBackgroundColor ='transparent'
                                              count="{5}"
                                              readonly
                                              /> 
                                        </View>
                                        <View style={styles.review_container}>
                                          <Paragraph>0 {translations['reviews']}</Paragraph>
                                        </View>

                                  </View>
                                  
                                  <View>
                                      
                                      <Paragraph>{doctorDetail.name}  </Paragraph>
                                      <Paragraph>{translations['speciality']}: {doctorDetail.en_spec}</Paragraph>
                                      <Paragraph>{translations['experience']}: {doctorDetail.expirience}</Paragraph>
                                      <Paragraph>{translations['hospital_clinic']}: {doctorDetail.hospital}</Paragraph>
                                      <Paragraph>{translations['hospital_clinic']} {translations['fees']}: Rs. {doctorDetail.visit_charge} </Paragraph>
                                  </View>  
                              </View>
                          </Card.Content>
                        </Card>
                      

                        <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'center'}}>
                              <Text style={styles.appointmentBookedMessage}>{translations['Appointment_Booked']}</Text>
                        </View>

                  </Animatable.View>
              </View>             
            </ScrollView>
          </Content>
        </Container>
      );
    }
}
Summary.contextType = LocalizationContext; 
export default Summary;

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
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerView: {
    margin: 5,
    marginTop: 30,
    flex: 0.9
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
  cash_button:{
    marginRight: 5,
    marginTop:10,
    backgroundColor:'#00B2B6',
  },
  pay_now_button:{
    marginRight: 5,
    marginTop:10,
    backgroundColor:'#00B2B6',

  },
  textAreaContainer: {
    borderColor: '#f0f0f0',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  footerContainer:{
  },
  footerTabs:{
    backgroundColor:'#ffffff',
  },
  footerTabsButton:{
    backgroundColor:'#00B2B6',
      borderTopColor: '#ffffff',
      borderTopWidth: 1,
      borderRightColor: '#ffffff',
      borderRightWidth: 1,      
      borderBottomColor: '#ffffff',
      borderBottomWidth: 1,
      borderLeftColor: '#ffffff',
      borderLeftWidth: 1,      
  },
  appointmentBookedMessage:{
    textAlign:'center',
    backgroundColor:'#30BC10',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:5,
    color:'#fff',
    marginTop:20,
    marginBottom:10
  },
  commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  }
});
