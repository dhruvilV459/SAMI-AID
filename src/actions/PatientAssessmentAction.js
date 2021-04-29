import { CLEANALLFROMASSESSMENT, FEEL, NOTICE_PROBLEM, OTHER, SYMPTOMS } from "./types"

export const onNoticeProblem = (problem) => {
    return {
        type: NOTICE_PROBLEM,
        payload: problem
    }
}

export const onFeel = (feel) => {
    return {
        type: FEEL,
        payload: feel
    }
}

export const onSymptomsChange = (symptoms) => {
    return {
        type: SYMPTOMS,
        payload: symptoms
    }
}

export const onOtherChange = (other) => {
    return {
        type: OTHER,
        payload: other
    }
}

export const onClearAllDataAssessment = () => {
    return {
        type: CLEANALLFROMASSESSMENT
    }
}