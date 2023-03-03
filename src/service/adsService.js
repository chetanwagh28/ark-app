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
export const adsService = {
    getAdsByCategory,
    postInqury,
    myInquries,
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getAdsByCategory() {
    console.log(configConstants.API_BASE_PATH + '/advertisement/getAdvertisements')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/advertisement/getAdvertisements'
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
async function myInquries() {
    // console.log(configConstants.API_BASE_PATH + '/product/productByID/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/advertisement/getAllEnquiries'
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
async function postInqury(data) {
    // console.log(configConstants.API_BASE_PATH + '/cart/additem')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/advertisement/sendEnquiries',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
