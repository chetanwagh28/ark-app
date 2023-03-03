import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView,Feather } from 'react-native';
import { Avatar, Button, Card, Title, TextInput, Paragraph } from 'react-native-paper';
var {width, height} = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';



const UploadPrescription = ({navigation}) => {

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
              <Title style={styles.logoText}>Upload Prescription </Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>   
          
            
          </Header>
          <Content style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.containerView}>
                        <Animatable.View 
                                animation="fadeInUp"
                                style={styles.footer}
                            >

                            <Card style={styles.cardListView}>
                                <Card.Content>
                                    <TouchableOpacity>
                                        <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                            <Text style={styles.commonAppButtonText}>Upload</Text>
                                        </LinearGradient>
                                    </TouchableOpacity> 
                                </Card.Content>
                            </Card>

                            <Card style={styles.cardListView}>
                                <Card.Content>

                                        <View style={styles.action}>
                                            <TextInput 
                                                placeholder="Name"
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
                                                placeholder="Address"
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
                                                placeholder="Landmark"
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
                                                placeholder="Pin code"
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
                                                placeholder="Phone Number"
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

                                </Card.Content>
                            </Card>
                            
                        
                        </Animatable.View>  
                    </View>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center'}}>
                        <Animatable.View>
                            <TouchableOpacity >
                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton} >
                                    <Text style={styles.commonAppButtonText}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity> 
                        </Animatable.View>            
                    </View>
                </View>
            </ScrollView>
           </Content>
        </Container>
      );
};

export default UploadPrescription;

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
    backgroundColor: '#fff'
  },
  containerView: {
    margin: 0,
    flex: 1,
    backgroundColor: '#fff'
  },
  formHeaderView: {
    margin: 5,
    flex: 0.4,
    backgroundColor: '#f2f2f2'
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,

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
  textInput: {
    height: 40,
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
  submit_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
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
