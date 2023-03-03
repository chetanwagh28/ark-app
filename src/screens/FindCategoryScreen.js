import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { Header } from 'react-native-elements';
// import { Container, Header, Content, Footer, FooterTab, Left,Right, Body} from 'native-base';
import { loginActions, doctorActions } from '../action';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocalizationContext} from './Translations';
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
            categroyKey: '',
            spList: [],
            filterList: [],
            getCat: false
            
        }
        //console.disableYellowBox = true;
    }

    componentDidMount(){
      if(this.props.spList.length < 1){
          const { dispatch } = this.props;
          dispatch(doctorActions.getSpecialization("params"))  
      }
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        if(this.props.route.params){
          this.setState({
            categroy: this.props.route.params.categroy,
            categroyKey: this.props.route.params.categroyKey
          })
        }
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
      const translations = this.context.translations;
       // // console.log("transla---tions",translations['ABOUT_APPLICATION'])
      const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>{translations['Find_By_Category']}</Title></>}
                rightComponent={<>
                  </>}
              />
        
                <View style={styles.searchHead}>
                  <View style={{width: "100%"}}>
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
                            renderItem={({item}) =>  {
                              return(<TouchableOpacity onPress={() => this.props.navigation.navigate("FindDoctor", {
                                categroy: this.state.categroy,
                                categroyKey: this.state.categroyKey,
                                specialization: item.en_spec,
                                specialization_key: item.spec_id,
                                spec_id: item.spec_id
                              })}> 
                                <Animatable.View>
                                  <View style={styles.categoryCard}>
                                    {item.image_url &&
                                      <Image style={styles.cardIcons} resizeMode={'cover'} source={{ uri: utilityHelper.ProfilePic(item.image_url) }} />
                                    }
                                  </View>
                                  <View style={styles.categoryCard1} >
                                    <Text style={styles.cardTitle}>{item.en_spec}</Text>
                                  </View>

                                </Animatable.View>
                              </TouchableOpacity> )   
                            }
                            }
                        />  
                </View> 


        
        </SafeAreaView>
      );
    }
}

FindCategory.contextType = LocalizationContext;

function mapStateToProps(state) { 
  const { loader, spList } = state.doctorReducer;
  // console.log("spList",spList)
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

  searchHead:{
    backgroundColor:'#273f61'

  },
  textInput: {
    height: 40,
    // width: "90%",
    margin: 5,
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#dcf7fa',
    // backgroundColor: '#00B2B6',    
    borderColor:'#dcf7fa',
    shadowColor: '#dcf7fa',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    textAlign:'center',
    width:width,
    // padding:10,
    // borderRadius: 5,
    flexDirection: 'column',
    marginHorizontal:5,
    marginTop:5,
    padding:10,
  },
  categoryCard1:{
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#273f61',
    // backgroundColor: '#00B2B6',    
    borderColor:'#dcf7fa',
    shadowColor: '#dcf7fa',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    textAlign:'center',
    width:width,
    // padding:10,
    // borderRadius: 5,
    flexDirection: 'column',
    marginHorizontal:5,
    padding:10,
    marginBottom:5,
  },
  categoryCardContentVerticalAlignment:{
    flex:1,
    flexDirection:'column'
  },
  cardIcons:{
    width:100,
    height:100,
    borderRadius:5,
    // backgroundColor:"#ffffff",
    marginBottom:5
  },
  cardTitle:{
    color:'#ffffff',
    width:'100%',
    fontSize:14,
    textAlign:'center',
  },

});