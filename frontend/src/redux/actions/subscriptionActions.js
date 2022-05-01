import axios from 'axios'
import { 
    GET_SUBSCRIBE_REQUEST,
    GET_SUBSCRIBE_SUCCESS,
    GET_SUBSCRIBE_FAIL,
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAIL,
    DELETE_SUBSCRIBE_REQUEST,
    DELETE_SUBSCRIBE_SUCCESS,
    DELETE_SUBSCRIBE_FAIL,
    VERIFY_SUBSCRIBE_REQUEST,
    VERIFY_SUBSCRIBE_SUCCESS,
    VERIFY_SUBSCRIBE_FAIL,
    DECLINE_SUBSCRIBE_REQUEST,
    DECLINE_SUBSCRIBE_SUCCESS,
    DECLINE_SUBSCRIBE_FAIL,

    CLEAR_ERRORS
} from '../constants/subscriptionConstants';

export const getSubscribe = () => async (dispatch) => {
    try {

        dispatch({ type: GET_SUBSCRIBE_REQUEST })


        const {data} = await axios.get( process.env.REACT_APP_URL + '/api/subscription')

        dispatch({
            type: GET_SUBSCRIBE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_SUBSCRIBE_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const userSubscribe = (subData) => async (dispatch) => {
    try {

        dispatch({ type: SUBSCRIBE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post( process.env.REACT_APP_URL + '/api/subscription/new', subData, config )

        dispatch({
            type: SUBSCRIBE_USER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SUBSCRIBE_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const expireSubscribe = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBSCRIBE_REQUEST })


        const {data} = await axios.put( process.env.REACT_APP_URL + `/api/subscription/expired/${id}`)

        dispatch({
            type: DELETE_SUBSCRIBE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DELETE_SUBSCRIBE_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const verifySubscribe = (id) => async (dispatch) => {
    try {

        dispatch({ type: VERIFY_SUBSCRIBE_REQUEST })


        const {data} = await axios.put( process.env.REACT_APP_URL + `/api/subscription/verify/${id}`)

        dispatch({
            type: VERIFY_SUBSCRIBE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: VERIFY_SUBSCRIBE_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const declineSubscribe = (id) => async (dispatch) => {
    try {

        dispatch({ type: DECLINE_SUBSCRIBE_REQUEST })


        const {data} = await axios.put( process.env.REACT_APP_URL + `/api/subscription/decline/${id}`)

        dispatch({
            type: DECLINE_SUBSCRIBE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DECLINE_SUBSCRIBE_FAIL,
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