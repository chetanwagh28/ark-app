import { configConstants, clinicSlotConstants } from '../constant';
/**
 * clinicSlotReducer
 *
 * @subpackage             clinicSlotReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    clinicSlotData       : [],
    clinicSlotManage     : [],
    clinicSlotDate       : [],
    addClinicSlot       : false,
    updateClinicSlot    : false,
    deleteClinicSlot    : false,
    statusClinicSlot    : false,
    statusClinicTimeSlot    : false,
    timeSlot    : false,
    dateSlot    : false,
    statusMsg         : false,
    sendingRequest  : false,
    loader          : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    fetchSlot       : false,
    serverDown      : false
};
export function clinicSlotReducer(state = initialState, action) { // console.log("action",action)
    switch (action.type) {

         // CLINIC_SLOT_
        case clinicSlotConstants.CLINIC_SLOT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            fetchSlot        : false,
            clinicSlotData         : [],
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.CLINIC_SLOT_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              fetchSlot        : true,
              clinicSlotData    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.CLINIC_SLOT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            fetchSlot        : false,
            loader         : false,
            errorMsg       : action.error
           };

       // SAVE_CLINIC_SLOT_
        case clinicSlotConstants.SAVE_CLINIC_SLOT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            addClinicSlot         : false,
            loader           : true,
            sendingRequest           : true,
            submitted        : false 

          };
        case clinicSlotConstants.SAVE_CLINIC_SLOT_SUCCESS:
          return  { 
              ...state,
              sendingRequest : false,
              addClinicSlot    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.SAVE_CLINIC_SLOT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            sendingRequest : false,
            loader         : false,
            errorMsg       : action.error
           };

        // GET_CLINIC_SLOT_
        case clinicSlotConstants.GET_CLINIC_SLOT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            clinicSlotData    : [],
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.GET_CLINIC_SLOT_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              clinicSlotData    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.GET_CLINIC_SLOT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // GET_CLINIC_SLOT_MANAGE
        case clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            clinicSlotManage    : [],
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              timeSlot : true,
              clinicSlotManage    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.GET_CLINIC_SLOT_MANAGE_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // GET_CLINIC_SLOT_
        case clinicSlotConstants.GET_CLINIC_SLOT_DATE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            clinicSlotDate    : [],
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.GET_CLINIC_SLOT_DATE_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              dateSlot : true,
              clinicSlotDate    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.GET_CLINIC_SLOT_DATE_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // DELETE_CLINIC_SLOT_
        case clinicSlotConstants.DELETE_CLINIC_SLOT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.DELETE_CLINIC_SLOT_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              deleteClinicSlot    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.DELETE_CLINIC_SLOT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // STATUS_CLINIC_SLOT_
        case clinicSlotConstants.STATUS_CLINIC_SLOT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.STATUS_CLINIC_SLOT_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              statusClinicSlot    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.STATUS_CLINIC_SLOT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
        
        // STATUS_CLINIC_TIME_SLOT
        case clinicSlotConstants.STATUS_CLINIC_TIME_SLOT_REQUEST:
          return {
            ...state,
            statusMsg         : false,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case clinicSlotConstants.STATUS_CLINIC_TIME_SLOT_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              statusMsg    : action.result,
              statusClinicTimeSlot    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicSlotConstants.STATUS_CLINIC_TIME_SLOT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
        case clinicSlotConstants.SLOT_RESET_STATE:
          return {
              ...state,
              addClinicSlot       : false,
              updateClinicSlot    : false,
              deleteClinicSlot    : false,
              statusClinicSlot    : false,
              statusClinicTimeSlot    : false,
              statusMsg         : false,
              fetchSlot         : false,
              timeSlot          : false,
              sendingRequest  : false,
              successResult   : false, 
              errorMsg        : false,
              submitted       : false,
              loader          : false,
              closeForm       : false              
           };
        case clinicSlotConstants.DATE_SLOT_RESET_STATE:
          return {
              ...state,
              addClinicSlot       : false,
              updateClinicSlot    : false,
              deleteClinicSlot    : false,
              statusClinicSlot    : false,
              statusClinicTimeSlot    : false,
              statusMsg         : false,
              fetchSlot         : false,
              dateSlot          : false,
              sendingRequest  : false,
              successResult   : false, 
              errorMsg        : false,
              submitted       : false,
              loader          : false,
              closeForm       : false              
           };
        case clinicSlotConstants.CLINIC_SLOT_RESET_STATE:
          return {
              ...state,
              addClinicSlot       : false,
              updateClinicSlot    : false,
              deleteClinicSlot    : false,
              statusClinicSlot    : false,
              statusClinicTimeSlot    : false,
              statusMsg         : false,
              fetchSlot         : false,
              timeSlot          : false,
              dateSlot          : false,
              sendingRequest  : false,
              successResult   : false, 
              errorMsg        : false,
              submitted       : false,
              loader          : false,
              closeForm       : false              
           };
        case clinicSlotConstants.FIRST_UNAUTHENTICATE:
          return {
            ...state,
            isUserNotValid : true,
            errorMsg       : false
          }
        case configConstants.SERVER_DOWN:
          return {
            ...state,
            serverDown: true
          }
        default:
            return state
    }
}

