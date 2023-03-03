import { configConstants, productConstants } from '../constant';
import { productService } from '../service';

/**
 * productActions
 *
 * @package                Luxury Car
 * @subpackage             productActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const productActions = {
    getCatProductList,
    getProductList,
    getProduct,
    addProduct,
    removeProduct,
    editProduct,
    myProducts,
    getOrderId,
    verifyOrder,
    myOrders,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getCatProductList() {
    return dispatch => {
        dispatch(request());
        return productService.getCatProductList()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_CAT_FETCH_REQUEST } }
    function success(result) { return { type: productConstants.PRODUCT_CAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: productConstants.PRODUCT_CAT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}
/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getProductList(id) {
    return dispatch => {
        dispatch(request(id));
        return productService.getProductList(id)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(response.status !== 200){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCTS_FETCH_REQUEST } }
    function success(result) { return { type: productConstants.PRODUCTS_FETCH_SUCCESS, result } }
    function failure(error) { return { type: productConstants.PRODUCTS_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getProduct(id) {
    return dispatch => {
        dispatch(request());
        return productService.getProduct(id)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_DETAIL_REQUEST } }
    function success(result) { return { type: productConstants.PRODUCT_DETAIL_SUCCESS, result } }
    function failure(error) { return { type: productConstants.PRODUCT_DETAIL_FAILURE, error } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function addProduct(data) {
    return dispatch => {
        dispatch(request());
        return productService.addProduct(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            return data.data
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(unauthorize(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_FETCH_REQUEST } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function removeProduct(data) {
    return dispatch => {
        dispatch(request());
        return productService.removeProduct(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            return data.data
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(unauthorize(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_FETCH_REQUEST } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function editProduct(data) {
    return dispatch => {
        dispatch(request());
        return productService.editProduct(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            return data.data
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(unauthorize(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_FETCH_REQUEST } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function myProducts() {
    return dispatch => {
        dispatch(request());
        productService.myProducts()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.MY_PRODUCT_FETCH_REQUEST } }
    function success(result) { return { type: productConstants.MY_PRODUCT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: productConstants.MY_PRODUCT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getOrderId(data) {
    return dispatch => {
        dispatch(request());
        return productService.getOrderId(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('==>>>',data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            return data
                        }else if(data.status === configConstants.ERROR_CODE || data.status === 400){
                            return data
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(unauthorize(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_FETCH_REQUEST } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function verifyOrder(data) {
    return dispatch => {
        dispatch(request());
        return productService.verifyOrder(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            return data
                        }else if(data.status === configConstants.ERROR_CODE || data.status === 400 ){
                            return data
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(unauthorize(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.PRODUCT_FETCH_REQUEST } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function myOrders() {
    return dispatch => {
        dispatch(request());
        productService.myOrders()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        // console.log('==>>>',response)
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                            errorMsg = data.message;
                            dispatch(unauthorize(errorMsg));
                        }else{
                            dispatch(failure(response));
                        }
                    }else{
                        dispatch(serverDown(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: productConstants.MY_PRODUCT_FETCH_REQUEST } }
    function success(result) { return { type: productConstants.MY_PRODUCT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: productConstants.MY_PRODUCT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: productConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : productConstants.FIRST_RESET_STATE }}
}
