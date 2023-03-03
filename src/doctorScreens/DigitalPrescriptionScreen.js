import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image,  TouchableOpacity , Dimensions, ScrollView, TouchableHighlight, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Card, Title, TextInput, Paragraph, RadioButton,List,Menu } from 'react-native-paper';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Communications from 'react-native-communications';
var {width, height} = Dimensions.get('window')
import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem, Button, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'
import {doctorActions} from '../action';
import { Col, Row, Grid } from "react-native-easy-grid";
import style from '../assets/style.js';


class DigitalPrescription extends Component {

    constructor(props){
        super(props);
        this.state={
            typeing_area: "",
            purpose: "",
            details: "",
            appointment_id: "",
            digitalPrescription: '',
            textInput : [],
            inputData : [],
            days: '3',
            medicine: '',
            whentotake: '0-0' 
        }
        //console.disableYellowBox = true;

    }
    async componentDidMount(){
      
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log('----------')
        this.setState({
          digitalPrescription: this.props.route.params.digitalPrescription,
          appointment_id: this.props.route.params.digitalPrescription.appointment_id,
          doctor_id: this.props.route.params.digitalPrescription.doc_id,
          patient_id: this.props.route.params.digitalPrescription.patient_id
        })
      });

      // this.addTextInput(0);
      // this.addTextInput(1);
      // this.addTextInput(2);
    }

    //function to add TextInput dynamically
    addTextInput1 = (index) => {
      // // console.log(index)
      let textInput = this.state.textInput;
      let dataArray = this.state.inputData;

      dataArray.push({
                      index: index,
                      medicine: '',
                      days: '3',
                      whentotake: '0-0'
                    });
      this.setState({
        inputData: dataArray
      });

      // // console.log('fun----',this.state.inputData[index])

      textInput.push(
        <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems:'flex-start',
                  marginTop:10

                }}>
          <View>
            <TextInput 
              style={{ width:150}}
              placeholder='Medicine Name'
              onChangeText={(medicine) => this.addValues(medicine, 'medicine', index)}
            />
          </View>
          <View>
            <Text>{this.state.inputData[index].days}</Text>
            <Picker
              style={{ height: 40, width:80}}
              itemTextStyle={{fontSize: 8}}
              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
              iosHeader="Select Days"
              placeholder="Select Days"
              mode="dialog"
              selectedValue={this.state.inputData[index].days}
              onValueChange={(days) => this.addValues(days, 'days', index)}
            >
              <Picker.Item label="Days" value="Days" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />

            </Picker>
          </View>
          <View>
            <Text>{this.state.inputData[index].whentotake}</Text>
            <Picker
              style={{ height: 40,width:90 }}
              itemTextStyle={{fontSize: 8}}
              activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
              iosHeader="Select when to take"
              placeholder="Select when to take"
              mode="dialog"
              selectedValue={this.state.inputData[index].whentotake}
              onValueChange={(whentotake) => this.addValues(whentotake, 'whentotake', index)}
            >
              <Picker.Item label="When To Take" value="When To Take" />
              <Picker.Item label="0--" value="0--" />
              <Picker.Item label="-0-" value="-0-" />
              <Picker.Item label="--0" value="--0" />

              <Picker.Item label="00-" value="00-" />
              <Picker.Item label="-00" value="-00" />
              <Picker.Item label="0-0" value="0-0" />

              <Picker.Item label="000" value="000" />
            </Picker>
          </View>
          <View>
            <Icon name="ios-trash" onPress={() => this.removeTextInput(index)} size={20} style={styles.trashButton}></Icon>

          </View>
        </View>
      );
      this.setState({ textInput });

    }

    //function to remove TextInput dynamically
    removeTextInput = (index) => {

      // const textInput = this.state.textInput;
      // textInput.splice(index, 1);
      // this.setState(textInput);

      const inputData = this.state.inputData;
      inputData.splice(index, 1);
      this.setState(inputData);
    }

    //function to add text from TextInputs into single array
    addValues1 = (text, field, index) => {
      // // console.log('===>>>>>>',text, field, index)
      let dataArray = this.state.inputData;
      if (dataArray.length !== 0){
        dataArray.forEach(element => {
          if (element.index === index ){
            element[field] = text;
          }
        });
      }
      this.setState({
        inputData: dataArray
      });
    }

    //function to add text from TextInputs into single array
    addValues = (text, field) => {
      this.setState({
        [field]: text
      });
    }

    addTextInput = () => {
      if(this.state.medicine !== ''){
        let dataArray = this.state.inputData;
        dataArray.push({
            days: this.state.days,
            medicine: this.state.medicine,
            whentotake: this.state.whentotake 
        })
        this.setState({inputData: dataArray, days: '3', medicine: '', whentotake: '0-0' });
      }else{
        Alert.alert("Enter Medicine name", '', [
            { text: 'OK'}
        ]);
      }
      
    }

    //function to console the output
    getValues = () => {
        if(this.state.inputData.length > 0 ||  this.addTextInput()){

          let url = '/doctor/uploadprescription'
          // // console.log("data",data)   

          // return false; 

          const formData = new FormData();
          formData.append('appointment_id', this.state.appointment_id)
          formData.append('patient_id', this.state.patient_id)
          formData.append('doctor_id', this.state.doctor_id)
          formData.append('details', JSON.stringify(this.state.inputData))
          formData.append('prescription', '');
          formData.append('typing_area', this.state.typeing_area);
          formData.append('purpose', this.state.purpose);
          
          const { dispatch } = this.props;
          dispatch(doctorActions.uploadPrescription(formData, url));

          // dispatch(doctorActions.completeAppointment(this.state.appointment_id));
          
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps){
      // // console.log("nextProps",nextProps)
        if(nextProps.uploaded){
            // this.setState({uploaded_url: nextProps.uploaded_url.url})
            setTimeout(function(){
              Alert.alert("Upload successfuly", '', [
                  { text: 'Close', onPress: () =>   this.props.navigation.navigate("PatientDetail", { patientDetail: this.state.digitalPrescription})}
              ]);
              const { dispatch } = this.props;
              dispatch(doctorActions.resetFirstState())
            }.bind(this),1500);
        }
    }
    
    render() {
        
      const { show, digitalPrescription } = this.state;
      const { goBack } = this.props.navigation;
      // // console.log("digitalPrescription--->>",this.state.medicine)

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:2, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.logoText}>Digital Prescription</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right> 
          </Header>
          <Content style={style.container}>

                    <Card style={styles.medicineListCard}>
                      <Card.Content>

                          <View style={styles.action}>
                            <Textarea 
                              rowSpan={5} 
                              bordered
                              placeholder='Purpose'
                              onChangeText={(purpose) => this.setState({purpose})}
                            />
                          </View>

                          <View style={styles.action}>
                            <Textarea 
                              rowSpan={5} 
                              bordered
                              placeholder='Typing Area'
                              onChangeText={(typeing_area) => this.setState({typeing_area})}
                            />
                          </View>
                      </Card.Content>
                    </Card>  

                    <Card style={styles.medicineListCard}>
                      <Card.Content>

                          <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems:'flex-start',
                                        flex:1

                          }}>
                              <View>
                                <TextInput 
                                  style={{ width:200}}
                                  placeholder='Medicine Name'
                                  value={this.state.medicine}
                                  onChangeText={(medicine) => this.addValues(medicine, 'medicine')}
                                />
                              </View>
                              <View>
                                <Picker
                                  style={{ height: 40, width:100}}
                                  itemTextStyle={{fontSize: 8}}
                                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                  iosHeader="Select Days"
                                  placeholder="Select Days"
                                  mode="dialog"
                                  selectedValue={this.state.days}
                                  onValueChange={(days) => this.addValues(days, 'days')}
                                >
                                  <Picker.Item label="Days" value="Days" />
                                  <Picker.Item label="1" value="1" />
                                  <Picker.Item label="2" value="2" />
                                  <Picker.Item label="3" value="3" />
                                  <Picker.Item label="4" value="4" />
                                  <Picker.Item label="5" value="5" />
                                  <Picker.Item label="6" value="6" />
                                  <Picker.Item label="7" value="7" />
                                  <Picker.Item label="10" value="10" />
                                  <Picker.Item label="15" value="15" />
                                  <Picker.Item label="20" value="20" />
                                  <Picker.Item label="30" value="30" />

                                </Picker>
                              </View>
                              <View>
                                <Picker
                                  style={{ height: 40,width:90 }}
                                  itemTextStyle={{fontSize: 8}}
                                  activeItemTextStyle={{fontSize: 10, fontWeight: 'bold'}}
                                  iosHeader="Select when to take"
                                  placeholder="Select when to take"
                                  mode="dialog"
                                  selectedValue={this.state.whentotake}
                                  onValueChange={(whentotake) => this.addValues(whentotake, 'whentotake')}
                                >
                                  <Picker.Item label="When To Take" value="When To Take" />
                                  <Picker.Item label="0--" value="0--" />
                                  <Picker.Item label="-0-" value="-0-" />
                                  <Picker.Item label="--0" value="--0" />

                                  <Picker.Item label="00-" value="00-" />
                                  <Picker.Item label="-00" value="-00" />
                                  <Picker.Item label="0-0" value="0-0" />

                                  <Picker.Item label="000" value="000" />
                                </Picker>
                              </View>
                              
                          </View>
                      </Card.Content>
                    </Card>
                 <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.addTextInput(this.state.textInput.length)}>
                      <LinearGradient
                      colors={['#00B2B6', '#00B2B6']}
                      style={styles.commonAppButton}
                      >
                      <Text style={[styles.commonAppButtonText]}>Add</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                </View>


                {
                this.state.inputData.length > 0 && this.state.inputData.map((value, index) => {
                  return (

                    <Card style={styles.medicineListCard}>
                      <Card.Content>

                        <Grid style={{
                          justifyContent: 'center',
                          alignItems:'flex-start',
                        }}>
                          <Row> 
                            <Col style={styles.tableColumn1}>
                               <Row style={styles.tableRow1}><Text>{value.medicine} </Text></Row>
                            </Col>
                            <Col style={styles.tableColumn2}>
                               <Row style={styles.tableRow1}><Text>{value.days}</Text></Row>
                            </Col>
                            <Col style={styles.tableColumn3}>
                               <Row style={styles.tableRow1}><Text>{value.whentotake}</Text></Row>
                            </Col>
                            <Col style={styles.tableColumn4}>
                              <Row style={styles.tableRow1}><Icon name="ios-trash" onPress={() => this.removeTextInput(index)} size={20} style={styles.trashButton}></Icon></Row>  
                            </Col>
                          </Row>
                       </Grid>
                      </Card.Content>
                    </Card>


                  )  
                })}

               

             


          </Content>
          <Footer>
            <FooterTab 
              style={styles.footerTabs} 
              >
                <Button style={styles.footerTabsButton} onPress={() => this.getValues()}>
                  <Text style={styles.commonAppButton}>Submit</Text>
                </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
}


