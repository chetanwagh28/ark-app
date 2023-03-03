import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Avatar, Button, Title, Paragraph, Card } from 'react-native-paper';
// import { Container, Header, Content, Footer, FooterTab, Left,Right, Body, CardItem} from 'native-base';
import {productActions} from '../action';
import { Header } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonLoader from '../components/SkeletonLoader';
import style from '../assets/style.js';
import {utilityHelper} from '../helper/utilityHelper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

var {width, height} = Dimensions.get('screen')
 width = width/2.2

class InHouseProductScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            text: '',
            categroy: '',
            user_id: '',
            products: [],
            filterList: [],
            getCat: false,
            referDetail: '',
            product_name: '',
            
        }
        //console.disableYellowBox = true;
    }


    myKart = (product_id) => {
      this.setState({getCat: false})
      const { dispatch } = this.props;
      dispatch(productActions.getProductList(product_id)).then((res)=>{

        this.setState({ 
            products: res,
            filterList: res,
          })
      })
    }

    componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', async() => {
        let userDetail = null;
        try {
            userDetail = await AsyncStorage.getItem('userDetail');
            // console.log("userDetail-->>",userDetail)
            let user_id = JSON.parse(userDetail).user_id
            this.setState({user_id: user_id, products: [], getCat: true})
        } catch(e) {
            // console.log(e);
        }
        
        this.myKart(this.props.route.params.product_id)
        this.setState({product_name: this.props.route.params.product_name})

      });
    }

    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.state.filterList.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.en_spec ? item.en_spec.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        products: newData,
        text: text,
      });
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   if (nextProps.products !== prevState.products && !prevState.getCat) {
    //     // // console.log("======================") 
    //     // if(nextProps.products.length > 0){
    //       return ({ 
    //         products: nextProps.products,
    //         filterList: nextProps.products,
    //         getCat: true
    //       })
    //     // } 
    //   }
    //   return null
    // }

    buy = (item) => {
      let data = {
                "user_id" : this.state.user_id,
                "product_id" : item.product_id,
                "quantity" : item.quantity
              }
      const { dispatch } = this.props;
      dispatch(productActions.addProduct(data)).then(res => {
        // // console.log('====',res)
        Alert.alert("Add To Cart", "", [
              {text: 'Close', onPress: () =>  this.props.navigation.navigate('ShippingScreen')}
          ]);
        utilityHelper.AddTOKartCount(item.product_id)

      })
    }

    render() {
      // console.log("transla---tions",translations['ABOUT_APPLICATION'])
      const { goBack } = this.props.navigation;
      // console.log("Siyaram",this.props.products)
      return (
        <SafeAreaView style={style.container}>
          <Header 
                  // backgroundColor="#00b2b6"
                  // placement={"center"}
                  ViewComponent={LinearGradient} // Don't forget this!
                  linearGradientProps={{
                              colors: ['#7AB3B7', '#C2CD3F', '#2E7475'],
                              start: { x: 2.5, y: 0.8 },
                              end: { x: 1, y: 1.5 },
                            }}
                  containerStyle={{
                      // backgroundColor: '#3D6DCC',
                      justifyContent: 'space-around',
                      // height: 200,
                    }}
                  barStyle="light-content" // or directly

                // leftComponent={<><Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon></>}
                // centerComponent={<><Title style={styles.logoText}>{translations['doctor_details']}</Title></>}
                // rightComponent={<></>}
              >
              <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => goBack()}></Icon>
              <Title style={{color: "#fff"}}>{this.state.product_name} ({this.props.products.length})</Title>
            </Header>
          
                <View style={style.searchHead}>
                  <View style={{flexDirection: 'row', width: "100%",justifyContent: 'center'}}>
                      <TextInput 
                            placeholder="search product"
                            style={styles.textInput}
                            autoCapitalize="none"
                            name="text"
                            onChangeText={text => this.SearchFilterFunction(text)}
                            value={this.state.text}
                        />
                  </View>
                </View>  
                {this.props.loader1 ?
                      <SkeletonLoader />
                  :
                  <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={this.state.products}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor= {(item) => {
                      return item.id;
                    }}
                    ItemSeparatorComponent={() => {
                      return (
                        <View style={styles.separator}/>
                      )
                    }}
                    renderItem={(post) => {
                      const item = post.item;
                      return (
                       <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetailScreen", {
                                product: item,
                                user_id: this.state.user_id
                              })}>  
                        <View style={styles.categoryCard}>
                         
                         <View style={styles.cardHeader}>
                            <View>
                              <Text style={styles.title}>{item.product_name}</Text>
                              
                              <Text style={styles.cardTitle1}>Price: Rs <Text style={styles.price}>{item.sale_price}</Text></Text>
                              <Text style={styles.cardTitle}>Discount: {item.discount_percent}%</Text>
                              <Text style={styles.cardTitle}>Orignal Price:Rs {item.price}</Text>
                            </View>
                          </View>

                          <Image style={styles.cardImage} source={{uri:utilityHelper.ProfilePic(item.product_image)}}/>
                          
                          <View style={styles.cardFooter}>
                            <View style={styles.socialBarContainer}>
                              <View style={styles.socialBarSection}>
                                <TouchableOpacity style={styles.socialBarButton} onPress={() => this.buy(item)}>
                                  <Image style={styles.icon} source={{uri: 'https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png'}}/>
                                  <Text style={[styles.socialBarLabel, styles.buyNow]}>Buy Now</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                       </TouchableOpacity> 
                      )
                    }}/>
                  }
                  

        </SafeAreaView>
      );
    }
}

const mapStateToProps = (state) => { 
  const { loader1, products } = state.productReducer;
  // console.log("products",products)
  return {
    products,
    loader1
  };    
}

export default connect(mapStateToProps)(InHouseProductScreen);


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
    fontSize:16
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#ffffff'
  // },
  containerView: {
    margin: 0,
    marginTop: 0,
  },

  textInput: {
    height: 40,
    width: "90%",
    marginTop: 10,
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

  cardsContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {

 
  },
  categoryCard:{
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // height:150,
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
    width:width,
    padding:10,
    borderRadius: 15,
    margin:5
  },
  categoryCardContentVerticalAlignment:{
    flex:1,
    flexDirection:'column'
  },
  cardIcons:{
    width:80,
    height:80,
    marginBottom:5,
  },
  cardTitle:{
    color:'#000000',
    width:'100%',
    fontSize:14,
    textAlign:'center',
    marginTop:5
  },
  cardTitle1:{
    color:'#000000',
    width:'100%',
    fontSize:14,
    textAlign:'center',
    fontWeight:'bold',
      marginTop:5
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 100,
    width: 100,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5
  },
  buyNow:{
    color: "purple",
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});