import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, Card, Title, TextInput, Paragraph, Button } from 'react-native-paper';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Tabs , Tab,Right, CardItem } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Rating, Header, Tab, TabView } from 'react-native-elements';
import {patientActions} from '../action';
import {LocalizationContext} from './Translations';
import { configConstants } from '../constant';
import SkeletonLoader from '../components/SkeletonLoader';
import {utilityHelper} from '../helper/utilityHelper'
import style from '../assets/style.js';
var {width, height} = Dimensions.get('screen')
width = width

class MyPrescription extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            categroy: '',
            index: 0
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
          const { dispatch } = this.props;
          dispatch(patientActions.getPrescription());
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
                centerComponent={<><Title style={styles.logoText}>{translations['Prescription']}</Title></>}
                rightComponent={<><Icon name="add-circle-outline" size={25} color="#fff" onPress={() => this.props.navigation.navigate("ManualPrescriptionScreen")} />
                  </>}
              />
          <ScrollView >
           
              {/*<View style={styles.containerView}>
                  <View style={{width: "100%"}}>
                    <TextInput 
                        placeholder={translations['search_by_name']}
                        style={styles.textInput}
                        autoCapitalize="none"
                        name="search"
                        onChangeText={(search) => setState(search)}
                    />
                  </View>  
              </View>*/} 
          <Tab value={this.state.index} onChange={(index) => this.setState({index: index})}>
            <Tab.Item title="Shared" />
            <Tab.Item title="Saved" />
          </Tab>

           <TabView value={this.state.index} onChange={(index) => this.setState({index: index})} >
            <TabView.Item style={{ backgroundColor: '#00B2B6', width: '100%' }}>
              <View>
                    
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                      <FlatList  
                        data={this.props.prescriptionList.shared}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                          // // console.log("shared",configConstants.API_BASE_PATH +'/'+ item.prescription_url)
                          // // console.log('shared-->>>>',item)
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView}>
                                  <Card.Content>
                                      <View style={styles.appointmentDateTimeButtonContainer}>
                                        <Text  style={styles.appointment_date_button}>
                                          {new Date(item.created_at).toDateString()}
                                        </Text>
                                      </View>
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                                <View style={styles.profileImageContainer}>
                                                    <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.doctor_profile_pic) }} style={styles.profile_image} size={60} />
                                                </View>
                                                
                                                
                                          </View>
                                          
                                          <View style={{width: '60%'}}>
                                              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Dr. {item.doctor_name} </Paragraph>
                                              <Paragraph>{translations['hospital_clinic']}: {item.clinic_name}</Paragraph>
                                              <Paragraph>{item.expirience || 0} {translations['years']} {translations['experience']}</Paragraph>
                                              <Paragraph>{translations['speciality']} :  {item.en_spec}</Paragraph>
                                              <Paragraph>{translations['hospital_clinic']} {translations['fees']} :  {item.clinic_fees}</Paragraph>
                                              
                                          </View>                    
                                          {item.prescription_url &&
                                            <View style={{ flexDirection:'column',  justifyContent: 'center', margin:10 }}>
                                                <FontAwesome name="share-alt-square" size={35} color={'#174091'} onPress={() => this.props.navigation.navigate("FindMedicine", {sharePrescription: item.prescription_url})}></FontAwesome>
                                                <Icon name="download" size={35} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon>
                                            </View>  
                                          }
                                      </View>

                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )
                        }
                      }
                      ListEmptyComponent={(<Card style={styles.container}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}> No data</Text>
                                                </Card.Content>
                                            </Card>)}
                      /> 
                    </View>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: '#00B2B6', width: '100%' }}>
              <View>
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                      <FlatList  
                        data={this.props.prescriptionList.saved}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                          // // console.log('saved====',item)
                          // // console.log("saved",configConstants.API_BASE_PATH +'/'+ item.prescription_url)
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView1}>
                                  <Card.Content>
                                      <View style={styles.appointmentDateTimeButtonContainer}>
                                        <Text  style={styles.appointment_date_button}>
                                          {item.date}
                                        </Text>
                                      </View>
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                          
                                          <View style={{width: '70%', fontWeight: 'bold'}}>
                                              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Dr. {item.doctorname} </Paragraph>
                                          </View>      
                                          {item.prescription_url &&                      
                                            <View style={{ flexDirection:'row',  justifyContent: 'center', margin:10 }}>
                                                <FontAwesome name="share-alt-square" size={35} color={'#174091'} onPress={() => this.props.navigation.navigate("FindMedicine", {sharePrescription: item.prescription_url})}></FontAwesome>
                                                <Icon name="download" size={35} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon>
                                            </View>
                                          }
                                      </View>

                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )
                        }
                      }
                      ListEmptyComponent={(<Card style={styles.container}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}> No data</Text>
                                                </Card.Content>
                                            </Card>)}
                      />  
                    </View>
            </TabView.Item>
          </TabView>
          {/*
                <Tabs  
                    tabBarUnderlineStyle = {{backgroundColor: '#00B2B6'}}
                    tabContainerStyle ={{backgroundColor:'#00B2B6'}}
                  >
                  <Tab heading="Shared"
                    style={styles.TabHead}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.Tab}
                    textStyle={styles.Tabtext}
                    activeTabStyle={styles.ActiveTabs}
                    activeTextStyle={styles.ActiveTabText}
                  >
                    <View>
                    
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                      <FlatList  
                        data={this.props.prescriptionList.shared}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                          // // console.log("shared",configConstants.API_BASE_PATH +'/'+ item.prescription_url)
                          // // console.log('shared-->>>>',item)
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView}>
                                  <Card.Content>
                                      <View style={styles.appointmentDateTimeButtonContainer}>
                                        <Text  style={styles.appointment_date_button}>
                                          {new Date(item.created_at).toDateString()}
                                        </Text>
                                      </View>
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                          <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'center',backgroundColor:'#fff',marginRight:10}}>
                                                <View style={styles.profileImageContainer}>
                                                    <Avatar.Image  source={{ uri: utilityHelper.ProfilePicDoc(item.doctor_profile_pic) }} style={styles.profile_image} size={60} />
                                                </View>
                                                
                                                
                                          </View>
                                          
                                          <View style={{width: '60%'}}>
                                              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Dr. {item.doctor_name} </Paragraph>
                                              <Paragraph>{translations['hospital_clinic']}: {item.clinic_name}</Paragraph>
                                              <Paragraph>{item.expirience || 0} {translations['years']} {translations['experience']}</Paragraph>
                                              <Paragraph>{translations['speciality']} :  {item.en_spec}</Paragraph>
                                              <Paragraph>{translations['hospital_clinic']} {translations['fees']} :  {item.clinic_fees}</Paragraph>
                                              
                                          </View>                    
                                          {item.prescription_url &&
                                            <View style={{ flexDirection:'column',  justifyContent: 'center', margin:10 }}>
                                                <FontAwesome name="share-alt-square" size={35} color={'#174091'} onPress={() => this.props.navigation.navigate("FindMedicine", {sharePrescription: item.prescription_url})}></FontAwesome>
                                                <Icon name="download" size={35} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon>
                                            </View>  
                                          }
                                      </View>

                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )
                        }
                      }
                      ListEmptyComponent={(<Card style={styles.container}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}> No data</Text>
                                                </Card.Content>
                                            </Card>)}
                      /> 
                    </View>
                  </Tab>
                  <Tab heading="Saved"
                    style={styles.TabHead}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.Tab}
                    textStyle={styles.Tabtext}
                    activeTabStyle={styles.ActiveTabs}
                    activeTextStyle={styles.ActiveTabText}
                  >
                    <View>
                    {this.props.loader && 
                        <SkeletonLoader />
                    }
                      <FlatList  
                        data={this.props.prescriptionList.saved}  
                        numColumns = {1}
                        renderItem={({item}) =>  {
                          // // console.log('saved====',item)
                          // // console.log("saved",configConstants.API_BASE_PATH +'/'+ item.prescription_url)
                          return (
                            <Animatable.View>
                                <Card key={item.key} style={styles.cardListView1}>
                                  <Card.Content>
                                      <View style={styles.appointmentDateTimeButtonContainer}>
                                        <Text  style={styles.appointment_date_button}>
                                          {item.date}
                                        </Text>
                                      </View>
                                      <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start',backgroundColor:'#fff'}}>
                                          
                                          <View style={{width: '70%', fontWeight: 'bold'}}>
                                              <Paragraph style={{fontWeight: 'bold', fontSize: 16}}>Dr. {item.doctorname} </Paragraph>
                                          </View>      
                                          {item.prescription_url &&                      
                                            <View style={{ flexDirection:'row',  justifyContent: 'center', margin:10 }}>
                                                <FontAwesome name="share-alt-square" size={35} color={'#174091'} onPress={() => this.props.navigation.navigate("FindMedicine", {sharePrescription: item.prescription_url})}></FontAwesome>
                                                <Icon name="download" size={35} color={'#00B2B6'} onPress={() => Linking.openURL(configConstants.API_BASE_PATH +'/'+ item.prescription_url)}></Icon>
                                            </View>
                                          }
                                      </View>

                                  </Card.Content>
                                </Card>
                            </Animatable.View>
                          )
                        }
                      }
                      ListEmptyComponent={(<Card style={styles.container}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}> No data</Text>
                                                </Card.Content>
                                            </Card>)}
                      />  
                    </View>
                  </Tab>
                </Tabs>*/}
                  
          </ScrollView>
        </SafeAreaView>
      );
    }
}

