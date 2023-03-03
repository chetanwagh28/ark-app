import { configConstants, informationConstants } from '../constant';

const initialState = {
  authenticated   : false,
  sendingRequest  : false,
  submitted       : false,
  successMsg      : false,
  errorMsg        : false,
  error           : false,
  serverDown      : false,
  valid           : false,
  addressList        : [],
}
export function informationReducer(state = initialState, action) {
    switch (action.type) {
        case informationConstants.INFORMATION_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
              addressList         : []
          };
        case informationConstants.INFORMATION_SUCCESS:
          return  { 
              ...state,
              authenticated  : true,
              submitted      : false,
              errorMsg       : false,
              addressList       : action.result
          };
        case informationConstants.INFORMATION_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              submitted      : false,
              error          : true,
              errorMsg       : "Check mobile number or password.",
           };
        default: 
           return state
    }
}

