import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'


/**
 * patient
 *
 * @subpackage             patient
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const patientService = {
    getPatientHistory,
    getPrescription,
    getMyPatientsList,
    getReferralsDoctorList,
    getHealthProblem,
    getRecentDoctor
};


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getPatientHistory(patient_id) {
    // console.log(configConstants.API_BASE_PATH +  '/patient/patienthistory/'+ patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/patienthistory/'+patient_id,
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
async function getPrescription(data) {
    let userToken;
    let patient_id = '';
    userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        patient_id = jwtdecode(userToken).patient_id
    } catch(e) {
        // console.log(e);
    }

    // console.log(configConstants.API_BASE_PATH +  '/patient/getprescription/'+ patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/getprescription/'+ patient_id,
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
async function getMyPatientsList() {
    let doc_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        doc_id = jwtdecode(userToken).doc_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + '/doctor/patientlist/'+ doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/patientlist/'+ doc_id,
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
async function getReferralsDoctorList() {
    let patient_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        patient_id = jwtdecode(userToken).patient_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + '/patient/referrals/'+ patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/referrals/'+ patient_id,
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
async function getHealthProblem() {
    // console.log(configConstants.API_BASE_PATH + '/auth/healthproblem')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/auth/healthproblem',
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
async function getRecentDoctor() {
    let patient_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        patient_id = jwtdecode(userToken).patient_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + '/patient/getRecentConnectedDoctors/'+patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/getRecentConnectedDoctors/'+patient_id,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
