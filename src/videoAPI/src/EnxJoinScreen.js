/*
import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  TextInput,
  Button,
  View,
  PermissionsAndroid,
  Keyboard,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";

// import axios from "react-native-axios";
import axios from 'axios';
import { each } from "underscore";

type Props = {};
export default class App extends PureComponent {
  infos: string;
  res_token: string;
  static propTypes = {
    componentId: PropTypes.string
  };

  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true,
        title: {
          text: "Enablex",
          fontSize: 20,
          color: "white"
        },
        background: {
          color: "#6f5989"
        }
      },
      statusBar: {
        backgroundColor: "#534367",
        visible: true,
        style: "light"
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      user_name: "React Native",
      room_id:"",
      permissionsError: false,
      information:'',
      resToken:''
    };
    this._onJoin_Room = this._onJoin_Room.bind(this);
    this._onCreate_Room = this._onCreate_Room.bind(this);
    this.getRoomIDWebCall = this.getRoomIDWebCall.bind(this);
    this.getRoomTokenWebCall = this.getRoomTokenWebCall.bind(this);
    this.navigateToVideo = this.navigateToVideo.bind(this);
  }
  componentDidMount(){
    const { route } = this.props;
     // console.log("Inside Enx Jai shree Ram")
     const username = route.params ? route.params.username : null;
     const roomID = route.params ? route.params.roomID :"";
    //  this._onCreate_Room ();
    // this._onJoin_Room(roomID);
  }
  render(){
    return(
      <View></View>
    );
  }
   render() {
     
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          
          <View style={{ marginTop: 10,marginBottom:20 }}>
            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: "#eae7e7",
                backgroundColor: "#eae7e7",
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 20,
                alignSelf: "center"
              }}
              placeholder="Enter name"
              ref={"textInput1"}
              keyboardType={"default"}
              autoCapitalize={"none"}
              editable={true}
              onChangeText={user_name => this.setState({ user_name })}
              value={this.state.user_name}
              returnKeyType={"next"}
              onSubmitEditing={event => {
                this.refs.textInput2.focus();
              }}
              autoCorrect={false}
              placeholderTextColor="#757575"
              underlineColorAndroid="transparent"
            />

            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: "#eae7e7",
                backgroundColor: "#eae7e7",
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 20,
                alignSelf: "center"
              }}
              placeholder="Enter roomId"
              autoCapitalize={"none"}
              ref={"textInput2"}
              editable={true}
              onChangeText={room_id => this.setState({ room_id })}
              value={this.state.room_id}
              keyboardType={"default"}
              returnKeyType={"next"}
              autoCorrect={false}
              placeholderTextColor="#757575"
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              width:250,
              bottom: 0,
              alignSelf:"center",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 25,
            }}
          >
          <TouchableHighlight
            style={{
              height: 40,
              width:120,
              borderColor: "#534367",
              backgroundColor: "#534367",
              borderRadius: 20,
              alignItems: "center"
            }}
            underlayColor="transparent"
            onPress={this._onCreate_Room}
          >
            <Text style={styles.continue_button}>Create Room</Text>
          </TouchableHighlight>
          
          <TouchableHighlight
            style={{
              height: 40,
              width:120,
              borderColor: "#534367",
              backgroundColor: "#534367",
              borderWidth: 2,
              borderRadius: 20,
              alignItems: "center"
            }}
            underlayColor="transparent"
            onPress={this._onJoin_Room}
          >
            <Text style={styles.continue_button}>Join</Text>
          </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  } 

 async _onCreate_Room () {
      if (Platform.OS === "android") {
        checkAndroidPermissions()
          .then(() => {
             this.setState({ permissionsError: false });
          })
          .catch(error => {
            this.setState({ permissionsError: true });
            // console.log("checkAndroidPermissions", error);
            return;
          });
      } 
        await this.getRoomIDWebCall();
  };

  _onJoin_Room = () => {
    // console.log("_onJoin_Room");
    // this.navigateToVideo(roomID);
    if (this.state.user_name == "" && this.state.room_id == "") {
      alert("Please enter your details");
    } else if (this.state.user_name == "") {
      alert("Please enter your name");
    } else if (this.state.room_id == "") {
      alert("Please enter roomId");
    }  else {
        this.navigateToVideo();
      }
  };

    async getRoomIDWebCall() {
    var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
    const options = {
      headers: header
    };  

 var info= await axios
      .post(kBaseURL+"createRoom/", {} , options)
      .then(function(response) {
        // console.log("createRoomresponse.data", response.data);
        // this.infos = response.data;
        // // console.log("axiosResponseinfo", this.infos);
        return response.data;
      })
      .catch(function(error) {
        // console.log("axiosRoomIdCatchError", error);
      });
      
      this.setState({information:info,room_id:info.room.room_id});
  }

  async getRoomTokenWebCall() {
    // // console.log("vxc",this.state.room_id);
    // console.log("getRoomTokenWebCall");
    var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
    const options = {
      headers: header
    };
 var data=   await axios
      .post(kBaseURL+"createToken/", {
        name: this.state.user_name,
        role: "participant",
        user_ref: "2236",
        roomID:this.state.room_id
      },options)
      .then(function(response) {
        // console.log("createToken_response.data",response.data)
        // this.res_token = response.data;
         return response.data;
        
       
      })
      .catch(function(error) {
        // console.log("axiosCreateTokenCatch", error);
      });
      this.setState({resToken:data},()=>{
        // console.log("axiosResponsetoken", this.state.resToken);
      })
  }

  async navigateToVideo(roomID) {
   // const { navigate } = this.props.navigation;
    await this.getRoomTokenWebCall(roomID);
    // console.log("navigateToVideo")
    try {
      // if (res_token.result == 0) {
        if (this.state.resToken == 0) {
        this.props.navigation.navigate('EnxConferenceScreen', {
          username: this.state.user_name,
          // username:"Ram",
          // token: res_token.token
          token:this.state.resToken.token
         });
      } else {
        // console.log(this.state.resToken.error);
      }
    } catch (error) {
      // console.log("navigationError", error);
    }
  }
}

const checkAndroidPermissions = () =>
  new Promise((resolve, reject) => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ])
      .then(result => {
        const permissionsError = {};
        permissionsError.permissionsDenied = [];
        each(result, (permissionValue, permissionType) => {
          if (permissionValue === "denied") {
            // console.log("denied Permission");
            permissionsError.permissionsDenied.push(permissionType);
            permissionsError.type = "Permissions error";
          }
        });
        if (permissionsError.permissionsDenied.length > 0) {
          // console.log("denied Permission");
          reject(permissionsError);
        } else {
          // console.log("granted Permission");
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  continue_button: {
    color: "white",
    marginTop:5,
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center"
  }
});*/


