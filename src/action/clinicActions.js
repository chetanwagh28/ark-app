
import { configConstants, clinicConstants } from '../constant';
import { clinicService } from '../service';

/**
 * clinicActions
 *
 * @package                Season
 * @subpackage             clinicActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const clinicActions = {
    getClinicList,
    addClinicProfile,
    updateClinicProfile,
    deleteClinicProfile,
    clinicStatusChange,
    resetClinicState
};

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getClinicList(id) {
    return dispatch => {
        dispatch(request());
        clinicService.getClinicList(id)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: clinicConstants.CLINIC_REQUEST } }
    function success(result) { return { type: clinicConstants.CLINIC_SUCCESS, result } }
    function failure(error) { return { type: clinicConstants.CLINIC_FAILURE, error } }
    function unauthorize(error) { return { type: clinicConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function addClinicProfile(data) {
    return dispatch => {
        dispatch(request());
        clinicService.addClinicProfile(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: clinicConstants.ADD_CLINIC_REQUEST } }
    function success(result) { return { type: clinicConstants.ADD_CLINIC_SUCCESS, result } }
    function failure(error) { return { type: clinicConstants.ADD_CLINIC_FAILURE, error } }
    function unauthorize(error) { return { type: clinicConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function updateClinicProfile(data) {
    return dispatch => {
        dispatch(request());
        clinicService.updateClinicProfile(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: clinicConstants.UPDATE_CLINIC_REQUEST } }
    function success(result) { return { type: clinicConstants.UPDATE_CLINIC_SUCCESS, result } }
    function failure(error) { return { type: clinicConstants.UPDATE_CLINIC_FAILURE, error } }
    function unauthorize(error) { return { type: clinicConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function deleteClinicProfile(data) {
    return dispatch => {
        dispatch(request());
        clinicService.deleteClinicProfile(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        //  errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: clinicConstants.DELETE_CLINIC_REQUEST } }
    function success(result) { return { type: clinicConstants.DELETE_CLINIC_SUCCESS, result } }
    function failure(error) { return { type: clinicConstants.DELETE_CLINIC_FAILURE, error } }
    function unauthorize(error) { return { type: clinicConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function clinicStatusChange(data) {
    return dispatch => {
        dispatch(request());
        clinicService.clinicStatusChange(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                        }else if(data.status === configConstants.EXCEPTION_CODE){
                            errorMsg = data.message;
                            dispatch(failure(errorMsg));
                        }else if(data.status === configConstants.UNAUTHENTICATE_CODE){
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
    function request() { return { type: clinicConstants.STATUS_CLINIC_REQUEST } }
    function success(result) { return { type: clinicConstants.STATUS_CLINIC_SUCCESS, result } }
    function failure(error) { return { type: clinicConstants.STATUS_CLINIC_FAILURE, error } }
    function unauthorize(error) { return { type: clinicConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetClinicState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : clinicConstants.CLINIC_RESET_STATE }}
}
