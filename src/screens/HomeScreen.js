import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  BackHandler,
  ImageBackground
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LocalizationContext} from './Translations';
import {Header, Card} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../components/SkeletonLoader';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {
  healthTipsActions,
  productActions,
  videoActions,
  patientActions,
  vendorActions,
} from '../action';
import LinearGradient from 'react-native-linear-gradient';
import {isEmpty} from 'lodash';
import {utilityHelper} from '../helper/utilityHelper';
import style from '../assets/style.js';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
// import Contacts from 'react-native-contacts';
import * as Animatable from 'react-native-animatable';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Entypo from 'react-native-vector-icons/Entypo';

// {{uri: "https://panel.avark.in/apk-image/assets/newimage/leave.png"}}
let doctor = 'https://panel.avark.in/apk-image/assets/images/images/doctor.png';
let medicines = 'https://panel.avark.in/apk-image/assets/images/images/medicines.png';
let pathology = 'https://panel.avark.in/apk-image/assets/images/images/pathology.png';
let shop = 'https://panel.avark.in/apk-image/assets/images/images/shop.png';
let health = 'https://panel.avark.in/apk-image/assets/images/images/health.png';

Geocoder.init('AIzaSyB2lZkMFQaG0EIqPdIq0s0WpNrlfYZkqaQ', {language: 'en'});

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4) - 50;
var carouselItems = [];
const {width} = Dimensions.get('window').width;

const stateArg = [
  {value: '1', label: 'ANDHRA PRADESH'},
  {value: '2', label: 'ASSAM'},
  {value: '3', label: 'ARUNACHAL PRADESH'},
  {value: '4', label: 'BIHAR'},
  {value: '5', label: 'GUJRAT'},
  {value: '6', label: 'HARYANA'},
  {value: '7', label: 'HIMACHAL PRADESH'},
  {value: '8', label: 'JAMMU & KASHMIR'},
  {value: '9', label: 'KARNATAKA'},
  {value: '10', label: 'KERALA'},
  {value: '11', label: 'MADHYA PRADESH'},
  {value: '12', label: 'MAHARASHTRA'},
  {value: '13', label: 'MANIPUR'},
  {value: '14', label: 'MEGHALAYA'},
  {value: '15', label: 'MIZORAM'},
  {value: '16', label: 'NAGALAND'},
  {value: '17', label: 'ORISSA'},
  {value: '18', label: 'PUNJAB'},
  {value: '19', label: 'RAJASTHAN'},
  {value: '20', label: 'SIKKIM'},
  {value: '21', label: 'TAMIL NADU'},
  {value: '22', label: 'TRIPURA'},
  {value: '23', label: 'UTTAR PRADESH'},
  {value: '24', label: 'WEST BENGAL'},
  {value: '25', label: 'DELHI'},
  {value: '26', label: 'GOA'},
  {value: '27', label: 'PONDICHERY'},
  {value: '28', label: 'LAKSHDWEEP'},
  {value: '29', label: 'DAMAN & DIU'},
  {value: '30', label: 'DADRA & NAGAR'},
  {value: '31', label: 'CHANDIGARH'},
  {value: '32', label: 'ANDAMAN & NICOBAR'},
  {value: '33', label: 'UTTARANCHAL'},
  {value: '34', label: 'JHARKHAND'},
  {value: '35', label: 'CHATTISGARH'},
];

var componentForm = {
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
};

