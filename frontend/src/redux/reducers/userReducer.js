import { 
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    CLEAR_ERRORS
} from '../constants/userConstants'

export const usersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case  ALL_USERS_REQUEST:
            return {
                loading: true,
                users: []
            }

        case  ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                msg:action.paload
            }

        case ALL_USERS_FAIL:
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {

        // case DELETE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        // case DELETE_USER_SUCCESS:
            // return {
            //     ...state,
            //     loading: false,
            //     isDeleted: action.payload.success, 
            //     msg: action.payload.msg
            // }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            }


        // case DELETE_USER_FAIL:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        // case DELETE_USER_RESET:
        //     return {
        //         ...state,
        //         isDeleted: false
        //     }

        case UPDATE_USER_RESET:
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

export const userDetailsReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case  USER_DETAILS_REQUEST:
            return {
                loading: true,
                user: []
            }

        case  USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload.user
            }

        case USER_DETAILS_FAIL:
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