import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  TextInput,
  Button,
  View,
  PermissionsAndroid,
  Keyboard,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";

// import axios from "react-native-axios";
import axios from 'axios';

import { each } from "underscore";

type Props = {};
export default class App extends PureComponent {
  infos: string;
  res_token: string;
  static propTypes = {
    componentId: PropTypes.string
  };

  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true,
        title: {
          text: "Enablex",
          fontSize: 20,
          color: "white"
        },
        background: {
          color: "#6f5989"
        }
      },
      statusBar: {
        backgroundColor: "#534367",
        visible: true,
        style: "light"
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      user_name: "React Native",
      room_id:"",
      permissionsError: false,
      information:'',
      resToken:''
    };
    this._onJoin_Room = this._onJoin_Room.bind(this);
    this._onCreate_Room = this._onCreate_Room.bind(this);
    this.getRoomIDWebCall = this.getRoomIDWebCall.bind(this);
    this.getRoomTokenWebCall = this.getRoomTokenWebCall.bind(this);
    this.navigateToVideo = this.navigateToVideo.bind(this);
  }
  componentDidMount(){
    const { route } = this.props;
     // console.log("Inside Enx Jai shree Ram")
     const username = route.params ? route.params.username : null;
     const roomID = route.params ? route.params.roomID :"";
     this._onCreate_Room();
    this._onJoin_Room(roomID);
  }
  render(){
    return(
      <View></View>
    );
  }
 /* render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ marginTop: 10,marginBottom:20 }}>
            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: "#eae7e7",
                backgroundColor: "#eae7e7",
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 20,
                alignSelf: "center"
              }}
              placeholder="Enter name"
              ref={"textInput1"}
              keyboardType={"default"}
              autoCapitalize={"none"}
              editable={true}
              onChangeText={user_name => this.setState({ user_name })}
              value={this.state.user_name}
              returnKeyType={"next"}
              onSubmitEditing={event => {
                this.refs.textInput2.focus();
              }}
              autoCorrect={false}
              placeholderTextColor="#757575"
              underlineColorAndroid="transparent"
            />

            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: "#eae7e7",
                backgroundColor: "#eae7e7",
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 20,
                alignSelf: "center"
              }}
              placeholder="Enter roomId"
              autoCapitalize={"none"}
              ref={"textInput2"}
              editable={true}
              onChangeText={room_id => this.setState({ room_id })}
              value={this.state.room_id}
              keyboardType={"default"}
              returnKeyType={"next"}
              autoCorrect={false}
              placeholderTextColor="#757575"
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              width:250,
              bottom: 0,
              alignSelf:"center",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 25,
            }}
          >
          <TouchableHighlight
            style={{
              height: 40,
              width:120,
              borderColor: "#534367",
              backgroundColor: "#534367",
              borderRadius: 20,
              alignItems: "center"
            }}
            underlayColor="transparent"
            onPress={this._onCreate_Room}
          >
            <Text style={styles.continue_button}>Create Room</Text>
          </TouchableHighlight>
          
          <TouchableHighlight
            style={{
              height: 40,
              width:120,
              borderColor: "#534367",
              backgroundColor: "#534367",
              borderWidth: 2,
              borderRadius: 20,
              alignItems: "center"
            }}
            underlayColor="transparent"
            onPress={this._onJoin_Room}
          >
            <Text style={styles.continue_button}>Join</Text>
          </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  } */

 async _onCreate_Room () {
      if (Platform.OS === "android") {
        checkAndroidPermissions()
          .then(() => {
             this.setState({ permissionsError: false });
          })
          .catch(error => {
            this.setState({ permissionsError: true });
            // console.log("checkAndroidPermissions", error);
            return;
          });
      } 
        await this.getRoomIDWebCall();
  };

  _onJoin_Room = (roomID) => {
    this.navigateToVideo(roomID);
    // if (this.state.user_name == "" && this.state.room_id == "") {
    //   alert("Please enter your details");
    // } else if (this.state.user_name == "") {
    //   alert("Please enter your name");
    // } else if (this.state.room_id == "") {
    //   alert("Please enter roomId");
    // }  else {
    //     this.navigateToVideo(roomID);
    //   }
  };

    async getRoomIDWebCall() {
    var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
    const options = {
      headers: header
    };  

    var info=  await axios
      .post(kBaseURL+"createRoom/", {} , options)
      .then(function(response) {
        // this.infos = response.data;
        // // console.log("axiosResponseinfo", this.infos);
        return response.data;
      })
      .catch(function(error) {
        // console.log("axiosRoomIdCatchError", error);
      });
      // this.setState({room_id:infos.room.room_id})
      this.setState({information:info,room_id:info.room.room_id});
  }

  async getRoomTokenWebCall(roomID) {
    // console.log("vxc",roomID);
    var header = (kTry) ? { "x-app-id" : kAppId , "x-app-key" : kAppkey} : {};
    const options = {
      headers: header
    };
 var data=  await axios
      .post(kBaseURL+"createToken/", {
        name: this.state.user_name,
        role: "moderator",
        user_ref: "8fc65987-06b1-49cd-8e70-50e3ad2e0766",
        roomID:roomID
      },options)
      .then(function(response) {
        // this.res_token = response.data;
        // console.log("response.data",response.data);
        return response.data;
        // // console.log("axiosResponsetoken", this.res_token);
       
      })
      .catch(function(error) {
        // console.log("axiosCreateTokenCatch", error);
      });
      // console.log("data", data);
      this.setState({resToken:data},()=>{
        // console.log("axiosResponsetoken", this.state.resToken);
      })
  }

  async navigateToVideo(roomID) {
   // const { navigate } = this.props.navigation;
    await this.getRoomTokenWebCall(roomID);
    try {
      if (this.state.resToken.result == 0) {
        this.props.navigation.navigate('EnxConferenceScreen', {
          username: this.state.user_name,
          token: this.state.resToken.token
         
         });
      } else {
        // console.log(this.state.resToken.error);
      }
    } catch (error) {
      // console.log("navigationError", error);
    }
  }
}

const checkAndroidPermissions = () =>
  new Promise((resolve, reject) => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ])
      .then(result => {
        const permissionsError = {};
        permissionsError.permissionsDenied = [];
        each(result, (permissionValue, permissionType) => {
          if (permissionValue === "denied") {
            // console.log("denied Permission");
            permissionsError.permissionsDenied.push(permissionType);
            permissionsError.type = "Permissions error";
          }
        });
        if (permissionsError.permissionsDenied.length > 0) {
          // console.log("denied Permission");
          reject(permissionsError);
        } else {
          // console.log("granted Permission");
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  continue_button: {
    color: "white",
    marginTop:5,
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center"
  }
});
   /*Your webservice host URL, Keet the defined host when kTry = true */
  const kBaseURL = "https://demo.enablex.io/";
  // const kBaseURL = "https://api.enablex.io/";
  /* To try the app with Enablex hosted service you need to set the kTry = true */
  const kTry = true;
  /*Use enablec portal to create your app and get these following credentials*/
  const  kAppId = "623d57c2a1e6cc69b932ce53";
  const  kAppkey = "eBeQybyhudy6uYy3aLaXy9ubyhyPeVuXeNua";



