import { CARD_HOLDER_NAME, CARD_NUMBER, CLEANALLFROMCONNECTIVITY, EMAIL_ADDRESS_CHANGED, EXPIRATION_DATE, FIRST_NAME_BILLING, NOT_AVAILABLE_SAMI_AID, PHONE_NUMBER_CHANGED, PRIMARY_PHYSICIAN, SECURITY_CODE } from "./types"

export const onPhoneNumberChanged = (num) => {
    return {
        type: PHONE_NUMBER_CHANGED,
        payload: num
    }
}

export const onEmailAddressChanged = (email) => {
    return {
        type: EMAIL_ADDRESS_CHANGED,
        payload: email
    }
}

export const onCardHolderNameChanged = (name) => {
    return {
        type: CARD_HOLDER_NAME,
        payload: name
    }
}

export const onCardNumberChanged = (number) => {
    return {
        type: CARD_NUMBER,
        payload: number
    }
}

export const onExpirationDateChanged = (date) => {
    return {
        type: EXPIRATION_DATE,
        payload: date
    }
}

export const onSecurityCodeChanged = (code) => {
    return {
        type: SECURITY_CODE,
        payload: code
    }
}

export const onNotAvailableChanged = (text) => {
    return {
        type: NOT_AVAILABLE_SAMI_AID,
        payload: text
    }
}

export const onPrimaryCarePhysicianChanged = (val) => {
    return {
        type: PRIMARY_PHYSICIAN,
        payload: val
    }
}

export const onClearAllData = () => {
    return {
        type: CLEANALLFROMCONNECTIVITY
    }
}