import { configConstants, informationConstants } from '../constant';
import { informationService } from '../service';
import { utilityHelper } from '../helper';
import axios from 'axios'; 


export const informationActions = {
    information,
    getAddressList
};


function information(data) {
    // // console.log("Antrarastye",data);
    return dispatch => {
        dispatch(request());
        informationService.information(data)
            .then(
                response => { 
                    if(response != "Error: Network Error"){
                        var data = response.data;
                        var errorMsg;
                        // // console.log("Ram",data);
                        if(data.status === configConstants.SUCCESS_CODE){
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


    function request() { 
        return { type:  informationConstants.INFORMATION_REQUEST } 
    }
    function success(result) { 
        return { type:  informationConstants.INFORMATION_SUCCESS, result } 
    }
    function failure(error) { 
        return { type:  informationConstants.INFORMATION_FAILURE, error } 
    }
    function serverDown(error) { 
        return { type: configConstants.SERVER_DOWN, error } 
    }
}

/**
* @DateOfCreation        06 Mar 2020
* @ShortDescription      This function is responsible for Get Fixtures List
* @param                 JSON user, This contains full route input data
* @return                JSON Object
*/
function getAddressList() {
    return dispatch => {
        dispatch(request());
        informationService.getAddressList()
            .then(
                response => {
                    if(response !== "Error: Network Error"){
                        var data = response.data;
                        // // console.log("getAddressList",data)
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
    function request() { 
        return { type:  informationConstants.INFORMATION_REQUEST } 
    }
    function success(result) { 
        return { type:  informationConstants.INFORMATION_SUCCESS, result } 
    }
    function failure(error) { 
        return { type:  informationConstants.INFORMATION_FAILURE, error } 
    }
    function serverDown(error) { 
        return { type: configConstants.SERVER_DOWN, error } 
    }
}
