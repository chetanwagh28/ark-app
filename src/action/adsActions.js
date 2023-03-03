import { configConstants, adsConstants } from '../constant';
import { adsService } from '../service';

/**
 * adsActions
 *
 * @package                Luxury Car
 * @subpackage             adsActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const adsActions = {
    getAdsByCategory,
    postInqury,
    myInquries,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getAdsByCategory() {
    return dispatch => {
        dispatch(request());
        adsService.getAdsByCategory()
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
    function request() { return { type: adsConstants.ADS_FETCH_REQUEST } }
    function success(result) { return { type: adsConstants.ADS_FETCH_SUCCESS, result } }
    function failure(error) { return { type: adsConstants.ADS_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: adsConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function myInquries() {
    return dispatch => {
        dispatch(request());
        adsService.myInquries()
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
    function request() { return { type: adsConstants.MY_ADS_INQUIRY_FETCH_REQUEST } }
    function success(result) { return { type: adsConstants.MY_ADS_INQUIRY_FETCH_SUCCESS, result } }
    function failure(error) { return { type: adsConstants.MY_ADS_INQUIRY_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: adsConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function postInqury(data) {
    return dispatch => {
        dispatch(request());
        return adsService.postInqury(data)
            .then(
                response => {
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        if(data.status === configConstants.SUCCESS_CODE){
                            dispatch(success(data.data));
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
    function request() { return { type: adsConstants.POST_ADS_INQUIRY_REQUEST } }
    function success(result) { return { type: adsConstants.POST_ADS_INQUIRY_SUCCESS, result } }
    function failure(error) { return { type: adsConstants.POST_ADS_INQUIRY_FAILURE, error } }
    function unauthorize(error) { return { type: adsConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}




function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : adsConstants.FIRST_RESET_STATE }}
}
