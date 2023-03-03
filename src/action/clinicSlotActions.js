import { configConstants, clinicSlotConstants } from '../constant';
import { clinicSlotService } from '../service';

/**
 * clinicSlotActions
 *
 * @package                Season
 * @subpackage             clinicSlotActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const clinicSlotActions = {
    clinicSlot,
    saveClinicSlotProfile,
    getClinicSlotList,
    getClinicSlotManage,
    getClinicSlotDate,
    getClinicSlotForAppointment,
    deleteClinicSlotProfile,
    clinicSlotStatusChange,
    slotTimeStatusChange,
    resetSlotList,
    resetSlotDate,
    resetClinicSlotState
};

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function clinicSlot(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.clinicSlot(data)
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
    function request() { return { type: clinicSlotConstants.CLINIC_SLOT_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.CLINIC_SLOT_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.CLINIC_SLOT_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function saveClinicSlotProfile(data) {
    return dispatch => {
        dispatch(request(data));
        clinicSlotService.saveClinicSlotProfile(data)
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
    function request() { return { type: clinicSlotConstants.SAVE_CLINIC_SLOT_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.SAVE_CLINIC_SLOT_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.SAVE_CLINIC_SLOT_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getClinicSlotList(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.getClinicSlotList(data)
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
    function request() { return { type: clinicSlotConstants.GET_CLINIC_SLOT_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getClinicSlotManage(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.getClinicSlotManage(data)
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
    function request() { return { type: clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getClinicSlotForAppointment(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.getClinicSlotForAppointment(data)
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
    function request() { return { type: clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getClinicSlotDate(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.getClinicSlotDate(data)
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
    function request() { return { type: clinicSlotConstants.GET_CLINIC_SLOT_DATE_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_DATE_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.GET_CLINIC_SLOT_DATE_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function deleteClinicSlotProfile(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.deleteClinicSlotProfile(data)
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
    function request() { return { type: clinicSlotConstants.DELETE_CLINIC_SLOT_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.DELETE_CLINIC_SLOT_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.DELETE_CLINIC_SLOT_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function clinicSlotStatusChange(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.clinicSlotStatusChange(data)
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
    function request() { return { type: clinicSlotConstants.STATUS_CLINIC_SLOT_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.STATUS_CLINIC_SLOT_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.STATUS_CLINIC_SLOT_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function slotTimeStatusChange(data) {
    return dispatch => {
        dispatch(request());
        clinicSlotService.slotTimeStatusChange(data)
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
    function request() { return { type: clinicSlotConstants.STATUS_CLINIC_TIME_SLOT_REQUEST } }
    function success(result) { return { type: clinicSlotConstants.STATUS_CLINIC_TIME_SLOT_SUCCESS, result } }
    function failure(error) { return { type: clinicSlotConstants.STATUS_CLINIC_TIME_SLOT_FAILURE, error } }
    function unauthorize(error) { return { type: clinicSlotConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetSlotList(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : clinicSlotConstants.SLOT_RESET_STATE }}
}


function resetSlotDate(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : clinicSlotConstants.DATE_SLOT_RESET_STATE }}
}


function resetClinicSlotState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : clinicSlotConstants.CLINIC_SLOT_RESET_STATE }}
}
