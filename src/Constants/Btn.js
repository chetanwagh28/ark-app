import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Btn({bgColor, btnLabel, textColor, Press, width= 120}) {
  return (
    <TouchableOpacity
    onPress={Press}
      style={{
    
        backgroundColor: bgColor,
        borderRadius: 15,
        alignItems: 'center',
        width: width,
        paddingVertical: 10,
        // marginTop:10,
        marginHorizontal:10,
      }}>
      <Text style={{color: textColor, fontSize: 16, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
