import { chatConstants } from './chatConstants';
import { configConstants } from '../../constant';
import { chatService } from './chatService';

/**
 * chatActions
 *
 * @package                247
 * @subpackage             chatActions
 * @category               Actions
 * @DateOfCreation         08 Jan 2019
 * @ShortDescription       This is responsible to handle all action
 */
export const chatActions = {
    requestForChat,
    insertChat,
    insertFile,
    getAllMessage,
    resetMapState
};


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function requestForChat(data, token) {
    return dispatch => {
        dispatch(request(data, token));
        chatService.requestForChat(data, token)
            .then(
                response => {
                    var data = response.data;
                    
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.status == configConstants.ERROR_CODE){
                        dispatch(failure(data.error));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHAT_FIND_REQUEST } }
    function success(result) { return { type: chatConstants.CHAT_FIND_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHAT_FIND_FAILURE, error } }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function insertChat(data, token) {
    return dispatch => {
        dispatch(request(data, token));
        chatService.insertChat(data, token)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.status == configConstants.ERROR_CODE){
                        dispatch(failure(data.error));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHAT_FETCH_REQUEST } }
    function success(result) { return { type: chatConstants.CHAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHAT_FETCH_FAILURE, error } }
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getAllMessage(data, token) {
    return dispatch => {
        dispatch(request(data, token));
        chatService.getAllMessage(data, token)
            .then(
                response => {
                    var data = response.data;
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.data));
                    }else if(data.status == configConstants.ERROR_CODE){
                        dispatch(failure(data.error));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHAT_SAVE_REQUEST } }
    function success(result) { return { type: chatConstants.CHAT_SAVE_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHAT_SAVE_FAILURE, error } }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible for Login
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function insertFile(data, token) {
    return dispatch => {
        dispatch(request(data, token));
        chatService.insertFile(data, token)
            .then(
                response => {
                    var data = response.data;
                    // // console.log('action----',data)
                    var errorMsg;
                    if(data.status == configConstants.SUCCESS_CODE){
                        dispatch(success(data.result));
                    }else if(data.status == configConstants.ERROR_CODE){
                        dispatch(failure(data.error));
                    }else if(data.status == configConstants.EXCEPTION_CODE){
                        errorMsg = data.message;
                        dispatch(failure(errorMsg));
                    }else if(data.status == configConstants.UNAUTHENTICATE_CODE){
                        errorMsg = data.message;
                        dispatch(unauthorize(errorMsg));
                    }else{
                        dispatch(failure(response));
                    }
                }
            ).catch(function (response) {
                dispatch(failure(response));
            });
    };

// Actions defination that will perform according dispatch call and send data to reducer
    function request() { return { type: chatConstants.CHAT_FETCH_REQUEST } }
    function success(result) { return { type: chatConstants.CHAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: chatConstants.CHAT_FETCH_FAILURE, error } }
}



function resetMapState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : chatConstants.CHAT_RESET_STATE }}
}
