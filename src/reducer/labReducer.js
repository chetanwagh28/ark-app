import { configConstants, labConstants } from '../constant';
/**
 * labReducer
 *
 * @subpackage             labReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    labList          : [],
    sendingRequest  : false,
    firstRequest    : false,
    afterUpdate     : false,
    loader          : false,
    loader1         : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    serverDown      : false
};
export function labReducer(state = initialState, action) {
    switch (action.type) {
      
         // Fetch fixture stats
        case labConstants.LAB_LIST_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            labList          : [],
            firstRequest     : false 
          };
        case labConstants.LAB_LIST_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              labList        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case labConstants.LAB_LIST_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

       
        case labConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case labConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case labConstants.FIRST_UNAUTHENTICATE:
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

