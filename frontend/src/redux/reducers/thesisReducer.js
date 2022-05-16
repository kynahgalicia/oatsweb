import {
    ALL_THESIS_REQUEST,
    ALL_THESIS_SUCCESS,
    ALL_THESIS_FAIL, 

    ALL_ADMIN_THESIS_REQUEST,
    ALL_ADMIN_THESIS_SUCCESS,
    ALL_ADMIN_THESIS_FAIL,

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

    ALL_STUDENT_THESIS_REQUEST,
    ALL_STUDENT_THESIS_SUCCESS,
    ALL_STUDENT_THESIS_FAIL,

    DEACTIVATE_THESIS_REQUEST,
    DEACTIVATE_THESIS_SUCCESS,
    DEACTIVATE_THESIS_FAIL,
    DEACTIVATE_THESIS_RESET,
    
    ACTIVATE_THESIS_REQUEST,
    ACTIVATE_THESIS_SUCCESS,
    ACTIVATE_THESIS_FAIL,
    ACTIVATE_THESIS_RESET,

    DELETE_THESIS_REQUEST,
    DELETE_THESIS_SUCCESS,
    DELETE_THESIS_FAIL,
    DELETE_THESIS_RESET,

    RESTORE_THESIS_REQUEST,
    RESTORE_THESIS_SUCCESS,
    RESTORE_THESIS_FAIL,
    RESTORE_THESIS_RESET,

    CLEAR_ERRORS
} from '../constants/thesisConstants'

export const thesisReducer = (state = { thesis: [] }, action) => {
    switch (action.type) {
        case  ALL_THESIS_REQUEST:
        case  ALL_ADMIN_THESIS_REQUEST:
        case  THESIS_COUNT_REQUEST:
            return {
                loading: true,
                thesis: []
            }

        case  ALL_THESIS_SUCCESS:
        case   ALL_ADMIN_THESIS_SUCCESS:
        case  THESIS_COUNT_SUCCESS:
            return {
                loading: false,
                thesis: action.payload.thesis,
                thesisCount: action.payload.thesisCount,
                resPerPage: action.payload.resPerPage,
                filteredThesisCount: action.payload.filteredThesisCount
            }

        case ALL_THESIS_FAIL:
        case ALL_ADMIN_THESIS_FAIL:
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
                loading: false,
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

export const studentThesisReducer = (state = { theses: {} }, action) => {
    switch (action.type) {

        case ALL_STUDENT_THESIS_REQUEST:
            return {
                ...state,
                loading: true,
                theses: []
            }

        case ALL_STUDENT_THESIS_SUCCESS:
            return {
                loading: false,
                theses: action.payload.theses
            }

        case ALL_STUDENT_THESIS_FAIL:
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

export const removeThesisReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_THESIS_REQUEST:
        case RESTORE_THESIS_REQUEST:
        // case UPDATE_THESIS_REQUEST:
        case DEACTIVATE_THESIS_REQUEST:
        case ACTIVATE_THESIS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_THESIS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case RESTORE_THESIS_SUCCESS:
            return {
                ...state,
                loading: false,
                isRestored: action.payload.success
            }

        case DEACTIVATE_THESIS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeactivated: action.payload.success, 
                msg: action.payload.msg
            }

        case ACTIVATE_THESIS_SUCCESS:
            return {
                ...state,
                loading: false,
                isActivated: action.payload.success, 
                msg: action.payload.msg
            }

        // case UPDATE_THESIS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         isUpdated: action.payload.success
        //     }


        case DEACTIVATE_THESIS_FAIL:
        case ACTIVATE_THESIS_FAIL:
        // case UPDATE_THESIS_FAIL:
        case DELETE_THESIS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.msg
            }

        case DELETE_THESIS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case RESTORE_THESIS_RESET:
            return {
                ...state,
                isRestored: false
            }

        case DEACTIVATE_THESIS_RESET:
            return {
                ...state,
                isDeactivated: false
            }

        case ACTIVATE_THESIS_RESET:
            return {
                ...state,
                isActivated: false
            }

        // case UPDATE_THESIS_RESET:
        //     return {
        //         ...state,
        //         isUpdated: false
            // }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}