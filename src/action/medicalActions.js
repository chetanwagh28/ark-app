import { configConstants, medicalConstants } from '../constant';
import { medicalService } from '../service';

/**
 * medicalActions
 *
 * @package                Luxury Car
 * @subpackage             medicalActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const medicalActions = {
    getMedicalList,
    upcomingPrescriptionList,
    getSharePrescriptionList,
    getPatientOrderList,
    bookMedicine,
    myBookedMedicineList,
    OrderStatusChange,
    OrderStatus,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getMedicalList(url) {
    return dispatch => {
        dispatch(request());
        return medicalService.getMedicalList(url)
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
    function request() { return { type: medicalConstants.MEDICAL_STORE_FETCH_REQUEST } }
    function success(result) { return { type: medicalConstants.MEDICAL_STORE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.MEDICAL_STORE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function upcomingPrescriptionList() {
    return dispatch => {
        dispatch(request());
        medicalService.upcomingPrescriptionList()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // console.log("data", data)
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
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
    function request() { return { type: medicalConstants.MEDICAL_STORE_UPCOMING_FETCH_REQUEST } }
    function success(result) { return { type: medicalConstants.MEDICAL_STORE_UPCOMING_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.MEDICAL_STORE_UPCOMING_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}
/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getSharePrescriptionList() {
    return dispatch => {
        dispatch(request());
        medicalService.getSharePrescriptionList()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
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
    function request() { return { type: medicalConstants.MEDICAL_STORE_DETAIL_FETCH_REQUEST } }
    function success(result) { return { type: medicalConstants.MEDICAL_STORE_DETAIL_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.MEDICAL_STORE_DETAIL_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}
/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getPatientOrderList() {
    return dispatch => {
        dispatch(request());
        medicalService.getPatientOrderList()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
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
    function request() { return { type: medicalConstants.PATIENT_MEDICAL_ORDER_FETCH_REQUEST } }
    function success(result) { return { type: medicalConstants.PATIENT_MEDICAL_ORDER_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.PATIENT_MEDICAL_ORDER_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function bookMedicine(data) {
    return dispatch => {
        dispatch(request());
        return medicalService.bookMedicine(data)
            .then(
                response => {
                    // // console.log("medicalService",response)
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                            return data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data
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
    function request() { return { type: medicalConstants.BOOK_MEDICINE_FETCH_REQUEST } }
    function success(result) { return { type: medicalConstants.BOOK_MEDICINE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.BOOK_MEDICINE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function myBookedMedicineList(url) {
    return dispatch => {
        dispatch(request());
        medicalService.myBookedMedicineList(url)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
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
    function request() { return { type: medicalConstants.MY_BOOK_MEDICINE_FETCH_REQUEST } }
    function success(result) { return { type: medicalConstants.MY_BOOK_MEDICINE_FETCH_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.MY_BOOK_MEDICINE_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function OrderStatusChange(data, status) {
    return dispatch => {
        dispatch(request());
        return medicalService.OrderStatusChange(data, status)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                            return data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data
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
    function request() { return { type: medicalConstants.ORDER_STATUS_REQUEST } }
    function success(result) { return { type: medicalConstants.ORDER_STATUS_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.ORDER_STATUS_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function OrderStatus(param) {
    return dispatch => {
        dispatch(request());
        return medicalService.OrderStatus(param)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                            return data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data
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
    function request() { return { type: medicalConstants.ORDER_STATUS_REQUEST } }
    function success(result) { return { type: medicalConstants.ORDER_STATUS_SUCCESS, result } }
    function failure(error) { return { type: medicalConstants.ORDER_STATUS_FAILURE, error } }
    function unauthorize(error) { return { type: medicalConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : medicalConstants.FIRST_RESET_STATE }}
}
