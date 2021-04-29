import { PAYMENT_FIRING_UP } from "../actions/types";

const INITIAL_STATE = { userCardDetails: null }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PAYMENT_FIRING_UP:
            return { userCardDetails: action.payload }

        default:
            return state
    }
}