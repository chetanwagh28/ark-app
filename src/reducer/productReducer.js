import { configConstants, productConstants } from '../constant';
/**
 * healthTipsReducer
 *
 * @subpackage             healthTipsReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    catProducts          : [],
    products          : [],
    productDetail          : '',
    myproducts          : [],
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
export function productReducer(state = initialState, action) { 
    switch (action.type) {
      
         // Fetch fixture stats
        case productConstants.PRODUCT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            firstRequest     : false 
          };
        case productConstants.PRODUCT_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              loader1        : false,
              errorMsg       : false
          };
        case productConstants.PRODUCT_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

        // Fetch fixture stats
        case productConstants.PRODUCTS_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            products          : [],
            firstRequest     : false 
          };
        case productConstants.PRODUCTS_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              products        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case productConstants.PRODUCTS_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };
       // Fetch fixture stats
        case productConstants.PRODUCT_CAT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            catProducts          : [],
            firstRequest     : false 
          };
        case productConstants.PRODUCT_CAT_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              catProducts        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case productConstants.PRODUCT_CAT_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };
        // Fetch fixture stats
        case productConstants.PRODUCT_DETAIL_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            productDetail          : [],
            firstRequest     : false 
          };
        case productConstants.PRODUCT_DETAIL_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              productDetail        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case productConstants.PRODUCT_DETAIL_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

         // Fetch fixture stats
        case productConstants.MY_PRODUCT_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            myproducts          : [],
            firstRequest     : false 
          };
        case productConstants.MY_PRODUCT_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              myproducts        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case productConstants.MY_PRODUCT_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

        case productConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case productConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case productConstants.FIRST_UNAUTHENTICATE:
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