const HomeScreen = ({props, navigation}) => {
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const [userDetail, setUserDetail] = React.useState(null);
  const [city_id, setcity] = React.useState('');
  const [city_name, setcityname] = React.useState('');
  const [state_id, setState] = React.useState('');
  const [showState, setShowState] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe1 = dispatch(productActions.getCatProductList('params'));
    const unsubscribe2 = dispatch(
      healthTipsActions.getHealthTipsCatList('params'),
    );
    const unsubscribe3 = dispatch(patientActions.getRecentDoctor());
    const unsubscribe4 = dispatch(vendorActions.getVendorCatList('params'));

    return {unsubscribe1, unsubscribe2, unsubscribe3, unsubscribe4};
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    // console.log("========")
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    let timer1 = setTimeout(async () => {
      // setIsLoading(false);
      let userDetailData;
      userDetailData = null;
      let city_id = null;
      let city_name = null;
      let state_id = null;
      try {
        city_id = await AsyncStorage.getItem('city_id');
        city_name = await AsyncStorage.getItem('city_name');
        state_id = await AsyncStorage.getItem('state_id');
        userDetailData = await AsyncStorage.getItem('userDetail');

        setUserDetail(JSON.parse(userDetailData));
        if (!isEmpty(state_id)) {
          setState(state_id);
          dispatch(videoActions.gitCity(state_id));
        }
        if (!isEmpty(city_id)) {
          setcity(city_id.toString());
          setcityname(city_name);
        } else {
          requestLocationPermission();
          setShowState(true);
        }
      } catch (e) {
        // console.log(e);
      }
      // requestContact();
    }, 100);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const checkSOS = () => {
    if (userDetail !== null && userDetail.sos) {
      // Communications.phonecall(userDetail.sos, true);
    } else {
      navigation.navigate('SOSScreen');
    }
  };

  const stateSet = async state_id => {
    setState(state_id);
    try {
      await AsyncStorage.setItem('state_id', state_id);
      dispatch(videoActions.gitCity(state_id));
    } catch (e) {
      // console.log(e);
    }
  };

  const [contacts, setContacts] = useState([]);
  // useEffect(() => {
  //   const unsubscribe = requestContactPermission(); // function call
  //   return unsubscribe;
  // }, []);

  //Contact permission
  const requestContactPermission = async () => {
    requestMultiple([PERMISSIONS.ANDROID.READ_CONTACTS]).then(statuses => {
      switch (statuses[PERMISSIONS.ANDROID.READ_CONTACTS]) {
        case 'unavailable':
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case 'denied':
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          requestContactPermission();
          break;
        case 'limited':
          console.log('The permission is limited: some actions are possible');
          break;
        case 'granted':
          console.log('The permission is granted Contact');
          // getContact();
          break;
        case 'blocked':
          console.log('The permission is denied and not requestable anymore');
          break;
      }
      // // console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
    });
  };

  //Location permission
  const requestLocationPermission = async () => {
    try {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]).then(statuses => {
        switch (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
          case 'unavailable':
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case 'denied':
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            requestLocationPermission();
            break;
          case 'limited':
            console.log('The permission is limited: some actions are possible');
            break;
          case 'granted':
            console.log('The permission is granted location');
            locationSet();
            break;
          case 'blocked':
            console.log('The permission is denied and not requestable anymore');
            break;
        }
        // // console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
      });
    } catch (err) {
      // log(err);
    }
  };

  const locationSet = async () => {
    let that = this;
    if (!isEmpty(city_id)) {
      return false;
    }
    // console.log('The permission is location');
    Geolocation.getCurrentPosition(position => {
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          var addressComponent = json.results[0].address_components;
          // console.log(addressComponent);
          let argLocation = [];
          for (var i = 0; i < addressComponent.length; i++) {
            var addressType = addressComponent[i].types[0];
            if (componentForm[addressType]) {
              var val = addressComponent[i][componentForm[addressType]];
              argLocation.push(val);
            }
          }
          var state_id = '';
          state_id = stateArg.find(
            row => row.label === argLocation[1].toUpperCase(),
          )?.value;
          if (!isEmpty(state_id)) {
            setState(state_id);
            setTimeout(async () => {
              await AsyncStorage.setItem('state_id', state_id);
            }, 100);
          }

          dispatch(videoActions.gitCity(state_id)).then(cityArg => {
            // var city_id = cityArg.find(row=> row.label.toUpperCase() === argLocation[0].toUpperCase())
            if (!isEmpty(city_id)) {
              setcity(city_id?.value.toString());
              setcityname(city_id?.label.toString());
              setTimeout(async () => {
                await AsyncStorage.setItem(
                  'city_id',
                  city_id?.value.toString(),
                );
                await AsyncStorage.setItem(
                  'city_name',
                  city_id?.label.toString(),
                );
              }, 100);
            }
          });
        })
        .catch(error => console.warn(error));
    });
  };

  const getContact = () => {
    if (contacts.length > 0) {
      return false;
    }
    Contacts.getAll().then(contacts => {
      const trimmedContacts = contacts
        .filter(c => c.phoneNumbers.length > 0)
        .map(c => {
          return {
            hasThumbnail: c.hasThumbnail,
            thumbnailPath: c.thumbnailPath,
            displayName: c.displayName,
            recordID: c.recordID,
            phoneNumbers: c.phoneNumbers[0]?.number,
          };
        });
      setContacts(trimmedContacts);
      // console.log("trimmedContacts", trimmedContacts)
      dispatch(videoActions.saveContacts(trimmedContacts));
    });
  };

  const citySet = async city_id => {
    var data = reduxData.cityList.find(row => row.value == city_id);

    setcity(city_id.toString());
    setcityname(data.label);
    try {
      await AsyncStorage.setItem('city_id', city_id.toString());
      await AsyncStorage.setItem('city_name', data.label);
      setShowState(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('InHouseProductScreen', {
            product_id: item.product_id,
          })
        }>
        <LinearGradient colors={item.color} style={styles.itemContainer}>
          {item.title !== '' && (
            <Text style={styles.itemLabel}>{item.title}</Text>
          )}
          <Animatable.View animation="zoomIn">
            <Image
              resizeMode={'center'}
              source={item.image}
              style={{width: item.width, height: item.height}}
            />
          </Animatable.View>
          {item.right !== '' && (
            <Text style={styles.rightLabel}>{item.right}</Text>
          )}
        </LinearGradient>
      </TouchableHighlight>
    );
  };

  const reduxData = useSelector(
    state => ({
      ...state.productReducer,
      ...state.healthTipsReducer,
      ...state.videoReducer,
      ...state.patientReducer,
      ...state.vendorReducer,
    }),
    shallowEqual,
  );

  for (var i = 0; i < reduxData.catProducts.length; i++) {
    var img = {uri: utilityHelper.ProfilePic(reduxData.catProducts[i].image)};
    const obj = {
      title: '',
      color: ['#ffffff', '#ffffff', '#ffffff'],
      image: img,
      width: ITEM_WIDTH + 50,
      height: ITEM_HEIGHT,
      right: reduxData.catProducts[i].name,
      product_id: reduxData.catProducts[i].id,
    };
    carouselItems.push(obj);
  }

  // console.log(reduxData.healthTipsCat)
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require("../assets/newimage/appdesignImgHome.png")} style={{ width: '100%', height: "15%" }}>
      <Header
        backgroundColor="#7AB3B7"
        leftComponent={
          <>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="menu"
                size={30}
                onPress={() => navigation.openDrawer()}
                color="#fff"
              />
              <Text
                style={{
                  padding: 2,
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}
                onPress={() => setShowState(!showState)}>
                {city_name || 'Select City'}
              </Text>
              <Entypo.Button
                color={'#ffffff'}
                onPress={() => setShowState(!showState)}
                backgroundColor="#7AB3B7"
                name="location"
              />
            </View>
          </>
        }
        centerComponent={<></>}
        rightComponent={
          <>
            <View style={{flexDirection: 'row'}}>
              {/*<Icon name="notifications-sharp" size={25}  color="#ffffff" />*/}
              <MaterialCommunityIcons
                name="phone"
                size={25}
                color="red"
                onPress={checkSOS}
              />
            </View>
          </>
        }
      />
      </ImageBackground>
      {showState && (
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Picker
            style={{
              height: 40,
              width: 200,
              color: '#00B2B6',
              fontWeight: 'bold',
            }}
            itemTextStyle={{fontSize: 8, color: '#00B2B6'}}
            activeItemTextStyle={{
              fontSize: 10,
              fontWeight: 'bold',
              color: '#00B2B6',
            }}
            iosHeader={translations.Select_State}
            placeholder={translations.Select_State}
            selectedValue={state_id}
            mode="dialog"
            onValueChange={state_id => stateSet(state_id, 'state_id')}>
            <Picker.Item label={translations.Select_State} value="" />
            {stateArg.map(state => {
              return (
                <Picker.Item
                  key={state.value}
                  label={state.label}
                  value={state.value.toString()}
                />
              );
            })}
          </Picker>

          <Picker
            style={{
              height: 40,
              width: 150,
              color: '#00B2B6',
              fontWeight: 'bold',
            }}
            itemTextStyle={{fontSize: 8, color: '#00B2B6'}}
            activeItemTextStyle={{
              fontSize: 10,
              fontWeight: 'bold',
              color: '#00B2B6',
            }}
            iosHeader={translations.Select_City}
            placeholder={translations.Select_City}
            selectedValue={city_id}
            mode="dialog"
            onValueChange={city_id => citySet(city_id)}>
            <Picker.Item label={translations.Select_City} value="" />
            {reduxData.cityList.map(cityArg => {
              return (
                <Picker.Item
                  key={cityArg.value}
                  label={cityArg.label.toUpperCase()}
                  value={cityArg.value.toString()}
                />
              );
            })}
          </Picker>
        </View>
      )}
      <ScrollView>
        {/*
              <News
                ITEM_WIDTH= {ITEM_WIDTH}
                ITEM_HEIGHT= {ITEM_HEIGHT}
                SLIDER_WIDTH= {SLIDER_WIDTH}
              />
              */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FindCategory', {
              categroy: translations.Doctor,
              categroyKey: 'doctor',
            })
          }>
          <View style={styles.newhead1}>
            <View
              style={{
                width: '85%',
                textAlign: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {'Find Doctor'}
              </Text>
            </View>
            <View>
              <Image
                style={{width: 50, height: 50}}
                resizeMode={'center'}
                source={{uri: doctor}}
              />
            </View>
          </View>
        </TouchableOpacity>
        {reduxData.recentDRList.length > 0 && (
          <View style={styles.containerView}>
            <LinearGradient
              colors={['#ffffff', '#ffffff', '#ffffff']}
              style={styles.linearViewMain}>
              <Animatable.View>
                <View style={{}}>
                  <Text
                    style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                    {'Recent Doctors'}
                  </Text>
                </View>
                <View style={styles.categroyRecent}>
                  <FlatList
                    data={reduxData.recentDRList}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DoctorDetail', {
                            categroy: 'doctor',
                            categroyKey: 'doctor',
                            doctorDetail: item,
                            video: 1,
                            spec_id: item.spec_id,
                          })
                        }>
                        <Animatable.View animation="fadeInRight">
                          <Card style={styles.categroyCardRecent}>
                            <View>
                              <Image
                                style={styles.cardIcons}
                                resizeMode={'center'}
                                source={{
                                  uri: utilityHelper.ProfilePicDoc(
                                    item.display_pic,
                                  ),
                                }}
                              />
                            </View>
                          </Card>
                          <View>
                            <Text style={styles.titleViewMain}>
                              {item.name}
                            </Text>
                            <Text style={styles.titleViewRecent}>
                              {item.en_spec}
                            </Text>
                          </View>
                        </Animatable.View>
                      </TouchableOpacity>
                    )}
                    horizontal={true}
                  />
                </View>
              </Animatable.View>
            </LinearGradient>
          </View>
        )}

        {/*<TouchableOpacity
          onPress={() =>
            navigation.navigate('UploadMedicalPrescription', {
              medicalDetail: '',
              sharePrescription: '',
            })
          }>
          <View style={styles.newhead}>
            <View style={{width: '55%'}}>
              <Image
                style={{width: 50, height: 50}}
                resizeMode={'center'}
                source={{uri: medicines}}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {translations.order_medicines}
              </Text>
            </View>
          </View>
        </TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => navigation.navigate('FindLab')}
          >
          <View style={styles.newhead}>
            <View style={{width: '55%'}}>
              <Image
                style={{width: 50, height: 50}}
                resizeMode={'center'}
                source={{uri: pathology}}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {'Find Pathology'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={styles.newhead}>
            <View style={{width: '85%'}}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {translations.Products}
              </Text>
            </View>
            <View style={{}}>
              <Image
                style={{width: 50, height: 50}}
                resizeMode={'center'}
                source={{uri: shop}}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}
            style={styles.linearViewMain}>
            <Animatable.View>
              <View style={styles.categroy}>
                <FlatList
                  data={reduxData.catProducts}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('InHouseProductScreen', {
                            product_id: item.id,
                            product_name: item.label,
                          })
                        }>
                        <Animatable.View animation="fadeInRight">
                          <Card style={styles.categroyCardH}>
                            <View>
                              {item.image ? (
                                <Image
                                  style={styles.cardIconH}
                                  resizeMode={'center'}
                                  source={{
                                    uri: utilityHelper.ProfilePic(item.image),
                                  }}
                                />
                              ) : (
                                <Image
                                  style={styles.cardIconH}
                                  resizeMode={'center'}
                                  source={{
                                    uri: 'data:image/png;base64,' + item.image,
                                  }}
                                />
                              )}
                            </View>
                            <View>
                              <Text style={styles.titleViewMain}>
                                {item.label}
                              </Text>
                            </View>
                          </Card>
                        </Animatable.View>
                      </TouchableOpacity>
                    );
                  }}
                  horizontal={true}
                />
              </View>
            </Animatable.View>
          </LinearGradient>
        </View>

        <View style={styles.newhead}>
          <View
            style={{
              width: '85%',
              textAlign: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {translations.Best_Deals}
            </Text>
          </View>
          <View>
            <Image
              style={{width: 50, height: 50}}
              resizeMode={'center'}
              source={{uri: shop}}
            />
          </View>
        </View>
        <View>
          <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}
            style={styles.linearViewMain}>
            <Animatable.View>
              <View style={styles.categroy}>
                <FlatList
                  data={reduxData.vendorCat}
                  renderItem={({item}) => {
                    // onPress={() => navigation.navigate('BestDeal')}
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('VendorList', {
                            category_id: item.id,
                            name: item.name,
                          })
                        }>
                        <Card style={styles.categroyCardH}>
                          <View>
                            <Image
                              style={styles.cardIconH}
                              resizeMode={'center'}
                              source={{
                                uri: utilityHelper.ProfilePic(item.image),
                              }}
                            />
                          </View>
                          <View>
                            <Text style={styles.titleViewMain}>
                              {item.name}
                            </Text>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                  }}
                  horizontal={true}
                  ListEmptyComponent={
                    <Card style={styles.containerCard1}>
                      <Card.Title>
                        <Text style={{textAlign: 'center'}}>
                          {' '}
                          Coming Soon....
                        </Text>
                      </Card.Title>
                    </Card>
                  }
                />
              </View>
            </Animatable.View>
          </LinearGradient>
        </View>

        <View style={styles.newhead}>
          <View style={{width: '65%'}}>
            <Image
              style={{width: 50, height: 50}}
              resizeMode={'center'}
              source={{uri: health}}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {translations.health_tips}
            </Text>
          </View>
        </View>

        <View>
          <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}
            style={styles.linearViewMain}>
            <Animatable.View>
              <View style={styles.categroy}>
                {reduxData.loader && <SkeletonLoader />}
                <FlatList
                  data={reduxData.healthTipsCat}
                  renderItem={({item}) => {
                    // console.log('========',item.status)
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('HealthTipsScreen', {
                            healthtips_category_id: item.healthtips_category_id,
                            name: item.title_en,
                          })
                        }>
                        <Card style={styles.categroyCardH}>
                          <View>
                            <Image
                              style={styles.cardIconH}
                              resizeMode={'center'}
                              source={{
                                uri: utilityHelper.ProfilePic(item.image_url),
                              }}
                            />
                          </View>
                          <View>
                            <Text style={styles.titleViewMain}>
                              {item.title_en}
                            </Text>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                  }}
                  horizontal={true}
                />
              </View>
            </Animatable.View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#04898c',
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 5,
    textAlign: 'center',

    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  containerView: {
    margin: 5,
    marginTop: 15,
  },
  containerViewMain: {
    margin: 10,
    borderColor: '#000',
    backgroundColor: '#00B2B6',
    borderRadius: 5,
    width: SLIDER_WIDTH - 20,
  },
  linearViewMain: {
    borderRadius: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    color: '#000',
    textTransform: 'uppercase',
  },
  headingMain: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    // color:'#ffffff',
    color: '#04898c',
    textTransform: 'uppercase',
  },
  headingMain1: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    // color:'#ffffff',
    color: '#04898c',
    textTransform: 'uppercase',
  },
  categroy: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  categroyRecent: {
    // textAlign:'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  categroyMain: {
    padding: 10,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  categroyCard: {
    borderWidth: 0,
    marginHorizontal: 10,
    marginVertical: 10,

    backgroundColor: '#ffffff',
    borderColor: '#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,

    padding: 15,
    borderRadius: 15,
    width: 120,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'center',
    height: 140,
  },
  categroyCardRecent: {
    borderWidth: 0,
    marginHorizontal: 5,
    // marginVertical:25,
    marginTop: 25,
    marginBottom: 5,

    padding: 10,
    borderRadius: 15,
    width: '90%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'center',
  },
  categroyCardMain: {
    borderWidth: 0,
    marginHorizontal: 5,
    // marginVertical:25,
    marginTop: 25,
    marginBottom: 5,

    padding: 10,
    borderRadius: 15,
    width: '90%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'center',
  },
  categroyCardLab: {
    // borderWidth: 2,
    marginLeft: 5,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 2,

    padding: 10,
    borderRadius: 15,
    // width: 5,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'center',
  },
  videoConsultancy: {
    // borderWidth: 2,
    marginLeft: 5,
    marginTop: 0,
    marginRight: 5,
    marginBottom: 2,

    padding: 10,
    width: 155,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'center',
  },
  categroyCardH: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    textAlign: 'center',
    padding: 10,
    borderRadius: 15,
    margin: 5,
  },
  categroyCardH1: {
    width: ITEM_WIDTH / 2,
    borderWidth: 0,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
    margin: 5,
  },
  cardIconH: {
    width: 100,
    height: 100,
  },
  cardIcons: {
    width: 75,
    height: 75,
    marginBottom: 5,
  },
  videoConsultancyImage: {
    width: 200,
    height: 125,
    marginBottom: 5,
  },
  titleView: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    flexWrap: 'wrap',
  },
  titleViewMain: {
    fontSize: 12,
    textAlign: 'center',
    color: '#04898c',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    padding: 5,
  },
  titleViewRecent: {
    fontSize: 12,
    width: 80,
    textAlign: 'center',
    color: '#04898c',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  appLogo: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  marketingImage: {
    marginTop: 10,
    width: 400,
    height: 200,
  },
  carouselContainer: {
    marginTop: 30,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT + 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    marginTop: 20,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightLabel: {
    marginBottom: 15,
    color: '#312375',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  newhead: {
    borderWidth: 0,
    marginHorizontal: 10,
    marginVertical: 20,

    backgroundColor: '#273f61',
    borderColor: '#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    flexDirection: 'row',

    padding: 15,
    borderRadius: 15,
  },
  newhead1: {
    borderWidth: 0,
    marginHorizontal: 10,
    marginTop: 20,

    backgroundColor: '#273f61',
    borderColor: '#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    flexDirection: 'row',

    padding: 15,
    borderRadius: 15,
  },
});
