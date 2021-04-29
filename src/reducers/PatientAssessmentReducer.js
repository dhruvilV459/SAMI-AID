import { remove, uniq } from "lodash";
import { CLEANALLFROMASSESSMENT, FEEL, NOTICE_PROBLEM, OTHER, SYMPTOMS } from "../actions/types"

const INITIAL_STATE = { notice_problem: '', feel: '', symptoms: [], other: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTICE_PROBLEM:
            return { ...state, notice_problem: action.payload };

        case FEEL:
            return { ...state, feel: action.payload }

        case SYMPTOMS:
            // console.log(action.payload)
            if (action.payload.radioButton) {
                return { ...state, symptoms: [...state.symptoms, action.payload.key] }
            } else {
                return {
                    ...state, symptoms: remove(state.symptoms, (values) => {
                        return values !== action.payload.key
                    })
                }
            }


        case OTHER:
            return { ...state, other: action.payload }

        case CLEANALLFROMASSESSMENT:
            return { state: INITIAL_STATE }

        default:
            return state
    }
}