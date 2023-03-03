import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left,Right, Body} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocalizationContext} from './Translations';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../assets/style.js';


import Blood_Sugar from '../assets/images/icons/test/38-Blood-Sugar.png';
import Urine_test from '../assets/images/icons/test/39-Urine-test.png';
import Ultrasound_Test from '../assets/images/icons/test/40-Ultrasound-Test.png';
import Liver_Functions from '../assets/images/icons/test/41-Liver-Functions.png';
import Kidney_Function from '../assets/images/icons/test/42-Kidney-Function.png';
import Thyroid_test from '../assets/images/icons/test/43-Thyroid-test.png';
import Lipid_profile from '../assets/images/icons/test/44-Lipid-profile.png';
import Hemoglobin_test from '../assets/images/icons/test/45-Hemoglobin-test.png';
import logo from '../assets/images/logo.png'




var {width, height} = Dimensions.get('screen')
 width = width/2.2

class FindLabCategory extends Component {

    constructor(props){
        super(props);
        this.state={
            text: '',
            categroy: '',
            
        }
        //console.disableYellowBox = true;
        this.arrayholder = [  
                      {key: 'Blood_Sugar',                    name: 'Blood_Sugar',                  image: Blood_Sugar},
                      {key: 'Urine_test',                     name: 'Urine_Test',                   image: Urine_test},
                      {key: 'Ultrasound_Test',                name: 'Ultrasound_Test',              image: Ultrasound_Test},
                      {key: 'Liver_Functions',                name: 'Liver_Functions',              image: Liver_Functions},
                      {key: 'Kidney_Function',                name: 'Kidney_Function',              image: Kidney_Function},
                      {key: 'Thyroid_test',                   name: 'Thyroid_Test',                 image: Thyroid_test},
                      {key: 'Lipid_profile',                  name: 'Lipid_Profile',                image: Lipid_profile},
                      {key: 'Hemoglobin_test',                name: 'Hemoglobin_Test',              image: Hemoglobin_test},

                  ]

    }

    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log("data",data)
        this.setState(
          {
            dataSource: this.arrayholder
          })
      });

      
     
    }
    
    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        text: text,
      });
    }

    render() {
      const translations = this.context.translations;
       // // console.log("transla---tions",translations['ABOUT_APPLICATION'])
      const { goBack } = this.props.navigation;
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>{translations['Lab_Test']}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={style.container}>
            <View>
              <View style={styles.containerView}>
                <View style={styles.searchHead}>
                  <View style={{flexDirection: 'row', width: "100%",justifyContent: 'center'}}>
                      <TextInput 
                            placeholder={translations["search"]}
                            style={styles.textInput}
                            autoCapitalize="none"
                            name="text"
                            onChangeText={text => this.SearchFilterFunction(text)}
                            value={this.state.text}
                        />
                  </View>
                </View>  

                <View style={styles.cardsContainer}> 
                        <FlatList  
                            data={this.state.dataSource}  
                            numColumns = {2}
                            columnWrapperStyle={styles.cardRow}
                            renderItem={({item}) =>  
                              <TouchableOpacity onPress={() => this.props.navigation.navigate("FindLab", {
                                categroy: item.name,
                                categroy_key: item.key,
                              })}> 
                                <Animatable.View>
                                  <View style={styles.categoryCard}>

                                      <Image style={styles.cardIcons} resizeMode={'center'} source={item.image} />
                                      <Text style={styles.cardTitle}>{translations[item.name]}</Text>

                                  </View> 
                                </Animatable.View>
                              </TouchableOpacity>    
                            }
                        />  
                </View> 


              </View> 
            </View>
           </Content>
        </Container>
      );
    }
}

FindLabCategory.contextType = LocalizationContext;


export default FindLabCategory;

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
    fontSize:16
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
    marginLeft: 0,
    marginRight: 0,
    backgroundColor:'#00CBCC',
    paddingLeft:10,
    paddingRight:10

  },
  textInput: {
    height: 40,
    width: "90%",
    marginTop: 10,
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

  cardsContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {

 
  },
  categoryCard:{
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height:150,
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
    width:width,
    padding:10,
    borderRadius:5,
    margin:5
  },
  categoryCardContentVerticalAlignment:{
    flex:1,
    flexDirection:'column'
  },
  cardIcons:{
    width:80,
    height:80,
    marginBottom:5
  },
  cardTitle:{
    color:'#000000',
    width:'100%',
    fontSize:14,
    textAlign:'center',
  },

});