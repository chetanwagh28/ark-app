import { configConstants, labConstants } from '../constant';
import { labService } from '../service';

/**
 * labActions
 *
 * @package                Luxury Car
 * @subpackage             labActions
 * @category               Actions
 * @DateOfCreation         26 Sep 2018
 * @ShortDescription       This is responsible to handle all action
 */
export const labActions = {
    getLabList,
    resetFirstState
};


/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getLabList(url) {
    return dispatch => {
        dispatch(request());
        labService.getLabList(url)
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
    function request() { return { type: labConstants.LAB_LIST_FETCH_REQUEST } }
    function success(result) { return { type: labConstants.LAB_LIST_FETCH_SUCCESS, result } }
    function failure(error) { return { type: labConstants.LAB_LIST_FETCH_FAILURE, error } }
    function unauthorize(error) { return { type: labConstants.UNAUTHENTICATE, error } }
    function serverDown(error) { return { type: configConstants.SERVER_DOWN, error } }
}


function resetFirstState(){
    return dispatch => { dispatch(request()); }
    function request() { return {type : labConstants.FIRST_RESET_STATE }}
}
