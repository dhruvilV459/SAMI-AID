import { ADDRESS, CELL_PHN, CITY, DOB, FIRST_NAME, GENDER, LANGUAGE, LAST_NAME, MARITAL_STATUS, ONSIGNUP_EMAIL_CHANGED, ONSUBMIT, PASSWORD_CHANGED, SECURITY_QUESTION, SECURITY_QUESTION_ANSWER, SIGNUP_USER_SUCCESS, STATE, ZIPCODE } from "../actions/types"

const INITIAL_STATE = { first_name: '', last_name: '', email: '', password: '', address: '', city: '', stateName: '', zipcode: '', gender: '', security_question: '', security_answer: '', lang: '', marital: '', dob: '', cell_phn: '', user: null };



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FIRST_NAME:
            return { ...state, first_name: action.payload }

        case LAST_NAME:
            return { ...state, last_name: action.payload }

        case ONSIGNUP_EMAIL_CHANGED:
            return { ...state, email: action.payload }

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }

        case ADDRESS:
            return { ...state, address: action.payload }

        case CITY:
            return { ...state, city: action.payload }

        case STATE:
            return { ...state, stateName: action.payload }

        case ZIPCODE:
            return { ...state, zipcode: action.payload }

        case GENDER:
            return { ...state, gender: action.payload }

        case SECURITY_QUESTION:
            return { ...state, security_question: action.payload }

        case SECURITY_QUESTION_ANSWER:
            return { ...state, security_answer: action.payload }

        case LANGUAGE:
            return { ...state, lang: action.payload }

        case MARITAL_STATUS:
            return { ...state, marital: action.payload }

        case DOB:
            return { ...state, dob: action.payload }

        case CELL_PHN:
            return { ...state, cell_phn: action.payload }

        case SIGNUP_USER_SUCCESS:
            return { ...INITIAL_STATE, user: action.payload }

        default:
            return state;
    }
}