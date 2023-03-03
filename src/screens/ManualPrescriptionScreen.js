import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Alert } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import { Rating, Slider, Input as TextInput, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {doctorActions} from '../action';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {LocalizationContext} from './Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import style from '../assets/style.js';



class ManualPrescriptionScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            prescription: '',
            prescription_ext: '',
            appointment_date: '',
            date: new Date(),
            mode: 'datetime',
            errors: {
              name: '',
              prescription: '',
              appointment_date: '',
            },
            resourcePath: '',
            image: '',
            patient_id: ''
        }
        //console.disableYellowBox = true;
    }
    async componentDidMount(){
      let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
          this.setState({patient_id: jwtdecode(userToken).patient_id});
        } catch(e) {
          // console.log(e);
        }
    }
    selectFile = () => {
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          base64: true,
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5
        };

        ImagePicker.showImagePicker(options, res => {
          // // console.log('Response = ', res);

          if (res.didCancel) {
            // console.log('User cancelled image picker');
          } else if (res.error) {
            // console.log('ImagePicker Error: ', res.error);
          } else {
            let source = res.uri;
            
            let image = res.data;
            let ext = res.type.split("/")

            this.setState({
              resourcePath: source,
              image: image,
              prescription_ext: ext[1]
            });
          }
        });
    }

    datepicker = () => {
      this.show('date');
    }

    show = mode => {
      this.setState({
        show: true,
        mode,
      });
    }

    setDate = (event, date) => {
      // // console.log("date",date)
      date = date || this.state.date;
              
        let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() 
              
        this.setState({
          show: Platform.OS === 'ios' ? true : false, //*Question: Why true for ios?
          date,
          appointment_date: formattedDate
        });  
    }
          
    checkEmpty = (dataToCheck) => {
      let stopApicall = false
      let {errors} = this.state
      for (var key in dataToCheck) {
        // // console.log("dataToCheck",key,dataToCheck[key])
          if(dataToCheck[key] === ''){
            stopApicall = true
            errors[key] = "Field can't be blank"
            this.setState({errors})
          }
          else{
            errors[key] = ""
          }
        }

      return stopApicall
    }

    uploadPrescription = () => {
      var data = {
                name: this.state.name,
                resourcePath: this.state.resourcePath,
                appointment_date: this.state.appointment_date,
               }
      
      if(!this.checkEmpty(data)){
        // // console.log('---------',this.state)

        const formData = new FormData();
        formData.append('doctorname', this.state.name)
        formData.append('prescription', this.state.image);
        formData.append('prescription_ext', this.state.prescription_ext);
        formData.append('date', this.state.appointment_date);

        let url = '/patient/uploadmanualprescription/'+ this.state.patient_id
        const { dispatch } = this.props;
        dispatch(doctorActions.uploadPrescription(formData, url));
        
        Alert.alert("uploaded", '', [
              { text: 'OK', onPress: () =>   this.props.navigation.navigate("MyPrescription")}
          ]);
      }
    }


    render() {
      // // console.log("categroy",this.state.resourcePath)
      const { show, date, mode, appointment_date, errors } = this.state;
      const { goBack } = this.props.navigation;
      const translations = this.context.translations;

      return (
        <SafeAreaView style={style.container}>
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={styles.logoText}>{translations['Prescription']}</Title></>}
                rightComponent={<>
                  </>}
              />
          <ScrollView >

              <View >
                  {this.state.resourcePath !== '' &&
                    <View style={{justifyContent: 'center', margin:5}}>
                      <Image animation="fadeInUp" duraton="1500"
                          source={{ uri: this.state.resourcePath }}
                          style={{ width: 300, height:400 }}
                          resizeMode="center"
                      />
                    </View>
                  }
                  
                  <View style={{flexDirection: 'row', justifyContent: 'center', margin:15}}>
                     <Text style={{color: '#000', fontSize: 18}}>{translations['upload_prescription']} </Text><Icon name="add-circle-outline" size={25} color='#000' onPress={this.selectFile}></Icon>   
                  </View>

                  <View style={{ margin:15}}>
                    <TextInput
                      placeholder={translations['Doctor'] +' '+ translations['Name']}
                      // style={[styles.textInput]}
                      autoCapitalize="none"
                      onChangeText={(name) => this.setState({name})}
                    />
                    <Text style={style.errorMsg}>{this.state.errors.name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginHorizontal:15}}>
                      <Text style={{fontSize: 18, marginTop: 10, color:'#000', fontWeight: 'bold'}}>{translations['appointment_Date']}: {appointment_date}</Text>
                      <Icon name="calendar-sharp" size={35} onPress={this.datepicker} color='#000' />  
                  </View>
                      <Text style={style.errorMsg}>{this.state.errors.appointment_date}</Text>
                  { 
                  show && <DateTimePicker 
                              value={date}
                              mode={mode}
                              format="YYYY-MM-DD"
                              is24Hour={true}
                              display="default"
                              onChange={this.setDate} />
                  }
              </View>
              <View style={{ justifyContent:'center',alignItems:'center'}}>    
                <Button style={[style.commonAppButton, {backgroundColor: '#ffffff', alignItems: 'center', marginHorizontal: 16, justifyContent: 'center'}]} onPress={() => this.uploadPrescription()}>
                    <Text style={[styles.commonAppButton, {color:"#00B2B6", fontSize: 16, fontWeight: 'bold'}]}>{translations['Submit']}</Text>
                </Button>
              </View>

          </ScrollView>
        </SafeAreaView>
      );
    }
}

ManualPrescriptionScreen.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader,uploaded } = state.doctorReducer;
  // // console.log("uploaded",uploaded)
  return {
    uploaded,
    loader
  };    
}

export default connect(mapStateToProps)(ManualPrescriptionScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },  
  textInput: {
    height: 40,
    width: "100%",
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
    borderRadius:5

  },
  commonAppButton:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    color:'#fff',
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText:{
    color:'#fff',
    fontSize:12    
  }
});
