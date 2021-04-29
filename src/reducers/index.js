import { combineReducers } from "redux";
import PatientAssessmentReducer from "./PatientAssessmentReducer";
import PatientConnectivityReducer from "./PatientConnectivityReducer";
import PaymentReducer from "./PaymentReducer";
import SignInReducer from "./SignInReducer";
import SignUpReducer from "./SignUpReducer";



export default combineReducers({
    signin: SignInReducer,
    signup: SignUpReducer,
    assessment: PatientAssessmentReducer,
    connectivity: PatientConnectivityReducer,
    payment: PaymentReducer
})