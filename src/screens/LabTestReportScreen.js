import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-elements';
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';


class LabTestReport extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            listData: [  
                      // {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      // {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      // {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      // {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}
                  ]
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {

      });
    }

    render() {
        const { goBack } = this.props.navigation;
        const translations = this.context.translations;
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:4, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>{translations['Lab_Test_Report']}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>             
          </Header>
          <Content style={style.container}>
              
                  <View style={styles.categroy}>
                    <FlatList  
                        data={this.state.listData}  
                        numColumns = {1}
                        renderItem={({item}) =>  
                          
                            <Card key={item.key} style={styles.categroyCard}>

                            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                              <Avatar.Image size={50} source={require('../assets/images/user-avatar.png')}/>
                            </View>
                              
                              <Card.Content>
                                  <View style={styles.contentList}>
                                      <View>
                                          <Paragraph style={styles.titleHeading}>{item.name} </Paragraph>
                                          <Paragraph style={styles.titleHeadingSubHeading}>Bicholi Mardana</Paragraph>
                                          <Paragraph style={styles.titleHeadingDescription}>Clinic: AVARK Clinic</Paragraph>
                                      </View>                                      
                                      <View>
                                          <Rating
                                           fractions="{1}" 
                                           startingValue="{3.3}" 
                                           imageSize={10}
                                           readonly
                                           /> 
                                      </View>    
  
                                  </View>
                                  
                                  <View style={{ flexDirection: 'row', justifyContent: 'center', margin:10 }}>
                                        <Button style={styles.buttonS} mode="contained" 
                                          // onPress={() => Communications.phonecall('0123456789', true)}
                                          >Call Now</Button>
                                    </View>  
                              </Card.Content>
                            </Card>
                        }
                        ListEmptyComponent={(<Card style={styles.containerCard1}>
                                                <CardItem  header>
                                                  <Text style={{textAlign: 'center'}}>  No Lab Report.</Text>
                                                </CardItem>
                                            </Card>)}
                    />  
                  </View>
                
                 
          </Content>
        </Container>
      );
    }
}

LabTestReport.contextType = LocalizationContext; 

export default LabTestReport;

const styles = StyleSheet.create({
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  appHeader:{
    backgroundColor:'#00B2B6',
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
  searchHead: {
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 0,
    marginLeft: 10,
    marginTop:10,
    marginRight: 10,
    marginBottom:10,
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
    textAlign:'center',
    padding:5,
    borderRadius:5
  },
  categroyCard: {
    borderWidth: 0,
    marginLeft: 10,
    marginTop:10,
    marginRight: 10,
    marginBottom:10,
    height:'auto',
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
    textAlign:'center',
    padding:15,
    borderRadius:5
  },
  buttonS:{
    margin: 5,
    backgroundColor:'#00B2B6',
  },
  titleHeading:{
    width:'100%',
    textAlign:'center',
    fontWeight:'400',
    fontSize:20,
    marginTop:10
  },
  titleHeadingSubHeading:{
    width:'100%',
    textAlign:'center'
  },
  titleHeadingDescription:{
    width:'100%',
    textAlign:'center'
  },
});
