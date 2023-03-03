import { configConstants, planConstants } from '../constant';
import { planService } from '../service';

/**
 * planActions
 *
 * @package                Luxury Car
 * @subpackage             planActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const planActions = {
    getPlanList,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getPlanList(id) {
    return dispatch => {
        dispatch(request(id));
        planService.getPlanList(id)
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
    function request() { return { type: planConstants.PLAN_LIST_FETCH_REQUEST } }
    function success(result) { return { type: planConstants.PLAN_LIST_FETCH_SUCCESS, result } }
    function failure(error) { return { type: planConstants.PLAN_LIST_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: planConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function savePlan(url) {
    return dispatch => {
        dispatch(request());
        planService.savePlan(url)
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
    function request() { return { type: planConstants.PLAN_SAVE_REQUEST } }
    function success(result) { return { type: planConstants.PLAN_SAVE_SUCCESS, result } }
    function failure(error) { return { type: planConstants.PLAN_SAVE_FAILURE, error } }
    function unauthorize(error) { return { type: planConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : planConstants.FIRST_RESET_STATE }}
}
