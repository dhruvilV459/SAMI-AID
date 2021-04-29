import { ADDRESS, CELL_PHN, CITY, DOB, FIRST_NAME, GENDER, LANGUAGE, LAST_NAME, MARITAL_STATUS, ONSIGNIN, ONSIGNIN_EMAIL_CHANGED, ONSIGNUP_EMAIL_CHANGED, PASSWORD_CHANGED, SECURITY_QUESTION, SECURITY_QUESTION_ANSWER, SIGNUP_USER_SUCCESS, STATE, ZIPCODE } from "./types"

export const onSiginEmailChanged = (username) => {
    return {
        type: ONSIGNIN_EMAIL_CHANGED,
        payload: username
    }
}

export const onSigupEmailChanged = (username) => {
    return {
        type: ONSIGNUP_EMAIL_CHANGED,
        payload: username
    }
}
export const onPasswordChanged = (pass) => {
    return {
        type: PASSWORD_CHANGED,
        payload: pass
    }
}

export const onFirstNameChanged = (firstName) => {
    return {
        type: FIRST_NAME,
        payload: firstName
    }
}

export const onLastChanged = (lastName) => {
    return {
        type: LAST_NAME,
        payload: lastName
    }
}


export const onAddressChanged = (address) => {
    return {
        type: ADDRESS,
        payload: address
    }
}

export const onCityChanged = (city) => {
    return {
        type: CITY,
        payload: city
    }
}

export const onStateChanged = (state) => {
    return {
        type: STATE,
        payload: state
    }
}

export const onZipCodeChanged = (zip) => {
    return {
        type: ZIPCODE,
        payload: zip
    }
}

export const onGenderChanged = (gender) => {
    return {
        type: GENDER,
        payload: gender
    }
}

export const onSecurityQuestionChanged = (question) => {
    return {
        type: SECURITY_QUESTION,
        payload: question
    }
}

export const onSecurityAnswerChanged = (answer) => {
    return {
        type: SECURITY_QUESTION_ANSWER,
        payload: answer
    }
}

export const onLanguageChanged = (lang) => {
    return {
        type: LANGUAGE,
        payload: lang
    }
}

export const onMaritalChanged = (marital) => {
    return {
        type: MARITAL_STATUS,
        payload: marital
    }
}

export const onDobChanged = (dob) => {
    return {
        type: DOB,
        payload: dob
    }
}

export const onCellChanged = (phn) => {
    return {
        type: CELL_PHN,
        payload: phn
    }
}

export const onSignup = (data) => {
    
    return  {
        type: SIGNUP_USER_SUCCESS,
        payload: data
    }
}

export const onSignin = (data) => {
    return {
        type: ONSIGNIN,
        payload: data
    }
}