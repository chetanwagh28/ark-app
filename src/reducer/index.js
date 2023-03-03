import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { doctorReducer } from './doctorReducer';
import { patientReducer } from './patientReducer';
import { labReducer } from './labReducer';
import { medicalReducer } from './medicalReducer';
import { profileReducer } from './profileReducer';
import { healthTipsReducer } from './healthTipsReducer';
import { clinicReducer } from './clinicReducer';
import { clinicSlotReducer } from './clinicSlotReducer';
import { productReducer } from './productReducer';
import { planReducer } from './planReducer';
import { chatReducer } from '../components/Chat/chatReducer';
import { videoReducer } from './videoReducer';
import { informationReducer } from './informationReducer';
import { vendorReducer } from './vendorReducer';
import { adsReducer } from './adsReducer';


const appReducer = combineReducers({
	loginReducer,
	doctorReducer,
	patientReducer,
	labReducer,
	medicalReducer,
	profileReducer,
	healthTipsReducer,
	clinicReducer,
	clinicSlotReducer,
	productReducer,
	planReducer,
	chatReducer,
	videoReducer,
	informationReducer,
	vendorReducer,
	adsReducer
});

const rootReducer = ( state, action ) => {

	return appReducer(state, action)
}

export default rootReducer;
