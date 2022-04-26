import axios from 'axios'
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

export const viewLog = (logdata) => async (dispatch) => {
    try {

        dispatch({ type: VIEW_LOG_REQUEST })


        const {data} = await axios.post( process.env.REACT_APP_URL + '/api/view/log', logdata )

        dispatch({
            type: VIEW_LOG_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: VIEW_LOG_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const downloadLog = (logdata) => async (dispatch) => {
    try {

        dispatch({ type: DOWNLOAD_LOG_REQUEST })


        const {data} = await axios.post( process.env.REACT_APP_URL + '/api/download/log', logdata )

        dispatch({
            type: DOWNLOAD_LOG_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DOWNLOAD_LOG_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const fetchLog = () => async (dispatch) => {
    try {

        dispatch({ type: FETCH_LOGS_REQUEST })


        const {data} = await axios.get( process.env.REACT_APP_URL + '/api/log/count' )

        dispatch({
            type: FETCH_LOGS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: FETCH_LOGS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const searchLog = (logdata) => async (dispatch) => {
    try {

        dispatch({ type: SEARCH_LOG_REQUEST })


        const {data} = await axios.post( process.env.REACT_APP_URL + '/api/search/log', logdata )

        dispatch({
            type: SEARCH_LOG_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SEARCH_LOG_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const fetchDataCount = () => async (dispatch) => {
    try {

        dispatch({ type: DATA_COUNT_REQUEST })


        const {data} = await axios.get( process.env.REACT_APP_URL + '/api/data/count' )

        dispatch({
            type: DATA_COUNT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DATA_COUNT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const fetchHomeCount = () => async (dispatch) => {
    try {

        dispatch({ type: HOME_COUNT_REQUEST })


        const {data} = await axios.get( process.env.REACT_APP_URL + '/api/home/count' )

        dispatch({
            type: HOME_COUNT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: HOME_COUNT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const fetchFeaturedCount = () => async (dispatch) => {
    try {

        dispatch({ type: FEATURED_COUNT_REQUEST })


        const {data} = await axios.get( process.env.REACT_APP_URL + '/api/featured/count' )

        dispatch({
            type: FEATURED_COUNT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: FEATURED_COUNT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const fetchStudentCount = (user) => async (dispatch) => {
    try {

        dispatch({ type: STUDENT_COUNT_REQUEST })


        const {data} = await axios.get( process.env.REACT_APP_URL + `/api/student/count/${user}`)

        dispatch({
            type: STUDENT_COUNT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STUDENT_COUNT_FAIL,
            payload: error.response.data.msg
        })
    }
}
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}