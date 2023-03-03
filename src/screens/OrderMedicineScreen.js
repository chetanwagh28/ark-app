import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Right } from 'native-base';
var {width, height} = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';


const OrderMedicine = ({navigation}) => {

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
              <Title style={styles.logoText}>Book Test Appointment</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>   
          </Header>
          <Content >
            <View style={styles.containerView}>
   
                <Card style={styles.categroyCard}>
                  <Card.Title
                      title="Shanshank"
                      subtitle="Bicholi Mardana"
                      left={(props) => <Image style={styles.appLogo} resizeMode={'center'} source={{uri: "https://panel.avark.in/apk-image/assets/images/logo.png"}}/>  }
                      
                    />
                  <Card.Content>
                      <View style={styles.contentList}>
                          <View>
                              <Paragraph>Clinic: AVARK Clinic</Paragraph>
                          </View>    
                          
                      </View>
                  </Card.Content>
                </Card>
                <View style={styles.formView}>

                    <View style={{ flexDirection: 'row', margin:20 }}>
                        <Left>
                            <Text style={styles.textStart}>Bill Amount</Text>
                        </Left>
                        <Right>
                            <Text style={styles.textEnd}>500</Text>
                        </Right>
                    </View>
                    <View style={{ flexDirection: 'row', margin:20 }}>
                        <Left>
                            <Text style={styles.textStart}>Discount</Text>
                        </Left>
                        <Right>
                            <Text style={styles.textEnd}>50</Text>
                        </Right>
                    </View>

                    <View style={{ flexDirection: 'row', margin:20 }}>
                        <Left>
                            <Text style={styles.textStart}>GST 18%</Text>
                        </Left>
                        <Right>
                            <Text style={styles.textEnd}>9.00</Text>
                        </Right>
                    </View>

                    <View style={{ flexDirection: 'row', margin:20 }}>
                        <Left>
                            <Text style={styles.textStart}>Delivery Charges</Text>
                        </Left>
                        <Right>
                            <Text style={styles.textEnd}>30.00</Text>
                        </Right>
                    </View>

                    <View style={{ flexDirection: 'row', margin:20 }}>
                        <Left>
                            <Text style={styles.textStart}>Total</Text>
                        </Left>
                        <Right>
                            <Text style={styles.textEnd}>589.00</Text>
                        </Right>
                    </View>
                    <Text>Estimated delivery time 24hrs</Text>
                </View>
            </View> 
            
          </Content>
          <Footer style={styles.footerContainer}>
            <FooterTab 
              style={styles.footerTabs} 
              >
              <Button style={styles.footerTabsButton} >
                <Text>Cash on Delivery</Text>
              </Button>
              <Button style={styles.footerTabsButton} >
                <Text>Pay Now</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
};

export default OrderMedicine;

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
  categroyCard: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15
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
  buttonS:{
    margin: 5
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
  footerTabsButton1:{
    backgroundColor:'#00B2B6',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1,      
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 1,
    width: '50%' 
  },
  formView: {
    margin: 5,
    marginTop:100,
    flex: 0.9,
    backgroundColor: '#d9d9d9'
  },
  textStart:{
      justifyContent: "flex-start"
  },
  textEnd:{
      justifyContent: "flex-end"
  }
});
