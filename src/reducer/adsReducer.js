import { configConstants, adsConstants } from '../constant';
/**
 * healthTipsReducer
 *
 * @subpackage             healthTipsReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    adsData          : [],
    myAdsInquiry          : [],
    postInquiry  : false,
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
export function adsReducer(state = initialState, action) { 
    switch (action.type) {

        // Fetch ADS
        case adsConstants.ADS_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            adsData          : [],
            firstRequest     : false 
          };
        case adsConstants.ADS_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              adsData        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case adsConstants.ADS_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };


       // Fetch MY_ADS_INQUIRY_
        case adsConstants.MY_ADS_INQUIRY_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            myAdsInquiry          : [],
            firstRequest     : false 
          };
        case adsConstants.MY_ADS_INQUIRY_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              myAdsInquiry        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case adsConstants.MY_ADS_INQUIRY_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };


         // Fetch fixture stats
        case adsConstants.POST_ADS_INQUIRY_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            postInquiry          : false,
            firstRequest     : false 
          };
        case adsConstants.POST_ADS_INQUIRY_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              postInquiry        : true,
              loader1        : false,
              errorMsg       : false
          };
        case adsConstants.POST_ADS_INQUIRY_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

        case adsConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case adsConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case adsConstants.FIRST_UNAUTHENTICATE:
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

