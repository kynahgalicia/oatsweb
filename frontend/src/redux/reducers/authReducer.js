import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    ACTIVATE_USER_REQUEST,
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    GET_TOKEN_REQUEST,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_FAIL,

    CLEAR_ERRORS
} from "../constants/authConstants";

export const authUserReducer = ( state = {user: {}}, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isLoggedIn: false,
            }

        case LOGOUT_REQUEST:
            return {
                loading: true,
                isLoggedIn: false,
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                isUser: true,
                msg: action.payload.msg,
                user: action.payload.user
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isLoggedIn: false,
                msg: action.payload.msg,
                user: null
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isLoggedIn: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
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
export const authUserRegisterReducer = ( state = {user: {}}, action) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:  
        case ACTIVATE_USER_REQUEST:  
            return {
                loading: true,
                isLogged: false,
            }

        case REGISTER_USER_SUCCESS:
        case ACTIVATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
                success: action.payload
            }

        case REGISTER_USER_FAIL:
        case ACTIVATE_USER_FAIL:
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
export const authTokenReducer = (state = {token: {}}, action) => {
    switch(action.type){
        case GET_TOKEN_REQUEST:
            return {
                loading: true,
                isLogged: false,
                token: false
            }

        case GET_TOKEN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                isUser: true,
                token: action.payload.token,
                msg: action.payload.msg
            }

        case GET_TOKEN_FAIL:
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
export const authForgotPassReducer = (state = {msg: {}}, action) => {
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                message:null
            }

        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.msg
            }

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
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
