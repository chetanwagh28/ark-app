import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * fixture
 *
 * @subpackage             fixture
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const labService = {
    getLabList,
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getLabList(url) {
    // console.log(axios.defaults.headers.common['Authorization'])
    // console.log(configConstants.API_BASE_PATH + url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + url
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
