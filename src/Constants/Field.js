import React from 'react';
import {TextInput} from 'react-native';
import {black, darkGreen} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 15, color: darkGreen, paddingHorizontal: 10,marginTop:2, fontWeight: 'bold',width: '70%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 15}}
      placeholderTextColor={black}
    >
       
    </TextInput>
  );
};

export default Field;
