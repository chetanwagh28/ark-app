import axios from 'axios'; 
import { configConstants } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode'

/**
 * doctor
 *
 * @subpackage             doctor
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const doctorService = {
    getSpecialization,
    getDoctorsBySpecialization,
    getDoctorsBySpecializationD,
    getDoctorsDetail,
    bookDoctorAppointment,
    myDoctorAppointment,
    cancleMyDoctorAppointment,
    doctorAppointmentList,
    cancleByDoctorAppointment,
    uploadPrescription,
    completeAppointment,
    getDoctorReferrals,
    getDoctorReferred,
    referToDoctor,
    newPatientAppointment,
    getfavorite,
    addfavorite,
    removefavorite,
    appointmentReport,
    referredReport,
    getAppointmentOrderId,
    verifyAppointmentOrder,
};



/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getSpecialization(url) {
    // console.log(axios.defaults.headers.common['Authorization'])
    // console.log(configConstants.API_BASE_PATH +  '/auth/categories')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/auth/categories',
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
async function getDoctorsBySpecializationD(url) {
    // // console.log(axios.defaults.headers.common['Authorization'])
    // // console.log(configConstants.API_BASE_PATH +  url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  url
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
async function getDoctorsBySpecialization(data) {
    // console.log(axios.defaults.headers.common['Authorization'])
    // console.log(configConstants.API_BASE_PATH +  '/doctor/common-search')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/common-search',
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
async function getDoctorsDetail(url) {
    // console.log(configConstants.API_BASE_PATH +  '/doctor/' + url)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/' + url
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
async function bookDoctorAppointment(data) {
    // // console.log(configConstants.API_BASE_PATH +  '/patient/bookAppointment')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/patient/bookAppointment',
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
async function myDoctorAppointment() {
    let userToken;
    let patient_id = '';
    userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        patient_id = jwtdecode(userToken).patient_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH +  '/patient/appointments/' + patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/patient/appointments/' + patient_id
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
async function cancleMyDoctorAppointment(data) {
    // // console.log(configConstants.API_BASE_PATH +  '/patient/appointments/',data)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/patient/appointments/'+data,
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
async function doctorAppointmentList(data) {
    // // console.log('app',data)
    let doc_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        doc_id = jwtdecode(userToken).doc_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH +  '/doctor/appointmentlist/' + doc_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/appointmentlist/' + doc_id,
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
async function cancleByDoctorAppointment(data) {
    // console.log(configConstants.API_BASE_PATH +  '/doctor/cancelappointments')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/cancelappointments',
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
async function uploadPrescription(data, url) {
    // // console.log(axios.defaults.headers.common['Authorization']).  
    // console.log(configConstants.API_BASE_PATH + url)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + url,
        data    : data,
        
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
async function getDoctorReferrals(data) {
    let doc_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        doc_id = jwtdecode(userToken).doc_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH +  '/doctor/getrefferedtome/' + doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/getrefferedtome/' + doc_id,
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
async function getDoctorReferred(data) {
    let doc_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        doc_id = jwtdecode(userToken).doc_id
    } catch(e) {
        // console.log(e);
    }

    // console.log(configConstants.API_BASE_PATH +  '/doctor/getrefferedbyme/' + doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/getrefferedbyme/' + doc_id,
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
async function referToDoctor(data) {
    // console.log(configConstants.API_BASE_PATH +  '/doctor/refer')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/refer',
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
async function completeAppointment(id) {
    // console.log(configConstants.API_BASE_PATH +  '/doctor/completeappointment/'+ id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/completeappointment/' + id
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
async function newPatientAppointment(data) {
    // console.log(configConstants.API_BASE_PATH +  '/admin/addPatientByDoctor')
    console.log(data,  "------------",configConstants.API_BASE_PATH +  '/admin/addPatientByDoctor')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/admin/addPatientByDoctor',
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
async function getfavorite() {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH +  '/doctor/get-favorite-doctor/'+user_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/get-favorite-doctor/'+user_id
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
async function addfavorite(doc_id) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    let param = {
                    doctor_id: doc_id,
                    user_id : user_id
                }
    // console.log(configConstants.API_BASE_PATH +  '/doctor/save-favorite-doctor')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/save-favorite-doctor',
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
async function removefavorite(id) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    let param = {
                    id: id,
                    user_id : user_id
                }
    // console.log("param",param)            
    // console.log(configConstants.API_BASE_PATH +  '/doctor/remove-favorite-doctor')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/doctor/remove-favorite-doctor',
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
async function appointmentReport() {
    let doc_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        doc_id = jwtdecode(userToken).doc_id
    } catch(e) {
        // console.log(e);
    }            
    // console.log(configConstants.API_BASE_PATH +  '/doctor/appointment-graph/'+doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/appointment-graph/'+doc_id
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
async function referredReport() {
    let doc_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        doc_id = jwtdecode(userToken).doc_id
    } catch(e) {
        // console.log(e);
    }            
    // console.log(configConstants.API_BASE_PATH +  '/doctor/referred-graph/'+doc_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH +  '/doctor/referred-graph/'+doc_id
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
async function getAppointmentOrderId(data) {
    
    // console.log(configConstants.API_BASE_PATH +  '/patient/payment/order')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/patient/payment/order',
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
async function verifyAppointmentOrder(data) {

    // console.log(configConstants.API_BASE_PATH +  '/patient/payment/verify')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH +  '/patient/payment/verify',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}