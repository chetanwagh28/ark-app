import axios from 'axios'; 
import { configConstants } from '../../constant';


/**
 * chat
 *
 * @subpackage             chat
 * @category               Service
 * @DateOfCreation         06 Dec 2018
 * @ShortDescription       This is responsible for calling API
 */
export const chatService = {
    requestForChat,
    getAllMessage,
    insertChat,
    insertFile
};



/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call chat api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function requestForChat(data, token) {
   
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/sockets/getmessage',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call chat api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function getAllMessage(data) {
    
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/sockets/getmessage',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call chat api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function insertChat(data, token) {
    
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/common/insertchat',
        data    : data,
        headers : { 
            'Authorization' : 'Bearer '+token
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call chat api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function insertFile(data, token) {
    
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/common/insertchatimage',
        data    : data,
        headers : { 
            'Authorization' : 'Bearer '+token
        }
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}