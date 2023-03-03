import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image, Switch, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
import { Container, Header, Content, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileActions } from '../action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import jwtdecode from 'jwt-decode'
import style from '../assets/style.js';

class DoctorSetting extends Component {

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
      let doc_id = '';
        let userToken = null;
        try {
            userToken = await AsyncStorage.getItem('userToken');
            // // console.log(jwtdecode(userToken))
            doc_id = jwtdecode(userToken).doc_id
            const { dispatch } = this.props;
            dispatch(profileActions.getDoctorProfile(doc_id));
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
        // // console.log("nextProps.doctorProfileDetail",nextProps.doctorProfileDetail)
        if(nextProps.getProfileFlag && nextProps.doctorProfileDetail.length > 0){
            let data = nextProps.doctorProfileDetail[0]
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
    
        // const { dispatch } = this.props;
        // dispatch(profileActions.updatePatientProfile(formData));
      }
    }

    render() {
      const translations = this.context.translations;
      const { goBack } = this.props.navigation;
     
      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Ionicons.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => goBack()}></Ionicons.Button>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>{translations['settings']}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>              
          </Header>
          <Content style={style.container}>
            <ListItem icon >
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon active name="information" />
                </Button>
              </Left>
              <Body>
                <Text>App Demo</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>



            <ListItem icon >
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialCommunityIcons active name="theme-light-dark" size={20}/>
                </Button>
              </Left>
              <Body>
                <Text>Themes</Text>
              </Body>
              <Right>
                <Switch
                  trackColor={{ false: "#767577", true: "#ffffff" }}
                  thumbColor={this.state.theme ? "#00B2B6" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => this.onToggle('theme',value)}
                  value={this.state.theme}
                />
              </Right>
            </ListItem>


            <ListItem icon onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialCommunityIcons active name="onepassword" size={20}/>
                </Button>
              </Left>
              <Body>
                <Text>Change Password</Text>
              </Body>
              <Right>
                
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Ionicons active name="notifications" size={20}/>
                </Button>
              </Left>
              <Body>
                <Text>Notification Sound</Text>
              </Body>
              <Right>
                <Switch
                  trackColor={{ false: "#767577", true: "#ffffff" }}
                  thumbColor={this.state.notification ? "#00B2B6" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => this.onToggle('notification',value)}
                  value={this.state.notification}
                />
              </Right>
            </ListItem>
            <ListItem icon onPress={() => this.props.navigation.navigate('HelpAndSupport')}>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Ionicons active name="help" size={20}/>
                </Button>
              </Left>
              <Body>
                <Text>Help & Support</Text>
              </Body>
              
            </ListItem>

            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <MaterialCommunityIcons active name="update" size={20}/>
                </Button>
              </Left>
              <Body>
                <Text>Application Update</Text>
              </Body>
              
            </ListItem>
            
            
          </Content>
        </Container>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, doctorProfileDetail, profileUpdate, errorMsg, getProfileFlag } = state.profileReducer;
  return {
    doctorProfileDetail,
    profileUpdate,
    loader,
    errorMsg,
    getProfileFlag
  };    
}

export default connect(mapStateToProps)(DoctorSetting);

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
