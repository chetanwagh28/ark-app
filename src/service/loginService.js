import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
/**
 * login
 *
 * @subpackage             login
 * @category               Service
 * @DateOfCreation         08 Jan 2019
 * @ShortDescription       This is responsible for calling API
 */
export const loginService = {
    login,
    registrationV,
    registration,
    doctorRegistration,
    medicalRegistration,
    forgotPassword,
    ResetPassword,
    ChangePassword,
    sendOTP,
    verifyOTP,
    registrationByOTP
};

async function getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      return fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        return fcmToken
      }else{
        getToken();
      }
    }else{
        return fcmToken
    }
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function login(data) {
    let fcmToken = await getToken();
    data.device_id = fcmToken
    // console.log('-----',configConstants.API_BASE_PATH +  '/auth/login')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/login'
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function registrationV(data) {
    let fcmToken = await getToken();
    data.device_id = fcmToken
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/patient-signup-validation'
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function registration(data) {
    let fcmToken = await getToken();
    // // console.log('registration',fcmToken)
    data.device_id = fcmToken
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/patient-signup'
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function doctorRegistration(data) {
    let fcmToken = await getToken();
    data.device_id = fcmToken
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/doctor-signup'
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function medicalRegistration(data) {
    let fcmToken = await getToken();
    data.device_id = fcmToken
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/medical-signup'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function forgotPassword(data) {
    // console.log(configConstants.API_BASE_PATH +  '/auth/forget-password')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/forget-password'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function ResetPassword(data) {
    // console.log(configConstants.API_BASE_PATH +  '/auth/set-new-password')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/set-new-password'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function ChangePassword(data) {
    // console.log(configConstants.API_BASE_PATH +  '/profile/changepassword')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/profile/changepassword'
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function sendOTP(data) {
    // let fcmToken = await getToken();
    // data.device_id = fcmToken
    // console.log('-----',configConstants.API_BASE_PATH +  '/auth/login')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/v1/auth/send-otp',
        data  : {contact_no: data},
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function verifyOTP(data) {
    let fcmToken = await getToken();
    data.device_id = fcmToken
    // console.log('-----',configConstants.API_BASE_PATH +  '/auth/login')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/v1/auth/verifie-otp'
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
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function registrationByOTP(data) {
    let fcmToken = await getToken();
    data.device_id = fcmToken
    // console.log('-----',configConstants.API_BASE_PATH +  '/auth/login')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/v1/auth/registration'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
