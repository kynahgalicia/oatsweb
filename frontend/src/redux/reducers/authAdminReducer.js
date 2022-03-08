import {
    LOGIN_ADMIN_REQUEST,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAIL,

    // REGISTER_ADMIN_REQUEST,
    // REGISTER_ADMIN_SUCCESS,
    // REGISTER_ADMIN_FAIL,

    // ACTIVATE_ADMIN_REQUEST,
    // ACTIVATE_ADMIN_SUCCESS,
    // ACTIVATE_ADMIN_FAIL,

    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    LOAD_ADMIN_FAIL,

    LOGOUT_ADMIN_REQUEST,
    LOGOUT_ADMIN_SUCCESS,
    LOGOUT_ADMIN_FAIL,

    // FORGOT_PASSWORD_REQUEST,
    // FORGOT_PASSWORD_SUCCESS,
    // FORGOT_PASSWORD_FAIL,

    // RESET_PASSWORD_REQUEST,
    // RESET_PASSWORD_SUCCESS,
    // RESET_PASSWORD_FAIL,

    GET_ADMIN_TOKEN_REQUEST,
    GET_ADMIN_TOKEN_SUCCESS,
    GET_ADMIN_TOKEN_FAIL,

    CLEAR_ERRORS
} from "../constants/authAdminConstants";

export const authAdminReducer = ( state = {admin: {}}, action) => {
    switch(action.type){
        case LOGIN_ADMIN_REQUEST:
        case LOAD_ADMIN_REQUEST:
            return {
                loading: true,
                isLoggedInAdmin: false,
            }

        case LOGOUT_ADMIN_REQUEST:
            return {
                loading: true,
                isLoggedInAdmin: false,
            }
        case LOGIN_ADMIN_SUCCESS:
        case LOAD_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedInAdmin: true,
                isAdmin: true,
                msg: action.payload.msg,
                admin: action.payload.admin
            }

        case LOGOUT_ADMIN_SUCCESS:
            return {
                loading: false,
                isLoggedInAdmin: false,
                msg: action.payload.msg,
                admin: null
            }

        case LOGIN_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                isLoggedInAdmin: false,
                error: action.payload
            }

        case LOAD_ADMIN_FAIL:
            return {
                loading: false,
                isLoggedInAdmin: false,
                admin: null,
                error: action.payload
            }

        case LOGOUT_ADMIN_FAIL:
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
// export const authUserRegisterReducer = ( state = {admin: {}}, action) => {
//     switch(action.type){
//         case REGISTER_ADMIN_REQUEST:  
//         case ACTIVATE_ADMIN_REQUEST:  
//             return {
//                 loading: true,
//                 isLogged: false,
//             }

//         case REGISTER_ADMIN_SUCCESS:
//         case ACTIVATE_ADMIN_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload.msg,
//                 success: action.payload
//             }

//         case REGISTER_ADMIN_FAIL:
//         case ACTIVATE_ADMIN_FAIL:
//             return {
//                 ...state,
//                 error: action.payload
//             }

//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }
            
//         default:
//             return state
//     }
// }
export const authAdminTokenReducer = (state = {adminToken: {}}, action) => {
    switch(action.type){
        case GET_ADMIN_TOKEN_REQUEST:
            return {
                loading: true,
                isLoggedAdmin: false,
                adminToken: false
            }

        case GET_ADMIN_TOKEN_SUCCESS:
            return {
                ...state,
                isLoggedAdmin: true,
                isAdmin: true,
                adminToken: action.payload.adminToken,
                msg: action.payload.msg
            }

        case GET_ADMIN_TOKEN_FAIL:
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
// export const authForgotPassReducer = (state = {msg: {}}, action) => {
//     switch(action.type){
//         case FORGOT_PASSWORD_REQUEST:
//         case RESET_PASSWORD_REQUEST:
//             return {
//                 loading: true,
//                 message:null
//             }

//         case FORGOT_PASSWORD_SUCCESS:
//         case RESET_PASSWORD_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 message: action.payload.msg
//             }

//         case FORGOT_PASSWORD_FAIL:
//         case RESET_PASSWORD_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             }

//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }
            
//         default:
//             return state
//     }
// }
