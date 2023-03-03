import React from 'react';
import {View,  ImageBackground,} from 'react-native';
const Background = ({ children }) => {
  return (
    <View>
       <ImageBackground  source={{uri: "https://panel.avark.in/apk-image/assets/newimage/appdesignImgHome.png"}} style={{ height: '100%' }} /> 
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </View>
  );
}
export default Background;
