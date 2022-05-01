import {
    ALL_BORROW_REQUEST,
    ALL_BORROW_SUCCESS,
    ALL_BORROW_FAIL,

    ALL_STUDENT_BORROW_REQUEST,
    ALL_STUDENT_BORROW_SUCCESS,
    ALL_STUDENT_BORROW_FAIL,

    NEW_BORROW_REQUEST,
    NEW_BORROW_SUCCESS,
    NEW_BORROW_RESET,
    NEW_BORROW_FAIL,

    STUDENT_BORROW_REQUEST,
    STUDENT_BORROW_SUCCESS,
    STUDENT_BORROW_RESET,
    STUDENT_BORROW_FAIL,

    UPDATE_BORROW_REQUEST,
    UPDATE_BORROW_SUCCESS,
    UPDATE_BORROW_FAIL,
    UPDATE_BORROW_RESET,

    DELETE_BORROW_REQUEST,
    DELETE_BORROW_SUCCESS,
    DELETE_BORROW_RESET,
    DELETE_BORROW_FAIL,

    VERIFY_BORROW_REQUEST,
    VERIFY_BORROW_SUCCESS,
    VERIFY_BORROW_FAIL,
    VERIFY_BORROW_RESET,

    DECLINE_BORROW_REQUEST,
    DECLINE_BORROW_SUCCESS,
    DECLINE_BORROW_FAIL,
    DECLINE_BORROW_RESET,
    CLEAR_ERRORS
} from '../constants/borrowConstants'

export const borrowsReducer = (state = { borrow: [] }, action) => {
    switch (action.type) {
        case  ALL_BORROW_REQUEST:
        case  ALL_STUDENT_BORROW_REQUEST:
            return {
                loading: true,
                borrow: []
            }

        case  ALL_BORROW_SUCCESS:
        case  ALL_STUDENT_BORROW_SUCCESS:
            return {
                loading: false,
                borrow: action.payload.borrow
                // borrowCount: action.payload.borrowCount,
                // resPerPage: action.payload.resPerPage,
                // filteredBorrowCount: action.payload.filteredBorrowCount
            }

        case ALL_BORROW_FAIL:
        case ALL_STUDENT_BORROW_FAIL:
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

export const newBorrowReducer = (state = { borrow: {} }, action) => {
    switch (action.type) {

        case NEW_BORROW_REQUEST:
        case STUDENT_BORROW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BORROW_SUCCESS:
        case STUDENT_BORROW_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                msg: action.payload.success
            }

        case NEW_BORROW_FAIL:
        case STUDENT_BORROW_FAIL:
            return {
                ...state,
                error: action.payload.msg
            }

        case NEW_BORROW_RESET:
        case STUDENT_BORROW_RESET:
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

export const borrowReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BORROW_REQUEST:
        case UPDATE_BORROW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_BORROW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success, 
                msg: action.payload.msg
            }

        case UPDATE_BORROW_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_BORROW_FAIL:
        case UPDATE_BORROW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_BORROW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_BORROW_RESET:
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

export const verifyBorrowsReducer = (state = {}, action) => {
    switch (action.type) {

        case VERIFY_BORROW_REQUEST:
        case DECLINE_BORROW_REQUEST:
            return {
                ...state,
                loadingButton: true,
            }

        case VERIFY_BORROW_SUCCESS:
            return {
                ...state,
                loadingButton: false,
                isVerified: action.payload.success, 
                msg: action.payload.msg
            }
            
        case DECLINE_BORROW_SUCCESS:
            return {
                ...state,
                loadingButton: false,
                isDeclined: action.payload.success, 
                msg: action.payload.msg
            }

        case VERIFY_BORROW_FAIL:
        case DECLINE_BORROW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case VERIFY_BORROW_RESET:
            return {
                ...state,
                isVerified: false
            }
        case DECLINE_BORROW_RESET:
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