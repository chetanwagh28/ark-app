import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'

/**
 * fixture
 *
 * @subpackage             fixture
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const medicalService = {
    getMedicalList,
    getSharePrescriptionList,
    upcomingPrescriptionList,
    bookMedicine,
    myBookedMedicineList,
    OrderStatusChange,
    OrderStatus,
    getPatientOrderList
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getMedicalList(data) {
    // console.log(configConstants.API_BASE_PATH + '/medical')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/medical',
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
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getSharePrescriptionList() {
    let userToken;
    let storeid = '';
    userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        storeid = jwtdecode(userToken).storeid
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + "/prescription/prescriptionbymedical/"+storeid)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + "/prescription/prescriptionbymedical/"+storeid
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function upcomingPrescriptionList() {
    let userToken;
    let storeid = '';
    userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        storeid = jwtdecode(userToken).storeid
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + "/prescription/newprescriptionbymedical/"+storeid)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + "/prescription/newprescriptionbymedical/"+storeid
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function bookMedicine(data) {
    // console.log(configConstants.API_BASE_PATH + "/prescription/shareprescription")
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + "/prescription/shareprescription",
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
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function myBookedMedicineList(url) {
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


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function OrderStatusChange(id, status) {
    let param = {is_accept: status}
    // console.log(configConstants.API_BASE_PATH + "/prescription/accept/"+id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + "/prescription/accept/"+id,
        data    : param
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function OrderStatus(param) {
    // console.log(configConstants.API_BASE_PATH + "/admin/changeMedicineOrderStatus")
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + "/admin/changeMedicineOrderStatus",
        data    : param
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getPatientOrderList() {
    let userToken;
    let patient_id = '';
    userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        patient_id = jwtdecode(userToken).patient_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + '/prescription/mysharedprescription/'+patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/prescription/mysharedprescription/'+patient_id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
