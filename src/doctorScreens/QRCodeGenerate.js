import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Avatar,  Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import style from '../assets/style.js';
import QRCode from 'react-native-qrcode-svg';



class QRCodeGenerate extends Component {
 
    constructor(props){
        super(props);
        this.state={
            user_id: '',
            doctor_id: '',
            name: ''
        }
        //console.disableYellowBox = true;
        this.getProfile = this.getProfile.bind(this)
    }
    componentDidMount(){
      // this.getProfile()
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        // // console.log("data",this.props.route.params)
        this.getProfile()
      });
    }
    getProfile = async() => {
    let doc_id = '';
    let user_id = '';
    let name = '';
      let userToken = null;
      try {
          userToken = await AsyncStorage.getItem('userToken');
          // console.log(jwtdecode(userToken))
          doc_id = jwtdecode(userToken).doc_id
          user_id = jwtdecode(userToken).user_id
          name = jwtdecode(userToken).name
          // // console.log("===========doc_id",doc_id)
          this.setState({doctor_id: doc_id, user_id: user_id, name: name})
      } catch(e) {
          // console.log(e);
      }
    }


    render() {
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const { goBack } = this.props.navigation;
       

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>QR Code</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content>
            <View style={styles.container}>
                <Title style={{color: '#000', textAlign:'center', marginBottom: 15}}>Dr. {this.state.name}</Title>
                <QRCode
                  //QR code value
                  value={this.state.doctor_id ? `https://play.google.com/store/apps/details?id=com.arkpatient&doctor_id=${this.state.doctor_id}&type=appointment` : 'NA'}
                  size={300}
                />

            </View>
           </Content>
        </Container>
      );
    }
}

export default QRCodeGenerate;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerTitleText:{
    color:'#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 26,
  },
})