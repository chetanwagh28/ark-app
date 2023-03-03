import { configConstants, loginConstants } from '../constant';
import { loginService } from '../service';
import { utilityHelper } from '../helper';
import axios from 'axios'; 


/**
 * loginActions
 *
 * @package                247
 * @subpackage             loginActions
 * @category               Actions
 * @DateOfCreation         08 Jan 2019
 * @ShortDescription       This is responsible to handle all action
 */
export const loginActions = {
    login,
    registrationV,
    registration,
    doctorRegistration,
    medicalRegistration,
    forgotPassword,
    ResetPassword,
    ChangePassword,
    sendOTP,
    verifyOTP,
    registrationByOTP,
    resetLoginState
};


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function login(data) {
    return dispatch => {
        dispatch(request());
        loginService.login(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            // var user = data.result;
                            // let userId = data.result.id;
                            axios.defaults.headers.common['Authorization'] = data.token;
                            axios.defaults.headers.common['X-XSS-Protection'] = '1; mode=block'; 
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
                // console.log("response-->>",response)
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: loginConstants.LOGIN_REQUEST } }
    function success(result) { return { type: loginConstants.LOGIN_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function registrationV(data) {
    return dispatch => {
        dispatch(request());
        loginService.registrationV(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("signup",data)
                        var errorMsg;
                        if(data.status == 200){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.REGISTRATION_V_REQUEST } }
    function success(result) { return { type: loginConstants.REGISTRATION_V_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.REGISTRATION_V_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function registration(data) {
    return dispatch => {
        dispatch(request());
        loginService.registration(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("signup==>>",data)
                        var errorMsg;
                        if(data.status == 200){
                            axios.defaults.headers.common['Authorization'] = data.token;
                            axios.defaults.headers.common['X-XSS-Protection'] = '1; mode=block'; 
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.REGISTRATION_REQUEST } }
    function success(result) { return { type: loginConstants.REGISTRATION_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.REGISTRATION_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function doctorRegistration(data) {
    return dispatch => {
        dispatch(request());
        loginService.doctorRegistration(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("data",data)
                        var errorMsg;
                        if(data.status == 201){
                            dispatch(success(data));
                        }else if(data.status == 200){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.REGISTRATION_D_REQUEST } }
    function success(result) { return { type: loginConstants.REGISTRATION_D_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.REGISTRATION_D_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function medicalRegistration(data) {
    return dispatch => {
        dispatch(request());
        loginService.medicalRegistration(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("data",data)
                        var errorMsg;
                        if(data.status == 201){
                            dispatch(success(data));
                        }else if(data.status == 200){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.REGISTRATION_D_REQUEST } }
    function success(result) { return { type: loginConstants.REGISTRATION_D_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.REGISTRATION_D_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function forgotPassword(data) {
    return dispatch => {
        dispatch(request());
        return loginService.forgotPassword(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("forgotPassword",data)
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                            return data;
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data));
                            return data;
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.FORGOT_PASSWORD_REQUEST } }
    function success(result) { return { type: loginConstants.FORGOT_PASSWORD_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.FORGOT_PASSWORD_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function ResetPassword(data) {
    return dispatch => {
        dispatch(request());
        return loginService.ResetPassword(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                            return data
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.RESET_PASSWORD_REQUEST } }
    function success(result) { return { type: loginConstants.RESET_PASSWORD_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.RESET_PASSWORD_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function ChangePassword(data) {
    return dispatch => {
        dispatch(request());
        return loginService.ChangePassword(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                            return data
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.RESET_PASSWORD_REQUEST } }
    function success(result) { return { type: loginConstants.RESET_PASSWORD_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.RESET_PASSWORD_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}




/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function sendOTP(data) {
    return dispatch => {
        dispatch(request());
        return loginService.sendOTP(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        return data
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.LOGIN_REQUEST } }
    function success(result) { return { type: loginConstants.LOGIN_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}



/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function verifyOTP(data) {
    return dispatch => {
        dispatch(request());
        loginService.verifyOTP(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            // var user = data.result;
                            // let userId = data.result.id;
                            axios.defaults.headers.common['Authorization'] = data.token;
                            axios.defaults.headers.common['X-XSS-Protection'] = '1; mode=block'; 
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
                // console.log("response-->>",response)
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: loginConstants.LOGIN_REQUEST } }
    function success(result) { return { type: loginConstants.LOGIN_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function registrationByOTP(data) {
    return dispatch => {
        dispatch(request());
        loginService.registrationByOTP(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("signup==>>",data)
                        var errorMsg;
                        if(data.status == 200){
                            axios.defaults.headers.common['Authorization'] = data.token;
                            axios.defaults.headers.common['X-XSS-Protection'] = '1; mode=block'; 
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status == configConstants.EXCEPTION_CODE){
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
    function request() { return { type: loginConstants.REGISTRATION_REQUEST } }
    function success(result) { return { type: loginConstants.REGISTRATION_SUCCESS, result } }
    function failure(error) { return { type: loginConstants.REGISTRATION_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

function resetLoginState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : loginConstants.LOGIN_UPDATE_STATE }}
}