MyPrescription.contextType = LocalizationContext; 

function mapStateToProps(state) { 
  const { loader, prescriptionList } = state.patientReducer;
  // // console.log("prescriptionList",prescriptionList)
  return {
    prescriptionList,
    loader
  };    
}

export default connect(mapStateToProps)(MyPrescription);


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
    backgroundColor: '#00B2B6'
  },
  searchHead: {
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor:'#dcf7fa',
  },
  tabsContainerStyle:{
    backgroundColor:'#dcf7fa',
    // borderRadius: 15
  },
  categroy: {
    backgroundColor:'#dcf7fa',
  },
  Tab:{
    backgroundColor:'#ffffff',
    borderRadius: 5
  },
  ActiveTabs:{
    backgroundColor:'#ed8b40',
    borderRadius: 5
  },
  Tabtext:{
    color:'#ed8b40',
  },
  ActiveTabText:{
    color:'#ffffff',
  },
  appointmentDateTimeButtonContainer:{
    flexDirection:'row',  
    alignItems: 'center', 
    justifyContent : 'center'
  },
  appointment_date_button:{
    backgroundColor:'#ebebeb',
    color:'#00B2B6',
    marginRight:5,
    width:'auto',
    marginBottom:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    fontWeight:'bold',
    borderRadius: 5
  },
  appointment_time_button:{
    backgroundColor:'#ebebeb',
    color:'#00B2B6',
    width:'auto',
    marginBottom:10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    fontWeight:'bold',
    borderRadius:5
  },
  cardListView: {
    borderWidth: 1,
    // height:120,
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
    marginTop:5,
    borderRadius: 15,
    marginHorizontal: 10
  },
  cardListView1: {
    borderWidth: 1,
    height:120,
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
    marginTop:5,
    borderRadius: 15,
    marginHorizontal: 10
  },
  rating_container:{
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
