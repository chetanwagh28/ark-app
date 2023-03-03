import { configConstants, patientConstants } from '../constant';
/**
 * patientReducer
 *
 * @subpackage             patientReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    patientDetail     : [],
    patientHistory    : [],
    prescriptionList  : [],
    patientsList      : [],
    doctorReferralP   : [],
    healthProblem   : [],
    recentDRList   : [],
    sendingRequest  : false,
    afterUpdate     : false,
    loader          : false,
    loader1         : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    serverDown      : false
};
export function patientReducer(state = initialState, action) {
  // // console.log("action.result",action)
    switch (action.type) {
      
         // Fetch appointment list
        case patientConstants.PATIENT_HISTORY_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            patientHistory    : [],
            submitted        : false 
          };
        case patientConstants.PATIENT_HISTORY_FETCH_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              patientHistory  : action.result.data,
              loader         : false,
              errorMsg       : false
          };
        case patientConstants.PATIENT_HISTORY_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

          // Fetch PRESCRIPTION_LIST
        case patientConstants.PRESCRIPTION_LIST_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            prescriptionList    : [],
            submitted        : false 
          };
        case patientConstants.PRESCRIPTION_LIST_FETCH_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              prescriptionList  : action.result.data,
              loader         : false,
              errorMsg       : false
          };
        case patientConstants.PRESCRIPTION_LIST_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

         // Fetch cancel appointment
        case patientConstants.GET_MY_PATIENT_LIST_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            patientsList  : [],
            submitted        : false 
          };
        case patientConstants.GET_MY_PATIENT_LIST_FETCH_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              loader         : false,
              patientsList  : action.result.data,
              errorMsg       : false
          };
        case patientConstants.GET_MY_PATIENT_LIST_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
        
         // Fetch doctor Referral
        case patientConstants.REFERRAL_DOCTOR_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            doctorReferralP  : [],
            submitted        : false 
          };
        case patientConstants.REFERRAL_DOCTOR_FETCH_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              loader         : false,
              doctorReferralP  : action.result.data,
              errorMsg       : false
          };
        case patientConstants.REFERRAL_DOCTOR_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

         // Fetch doctor Referral
        case patientConstants.HEALTH_PROBLEM_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            healthProblem    : [],
            submitted        : false 
          };
        case patientConstants.HEALTH_PROBLEM_FETCH_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              loader         : false,
              healthProblem  : action.result.data,
              errorMsg       : false
          };
        case patientConstants.HEALTH_PROBLEM_FETCH_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
      
         // Fetch doctor Referral
        case patientConstants.GET_RECENT_DOCTOR_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            recentDRList    : [],
            submitted        : false 
          };
        case patientConstants.GET_RECENT_DOCTOR_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              loader         : false,
              recentDRList  : action.result.data,
              errorMsg       : false
          };
        case patientConstants.GET_RECENT_DOCTOR_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };


        case patientConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case patientConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case patientConstants.FIRST_UNAUTHENTICATE:
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

