import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph,Button } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
var {width, height} = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';
import { Rating } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';

const LabBookAppointment = ({navigation}) => {

    const [data, setData] = React.useState({
        name: '',
        address: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => navigation.goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Book Appointment </Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>   
          </Header>
            
          <Content style={style.container}>
          <ScrollView style={styles.container}>
            <View style={styles.containerView}>
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
                                  <Paragraph>0 Review</Paragraph>
                                  </View>
                            </View>
                            <View>
                                <Paragraph>Trident Laboratory  </Paragraph>
                                <Paragraph>Address: Civil Lines</Paragraph>
                                <Paragraph>Timing: 09:00 AM to 08:00 PM</Paragraph>
                                <Paragraph>Home Service: Available</Paragraph>
                            </View>                            
                        </View>
                      </Card.Content>
                    </Card>

                <View>
                    <Animatable.View 
                        animation="fadeInUp"
                        style={styles.footer}
                    >
                        <View style={styles.action}>
                            <TextInput 
                                placeholder="Add"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>
                        <View style={styles.action}>
                            <TextInput 
                                placeholder="Add"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>
                        <View style={styles.action}>
                            <TextInput 
                                placeholder="Add"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>
                        <View style={styles.action}>
                          <Text style={styles.gstTitle}>Amout GST 18%</Text>
                        </View>
                        <View style={styles.action}>
                            <TextInput 
                                placeholder="Total"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                            {data.check_textInputChange ? 
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather 
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                        </View>
                        

                        <View>
                          <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems:'center'  }}>

                            <TouchableOpacity onPress={() => navigation.navigate("OrderMedicine")}>
                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton} >
                                  <Text style={styles.commonAppButtonText}>Home Service</Text>
                              </LinearGradient>
                            </TouchableOpacity> 
                            
                            <TouchableOpacity onPress={() => navigation.navigate("OrderMedicine")}>
                              <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                  <Text style={styles.commonAppButtonText}>Book Appointment</Text>
                              </LinearGradient>
                            </TouchableOpacity>                             

                          </View>    
                        </View>                        

                    </Animatable.View>  
                       
                </View>
            </View> 
          </ScrollView>
        </Content>
      </Container>
      );
};

export default LabBookAppointment;

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
    textAlign:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerView: {
    margin: 5,
    marginTop: 30,
    flex: 1
  },
  textInput: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 20,

  },
  categroy: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  categroyCard: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15
  },

  home_service_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
    marginTop:10,
    marginLeft:15
  },
  book_appointment_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
    marginTop:10,
    marginRight:15

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
  buttonS:{
    margin: 5
  },
  textAreaContainer: {
    borderColor: '#f0f0f0',
    borderWidth: 1,
    padding: 5
  },
  gstTitle: {
        color: '#05375a',
        fontSize: 14,
        marginLeft:15,
        marginTop:5
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
    }    
});
