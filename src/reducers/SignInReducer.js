import { LOGIN_USER, LOGIN_USER_FAIL, ONSIGNIN, ONSIGNIN_EMAIL_CHANGED, PASSWORD_CHANGED, REMEMBER_USER, TOUCH_ID } from '../actions/types'

const INITIAL_STATE = { email: '', password: '', rememberUsername: false, enableTouchID: false, error: '', loading: false, user: null }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ONSIGNIN_EMAIL_CHANGED:
            return { ...state, email: action.payload }

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }

        case REMEMBER_USER:
            return { ...state, rememberUsername: action.payload }

        case TOUCH_ID:
            return { ...state, enableTouchID: action.payload }

        case ONSIGNIN:
            return { ...INITIAL_STATE, user: action.payload, }

        case LOGIN_USER_FAIL:
            return { ...state, password: '', loading: false }

        case LOGIN_USER:
            return { ...state, error: '', loading: true }

        default:
            return state;

    }
}