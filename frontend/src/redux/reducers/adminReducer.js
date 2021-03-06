import { 
    ALL_ADMINS_REQUEST,
    ALL_ADMINS_SUCCESS,
    ALL_ADMINS_FAIL,

    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,

    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
    UPDATE_ADMIN_RESET,

    SUPER_ADMIN_REQUEST,
    SUPER_ADMIN_SUCCESS,
    SUPER_ADMIN_FAIL,
    SUPER_ADMIN_RESET,

    MODERATOR_REQUEST,
    MODERATOR_SUCCESS,
    MODERATOR_FAIL,
    MODERATOR_RESET,

    DEACTIVATE_ADMIN_REQUEST,
    DEACTIVATE_ADMIN_SUCCESS,
    DEACTIVATE_ADMIN_FAIL,
    DEACTIVATE_ADMIN_RESET,

    ACTIVATE_ADMIN_REQUEST,
    ACTIVATE_ADMIN_SUCCESS,
    ACTIVATE_ADMIN_FAIL,
    ACTIVATE_ADMIN_RESET,

    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,
    DELETE_ADMIN_RESET,

    RESTORE_ADMIN_REQUEST,
    RESTORE_ADMIN_SUCCESS,
    RESTORE_ADMIN_FAIL,
    RESTORE_ADMIN_RESET,

    CLEAR_ERRORS
} from '../constants/adminConstants'

export const adminsReducer = (state = { admins: [] }, action) => {
    switch (action.type) {
        case  ALL_ADMINS_REQUEST:
            return {
                loading: true,
                admins: []
            }

        case  ALL_ADMINS_SUCCESS:
            return {
                loading: false,
                admins: action.payload.admins,
                msg:action.paload
            }

        case ALL_ADMINS_FAIL:
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


export const adminReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ADMIN_REQUEST:
        case RESTORE_ADMIN_REQUEST:
        case UPDATE_ADMIN_REQUEST:
        case SUPER_ADMIN_REQUEST:
        case MODERATOR_REQUEST:
        case DEACTIVATE_ADMIN_REQUEST:
        case ACTIVATE_ADMIN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            }
        case RESTORE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isRestored: action.payload.success
            }

        case DEACTIVATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeactivated: action.payload.success, 
                msg: action.payload.msg
            }
        case ACTIVATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isActivated: action.payload.success, 
                msg: action.payload.msg
            }

        case UPDATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }
        case SUPER_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuperAdmin: action.payload.success
            }
        case MODERATOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isModerator: action.payload.success
            }


        case DEACTIVATE_ADMIN_FAIL:
        case ACTIVATE_ADMIN_FAIL:
        case UPDATE_ADMIN_FAIL:
        case SUPER_ADMIN_FAIL:
        case MODERATOR_FAIL:
        case DELETE_ADMIN_FAIL:
        case RESTORE_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_ADMIN_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case RESTORE_ADMIN_RESET:
            return {
                ...state,
                isRestored: false
            }

        case DEACTIVATE_ADMIN_RESET:
            return {
                ...state,
                isDeactivated: false
            }
        case ACTIVATE_ADMIN_RESET:
            return {
                ...state,
                isActivated: false
            }

        case UPDATE_ADMIN_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case SUPER_ADMIN_RESET:
            return {
                ...state,
                isSuperAdmin: false
            }
        case MODERATOR_RESET:
            return {
                ...state,
                isModerator: false
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

export const adminDetailsReducer = (state = { admin: [] }, action) => {
    switch (action.type) {
        case  ADMIN_DETAILS_REQUEST:
            return {
                loading: true,
                admin: []
            }

        case  ADMIN_DETAILS_SUCCESS:
            return {
                loading: false,
                admin: action.payload.admin
            }

        case ADMIN_DETAILS_FAIL:
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
