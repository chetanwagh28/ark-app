import { configConstants, healthTipsConstants } from '../constant';
import { healthTipsService } from '../service';

/**
 * healthTipsActions
 *
 * @package                Luxury Car
 * @subpackage             healthTipsActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const healthTipsActions = {
    getHealthTipsCatList,
    getHealthTipsList,
    getHealthTip,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getHealthTipsCatList(url) {
    return dispatch => {
        dispatch(request());
        healthTipsService.getHealthTipsCatList(url)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log('==>>>',data)
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
    function request() { return { type: healthTipsConstants.HEALTH_TIPS_CAT_FETCH_REQUEST } }
    function success(result) { return { type: healthTipsConstants.HEALTH_TIPS_CAT_FETCH_SUCCESS, result } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_CAT_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: healthTipsConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getHealthTipsList(url) {
    return dispatch => {
        dispatch(request());
        healthTipsService.getHealthTipsList(url)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // // console.log("data",data)
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
    function request() { return { type: healthTipsConstants.HEALTH_TIPS_FETCH_REQUEST } }
    function success(result) { return { type: healthTipsConstants.HEALTH_TIPS_FETCH_SUCCESS, result } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: healthTipsConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getHealthTip(url) {
    return dispatch => {
        dispatch(request());
        healthTipsService.getHealthTip(url)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        // console.log("data",data)
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
    function request() { return { type: healthTipsConstants.HEALTH_TIPS_DETAIL_REQUEST } }
    function success(result) { return { type: healthTipsConstants.HEALTH_TIPS_DETAIL_SUCCESS, result } }
    function failure(error) { return { type: healthTipsConstants.HEALTH_TIPS_DETAIL_FAILURE, error } }
    function unauthorize(error) { return { type: healthTipsConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}




function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : healthTipsConstants.FIRST_RESET_STATE }}
}
