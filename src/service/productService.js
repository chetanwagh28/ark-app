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
export const productService = {
    getCatProductList,
    getProductList,
    getProduct,
    addProduct,
    removeProduct,
    editProduct,
    myProducts,
    getOrderId,
    verifyOrder,
    myOrders
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getCatProductList() {
    // // console.log(configConstants.API_BASE_PATH + '/product/allproducts')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/product/productCategories'
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
async function getProductList(id) {
    console.log(configConstants.API_BASE_PATH + '/product/productByCategoryID/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/product/productByCategoryID/'+id
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
async function getProduct(id) {
    // console.log(configConstants.API_BASE_PATH + '/product/productByID/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/product/productByID/'+id
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
async function addProduct(data) {
    // console.log(configConstants.API_BASE_PATH + '/cart/additem')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/cart/additem',
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
async function removeProduct(data) {
    // console.log(configConstants.API_BASE_PATH + '/cart/removeitem')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/cart/removeitem',
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
async function editProduct(data) {
    // console.log(configConstants.API_BASE_PATH + '/cart/edititem')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/cart/edititem',
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
async function myProducts() {
    let user_id = '';
    let userDetail = null;
    try {
        userDetail = await AsyncStorage.getItem('userDetail');
        // // console.log(jwtdecode(userDetail))
        user_id = JSON.parse(userDetail).user_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + '/cart/mycartnew/'+user_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/cart/mycartnew/'+user_id
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
async function getOrderId(data) {
    // console.log(configConstants.API_BASE_PATH + '/cart/payment/order')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/cart/payment/order',
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
async function verifyOrder(data) {
    // console.log(configConstants.API_BASE_PATH + '/cart/payment/verify')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/cart/payment/verify',
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
async function myOrders() {
    let user_id = '';
    let userDetail = null;
    try {
        userDetail = await AsyncStorage.getItem('userDetail');
        // // console.log(jwtdecode(userDetail))
        user_id = JSON.parse(userDetail).user_id
    } catch(e) {
        // console.log(e);
    }
    // http://localhost:3100/product/myOrders/13751087
    // console.log(configConstants.API_BASE_PATH + '/product/myOrders/'+user_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/product/myOrders/'+user_id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
