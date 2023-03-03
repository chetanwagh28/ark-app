import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left,Right, Body} from 'native-base';
import { loginActions, doctorActions } from '../action';
import logo from '../assets/images/logo.png'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocalizationContext} from './Translations';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonLoader from '../components/SkeletonLoader';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'



var {width, height} = Dimensions.get('screen')
 width = width/2.2

class FindCategory extends Component {

    constructor(props){
        super(props);
        this.state={
            text: '',
            categroy: '',
            spList: [],
            filterList: [],
            getCat: false,
            referDetail: '',
            
        }
        //console.disableYellowBox = true;
    }

    componentDidMount(){
      if(this.props.spList.length < 1){
          const { dispatch } = this.props;
          dispatch(doctorActions.getSpecialization("params"))  
      }
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.setState({
          referDetail: this.props.route.params.referDetail
        })
      });
    }

    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.state.filterList.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.en_spec ? item.en_spec.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        spList: newData,
        text: text,
      });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      // // console.log(nextProps.categroyList.data) 
      if (nextProps.spList !== prevState.spList && !prevState.getCat) {
        if(nextProps.spList.length > 0){
          return ({ 
            spList: nextProps.spList,
            filterList: nextProps.spList,
            getCat: true
          })
        } 
      }
      return null
    }
    
    render() {
      // // console.log("Chintu",this.state.spList);
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
              <Title style={styles.logoText}>{translations['Find_By_Category']}</Title>
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
                  {this.props.loader && 
                      <SkeletonLoader />
                  } 
                        <FlatList  
                            data={this.state.spList}  
                            numColumns = {2}
                            columnWrapperStyle={styles.cardRow}
                            renderItem={({item}) =>  
                              <TouchableOpacity onPress={() => this.props.navigation.navigate("FindDoctor", {
                                categroy: this.state.categroy,
                                specialization: item.en_spec,
                                specialization_key: item.spec_id,
                                spec_id: item.spec_id,
                                referDetail: this.state.referDetail,
                              })}> 
                                <Animatable.View>
                                  <View style={styles.categoryCard}>
                                    {item.image_url &&
                                      <Image style={styles.cardIcons} resizeMode={'cover'} source={{ uri: utilityHelper.ProfilePic(item.image_url) }} />
                                    }
                                    <Text style={styles.cardTitle}>{item.en_spec}</Text>

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

FindCategory.contextType = LocalizationContext;

function mapStateToProps(state) { 
  const { loader, spList } = state.doctorReducer;
  // // console.log("spList",spList)
  return {
    spList,
    loader
  };    
}

export default connect(mapStateToProps)(FindCategory);


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
    backgroundColor:'#273f61',
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