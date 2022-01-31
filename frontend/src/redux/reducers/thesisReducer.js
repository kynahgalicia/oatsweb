import {
    ALL_THESIS_REQUEST,
    ALL_THESIS_SUCCESS,
    ALL_THESIS_FAIL,  
    THESIS_DETAILS_REQUEST,
    THESIS_DETAILS_SUCCESS,
    THESIS_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/thesisConstants'

export const thesisReducer = (state = { thesis: [] }, action) => {
    switch (action.type) {
        case  ALL_THESIS_REQUEST:
            return {
                loading: true,
                thesis: []
            }

        case  ALL_THESIS_SUCCESS:
            return {
                loading: false,
                thesis: action.payload.thesis,
                thesisCount: action.payload.thesisCount,
                resPerPage: action.payload.resPerPage,
                filteredThesisCount: action.payload.filteredThesisCount
            }

        case ALL_THESIS_FAIL:
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
                thesis: action.payload
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