function mapStateToProps(state) { 
  const { loader,uploaded } = state.doctorReducer;
  // // console.log("uploaded",uploaded)
  return {
    uploaded,
    loader
  };    
}

export default connect(mapStateToProps)(DigitalPrescription);



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
    textAlign:'center',
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

  },
  textInput: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 20,
    backgroundColor: '#ffffff'
  },
  categroy: {
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    alignItems: 'flex-start',
    height:170,
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
    textAlign:'left',
    padding:5,
    borderRadius:5,
    color:'#fff'
  },
  medicineListCard:{
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    
    height:'auto',
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
    textAlign:'left',
    padding:5,
    borderRadius:5,
    color:'#fff'
  },
  rating_container:{
    marginTop:10,
    marginRight:15
  },
  contentList:{
    flexDirection:'row'
  },
  appLogo:{
    width:60,
    height:60,
    borderWidth:1,
    borderRadius:60/2
  },
  titleView:{
    fontSize:14,
    width: 60
  },
  call_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  clinic_photo_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  direction_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  select_date_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  select_time_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  book_appointment_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',
  },
  pay_now_button:{
    marginRight: 5,
    backgroundColor:'#00B2B6',    
  },
  review_textarea:{
    marginLeft:10,
    marginRight:10
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
  },
  footerContainer:{
  },
  footerTabs:{
    backgroundColor:'#ffffff',
  },
  footerTabsButton:{
    backgroundColor:'#00B2B6',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1,      
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 1,      
  },
  centeredView: {
    marginTop:"50%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%"
  },
  modalView: {
    margin: 5,
    backgroundColor: "#ffffff",
    // borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '85%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  trashButton:{
    color:'red',
    // marginTop:20
  },
  footerTabs:{
    backgroundColor:'#ffffff',
  },
  footerTabsButton:{
    backgroundColor:'#00B2B6',
    borderTopColor: '#ffffff',
    borderTopWidth: 1,
    borderRightColor: '#ffffff',
    borderRightWidth: 1,      
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 1,      
  },
});