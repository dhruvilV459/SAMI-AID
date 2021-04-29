import { CARD_HOLDER_NAME, CARD_NUMBER, CLEANALLFROMCONNECTIVITY, EMAIL_ADDRESS_CHANGED, EXPIRATION_DATE, NOT_AVAILABLE_SAMI_AID, PHONE_NUMBER_CHANGED, PRIMARY_PHYSICIAN, SECURITY_CODE } from "../actions/types"

const INITIAL_STATE = { phone_number: '', email: '', firstName: '', lastName: '', zipcode: '', city: '', stateName: '', billingEmail: '', cardHolderName: '', cardNumber: '', expirationDate: '', securityCode: '', primaryCarePhysician: true, notAvailable: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PHONE_NUMBER_CHANGED:
            return { ...state, phone_number: action.payload }

        case EMAIL_ADDRESS_CHANGED:
            return { ...state, email: action.payload }

        case CARD_HOLDER_NAME:
            return { ...state, cardHolderName: action.payload }

        case CARD_NUMBER:
            return { ...state, cardNumber: action.payload }

        case EXPIRATION_DATE:
            return { ...state, expirationDate: action.payload }

        case SECURITY_CODE:
            return { ...state, securityCode: action.payload }

        case NOT_AVAILABLE_SAMI_AID:
            return { ...state, notAvailable: action.payload }

        case PRIMARY_PHYSICIAN:
            return { ...state, primaryCarePhysician: action.payload }

        case CLEANALLFROMCONNECTIVITY:
            return { state: INITIAL_STATE }

        default:
            return state
    }
}