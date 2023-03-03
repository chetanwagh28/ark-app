import axios from 'axios'; 
import { configConstants } from '../constant';

/**
 * fixture
 *
 * @subpackage             fixture
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const healthTipsService = {
    getHealthTipsCatList,
    getHealthTipsList,
    getHealthTip
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getHealthTipsCatList(url) {
    // // console.log(configConstants.API_BASE_PATH + '/auth/healthtipscategory')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/auth/healthtipscategory'
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
async function getHealthTipsList(url) {
    console.log(configConstants.API_BASE_PATH + '/auth/healthtipslist/' + url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/auth/healthtipslist/' + url
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
async function getHealthTip(url) {
    // console.log(configConstants.API_BASE_PATH + '/admin/healthTipDetails/' + url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/admin/healthTipDetails/' + url
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
