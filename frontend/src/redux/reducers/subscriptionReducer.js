import { 
    GET_SUBSCRIBE_REQUEST,
    GET_SUBSCRIBE_SUCCESS,
    GET_SUBSCRIBE_FAIL,
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAIL,
    // SUBSCRIBE_USER_RESET,
    DELETE_SUBSCRIBE_REQUEST,
    DELETE_SUBSCRIBE_SUCCESS,
    DELETE_SUBSCRIBE_FAIL,
    DELETE_SUBSCRIBE_RESET,
    DELETE_SUBSCRIBES_REQUEST,
    DELETE_SUBSCRIBES_SUCCESS,
    DELETE_SUBSCRIBES_FAIL,
    DELETE_SUBSCRIBES_RESET,
    VERIFY_SUBSCRIBE_REQUEST,
    VERIFY_SUBSCRIBE_SUCCESS,
    VERIFY_SUBSCRIBE_FAIL,
    VERIFY_SUBSCRIBE_RESET,    
    DECLINE_SUBSCRIBE_REQUEST,
    DECLINE_SUBSCRIBE_SUCCESS,
    DECLINE_SUBSCRIBE_FAIL,
    DECLINE_SUBSCRIBE_RESET,

    CLEAR_ERRORS
} from '../constants/subscriptionConstants';

export const subscriptionReducer = (state = { subscribe: [] }, action) => {
    switch (action.type) {
        case  SUBSCRIBE_USER_REQUEST:
            return {
                loading: true,
                subscribe: []
            }

        case  SUBSCRIBE_USER_SUCCESS:
            return {
                loading: false,
                msg: action.payload.msg,
                success:true
            }

        case SUBSCRIBE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

            // case DELETE_SUBSCRIBE_RESET:
            //     return {
            //         ...state,
            //         isDeleted: false
            // }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const subscriptionsReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_SUBSCRIBES_REQUEST:
        case DELETE_SUBSCRIBE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_SUBSCRIBES_SUCCESS:
        case DELETE_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success, 
                msg: action.payload.msg
            }


        case DELETE_SUBSCRIBES_FAIL:
        case DELETE_SUBSCRIBE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_SUBSCRIBES_RESET:
        case DELETE_SUBSCRIBE_RESET:
            return {
                ...state,
                isDeleted: false
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
export const fetchSubscriptionsReducer = (state = { subs: []}, action) => {
    switch (action.type) {

        case GET_SUBSCRIBE_REQUEST:
            return {
                ...state,
                loading: true,
                subs: []
            }

        case GET_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                subs: action.payload.subscription
            }


        case GET_SUBSCRIBE_FAIL:
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
export const verifySubscriptionsReducer = (state = {}, action) => {
    switch (action.type) {

        case VERIFY_SUBSCRIBE_REQUEST:
        case DECLINE_SUBSCRIBE_REQUEST:
            return {
                ...state,
                loadingButton: true,
            }

        case VERIFY_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loadingButton: false,
                isVerified: action.payload.success, 
                msg: action.payload.msg
            }
            
        case DECLINE_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loadingButton: false,
                isDeclined: action.payload.success, 
                msg: action.payload.msg
            }

        case VERIFY_SUBSCRIBE_FAIL:
        case DECLINE_SUBSCRIBE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case VERIFY_SUBSCRIBE_RESET:
            return {
                ...state,
                isVerified: false
            }
        case DECLINE_SUBSCRIBE_RESET:
            return {
                ...state,
                isDeclined: false
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