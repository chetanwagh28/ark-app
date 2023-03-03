import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, Footer, FooterTab, Left, Right, Body, Tabs , Tab, CardItem } from 'native-base';
import { Rating, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import {doctorActions} from '../action';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonLoader from '../components/SkeletonLoader';
import {_, isEmpty} from 'lodash';
import style from '../assets/style.js';
import { PieChart } from 'react-native-svg-charts'
// import { Text } from 'react-native-svg'



class Report extends Component {

    constructor(props){
        super(props);
        this.state={
            graph: [],
            graph1: [],
            selectedSlice: {
              label: '',
              value: ''
            },
            selectedSlice1: {
              label1: '',
              value1: ''
            },
            labelWidth: 0,
            labelWidth1: 0,
            values: [],
            totalAppointment: 0
        }
        //console.disableYellowBox = true;
    }
    componentDidMount(){
      // this.getProfile()
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        this.apiCall()
      });
    }
    apiCall = () => {
        const { dispatch } = this.props;
        dispatch(doctorActions.appointmentReport()).then((res) => {
            // // console.log(res)
            if(res.status === 200){
                this.setState({graph: res.data})
            }
        })
        dispatch(doctorActions.referredReport()).then((res) => {
            // // console.log(res)
            if(res.status === 200){
                this.setState({graph1: res.data})
            }
        })
    }



    render() {

        const screenWidth = Math.round(Dimensions.get('screen').width);
        const left = this.state.value * (screenWidth-60)/100 - 15;
        const { goBack } = this.props.navigation;
        
        const { labelWidth, labelWidth1, selectedSlice, selectedSlice1 } = this.state;
        const { label, value } = selectedSlice;
        const { label1, value1 } = selectedSlice1;

        const keys = ['Completed', 'Cancelled', 'Pending'];
        const values = [this.state.graph.completed, this.state.graph.cancelled, this.state.graph.booked];
        const totalAppointment = this.state.graph.total
        const colors = ['#63cfc4', '#eb8181', '#fca503']
        const data = keys.map((key, index) => {
            return {
              key,
              value: values[index],
              svg: { fill: colors[index] },
              onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
            }
          })

        const keys1 = ['Completed', 'Pending'];
        const values1 = [this.state.graph1.completed, this.state.graph1.total_referred - this.state.graph1.completed];
        const totalReferred = this.state.graph1.total_referred
        const colors1 = ['#63cfc4', '#fcf39f']
        const data1 = keys1.map((key, index) => {
            return {
              key,
              value: values1[index],
              svg: { fill: colors1[index] },
              onPress: () => this.setState({ selectedSlice1: { label1: key, value1: values1[index] } })
            }
          })
        const deviceWidth = Dimensions.get('window').width

      return (
        <Container>
          <Header style={style.appHeader}>
            <Left style={{ flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon name="ios-arrow-back" size={25} backgroundColor="#00B2B6" color="#fff" onPress={() => goBack()}></Icon>
            </Left>
            <Body style={{ flex:5, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Title style={styles.headerTitleText}>Report</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            </Right>            
          </Header>
          <Content style={styles.container}>
            <ScrollView>
                <View style={styles.graphView1}>
                  <Text style={styles.headerTitleText}>Appointments</Text>
                </View>
                <View style={styles.graphView}>
                  <PieChart
                    style={{ height: 250 }}
                    outerRadius={'95%'}
                    innerRadius={'55%'}
                    data={data}
                    padAngle={0}
                  />

                  <Text
                    onLayout={({ nativeEvent: { layout: { width } } }) => {
                      this.setState({ labelWidth: width });
                    }}
                    style={{
                      position: 'absolute',
                      left: deviceWidth / 2 - labelWidth / 2,
                      textAlign: 'center',
                      color: '#00B2B6'
                    }}>
                    {`${label} \n ${value} \n ${"Total: "+totalAppointment}`}
                  </Text>
                  
                </View>
                <View style={styles.graphView1}>
                  <Text style={styles.headerTitleText}>Referred</Text>
                </View>
                <View style={styles.graphView}>
                  <PieChart
                    style={{ height: 250 }}
                    outerRadius={'95%'}
                    innerRadius={'55%'}
                    data={data1}
                    padAngle={0}
                  />

                  <Text
                    onLayout={({ nativeEvent: { layout: { width } } }) => {
                      this.setState({ labelWidth1: width });
                    }}
                    style={{
                      position: 'absolute',
                      left: deviceWidth / 2 - labelWidth1 / 2,
                      textAlign: 'center',
                      color: '#00B2B6'
                    }}>
                    {`${label1} \n ${value1} \n ${"Total: "+totalReferred}`}
                  </Text>
                  
                </View>
            </ScrollView>
           </Content>
        </Container>
      );
    }
}

function mapStateToProps(state) { 
  const { loader } = state.doctorReducer;
  // // console.log("doctorList",doctorList)
  return {
    loader
  };    
}

export default connect(mapStateToProps)(Report);



const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  graphView1: {
    justifyContent: 'center', 
    flex: 1, 
    alignItems:'center',
    flexDirection: 'column', 
    marginTop:5
  },
  headerTitleText1:{
    color:'#ffffff',
    fontSize:18,
    fontWeight:'bold',
    alignItems:'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  headerTitleText:{
    color:'#00B2B6',
    fontSize:18,
    fontWeight:'bold',
    alignItems:'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  graphView: {
    justifyContent: 'center', 
    flex: 1, 
    flexDirection: 'column', 
    marginTop:5
  }
});
