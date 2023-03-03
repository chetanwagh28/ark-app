import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'

export const informationService = {
    information,
    getAddressList
};

async function information(data) {
    
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/profile/addnewaddress'
    })
    .then(response => {
        
        return response;
    })
    .catch(response => {
        return response;
    });
}

async function getAddressList() {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
   
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/profile/getaddressbyusers/'+user_id
    })
    .then(response => {
        
        return response;
    })
    .catch(response => {
        return response;
    });
}
