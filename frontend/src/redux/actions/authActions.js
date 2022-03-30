import axios from "axios"
import Cookies from 'js-cookie'
import{
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
    CLEAR_ERRORS,
} from '../constants/authConstants'

export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/user/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const login = (user_tupmail, user_password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/user/login' , {user_tupmail,user_password}, config)

        Cookies.set('refreshtoken', data.refresh_token)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        })
    }
}

export const activateEmail = (activation_token) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/user/activation' , {activation_token}, config)

        dispatch({
            type: ACTIVATE_USER_SUCCESS,
            payload: data.msg
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Load user
export const loadUser = (token) => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const {data} = await axios.get(process.env.REACT_APP_URL + '/user/infor', {
            headers: {Authorization: token}
        })

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getToken = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TOKEN_REQUEST })
        const rf_token = Cookies.get('refreshtoken')
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/user/access', {rf_token}, config)

        dispatch({
            type: GET_TOKEN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_TOKEN_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        dispatch({ type: LOGOUT_REQUEST
        })

        await axios.get(process.env.REACT_APP_URL + '/user/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot Password
export const forgotPassword = (user_tupmail) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/user/forgot' , {user_tupmail}, config)


        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Reset Password
export const resetPassword = (user_password,token) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/user/reset' , {user_password}, config)


        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
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