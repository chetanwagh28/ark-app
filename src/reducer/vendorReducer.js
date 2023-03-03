import { configConstants, vendorConstants } from '../constant';
/**
 * vendorReducer
 *
 * @subpackage             vendorReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    vendorCat          : [],
    vendorList          : [],
    myCodeList          : [],
    offerData          : '',
    codeGenerate      : '',
    sendingRequest  : false,
    firstRequest    : false,
    afterUpdate     : false,
    loader         : false,
    successResult   : false,
    successMessage  : false,
    errorMsg        : false,
    serverDown      : false
};
export function vendorReducer(state = initialState, action) { 
    switch (action.type) {
      
         // Fetch fixture stats
        case vendorConstants.VENDOR_CAT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            vendorCat          : [],
            firstRequest     : false 
          };
        case vendorConstants.VENDOR_CAT_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              vendorCat        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case vendorConstants.VENDOR_CAT_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case vendorConstants.VENDOR_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            vendorList          : [],
            firstRequest     : false 
          };
        case vendorConstants.VENDOR_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              vendorList        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case vendorConstants.VENDOR_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case vendorConstants.MY_CODE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            myCodeList          : [],
            firstRequest     : false 
          };
        case vendorConstants.MY_CODE_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              myCodeList        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case vendorConstants.MY_CODE_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case vendorConstants.VENDOR_OFFER_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            offerData          : '',
            firstRequest     : false 
          };
        case vendorConstants.VENDOR_OFFER_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              offerData        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case vendorConstants.VENDOR_OFFER_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case vendorConstants.VENDOR_OFFER_CODE_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader          : true,
            codeGenerate          : '',
            firstRequest     : false 
          };
        case vendorConstants.VENDOR_OFFER_CODE_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              codeGenerate        : action.result,
              loader        : false,
              errorMsg       : false
          };
        case vendorConstants.VENDOR_OFFER_CODE_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader        : false,
            errorMsg       : action.error
           };

       
        case vendorConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case vendorConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case vendorConstants.FIRST_UNAUTHENTICATE:
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

