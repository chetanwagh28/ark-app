import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * fixture
 *
 * @subpackage             fixture
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const videoService = {
    sendVideoCallByServer,
    gitCity,
    saveContacts
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function sendVideoCallByServer(data) {

    // console.log(data, configConstants.API_BASE_PATH + '/doctor/start-video-call')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/doctor/start-video-call',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function gitCity(id) {

    // console.log(configConstants.API_BASE_PATH + '/auth/getCities/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/auth/getCities/'+id,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function saveContacts(data) {

    // console.log(configConstants.API_BASE_PATH + '/profile/uploadContact', {contacts : data} )
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/uploadContact',
        data    : {contacts : JSON.stringify(data)}
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
