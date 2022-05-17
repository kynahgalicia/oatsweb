import { 
    ALL_GUESTS_REQUEST,
    ALL_GUESTS_SUCCESS,
    ALL_GUESTS_FAIL,

    GUEST_DETAILS_REQUEST,
    GUEST_DETAILS_SUCCESS,
    GUEST_DETAILS_FAIL,

    UPDATE_GUEST_REQUEST,
    UPDATE_GUEST_SUCCESS,
    UPDATE_GUEST_FAIL,
    UPDATE_GUEST_RESET,

    DEACTIVATE_GUEST_REQUEST,
    DEACTIVATE_GUEST_SUCCESS,
    DEACTIVATE_GUEST_FAIL,
    DEACTIVATE_GUEST_RESET,

    DELETE_GUEST_REQUEST,
    DELETE_GUEST_SUCCESS,
    DELETE_GUEST_FAIL,
    DELETE_GUEST_RESET,

    RESTORE_GUEST_REQUEST,
    RESTORE_GUEST_SUCCESS,
    RESTORE_GUEST_FAIL,
    RESTORE_GUEST_RESET,
    
    CLEAR_ERRORS
} from '../constants/guestConstants'

export const guestsReducer = (state = { guests: [] }, action) => {
    switch (action.type) {
        case  ALL_GUESTS_REQUEST:
            return {
                loading: true,
                guests: []
            }

        case  ALL_GUESTS_SUCCESS:
            return {
                loading: false,
                guests: action.payload.guests,
                msg:action.paload
            }

        case ALL_GUESTS_FAIL:
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

export const guestReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_GUEST_REQUEST:
        case RESTORE_GUEST_REQUEST:
        case UPDATE_GUEST_REQUEST:
        case DEACTIVATE_GUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success, 
                msg: action.payload.msg
            }

        case RESTORE_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isRestored: action.payload.success
            }

        case DEACTIVATE_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeactivated: action.payload.success, 
                msg: action.payload.msg
            }

        case UPDATE_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }


        case DEACTIVATE_GUEST_FAIL:
        case UPDATE_GUEST_FAIL:
        case DELETE_GUEST_FAIL:
        case RESTORE_GUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_GUEST_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case RESTORE_GUEST_RESET:
            return {
                ...state,
                isRestored: false
            }

        case DEACTIVATE_GUEST_RESET:
            return {
                ...state,
                isDeactivated: false
            }

        case UPDATE_GUEST_RESET:
            return {
                ...state,
                isUpdated: false
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

export const guestDetailsReducer = (state = { guest: [] }, action) => {
    switch (action.type) {
        case  GUEST_DETAILS_REQUEST:
            return {
                loading: true,
                guest: []
            }

        case  GUEST_DETAILS_SUCCESS:
            return {
                loading: false,
                guest: action.payload.guest
            }

        case GUEST_DETAILS_FAIL:
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
