import {
    LOGIN_GUEST_REQUEST,
    LOGIN_GUEST_SUCCESS,
    LOGIN_GUEST_FAIL,

    REGISTER_GUEST_REQUEST,
    REGISTER_GUEST_SUCCESS,
    REGISTER_GUEST_FAIL,

    ACTIVATE_GUEST_REQUEST,
    ACTIVATE_GUEST_SUCCESS,
    ACTIVATE_GUEST_FAIL,

    LOAD_GUEST_REQUEST,
    LOAD_GUEST_SUCCESS,
    LOAD_GUEST_FAIL,

    LOGOUT_GUEST_REQUEST,
    LOGOUT_GUEST_SUCCESS,
    LOGOUT_GUEST_FAIL,

    FORGOT_PASSWORD_GUEST_REQUEST,
    FORGOT_PASSWORD_GUEST_SUCCESS,
    FORGOT_PASSWORD_GUEST_FAIL,

    RESET_PASSWORD_GUEST_REQUEST,
    RESET_PASSWORD_GUEST_SUCCESS,
    RESET_PASSWORD_GUEST_FAIL,

    GET_TOKEN_GUEST_REQUEST,
    GET_TOKEN_GUEST_SUCCESS,
    GET_TOKEN_GUEST_FAIL,

    CLEAR_ERRORS,
} from "../constants/authGuestConstants";

export const authGuestReducer = ( state = {guest: {}}, action) => {
    switch(action.type){
        case LOGIN_GUEST_REQUEST:
        case LOAD_GUEST_REQUEST:
            return {
                loading: true,
                isLoggedInGuest: false,
            }

        case LOGOUT_GUEST_REQUEST:
            return {
                loading: true,
                isLoggedInGuest: false,
            }
        case LOGIN_GUEST_SUCCESS:
        case LOAD_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedInGuest: true,
                isGuest: true,
                msg: action.payload.msg,
                guest: action.payload.guest,
                subTypeGuest: action.payload.subType
            }

        case LOGOUT_GUEST_SUCCESS:
            return {
                loading: false,
                isLoggedInGuest: false,
                msg: action.payload.msg,
                guest: null
            }

        case LOGIN_GUEST_FAIL:
            return {
                ...state,
                loading: false,
                isLoggedInGuest: false,
                error: action.payload
            }

        case LOAD_GUEST_FAIL:
            return {
                loading: false,
                isLoggedInGuest: false,
                guest: null,
                error: action.payload
            }

        case LOGOUT_GUEST_FAIL:
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
export const authGuestRegisterReducer = ( state = {guest: {}}, action) => {
    switch(action.type){
        case REGISTER_GUEST_REQUEST:  
        case ACTIVATE_GUEST_REQUEST:  
            return {
                loading: true,
                isLoggedGuest: false,
            }

        case REGISTER_GUEST_SUCCESS:
        case ACTIVATE_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
                success: action.payload
            }

        case REGISTER_GUEST_FAIL:
        case ACTIVATE_GUEST_FAIL:
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
export const authGuestTokenReducer = (state = {token: {}}, action) => {
    switch(action.type){
        case GET_TOKEN_GUEST_REQUEST:
            return {
                loading: true,
                isLoggedGuest: false,
                guestToken: false
            }   

        case GET_TOKEN_GUEST_SUCCESS:
            return {
                ...state,
                isLoggedGuest: true,
                isGuest: true,
                guestToken: action.payload.token,
                msg: action.payload.msg
            }

        case GET_TOKEN_GUEST_FAIL:
            return {
                ...state,
                error: action.payload.msg
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
export const authGuestForgotPassReducer = (state = {msg: {}}, action) => {
    switch(action.type){
        case FORGOT_PASSWORD_GUEST_REQUEST:
        case RESET_PASSWORD_GUEST_REQUEST:
            return {
                loading: true,
                message:null
            }

        case FORGOT_PASSWORD_GUEST_SUCCESS:
        case RESET_PASSWORD_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.msg,
                success:true
            }

        case FORGOT_PASSWORD_GUEST_FAIL:
        case RESET_PASSWORD_GUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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
