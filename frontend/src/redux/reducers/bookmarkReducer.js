import {
    ALL_BOOKMARK_REQUEST,
    ALL_BOOKMARK_SUCCESS,
    ALL_BOOKMARK_FAIL,
    USER_BOOKMARK_REQUEST,
    USER_BOOKMARK_SUCCESS,
    USER_BOOKMARK_FAIL,
    NEW_BOOKMARK_REQUEST,
    NEW_BOOKMARK_SUCCESS,
    NEW_BOOKMARK_RESET,
    NEW_BOOKMARK_FAIL,
    DELETE_BOOKMARK_REQUEST,
    DELETE_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_RESET,
    DELETE_BOOKMARK_FAIL,
    CLEAR_ERRORS
} from '../constants/bookmarkConstants'

export const bookmarksReducer = (state = { bookmarks: [] }, action) => {
    switch (action.type) {
        case  ALL_BOOKMARK_REQUEST:
        case  USER_BOOKMARK_REQUEST:
            return {
                loading: true,
                bookmarks: []
            }

        case  ALL_BOOKMARK_SUCCESS:
        case  USER_BOOKMARK_SUCCESS:
            return {
                loading: false,
                bookmarks: action.payload.bookmarks,
                
            }

        case ALL_BOOKMARK_FAIL:
        case USER_BOOKMARK_FAIL:
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

export const newBookmarkReducer = (state = { bookmark: {} }, action) => {
    switch (action.type) {

        case NEW_BOOKMARK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BOOKMARK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                msg: action.payload.msg
            }

        case NEW_BOOKMARK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_BOOKMARK_RESET:
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

export const bookmarkReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BOOKMARK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_BOOKMARK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success, 
                msg: action.payload.msg
            }

        case DELETE_BOOKMARK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_BOOKMARK_RESET:
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

