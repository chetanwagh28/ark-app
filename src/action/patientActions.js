import { configConstants, patientConstants } from '../constant';
import { patientService } from '../service';

/**
 * PatientActions
 *
 * @package                Luxury Car
 * @subpackage             PatientActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const patientActions = {
    getPatientHistory,
    getPrescription,
    getMyPatientsList,
    getReferralsDoctorList,
    getHealthProblem,
    getRecentDoctor,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Patients List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getPatientHistory(data) {
    return dispatch => {
        dispatch(request(data));
        patientService.getPatientHistory(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
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
    function request() { return { type: patientConstants.PATIENT_HISTORY_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.PATIENT_HISTORY_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.PATIENT_HISTORY_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: patientConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Patients List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getPrescription() {
    return dispatch => {
        dispatch(request());
        patientService.getPrescription()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('getPrescription===', data)
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
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
    function request() { return { type: patientConstants.PRESCRIPTION_LIST_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.PRESCRIPTION_LIST_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.PRESCRIPTION_LIST_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: patientConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Patients List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getReferralsDoctorList() {
    return dispatch => {
        dispatch(request());
        patientService.getReferralsDoctorList()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
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
    function request() { return { type: patientConstants.REFERRAL_DOCTOR_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.REFERRAL_DOCTOR_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.REFERRAL_DOCTOR_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: patientConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Patients List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getMyPatientsList() {
    return dispatch => {
        dispatch(request());
        patientService.getMyPatientsList()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("getMyPatientsList",data)
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
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
    function request() { return { type: patientConstants.GET_MY_PATIENT_LIST_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.GET_MY_PATIENT_LIST_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.GET_MY_PATIENT_LIST_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: patientConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Patients List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getHealthProblem() {
    return dispatch => {
        dispatch(request());
        patientService.getHealthProblem()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("getMyPatientsList",data)
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
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
    function request() { return { type: patientConstants.HEALTH_PROBLEM_FETCH_REQUEST } }
    function success(result) { return { type: patientConstants.HEALTH_PROBLEM_FETCH_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.HEALTH_PROBLEM_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: patientConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Patients List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getRecentDoctor() {
    return dispatch => {
        dispatch(request());
        patientService.getRecentDoctor()
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("getMyPatientsList",data)
                        var errorMsg;
                        if(data.status == configConstants.SUCCESS_CODE){
                            dispatch(success(data));
                        }else if(data.status == configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
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
    function request() { return { type: patientConstants.GET_RECENT_DOCTOR_REQUEST } }
    function success(result) { return { type: patientConstants.GET_RECENT_DOCTOR_SUCCESS, result } }
    function failure(error) { return { type: patientConstants.GET_RECENT_DOCTOR_FAILURE, error } }
    function unauthorize(error) { return { type: patientConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}




function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : patientConstants.FIRST_RESET_STATE }}
}
