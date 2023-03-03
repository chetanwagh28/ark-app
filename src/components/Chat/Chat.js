//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, Alert } from 'react-native';
import { GiftedChat, Actions, Bubble, SystemMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { configConstants } from '../../constant';
import { Container, Header, Title, Left, Icon, Button, Body, Content, Right } from "native-base";
import { chatActions } from './chatActions';
import socketIOClient from 'socket.io-client';
// import CustomActions from './CustomActions';
// import CustomView from './CustomView';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-picker';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
// import Toast from 'react-native-simple-toast';

// create a component

// // console.log("----socket----",socketIO)
class Chat extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
                      messages: [],
                      loadEarlier: true,
                      typingText: null,
                      isLoadingEarlier: false,
                      sendJson: {},
                      name: ''
                  };
                  //console.disableYellowBox = true;
      this.onSend = this.onSend.bind(this);
      this.onReceivedMessage = this.onReceivedMessage.bind(this);
      this._storeMessages = this._storeMessages.bind(this);

      this._isMounted = false;
      this.renderCustomActions = this.renderCustomActions.bind(this);
      this.renderBubble = this.renderBubble.bind(this);
      this.renderSystemMessage = this.renderSystemMessage.bind(this);
      this.renderFooter = this.renderFooter.bind(this);

      this._isAlright = null;

      this.socket = socketIOClient("http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100")
      // this.socket = socketIOClient("http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100/socket",{
      //     'reconnection': true,
      //     'reconnectionDelay': 1000,
      //     'reconnectionAttempts': 9999      
      // });


      this.socket.on('message', this.onReceivedMessage);
    }
    
  
    async componentDidMount(){
      

      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        // // console.log("this.props.route.params.chatData",this.props.route.params.chatData)
        let userDetailData;
        userDetailData = null;
        try {
          userDetailData = await AsyncStorage.getItem('userDetail');
          // // console.log(JSON.parse(userDetailData))
          let receiver_id = this.props.route.params.chatData.user_id
          // if(typeof this.props.route.params.chatData.user_id === 'undefined'){
          //     receiver_id = this.props.route.params.chatData.patient_id
          // }
          this.setState({user_id: JSON.parse(userDetailData).user_id}) 
          var json = {'sender_id': this.state.user_id,"receiver_id": receiver_id}

          // // console.log("chatJson",json)
          const { dispatch } = this.props;
            dispatch(chatActions.getAllMessage(json));

            this.setState({
              sendJson: {
                _id: this.state.user_id,
                avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
                receiver_id: receiver_id
              }
            });
            this.setState({name: this.props.route.params.chatData.name})
            // setUserDetail(JSON.parse(userDetailData))
        } catch(e) {
          // console.log(e);
        }
      });
    }

    UNSAFE_componentWillMount() {
      // this.setState({
      //   messages: [
      //     {
      //       _id: 3,
      //       text: 'Hello developer',
      //       createdAt: new Date(Date.UTC(2019, 1, 24, 15, 20, 0)),
      //       avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
      //       user: {
      //         _id: 2,
      //         name: 'React Native',
      //         avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
      //       },
      //     },
      //     {
      //       _id: 2,
      //       text: 'Yes, and I use Gifted Chat!',
      //       createdAt: new Date(Date.UTC(2019, 1, 24, 15, 25, 0)),
      //       user: {
      //           _id: 1,
      //         name: 'Developer',
      //         avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
      //       },
      //     },
      //     {
      //       _id: 1,
      //       text: 'Are you building a chat app?',
      //       createdAt: new Date(Date.UTC(2019, 1, 24, 15, 28, 0)),
      //       user: {
      //           _id: 2,
      //         name: 'React Native',
      //         avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
      //       },
      //     },
      //   ],
      // });
    }
    
    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.sending == true){
          // // console.log("newProps.chatList",newProps.chatList)
          let arg = []
          newProps.chatList.map((row) => {
            arg.push(JSON.parse(row.message))
          })
          arg.reverse()
          // // console.log("arg",arg)
            this.setState({
              messages: arg
            })
        }
    }
    onSend(messages = []) {     
      
      this._storeMessages(messages);
      const { dispatch } = this.props;
      // // console.log(messages[0])
      // dispatch(chatActions.insertChat(messages[0],this.state.token));        
      this.socket.emit('message', messages[0]);
      
    }
      // Helper functions
    _storeMessages(messages) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      });
    }
    onReceivedMessage(messages) {
       
      if((this.state.sendJson._id === messages.user._id && this.state.sendJson.receiver_id === messages.user.receiver_id) || (this.state.sendJson._id === messages.user.receiver_id && this.state.sendJson.receiver_id === messages.user._id)){
        // // console.log("-->>>---message-----",messages)
        this._storeMessages(messages);

      }
    }
    renderInputToolbar (props) {
      //Add the extra styles via containerStyle
      return <InputToolbar {...props} 
              containerStyle={{
                  borderTopWidth:8,
                  borderTopColor: '#FFFFFF',
                  borderLeftWidth:8,
                  borderLeftColor: '#FFFFFF',
                  borderRightWidth:8,
                  borderRightColor: '#FFFFFF',
                  borderBottomWidth:8,
                  borderBottomColor: '#FFFFFF',
                  // borderRadius: 25
                }}
              textStyle={{
                // borderRadius: 35
              }}
          />
    }
    renderBubble (props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#65D1E0',
              marginBottom: 10
            },
            right: {
              backgroundColor: '#65D1E0',
              marginBottom: 10
            }
          }}
        />
      )
    }
    renderSend (props){
      return (
          <Send
              {...props}
          >
              <View style={{marginTop: 15}}>
                <Ionicons name="enter-outline" size={25}  color="#00B2B6" />
              </View>
              
          </Send>
      );          
    }
    
    openImageGallery() {
      //this.popupDialog.dismiss();
      // var options = {
          
      //     takePhotoButtonTitle: 'Take Photo',
      //     cancelButtonTitle: 'Cancel'
      // };
      // ImagePicker.showImagePicker(options, (response) => {
      //     if (response.didCancel) {
      //         // console.log('User cancelled image picker');
      //         //Toast.show('User cancelled image picker', Toast.SHORT);
      //     }
      //     else if (response.error) {
      //       //Toast.show('ImagePicker Error: '+response.error, Toast.SHORT);
      //         // console.log('ImagePicker Error: ', response.error);
      //     }
      //     else if (response.customButton) {
      //       //Toast.show('User tapped custom button: '+response.customButton, Toast.SHORT);
      //         // console.log('User tapped custom button: ', response.customButton);
      //     }
      //     else {
      //         // let source = { uri: response.uri };
      //         // You can also display the image using data:
      //         Alert.alert(
      //             'Confirmation',
      //             'Do you want to continue',
      //             [
      //                 {
      //                     text: 'Cancel', onPress: () => {
      //                         this.setState({ imagePath: '', spinnervisible: false });
      //                     }
      //                 },
      //                 {
      //                     text: 'OK', onPress: () => {
      //                         this.setState({ imagePath: response.uri, spinnervisible: true });
                              

      //                         if (this.state.imagePath !== null || this.state.imagePath !== "") {
      //                             const uploadUri = Platform.OS === 'ios' ? this.state.imagePath.replace('file://', '') : this.state.imagePath;
      //                             //const newPostKey = firebase.database().ref(`user_chats/${userStore.uid}`).push().key;
                               
      //                             const formData = new FormData();
      //                             formData.append("image", {
      //                                 name: response.fileName,
      //                                 type: response.type,
      //                                 uri: response.uri,
      //                             });                                  
                                  
      //                             var sendData = {
      //                               "_id" : new Date().getTime(),
      //                               "text": "",
      //                               "createdAt": new Date().toISOString(),
      //                               "user": this.state.sendJson,
      //                               "image": response.uri
      //                             }
      //                             this._storeMessages(sendData);
      //                             var date = new Date().toISOString();
      //                             //Toast.show('date-- '+date, Toast.SHORT);
      //                           // construct
      //                             formData.append("text", ""); 
      //                             formData.append("sender_id", this.state.user_id); 
      //                             formData.append("receiver_id", this.state.sendJson.receiver_id); 
      //                             formData.append("avatar", "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com"); 
      //                             formData.append("created_at", date); 
      //                             //formData.append("name", this.state.name); 
                                  
      //                             //Toast.show('ImagePath '+formData, Toast.LONG);
      //                             const { dispatch } = this.props;
      //                             dispatch(chatActions.insertFile(formData,this.state.token));

      //                             this.setState({ imagePath: '', spinnervisible: false });

      //                             this.socket.emit('chat_message', sendData);
      //                         }
      //                     }
      //                 },
      //             ],
      //             { cancelable: false }
      //         )
      //     }
      // });
    }
    openFolder(){
      // DocumentPicker.show({
      //   filetype: [DocumentPickerUtil.allFiles()],
      // },(error,response) => {
      //       if (response == null) {
      //          //Toast.show('User cancelled image picker', Toast.SHORT);
      //       } else {
      //       // Android
      //         //Toast.show('ImaagePath '+response.uri+response.type+'=========='+response.fileName, Toast.SHORT);
      //         Toast.show('ImagePath '+response.uri, Toast.SHORT);
      //         const formData = new FormData();
      //         formData.append("image", {
      //             name: response.fileName,
      //             type: response.type,
      //             uri: response.uri,
      //         });
      //           var sendData = {
      //               "_id" : new Date().getTime(),
      //               "text": "",
      //               "createdAt": new Date().toISOString(),
      //               "user": this.state.sendJson,
      //               "image": response.uri
      //             }
      //           this._storeMessages(sendData);

      //         // construct
      //           formData.append("text", ""); 
      //           formData.append("sender_id", this.state.user_id); 
      //           formData.append("receiver_id", this.state.sendJson.receiver_id); 
      //           formData.append("avatar", "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com"); 
      //           formData.append("created_at", new Date().toISOString()); 
      //           //formData.append("name", this.state.name); 
                
                
      //           const { dispatch } = this.props;
      //           dispatch(chatActions.insertFile(formData,this.state.token));
      //           this.socket.emit('chat_message', sendData);
      //         // // console.log(
      //         //   response.uri,
      //         //   response.type, // mime type
      //         //   response.fileName,
      //         //   response.fileSize
      //         // );
      //       }
      // });
   
    }
    renderCustomActions(props) {
      if (Platform.OS === 'ios') {
        // return (
        //   <CustomActions
        //     {...props}
        //   />
        // );
      }
      const options = {
        'Select Image': (props) => {
          // this.openImageGallery()
        },
        'Document': (props) => {
          // this.openFolder()
        }
      };
      return (
        <Actions
          {...props}
          options={options}
          >
            
          </Actions>
      );
    }
  
  
    renderSystemMessage(props) {
      return (
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
            backgroundColor: '#65D1E0'
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      );
    }
  
    renderCustomView(props) {
      return (
        <CustomView
          {...props}
        />
      );
    }
  
    renderFooter(props) {
      if (this.state.typingText) {
        return (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {this.state.typingText}
            </Text>
          </View>
        );
      }
      return null;
    }

    render() {
      return (
        <Container style={{ flex: 1 }}>
            <Header style={{ backgroundColor :'#273f61'}}>
                <Left>
                    <Button
                        transparent
                        // onPress={() => this.props.navigation.navigate('Home')}
                        >
                    <Icon name="ios-arrow-back" />
                    </Button>
                </Left>
                <Body style={{justifyContent:'center'}}>
                    <Title>{this.state.name}</Title>
                </Body>
                
            </Header>
                <GiftedChat
                    listViewProps={{
                      style: {
                        backgroundColor: '#dcf7fa',
                      },
                    }}
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={this.state.sendJson}
                    showUserAvatar
                    showAvatarForEveryMessage
                    renderInputToolbar={this.renderInputToolbar}
                    // renderBubble={this.renderBubble} 
                    renderAvatarOnTop
                    renderSend={this.renderSend}
                    
                    // renderActions={this.renderCustomActions}
                    // renderSystemMessage={this.renderSystemMessage}
                    // renderCustomView={this.renderCustomView}
                    // renderFooter={this.renderFooter}

                    scrollToBottom={true}
                />
           
        </Container>
      );
    }
  }


function mapStateToProps(state) { 
    const { sending, chatList } = state.chatReducer;
    // // console.log("chatList---",chatList)
    return {
      sending,
      chatList
    };    
}

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});