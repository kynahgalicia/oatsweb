import { 
    VIEW_LOG_REQUEST,
    VIEW_LOG_SUCCESS,
    VIEW_LOG_FAIL,

    SEARCH_LOG_REQUEST,
    SEARCH_LOG_SUCCESS,
    SEARCH_LOG_FAIL,
    
    DOWNLOAD_LOG_REQUEST,
    DOWNLOAD_LOG_SUCCESS,
    DOWNLOAD_LOG_FAIL,

    FETCH_LOGS_REQUEST,
    FETCH_LOGS_SUCCESS,
    FETCH_LOGS_FAIL,

    DATA_COUNT_REQUEST,
    DATA_COUNT_SUCCESS,
    DATA_COUNT_FAIL,

    HOME_COUNT_REQUEST,
    HOME_COUNT_SUCCESS,
    HOME_COUNT_FAIL,

    FEATURED_COUNT_REQUEST,
    FEATURED_COUNT_SUCCESS,
    FEATURED_COUNT_FAIL,

    STUDENT_COUNT_REQUEST,
    STUDENT_COUNT_SUCCESS,
    STUDENT_COUNT_FAIL,

    CLEAR_ERRORS
} from '../constants/loggingConstants';

export const loggingReducer = (state = { log: [] }, action) => {
    switch (action.type) {
        case  VIEW_LOG_REQUEST:
        case  SEARCH_LOG_REQUEST:
        case  DOWNLOAD_LOG_REQUEST:
            return {
                loading: true
            }

        case  VIEW_LOG_SUCCESS:
        case  SEARCH_LOG_SUCCESS:
        case  DOWNLOAD_LOG_SUCCESS:
            return {
                loading: false,
                msg: action.payload.msg,
                success:true
            }

        case VIEW_LOG_FAIL:
        case SEARCH_LOG_FAIL:
        case DOWNLOAD_LOG_FAIL:
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
export const logsReducer = (state = { view: [] }, action) => {
    switch (action.type) {
        case  FETCH_LOGS_REQUEST:
            return {
                loading: true,
                view: []
            }

        case  FETCH_LOGS_SUCCESS:
            return {
                viewsLog: action.payload.view,
                searchLog: action.payload.search,
                downloadLog: action.payload.download,
            }

        case FETCH_LOGS_FAIL:
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
export const dataCountReducer = (state = { count: [] }, action) => {
    switch (action.type) {
        case  DATA_COUNT_REQUEST:
            return {
                loading: true,
                count: []
            }

        case  DATA_COUNT_SUCCESS:
            return {
                dataCount: action.payload
            }

        case DATA_COUNT_FAIL:
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
export const homeCountReducer = (state = { count: [] }, action) => {
    switch (action.type) {
        case  HOME_COUNT_REQUEST:
            return {
                loading: true,
                count: []
            }

        case  HOME_COUNT_SUCCESS:
            return {
                loading:false,
                homeCount: action.payload.homeCount
            }

        case HOME_COUNT_FAIL:
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
export const featuredCountReducer = (state = { count: [] }, action) => {
    switch (action.type) {
        case  FEATURED_COUNT_REQUEST:
            return {
                loading: true,
                count: []
            }

        case  FEATURED_COUNT_SUCCESS:
            return {
                loading:false,
                featuredCount: action.payload.featuredCount
            }

        case FEATURED_COUNT_FAIL:
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

export const studentCountReducer = (state = { count: [] }, action) => {
    switch (action.type) {
        case  STUDENT_COUNT_REQUEST:
            return {
                loading: true,
                count: []
            }

        case  STUDENT_COUNT_SUCCESS:
            return {
                loading:false,
                bookmarksCount: action.payload.bookmarksCount,
                borrowCount: action.payload.borrowCount,
                thesisCount: action.payload.thesisCount
            }

        case STUDENT_COUNT_FAIL:
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
