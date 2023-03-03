import React, {useContext, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet , StatusBar, Alert, Image, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import news1 from '../assets/news/news1.png';
import news2 from '../assets/news/news2.png';
import Carousel from 'react-native-snap-carousel';


const News = (props) => {

    const _renderNews = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
          <LinearGradient colors={item.color} style={{
                            width: props.ITEM_WIDTH,
                            height: props.ITEM_HEIGHT+40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
          
            <Animatable.View animation="zoomIn">   
            <Image resizeMode={'center'} source={item.image} style={{width: item.width, height: item.height}} />
            </Animatable.View>
            {item.right !== "" && <Text style={styles.rightLabel}>{item.right}</Text>}      
          
          </LinearGradient>
        </TouchableOpacity>          
      );
    }


    carouselNews= [{
          color: ['#ffffff', '#ffffff', '#ffffff'],
          image: news1,
          width: props.ITEM_WIDTH + 50,
          height: props.ITEM_HEIGHT,
          // right: "News",
          link: "http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/"
        },
        {
          color: ['#ffffff', '#ffffff', '#ffffff'],
          image: news2,
          width: props.ITEM_WIDTH + 50,
          height: props.ITEM_HEIGHT,
          // right: "News",
          link: "http://covidfacts.in"
        }
      ]
    return (
        <View>
            <Carousel
              // ref={(c) => this.carousel = c}
              data={carouselNews}
              renderItem={_renderNews}
              sliderWidth={props.SLIDER_WIDTH}
              itemWidth={props.ITEM_WIDTH}
              containerCustomStyle={styles.carouselContainer}
              inactiveSlideShift={0}
              // onSnapToItem={(index) => setState({ index })}
              useScrollView={true} 
              loop={true}
              // autoplay={true}            
            />
        </View>  
    );
};

export default News;


const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 30
  },
  itemContainer: {
    // width: props.ITEM_WIDTH,
    // height: props.ITEM_HEIGHT+40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
    // backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    marginTop:20,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  rightLabel: {

    marginBottom:15,
    color: '#312375',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
