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
export const profileService = {
    updateSOS,
    updateProfilePic,
    getDoctorProfile,
    getPatientProfile,
    updatePatientProfile,
    getMedicalProfile,
    updateMedicalProfile,
    getCouncil,
    getWallet,
    getWalletHistory,
    sendOTP,
    verifyOTP,
    getProfileByNumber,
    addMember,
    removeMember
};

/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function updateSOS(data) {
    // // console.log(configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id,
        data    : data,
        headers : { 
                    'Content-Type': 'multipart/form-data'
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
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function updateProfilePic(data) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    // // console.log("formdata",data)
    // console.log(configConstants.API_BASE_PATH + '/profile/updatedoctor/' + user_id)
    // // console.log('data===>>>',data)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/updatedoctor/' + user_id,
        data    : data,
        headers : {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        // // console.log('then--',response)
        return response;
    })
    .catch(response => {
        // // console.log('catch--',response)
        return response;
    });
}


/**
* @DateOfCreation        06 March 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getDoctorProfile(id) {
    
    // console.log(configConstants.API_BASE_PATH + '/doctor/complete-profile/'+id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/doctor/complete-profile/'+id,
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
async function getPatientProfile(user_id) {
    // console.log(configConstants.API_BASE_PATH + '/patient/patientinfo/'+user_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/patient/patientinfo/'+user_id,
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
async function updatePatientProfile(data) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    // // console.log('Patientupdate',data)
    console.log(configConstants.API_BASE_PATH + '/profile/updateprofilepatient/' + user_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/updateprofilepatient/' + user_id,
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
async function getMedicalProfile(user_id) {
    // console.log(configConstants.API_BASE_PATH + '/profile/madicalinfo/'+user_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/profile/madicalinfo/'+user_id,
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
async function updateMedicalProfile(data) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    // // console.log('medicalupdate',data)
    // console.log(configConstants.API_BASE_PATH + '/profile/updatemedical/' + user_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/updatemedical/' + user_id,
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
async function getCouncil() {
    
    // console.log(configConstants.API_BASE_PATH + '/auth/council')
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/auth/council',
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
async function getWallet(data) {
    
    // console.log(configConstants.API_BASE_PATH + '/wallet/mywallet/'+data)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/wallet/mywallet/'+data,
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
async function getWalletHistory(data) {
    
    // console.log(configConstants.API_BASE_PATH + '/wallet/wallethistory')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/wallet/wallethistory',
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
async function sendOTP(contact_no) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }
    let data = {contact_no: contact_no}
    // console.log(configConstants.API_BASE_PATH + '/profile/sendotp/'+user_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/sendotp/'+user_id,
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
async function verifyOTP(code, contact_no) {
    let user_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        user_id = jwtdecode(userToken).user_id
    } catch(e) {
        // console.log(e);
    }

    let data = {
            "user_id" : user_id,
            "otp" : code,
            "contact_no": contact_no
           }
    // console.log(configConstants.API_BASE_PATH + '/profile/varifymobileotp', data)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/profile/varifymobileotp',
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
async function getProfileByNumber(contact_no) {
    // console.log(configConstants.API_BASE_PATH + '/profile/getUserProfile/'+ contact_no)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/profile/getUserProfile/'+contact_no
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
async function addMember(data) {
    let patient_id = '';
    let userToken = null;
    try {
        userToken = await AsyncStorage.getItem('userToken');
        // // console.log(jwtdecode(userToken))
        patient_id = jwtdecode(userToken).patient_id
    } catch(e) {
        // console.log(e);
    }
    // console.log(configConstants.API_BASE_PATH + '/linking/' + patient_id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/linking/' + patient_id,
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
async function removeMember(id) {
    // console.log(configConstants.API_BASE_PATH + '/linking/delete/' + id)
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/linking/delete/' + id,
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
