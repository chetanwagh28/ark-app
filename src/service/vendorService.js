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
export const vendorService = {
    getVendorCatList,
    getVendorList,
    offerDetail,
    offerCode,
    getMyOfferCode
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getVendorCatList(url) {
    // // console.log(configConstants.API_BASE_PATH + '/auth/healthtipscategory')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/bestdeal/getCategories'
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
async function getVendorList(cat_id) {
    // console.log(configConstants.API_BASE_PATH + '/vendor/getVendorListByCategory/' + cat_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/vendor/getVendorListByCategory/' + cat_id
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
async function offerDetail(cat_id) {
    // console.log(configConstants.API_BASE_PATH + '/vendor/getOfferDetails')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/vendor/getOfferDetails',
        data : { "offer_id": cat_id}
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
async function offerCode(data) {
    console.log("data", data)
    // console.log(configConstants.API_BASE_PATH + '/vendor/getOfferDetails')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/vendor/generateCouponCode',
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
async function getMyOfferCode() {
    // console.log(configConstants.API_BASE_PATH + '/vendor/getMyOffers')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/vendor/getMyOffers'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
