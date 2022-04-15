import {
    ALL_THESIS_REQUEST,
    ALL_THESIS_SUCCESS,
    ALL_THESIS_FAIL,  
    NEW_THESIS_REQUEST,
    NEW_THESIS_SUCCESS,
    NEW_THESIS_RESET,
    NEW_THESIS_FAIL,
    THESIS_COUNT_REQUEST,
    THESIS_COUNT_SUCCESS,
    THESIS_COUNT_FAIL,  
    THESIS_DETAILS_REQUEST,
    THESIS_DETAILS_SUCCESS,
    THESIS_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/thesisConstants'

export const thesisReducer = (state = { thesis: [] }, action) => {
    switch (action.type) {
        case  ALL_THESIS_REQUEST:
        case  THESIS_COUNT_REQUEST:
            return {
                loading: true,
                thesis: []
            }

        case  ALL_THESIS_SUCCESS:
        case  THESIS_COUNT_SUCCESS:
            return {
                loading: false,
                thesis: action.payload.thesis,
                thesisCount: action.payload.thesisCount,
                resPerPage: action.payload.resPerPage,
                filteredThesisCount: action.payload.filteredThesisCount
            }

        case ALL_THESIS_FAIL:
        case THESIS_COUNT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newThesisReducer = (state = { thesis: {} }, action) => {
    switch (action.type) {

        case NEW_THESIS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_THESIS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                thesis: action.payload.thesis
            }

        case NEW_THESIS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_THESIS_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const thesisDetailsReducer = (state = { thesis: {} }, action) => {
    switch (action.type) {

        case THESIS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case THESIS_DETAILS_SUCCESS:
            return {
                loading: false,
                thesis: action.payload.thesis
            }

        case THESIS_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}