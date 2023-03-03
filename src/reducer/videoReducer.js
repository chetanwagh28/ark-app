import { configConstants, videoConstants } from '../constant';
/**
 * videoReducer
 *
 * @subpackage             videoReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    videoList          : [],
    cityList          : [],
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
export function videoReducer(state = initialState, action) {
    switch (action.type) {
      
         // Fetch fixture stats
        case videoConstants.VIDEO_ROOM_ID_SERVER_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            videoList          : [],
            firstRequest     : false 
          };
        case videoConstants.VIDEO_ROOM_ID_SERVER_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              // videoList        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case videoConstants.VIDEO_ROOM_ID_SERVER_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

         // Fetch fixture stats
        case videoConstants.CITY_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            cityList          : [],
            firstRequest     : false 
          };
        case videoConstants.CITY_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              cityList        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case videoConstants.CITY_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

       
        case videoConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case videoConstants.FIRST_RESET_STATE:
          return {
              ...state,
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              cityList       : [],
              closeForm       : false              
           };
        case videoConstants.FIRST_UNAUTHENTICATE:
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

