import { configConstants, planConstants } from '../constant';
/**
 * planReducer
 *
 * @subpackage             planReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    planList          : [],
    sendingRequest  : false,
    firstRequest    : false,
    afterUpdate     : false,
    loader          : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    serverDown      : false
};
export function planReducer(state = initialState, action) {
    switch (action.type) {
      
         // Fetch fixture stats
        case planConstants.PLAN_LIST_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            planList          : [],
            firstRequest     : false 
          };
        case planConstants.PLAN_LIST_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              planList        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case planConstants.PLAN_LIST_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case planConstants.PLAN_SAVE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            firstRequest     : false 
          };
        case planConstants.PLAN_SAVE_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              loader        : false,
              errorMsg       : false
          };
        case planConstants.PLAN_SAVE_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

       
        case planConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case planConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case planConstants.FIRST_UNAUTHENTICATE:
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

