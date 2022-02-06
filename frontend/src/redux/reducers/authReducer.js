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
    CLEAR_ERRORS
} from "../constants/authConstants";

export const authReducer = ( state = {user: {}}, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:  
        case ACTIVATE_USER_REQUEST:  
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case ACTIVATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                msg: action.payload.msg,
                success: action.payload
            }
        
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case ACTIVATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
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