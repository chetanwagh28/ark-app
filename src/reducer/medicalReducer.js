import { configConstants, medicalConstants } from '../constant';
/**
 * medicalReducer
 *
 * @subpackage             medicalReducer
 * @category               Reducers
 * @DateOfCreation         28 June 2018
 * @ShortDescription       This is responsible for all state related to first
 */
const initialState = {
    medicalList         : [],
    myMedicinList         : [],
    upcomingOrderMedicines         : [],
    medicalDetail       : '',
    bookMedicine        : false,
    myBookedMedicine    : [],
    medicalOrderList    : [],
    MedicalUser     : false,
    MedicalHistory  : false,
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
export function medicalReducer(state = initialState, action) {
    switch (action.type) {
      
         // Fetch fixture stats
        case medicalConstants.MEDICAL_STORE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            medicalList          : [],
            firstRequest     : false 
          };
        case medicalConstants.MEDICAL_STORE_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              medicalList        : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case medicalConstants.MEDICAL_STORE_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

         // MEDICAL_STORE_UPCOMING
        case medicalConstants.MEDICAL_STORE_UPCOMING_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            upcomingOrderMedicines    : [],
            MedicalUser     : false 
          };
        case medicalConstants.MEDICAL_STORE_UPCOMING_FETCH_SUCCESS:
          return  { 
              ...state,
              MedicalUser   : true,
              upcomingOrderMedicines  : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case medicalConstants.MEDICAL_STORE_UPCOMING_FETCH_FAILURE:
          return {
            ...state, 
            MedicalUser   : true,
            loader1        : false,
            errorMsg       : action.error
           };

         // MEDICAL_STORE_DETAIL
        case medicalConstants.MEDICAL_STORE_DETAIL_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            myMedicinList    : [],
            MedicalHistory     : false 
          };
        case medicalConstants.MEDICAL_STORE_DETAIL_FETCH_SUCCESS:
          return  { 
              ...state,
              MedicalHistory   : true,
              myMedicinList  : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case medicalConstants.MEDICAL_STORE_DETAIL_FETCH_FAILURE:
          return {
            ...state, 
            MedicalHistory   : true,
            loader1        : false,
            errorMsg       : action.error
           };

        // PATIENT_MEDICAL_ORDER
        case medicalConstants.PATIENT_MEDICAL_ORDER_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            medicalOrderList    : [],
            MedicalUser     : false 
          };
        case medicalConstants.PATIENT_MEDICAL_ORDER_FETCH_SUCCESS:
          return  { 
              ...state,
              MedicalUser   : true,
              medicalOrderList  : action.result,
              loader1        : false,
              errorMsg       : false
          };
        case medicalConstants.PATIENT_MEDICAL_ORDER_FETCH_FAILURE:
          return {
            ...state, 
            MedicalUser   : true,
            loader1        : false,
            errorMsg       : action.error
           };

         // BOOK_MEDICINE
        case medicalConstants.BOOK_MEDICINE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            bookMedicine    : false,
            firstRequest     : false 
          };
        case medicalConstants.BOOK_MEDICINE_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              bookMedicine  : true,
              loader1        : false,
              errorMsg       : false
          };
        case medicalConstants.BOOK_MEDICINE_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

        // MY_BOOK_MEDICINE
        case medicalConstants.MY_BOOK_MEDICINE_FETCH_REQUEST:
          return {
            ...state,
            errorMsg         : false,
            loader1          : true,
            myBookedMedicine    : [],
            firstRequest     : false 
          };
        case medicalConstants.MY_BOOK_MEDICINE_FETCH_SUCCESS:
          return  { 
              ...state,
              firstRequest   : true,
              myBookedMedicine  :  action.result,
              loader1        : false,
              errorMsg       : false
          };
        case medicalConstants.MY_BOOK_MEDICINE_FETCH_FAILURE:
          return {
            ...state, 
            firstRequest   : true,
            loader1        : false,
            errorMsg       : action.error
           };

       
        case medicalConstants.FIRST_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            isUpdateDone  : false,
            isInsertDone  : false
          }

        case medicalConstants.FIRST_RESET_STATE:
          return {
              ...state,
              MedicalUser   : false, 
              MedicalHistory   : false, 
              successResult   : false, 
              sendingRequest  : false, 
              errorMsg        : false,
              successMessage  : false,
              submitted       : false,
              closeForm       : false              
           };
        case medicalConstants.FIRST_UNAUTHENTICATE:
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

