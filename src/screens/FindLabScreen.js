import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Rating, Slider, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {labActions} from '../action';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';


class FindLab extends Component {

    constructor(props){
        super(props);
        this.state={
            name: '',
            city: '',
            value: 5,
            listData: [  
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}, 
                      {name: 'Dr Shanshank Bhawsar'},{name: 'Dr Shanshank Bhawsar'}
                  ]
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // // console.log("data",data)
        let url = `/lab/getlabs?distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
        const { dispatch } = this.props;
        dispatch(labActions.getLabList(url));
      });
    }

    searchFilter = () => {
        let url = `/lab/getlabs?distance=${this.state.value}&city=${this.state.city}&name=${this.state.name}`
        const { dispatch } = this.props;
        dispatch(labActions.getLabList(url));
    }

    onSlidingComplete = (value) => {
      let url = `/lab/getlabs?distance=${value}&city=${this.state.city}&name=${this.state.name}`
      const { dispatch } = this.props;
      dispatch(labActions.getLabList(url));
    }


    render() {
        // // console.log("categroy",this.state.categroy)
        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
      const { goBack } = this.props.navigation;
      return (
        <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
                      </>}
                centerComponent={<><Title style={style.PageTitle}>Find Lab</Title></>}
                rightComponent={<>
                  </>}
              />
        

            <ScrollView>

              <View style={styles.containerView}>
                
                <View style={styles.searchHead}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.distanceLabel}>Distance</Text>
                      <Text style={styles.distanceLabel}>(KM)</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center',marginLeft:10}}>

                        <Text style={ { width: 50, textAlign: 'center', left: left } }>
                          {Math.floor( this.state.value )}
                        </Text>
                      <Slider
                        value={this.state.value}
                        thumbTintColor={'#ffffff'}
                        minimumTrackTintColor="#00B2B6"
                        maximumTrackTintColor="#ffffff"
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={(value) => this.setState({ value })}
                        onSlidingComplete={(value) => this.onSlidingComplete(value)}
                      />
                    </View>

                  </View>

                  <View style={{flexDirection: 'row', width: "100%"}}>
                    <TextInput 
                        placeholder="Search, City"
                        style={styles.textInput}
                        autoCapitalize="none"
                        name="city"
                        onChangeText={(city) => this.setState({city: city})}
                        onEndEditing={this.searchFilter}
                    />
                    <TextInput 
                        placeholder="Search, Lab Name"
                        style={styles.textInput1}
                        autoCapitalize="none"
                        name="name"
                        onChangeText={(name) => this.setState({name: name})}
                        onEndEditing={this.searchFilter}
                    />
                  </View>  

                </View>  

                <View style={[styles.listOfAllCards,{flex:1,alignItems:'center',justifyContent:'center',marginTop:"50%"}]}>
                  <Card >
                  <Card.Content><Text style={{alignItems:'center',marginLeft:'25%'}}>Comming Soon........</Text></Card.Content>
                  </Card>
                  {/* <FlatList  
                      data={this.props.labList.data}  
                      numColumns = {1}
                      renderItem={({item}) =>  
                      <Animatable.View animation="fadeInUp" direction="alternate" duration={1000}>
                          <Card key={item.key} style={styles.cardListView}>
                            <Card.Content>
                                <View style={{flexDirection:'row',  alignItems: 'center', justifyContent : 'space-between'}}>
                                    <View style={{flexDirection:'column',  alignItems: 'center', justifyContent : 'space-between'}}>
                                        <Avatar.Image  source={lab1} style={styles.profile_image} size={60} />
                                    </View>
                                    
                                    <View>
                                        <Paragraph>Dr Lal Pathlabs </Paragraph>
                                        <Paragraph>102, First Floor, BTC</Paragraph>
                                        <Paragraph>Indore - 452001</Paragraph>
                                    </View>                            
                                </View>

                                <View style={styles.contentList}>

                                        <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'center',alignItems:'center' }}>

                                            <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
                                                <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                                    <Text style={styles.commonAppButtonText}>Call Now</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>    
                                    </View>
                            
                            </Card.Content>
                          </Card>
                      </Animatable.View>
                      }
                      ListEmptyComponent={(<Card style={style.containerCard1}>
                                                <Card.Content  header>
                                                  <Text style={{textAlign: 'center'}}>  No Data Present In... Try Again.</Text>
                                                </Card.Content>
                                            </Card>)}
                  />   */}
                </View>
                </View> 
            
            
            </ScrollView>
        </SafeAreaView>
      );
    }
}

function mapStateToProps(state) { 
  const { loader, labList } = state.labReducer;
  // // console.log("labList",labList)
  return {
    labList,
    loader
  };    
}

export default connect(mapStateToProps)(FindLab);



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
  containerView: {
    margin: 0,
    marginTop: 0
  },
  distanceLabel:{
    lineHeight:35,
    color:'#fff',
    fontWeight:'bold',
  },
  searchHead:{
    marginLeft: 0,
    marginRight: 0,
    backgroundColor:'#00CBCC',
    paddingLeft:10,
    paddingRight:10

  },
  textInput: {
    height: 40,
    width: "30%",
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
    borderRadius:5,

  },
  textInput1: {
    height: 40,
    width: "67%",
    marginTop: 0,
    marginBottom:10,
    marginLeft: 5,
    marginRight: 10,
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
  listOfAllCards:{
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5
  },
  cardListView: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,
    alignItems: 'flex-start',
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
    width:80,
    height:80,
    borderWidth:1,
    borderRadius:60/2
  },
  fees_display_text:{
      fontSize:14,
      color:'black'
  },
  titleView:{
    fontSize:14,
    width: 100
  },
  call_now_button:{
    margin: 5,
    fontSize:5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center',

  },
  chat_button:{ 
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center',

  },
  upload_prescription_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
  },
  book_appointment_button:{
    margin: 5,
    backgroundColor:'#00B2B6',
    width:'auto',
    textAlign:'center'
  },

  profile_image:{
      width:60,
      height:60,
      marginRight:15
  },
  commonAppButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginHorizontal:2,
    marginVertical:2,
  },
  commonAppButtonText: {
      color: '#fff',
      fontSize:12
  },  
});
