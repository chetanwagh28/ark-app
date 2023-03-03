import { configConstants, loginConstants } from '../constant';
/**
 * loginReducer
 *
 * @subpackage             loginReducer
 * @category               Reducers
 * @DateOfCreation         06 dec 2018
 * @ShortDescription       This is responsible for all state related to login
 */
const initialState = {
  authenticated   : false,
  sendingRequest  : false,
  submitted       : false,
  successMsg      : false,
  errorMsg        : false,
  error           : false,
  serverDown      : false,
  valid           : false,
  userInfo        : '',
}
export function loginReducer(state = initialState, action) {
    switch (action.type) {
      
         // Login 
        case loginConstants.LOGIN_REQUEST:
          return {
              ...state,
              userInfo         : "",
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
              userInfo         : ''
          };
        case loginConstants.LOGIN_SUCCESS:
          return  { 
              ...state,
              authenticated  : true,
              submitted      : false,
              errorMsg       : false,
              userInfo       : action.result
          };
        case loginConstants.LOGIN_FAILURE:
          return {
              ...state, 
              userInfo         : "",
              authenticated  : false,
              submitted      : false,
              error          : true,
              errorMsg       : "Check mobile number or password.",
              userInfo       : {}
           };

         // registration 
        case loginConstants.REGISTRATION_REQUEST:
          return {
              ...state,
              userInfo         : "",
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
              valid    : false,
          };
        case loginConstants.REGISTRATION_SUCCESS:
          return  { 
              ...state,
              userInfo       : action.result,
              authenticated  : true,
              submitted      : false,
              errorMsg       : false
          };
        case loginConstants.REGISTRATION_FAILURE:
          return {
              ...state, 
              userInfo         : "",
              authenticated  : false,
              userInfo     : false,
              submitted      : false,
              valid      : false,
              errorMsg       : action.error
           };
        
         // registration 
        case loginConstants.REGISTRATION_D_REQUEST:
          return {
              ...state,
              userInfo         : "",
              successMsg         : "",
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
              valid    : false,
          };
        case loginConstants.REGISTRATION_D_SUCCESS:
          return  { 
              ...state,
              successMsg       : action.result,
              authenticated  : false,
              submitted      : false,
              errorMsg       : false
          };
        case loginConstants.REGISTRATION_D_FAILURE:
          return {
              ...state, 
              userInfo         : "",
              successMsg         : "",
              authenticated  : false,
              userInfo     : false,
              submitted      : false,
              valid      : false,
              errorMsg       : action.error
           };

         // registration valid
        case loginConstants.REGISTRATION_V_REQUEST:
          return {
              ...state,
              userInfo         : "",
              successMsg         : "",
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
              valid            : false
          };
        case loginConstants.REGISTRATION_V_SUCCESS:
          return  { 
              ...state,
              submitted      : false,
              errorMsg       : false,
              valid          : action.result
          };
        case loginConstants.REGISTRATION_V_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              submitted      : false,
              errorMsg       : action.error
           };

        // FORGOT_PASSWORD 
        case loginConstants.FORGOT_PASSWORD_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
          };
        case loginConstants.FORGOT_PASSWORD_SUCCESS:
          return  { 
              ...state,
              successMsg     : action.result,
              submitted      : false,
              errorMsg       : false
          };
        case loginConstants.FORGOT_PASSWORD_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              successMsg     : false,
              errorMsg       : action.error
           };

        // RESET_PASSWORD 
        case loginConstants.RESET_PASSWORD_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
          };
        case loginConstants.RESET_PASSWORD_SUCCESS:
          return  { 
              ...state,
              successMsg     : action.result,
              submitted      : false,
              errorMsg       : false
          };
        case loginConstants.RESET_PASSWORD_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              successMsg     : false,
              errorMsg       : action.error
           };
        
        case loginConstants.LOGIN_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            submitted     : false,
            valid         : false,
          };
        case configConstants.SERVER_DOWN:
          return {
            ...state,
            serverDown: true
          }
        default:
            return state
    }
}

