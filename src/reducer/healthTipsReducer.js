import { configConstants, healthTipsConstants } from '../constant';
/**
 * healthTipsReducer
 *
 * @subpackage             healthTipsReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    healthTipsCat   : [],
    healthTipsList  : [],
    healthTipDetail : '',
    sendingRequest  : false,
    firstRequest    : false,
    afterUpdate     : false,
    loader          : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    serverDown      : false
};
export function healthTipsReducer(state = initialState, action) { 
    switch (action.type) {
      
         // Fetch fixture stats
        case healthTipsConstants.HEALTH_TIPS_CAT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            healthTipsCat          : [],
            firstRequest     : false 
          };
        case healthTipsConstants.HEALTH_TIPS_CAT_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              healthTipsCat        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case healthTipsConstants.HEALTH_TIPS_CAT_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case healthTipsConstants.HEALTH_TIPS_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            healthTipsList          : [],
            firstRequest     : false 
          };
        case healthTipsConstants.HEALTH_TIPS_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              healthTipsList        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case healthTipsConstants.HEALTH_TIPS_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case healthTipsConstants.HEALTH_TIPS_DETAIL_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            healthTipDetail          : '',
            firstRequest     : false 
          };
        case healthTipsConstants.HEALTH_TIPS_DETAIL_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              healthTipDetail        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case healthTipsConstants.HEALTH_TIPS_DETAIL_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

       
        case healthTipsConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case healthTipsConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case healthTipsConstants.FIRST_UNAUTHENTICATE:
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

