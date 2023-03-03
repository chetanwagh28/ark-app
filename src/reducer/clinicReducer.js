import { configConstants, clinicConstants } from '../constant';
/**
 * clinicReducer
 *
 * @subpackage             clinicReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    clinicList      : [],
    addClinic       : false,
    updateClinic    : false,
    deleteClinic    : false,
    statusClinic    : false,
    sendingRequest  : false,
    loader          : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    clinicUpdate    : false,
    serverDown      : false
};
export function clinicReducer(state = initialState, action) {
    switch (action.type) {

         // CLINIC_
        case clinicConstants.CLINIC_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            clinicList       : [],
            submitted        : false 

          };
        case clinicConstants.CLINIC_SUCCESS:
          return  { 
              ...state,
              clinicList     : action.result,
              sendingRequest : true,
              clinicUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicConstants.CLINIC_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
      
       // ADD_CLINIC_
        case clinicConstants.ADD_CLINIC_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            clinicUpdate    : false,
            loader           : true,
            submitted        : false 

          };
        case clinicConstants.ADD_CLINIC_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              clinicUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicConstants.ADD_CLINIC_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // UPDATE_CLINIC_
        case clinicConstants.UPDATE_CLINIC_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case clinicConstants.UPDATE_CLINIC_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              clinicUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicConstants.UPDATE_CLINIC_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // DELETE_CLINIC_
        case clinicConstants.DELETE_CLINIC_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case clinicConstants.DELETE_CLINIC_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              deleteClinic    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicConstants.DELETE_CLINIC_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // STATUS_CLINIC_
        case clinicConstants.STATUS_CLINIC_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case clinicConstants.STATUS_CLINIC_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              clinicUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case clinicConstants.STATUS_CLINIC_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        case clinicConstants.CLINIC_RESET_STATE:
          return {
              ...state,
              addClinic       : false,
              updateClinic    : false,
              deleteClinic    : false,
              statusClinic    : false,
              clinicUpdate    : false,
              successResult   : false, 
              errorMsg        : false,
              clinicUpdate    : false,
              submitted       : false,
              loader          : false,
              closeForm       : false              
           };
        case clinicConstants.FIRST_UNAUTHENTICATE:
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

