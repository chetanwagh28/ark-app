import { configConstants, profileConstants } from '../constant';
/**
 * profileReducer
 *
 * @subpackage             profileReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    doctorProfileDetail    : [],
    patientProfileDetail    : [],
    councilList     : [],
    walletBalance     : [],
    walletHistory     : [],
    getProfileFlag  : false,
    sendingRequest  : false,
    otp             : false,
    otpDone         : false,
    profileUpdate   : false,
    loader          : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    serverDown      : false
};
export function profileReducer(state = initialState, action) {
    switch (action.type) {

         // PROFILE_SOS
        case profileConstants.PROFILE_SOS_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case profileConstants.PROFILE_SOS_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              profileUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.PROFILE_SOS_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // PROFILE_PIC
        case profileConstants.PROFILE_PIC_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case profileConstants.PROFILE_PIC_SUCCESS:
          return  { 
              ...state,
              sendingRequest : true,
              profileUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.PROFILE_PIC_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // GET_PATIENT
        case profileConstants.GET_PATIENT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            patientProfileDetail     : [],
            loader           : true,
            submitted        : false,
            getProfileFlag       : false

          };
        case profileConstants.GET_PATIENT_SUCCESS:
          return  { 
              ...state,
              // sendingRequest : true,
              patientProfileDetail    : action.result,
              getProfileFlag       : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.GET_PATIENT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            getProfileFlag       : false,
            errorMsg       : action.error
           };

        // GET_DOCTOR
        case profileConstants.GET_DOCTOR_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            doctorProfileDetail     : [],
            loader           : true,
            submitted        : false, 
            getProfileFlag        : false, 

          };
        case profileConstants.GET_DOCTOR_SUCCESS:
          return  { 
              ...state,
              // sendingRequest : true,
              doctorProfileDetail    : action.result,
              loader         : false,
              getProfileFlag : true,
              errorMsg       : false
          };
        case profileConstants.GET_DOCTOR_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            getProfileFlag         : false,
            errorMsg       : action.error
           };
           
        // PROFILE_PATIENT
        case profileConstants.PROFILE_PATIENT_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            submitted        : false 

          };
        case profileConstants.PROFILE_PATIENT_SUCCESS:
          return  { 
              ...state,
              profileUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.PROFILE_PATIENT_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // COUNCIL_DOCTOR
        case profileConstants.COUNCIL_DOCTOR_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            councilList      : []

          };
        case profileConstants.COUNCIL_DOCTOR_SUCCESS:
          return  { 
              ...state,
              councilList    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.COUNCIL_DOCTOR_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // SEND_OTP
        case profileConstants.SEND_OTP_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            otp              : false

          };
        case profileConstants.SEND_OTP_SUCCESS:
          return  { 
              ...state,
              otp            : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.SEND_OTP_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // VERIFY_OTP
        case profileConstants.VERIFY_OTP_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            otpDone           : false

          };
        case profileConstants.VERIFY_OTP_SUCCESS:
          return  { 
              ...state,
              otpDone        : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.VERIFY_OTP_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // WALLET
        case profileConstants.WALLET_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            walletBalance      : []

          };
        case profileConstants.WALLET_SUCCESS:
          return  { 
              ...state,
              walletBalance    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.WALLET_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        // WALLET_HISTORY
        case profileConstants.WALLET_HISTORY_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,
            walletHistory      : []

          };
        case profileConstants.WALLET_HISTORY_SUCCESS:
          return  { 
              ...state,
              walletHistory    : action.result,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.WALLET_HISTORY_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };
        
        // ADD_MEMBER
        case profileConstants.ADD_MEMBER_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader           : true,

          };
        case profileConstants.ADD_MEMBER_SUCCESS:
          return  { 
              ...state,
              profileUpdate    : true,
              loader         : false,
              errorMsg       : false
          };
        case profileConstants.ADD_MEMBER_FAILURE:
          return {
            ...state, 
            submitted      : false,
            loader         : false,
            errorMsg       : action.error
           };

        case profileConstants.PROFILE_RESET_STATE:
          return {
              ...state,
              profileUpdate   : false, 
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              loader          : false,
              closeForm       : false,              
              otp             : false,              
              otpDone         : false,              
              getProfileFlag      : false,              
           };
        case profileConstants.FIRST_UNAUTHENTICATE:
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

