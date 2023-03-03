import React, {useContext, useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { connect, useSelector, shallowEqual, useDispatch } from 'react-redux'
import { adsActions } from '../action';



export const AdsDisplay = ({props, navigation, userData}) => {
	
	const dispatch = useDispatch();

    
    useEffect(() => {
      dispatch(adsActions.getAdsByCategory())  
  	}, []);

	const reduxData = useSelector(state => ({ ...state.adsReducer }), shallowEqual)

	return (
		<View><Text>Ads</Text></View>
	)

}	