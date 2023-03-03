import { configConstants, doctorConstants } from '../constant';
import { doctorService } from '../service';

/**
 * doctorActions
 *
 * @package                Luxury Car
 * @subpackage             doctorActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2020
 * @ShortDescription       This is responsible to handle all action
 */
export const doctorActions = {
    getSpecialization,
    getDoctorsBySpecializationD,
    getDoctorsBySpecialization,
    getDoctorsDetail,
    bookDoctorAppointment,
    myDoctorAppointment,
    cancleMyDoctorAppointment,
    doctorAppointmentList,
    cancleByDoctorAppointment,
    uploadPrescription,
    getDoctorReferrals,
    getDoctorReferred,
    referToDoctor,
    completeAppointment,
    newPatientAppointment,
    getfavorite,
    addfavorite,
    removefavorite,
    appointmentReport,
    referredReport,
    getAppointmentOrderId,
    verifyAppointmentOrder,
    resetFirstState
};


/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getSpecialization(url) {
    return dispatch => {
        dispatch(request());
        doctorService.getSpecialization(url)
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
    function request() { return { type: doctorConstants.SPECIALIZATION_FETCH_REQUEST } }
    function success(result) { return { type: doctorConstants.SPECIALIZATION_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.SPECIALIZATION_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getDoctorsBySpecializationD(url) {
    return dispatch => {
        dispatch(request());
        doctorService.getDoctorsBySpecializationD(url)
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
    function request() { return { type: doctorConstants.DOCTOR_BY_SP_FETCH_REQUEST } }
    function success(result) { return { type: doctorConstants.DOCTOR_BY_SP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.DOCTOR_BY_SP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getDoctorsBySpecialization(url) {
    return dispatch => {
        dispatch(request());
        doctorService.getDoctorsBySpecialization(url)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
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
    function request() { return { type: doctorConstants.DOCTOR_BY_SP_FETCH_REQUEST } }
    function success(result) { return { type: doctorConstants.DOCTOR_BY_SP_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.DOCTOR_BY_SP_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getDoctorsDetail(url) {
    return dispatch => {
        dispatch(request());
        return doctorService.getDoctorsDetail(url)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
                            return data.data
                        }else if(data.status === configConstants.ERROR_CODE){
                            dispatch(failure(data.message));
                            return data.message
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
    function request() { return { type: doctorConstants.DOCTOR_BY_DETAIL_FETCH_REQUEST } }
    function success(result) { return { type: doctorConstants.DOCTOR_BY_DETAIL_FETCH_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.DOCTOR_BY_DETAIL_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function bookDoctorAppointment(data) {
    return dispatch => {
        dispatch(request());
        doctorService.bookDoctorAppointment(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === 201){
                            dispatch(success(data));
                        }else if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
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
    function request() { return { type: doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_REQUEST } }
    function success(result) { return { type: doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function myDoctorAppointment() {
    return dispatch => {
        dispatch(request());
        doctorService.myDoctorAppointment()
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
    function request() { return { type: doctorConstants.MY_DOCTOR_APPOINTMENT_REQUEST } }
    function success(result) { return { type: doctorConstants.MY_DOCTOR_APPOINTMENT_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.MY_DOCTOR_APPOINTMENT_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 July 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function cancleMyDoctorAppointment(url) {
    return dispatch => {
        dispatch(request());
        doctorService.cancleMyDoctorAppointment(url)
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
    function request() { return { type: doctorConstants.CANCEL_MY_DOCTOR_APPOINTMENT_REQUEST } }
    function success(result) { return { type: doctorConstants.CANCEL_MY_DOCTOR_APPOINTMENT_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.CANCEL_MY_DOCTOR_APPOINTMENT_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function doctorAppointmentList(data) {
    return dispatch => {
        dispatch(request(data));
        doctorService.doctorAppointmentList(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
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
    function request() { return { type: doctorConstants.DOCTOR_APPOINTMENT_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.DOCTOR_APPOINTMENT_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.DOCTOR_APPOINTMENT_LIST_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function cancleByDoctorAppointment(url) {
    return dispatch => {
        dispatch(request());
        doctorService.cancleByDoctorAppointment(url)
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
    function request() { return { type: doctorConstants.CANCEL_BY_DOCTOR_APPOINTMENT_REQUEST } }
    function success(result) { return { type: doctorConstants.CANCEL_BY_DOCTOR_APPOINTMENT_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.CANCEL_BY_DOCTOR_APPOINTMENT_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function uploadPrescription(data, url) {
    return dispatch => {
        dispatch(request());
        doctorService.uploadPrescription(data, url)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        //  errorMsg;
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
    function request() { return { type: doctorConstants.UPLOAD_SAVE_REQUEST } }
    function success(result) { return { type: doctorConstants.UPLOAD_SAVE_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.UPLOAD_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function completeAppointment(data) {
    return dispatch => {
        dispatch(request(data));
        doctorService.completeAppointment(data)
            .then(
                response => {
                    if(response !== "Error: Network Error"){
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
    function request() { return { type: doctorConstants.COMPLETE_APPOINTMENT_REQUEST } }
    function success(result) { return { type: doctorConstants.COMPLETE_APPOINTMENT_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.COMPLETE_APPOINTMENT_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getDoctorReferrals(data) {
    return dispatch => {
        dispatch(request());
        doctorService.getDoctorReferrals(data)
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
    function request() { return { type: doctorConstants.DOCTOR_REFERRAL_REQUEST } }
    function success(result) { return { type: doctorConstants.DOCTOR_REFERRAL_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.DOCTOR_REFERRAL_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getDoctorReferred(data) {
    return dispatch => {
        dispatch(request());
        doctorService.getDoctorReferred(data)
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
    function request() { return { type: doctorConstants.DOCTOR_REFERRED_REQUEST } }
    function success(result) { return { type: doctorConstants.DOCTOR_REFERRED_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.DOCTOR_REFERRED_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function referToDoctor(data) {
    return dispatch => {
        dispatch(request());
        doctorService.referToDoctor(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === 201){
                            dispatch(success(data));
                        }else if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
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
    function request() { return { type: doctorConstants.REFERTO_DOCTOR_REQUEST } }
    function success(result) { return { type: doctorConstants.REFERTO_DOCTOR_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.REFERTO_DOCTOR_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Aug 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function newPatientAppointment(data) {
    return dispatch => {
        dispatch(request());
        doctorService.newPatientAppointment(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === 201){
                            dispatch(success(data));
                        }else if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data));
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
    function request() { return { type: doctorConstants.NEW_PATIENT_BY_DOC_REQUEST } }
    function success(result) { return { type: doctorConstants.NEW_PATIENT_BY_DOC_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.NEW_PATIENT_BY_DOC_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getfavorite() {
    return dispatch => {
        dispatch(request());
        return doctorService.getfavorite()
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
    function request() { return { type: doctorConstants.FAVORITE_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.FAVORITE_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.FAVORITE_LIST_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function addfavorite(data) {
    return dispatch => {
        dispatch(request());
        return doctorService.addfavorite(data)
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
    function request() { return { type: doctorConstants.FAVORITE_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.FAVORITE_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.FAVORITE_LIST_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function removefavorite(data) {
    return dispatch => {
        dispatch(request());
        return doctorService.removefavorite(data)
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
    function request() { return { type: doctorConstants.FAVORITE_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.FAVORITE_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.FAVORITE_LIST_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function appointmentReport() {
    return dispatch => {
        dispatch(request());
        return doctorService.appointmentReport()
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
    function request() { return { type: doctorConstants.FAVORITE_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.FAVORITE_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.FAVORITE_LIST_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function referredReport() {
    return dispatch => {
        dispatch(request());
        return doctorService.referredReport()
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
    function request() { return { type: doctorConstants.FAVORITE_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.FAVORITE_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.FAVORITE_LIST_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}



/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getAppointmentOrderId(data) {
    return dispatch => {
        dispatch(request());
        return doctorService.getAppointmentOrderId(data)
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
    function request() { return { type: doctorConstants.FAVORITE_LIST_REQUEST } }
    function success(result) { return { type: doctorConstants.FAVORITE_LIST_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.FAVORITE_LIST_FAILURE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function verifyAppointmentOrder(data) {
    return dispatch => {
        dispatch(request());
        return doctorService.verifyAppointmentOrder(data)
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
    function request() { return { type: doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_REQUEST } }
    function success(result) { return { type: doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_SUCCESS, result } }
    function failure(error) { return { type: doctorConstants.BOOK_APPOINTMENT_DOCTOR_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: doctorConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : doctorConstants.FIRST_RESET_STATE }}
}
