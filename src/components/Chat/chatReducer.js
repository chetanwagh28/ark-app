import { chatConstants } from './chatConstants';
/**
 * chatReducer
 *
 * @subpackage             chatReducer
 * @category               Reducers
 * @DateOfCreation         08 jan 2019
 * @ShortDescription       This is responsible for all state related to chat
 */
const initialState = {
    chatList    : [],
    errorMsg  : false,
    getVideo : false,
    sending : false,
    requestForChat:false,
    closeForm: false,
    endTrip: false
}
export function chatReducer(state = initialState, action) {
    
    switch (action.type) {
        
        // Fetch Request for Request for chat
        case chatConstants.CHAT_FIND_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              sending :         false,
              requestForChat:         false
          };
        case chatConstants.CHAT_FIND_SUCCESS:
          return  { 
              ...state,
              operator        : action.result[0],
              errorMsg       : false,
              requestForChat: true,
              sending : false,
          };
        case chatConstants.CHAT_FIND_FAILURE:
          return {
              ...state, 
              errorMsg       : action.error,
              requestForChat: false,
              sending : false,
           };

        // Fetch Request for get all chat
        case chatConstants.CHAT_FETCH_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              sending :         true,
              requestForChat: false,
              closeForm:         false
          };
        case chatConstants.CHAT_FETCH_SUCCESS:
          return  { 
              ...state,
              chatList        : action.result,
              errorMsg       : false,
              requestForChat: false,
              closeForm: true,
              sending : true,
          };
        case chatConstants.CHAT_FETCH_FAILURE:
          return {
              ...state, 
              errorMsg       : action.error,
              closeForm: false,
              requestForChat: false,
              sending : true,
           };
        
           // Fetch Request for get all chat
        case chatConstants.CHAT_FETCH_REQUEST:
            return {
            ...state,
            errorMsg         : false,
            sending :         true,
            requestForChat: false,
            closeForm:         false
        };
        case chatConstants.CHAT_FETCH_SUCCESS:
            return  { 
            ...state,
            chatList        : action.result,
            errorMsg       : false,
            requestForChat: false,
            closeForm: true,
            sending : true,
        };
        case chatConstants.CHAT_FETCH_FAILURE:
            return {
            ...state, 
            errorMsg       : action.error,
            closeForm: false,
            requestForChat: false,
            sending : true,
         };

        // Fetch Request for chat save
        case chatConstants.CHAT_SAVE_REQUEST:
          return {
              ...state,
              chatList         : [],
              errorMsg         : false,
              sending :         true,
              closeForm:         false
          };
        case chatConstants.CHAT_SAVE_SUCCESS:
          return  { 
              ...state,
              chatList        : action.result,
              errorMsg       : false,
              closeForm: true,
              sending : true,
          };
        case chatConstants.CHAT_SAVE_FAILURE:
          return {
              ...state, 
              errorMsg       : action.error,
              closeForm: false,
              sending : true,
           };
        




        
        case chatConstants.CHAT_RESET_STATE:
          return {
            ...state,
            errorMsg    : false,
          };

        default:
            return state
    }
}

