import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image, Switch, Text, TouchableOpacity, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, Button, List } from 'react-native-paper';
// import { Container, Header, Content, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileActions } from '../action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import jwtdecode from 'jwt-decode'
import {LocalizationContext} from './Translations';
import style from '../assets/style.js';

class Setting extends Component {

    constructor(props){
        super(props);
        this.state={
            theme: false,
            permission: false,
            notification: false,
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
            const { dispatch } = this.props;
            dispatch(profileActions.getPatientProfile(user_id));
        } catch(e) {
            // console.log(e);
        }
    }

    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getProfile()
      });
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        // // console.log("nextProps.doctorProfileDetail",nextProps.patientProfileDetail)
        if(nextProps.getProfileFlag && nextProps.patientProfileDetail.length > 0){
            let data = nextProps.patientProfileDetail[0]
            // console.log(data.permission)
            this.setState({
                 permission: (data.permission == 1) ? true : false,
                 notification: (data.notification == 1) ? true : false
            });

            setTimeout(function(){
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1000);
        }
        if(nextProps.profileUpdate){
            setTimeout(function(){
              Alert.alert('Successfully Updated', '', [
                  {text: 'Close'}
              ]);  
              this.getProfile();              
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }
        if(nextProps.errorMsg){
            setTimeout(function(){
              Alert.alert(nextProps.errorMsg, '', [
                  {text: 'Close'}
              ]);  
              const { dispatch } = this.props;
              dispatch(profileActions.resetProfileState())
            }.bind(this),1500);
        }     
    }
    onToggle = (name, value) => {
      this.setState({ [name] : value})
      if(name !== 'theme'){
        const formData = new FormData();
        formData.append('permission', (value) ? 1 : 0 )
    
        const { dispatch } = this.props;
        dispatch(profileActions.updatePatientProfile(formData));
      }
    }

    render() {
      const translations = this.context.translations;
      const { goBack } = this.props.navigation;
     
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Ionicons name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()} />
                      </>}
                centerComponent={<><Text style={style.PageTitle}>{translations['settings']}</Text></>}
                rightComponent={<>
                  </>}
              />
        <ScrollView>
            <List.Item
              title="App Demo"
              titleStyle={styles.titleHeading}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#007AFF" }}>
                  <Ionicons active name="information" size={20}/>
                </Button>}
            />
            <List.Item
              title="Allow Doctors to access prescription"
              titleStyle={styles.titleHeading}
              titleNumberOfLines={2}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialIcons active name="public" size={20}/>
                </Button>}
              right={props => <Switch
                  trackColor={{ false: "#767577", true: "#ffffff" }}
                  thumbColor={this.state.permission ? "#00B2B6" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => this.onToggle('permission',value)}
                  value={this.state.permission}
                />}
            />
            <List.Item
              title="Themes"
              titleStyle={styles.titleHeading}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialCommunityIcons active name="theme-light-dark" size={20}/>
                </Button>}
              right={props => <Switch
                  trackColor={{ false: "#767577", true: "#ffffff" }}
                  thumbColor={this.state.theme ? "#00B2B6" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => this.onToggle('theme',value)}
                  value={this.state.theme}
                />}
            />
            <List.Item
              title="Change Password"
              titleStyle={styles.titleHeading}
              onPress={() => this.props.navigation.navigate('ChangePassword')}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialCommunityIcons active name="onepassword" size={20}/>
                </Button>}
            />
            <List.Item
              title="Notification Sound"
              titleStyle={styles.titleHeading}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#FF9501" }}>
                  <Ionicons active name="notifications" size={20}/>
                </Button>}
              right={props => <Switch
                  trackColor={{ false: "#767577", true: "#ffffff" }}
                  thumbColor={this.state.notification ? "#00B2B6" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => this.onToggle('notification',value)}
                  value={this.state.notification}
                />}
            />
            <List.Item
              title="Help & Support"
              titleStyle={styles.titleHeading}
              onPress={() => this.props.navigation.navigate('HelpAndSupport')}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#FF9501" }}>
                  <Ionicons active name="help" size={20}/>
                </Button>}
            />
            <List.Item
              title="Application Update"
              titleStyle={styles.titleHeading}
              onPress={() => this.props.navigation.navigate('HelpAndSupport')}
              // description="Item description"
              left={props => <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialCommunityIcons active name="update" size={20}/>
                </Button>}
            />

          </ScrollView>
        </SafeAreaView>
      );
    }
}
Setting.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, patientProfileDetail, profileUpdate, errorMsg, getProfileFlag } = state.profileReducer;
  return {
    patientProfileDetail,
    profileUpdate,
    loader,
    errorMsg,
    getProfileFlag
  };    
}

export default connect(mapStateToProps)(Setting);

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
    fontWeight:'bold',
    fontSize:16,
    flexWrap: 'wrap'
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
