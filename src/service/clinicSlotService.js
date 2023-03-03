import axios from 'axios'; 
import { configConstants } from '../constant';

/**
 * Clinic
 *
 * @subpackage             Clinic
 * @category               Service
 * @DateOfCreation         06 march 2020
 * @ShortDescription       This is responsible for calling API
 */
export const clinicSlotService = {
    clinicSlot,
    saveClinicSlotProfile,
    getClinicSlotList,
    getClinicSlotManage,
    getClinicSlotForAppointment,
    getClinicSlotDate,  
    deleteClinicSlotProfile,
    clinicSlotStatusChange,
    slotTimeStatusChange
};

/**
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function clinicSlot(id) {
    // // console.log(configConstants.API_BASE_PATH + '/patient/updatesos/' + data.patient_id)
    return axios({
        method  : 'get',
        url     : configConstants.API_BASE_PATH + '/clinic-time/list-clinic-time-schedule/'+id
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function saveClinicSlotProfile(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/create-update-clinic-time-schedule')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/create-update-clinic-time-schedule',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getClinicSlotList(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/get-clinic-time-slot-list')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/get-clinic-time-slot-list',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getClinicSlotManage(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/manage-time-schedule-slots')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/manage-time-schedule-slots',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getClinicSlotForAppointment(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/get-clinic-time-slot-list')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/get-clinic-time-slot-list',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function getClinicSlotDate(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/get-inactive-date-by-clinic-id')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/get-inactive-date-by-clinic-id',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function deleteClinicSlotProfile(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/delete-clinic-time-schedule-by-id')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/delete-clinic-time-schedule-by-id',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function clinicSlotStatusChange(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/change-clinic-time-schedule-status')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/change-clinic-time-schedule-status',
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
* @DateOfCreation        27 Nov 2020
* @ShortDescription      This function is responsible to call Save import api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
async function slotTimeStatusChange(data) {
    // console.log(configConstants.API_BASE_PATH + '/clinic-time/active-inactive-clinic-time-schedule')
    return axios({
        method  : 'post',
        url     : configConstants.API_BASE_PATH + '/clinic-time/active-inactive-clinic-time-schedule',
        data    : data
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
