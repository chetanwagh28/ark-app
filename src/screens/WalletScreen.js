import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import jwtdecode from 'jwt-decode'
import { Header, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { profileActions } from '../action';
import LinearGradient from 'react-native-linear-gradient';
import {LocalizationContext} from './Translations';
import SkeletonLoader from '../components/SkeletonLoader';
import style from '../assets/style.js';
import _ from 'lodash';

class Wallet extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: ''
        }
        //console.disableYellowBox = true;
    }

    getProfile = async() => {
        let user_id = '';
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            // // console.log(jwtdecode(userToken))
            user_id = jwtdecode(userToken).user_id
            this.setState({user_id: user_id})
            const { dispatch } = this.props;
            dispatch(profileActions.getWallet(user_id));
            let data = { id: user_id, page_no: 1 } 
            dispatch(profileActions.getWalletHistory(data));
        } catch(e) {
            // console.log(e);
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getProfile()
        });
    }
    

    render() {
      const translations = this.context.translations;
      const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>{translations['Wallet']}</Title></>}
                rightComponent={<>
                  </>}
              />
          <ScrollView >
              {this.props.loader && 
                  <SkeletonLoader />
              }
              <Animatable.View style={{paddingHorizontal: 10, marginVertical: 10}}>
                <TouchableOpacity>
                    <View style={[styles.row, {backgroundColor: "#04898c"}]}>
                      <MaterialCommunityIcons name="wallet" size={25} color="#ffffff"/>
                      <View>
                        <View style={styles.nameContainer}>
                          <Text style={[styles.nameTxt, {color: "#ffffff"}]} numberOfLines={1} ellipsizeMode="tail">Balance</Text>
                          <Text style={[styles.mblTxt, {color: "#ffffff"}]}><FontAwesome name="rupee" size={16}/>{_.get(this.props, 'walletBalance[0].amount', [''])}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
              </Animatable.View> 
              <View style={{ flex: 1, paddingHorizontal: 10 }} >
                <FlatList 
                  // extraData={this.state}
                  data={this.props.walletHistory}
                  keyExtractor = {(item) => {
                    return item.id;
                  }}
                  renderItem={({item}) =>
                          <TouchableOpacity>
                            <View style={styles.row}>
                              <MaterialCommunityIcons name="wallet" size={25} color="#041a3b"/>
                              {/*<Image source={{ uri: "https://bootdey.com/img/Content/avatar/avatar3.png" }} style={styles.pic} />*/}
                              <View>
                                <View style={styles.nameContainer}>
                                  <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.type}</Text>
                                  <Text style={styles.mblTxt}><FontAwesome name="rupee" size={16}/>{item.amount}</Text>
                                </View>
                                <View style={styles.msgContainer}>
                                  <Text style={styles.msgTxt}>{new Date(item.created_at).toDateString()}</Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        }
                />
              </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
}


Wallet.contextType = LocalizationContext; 
function mapStateToProps(state) { 
  const { loader, walletBalance, walletHistory } = state.profileReducer;
  // console.log("walletBalance", walletHistory)
  return {
    loader,
    walletBalance,
    walletHistory
  };    
}

export default connect(mapStateToProps)(Wallet);

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
    backgroundColor: '#04898c'
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
  TabHead:{
    // backgroundColor:'#00B2B6',
  },
  tabsContainerStyle:{
    backgroundColor:'#00B2B6',
    // borderRadius: 15
  },
  categroy: {
    backgroundColor:'#00B2B6',
  },
  Tab:{
    backgroundColor:'#ffffff',
    borderRadius: 15
  },
  ActiveTabs:{
    backgroundColor:'#ed8b40',
    borderRadius: 15
  },
  Tabtext:{
    color:'#ed8b40',
  },
  ActiveTabText:{
    color:'#ffffff',
  },
  containerViewMain: {
    margin: 10,
    borderColor: '#000',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    // height: 160
  },
  tableColumn1:{
    marginTop:8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    textAlign: 'center'
  },
  profile_image:{
      width:60,
      height:60,
      marginLeft:10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#222',
    fontSize: 16,
    width:170,
  },
  mblTxt: {
    fontWeight: 'bold',
    color: '#777',
    marginRight: 20,
    fontSize: 16,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
