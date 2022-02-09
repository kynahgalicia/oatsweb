import axios from "axios"
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

        const { data } = await axios.post('/user/register', userData, config)

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

        const { data } = await axios.post('/user/login' , {user_tupmail,user_password}, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg
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

        const { data } = await axios.post('/user/activation' , {activation_token}, config)

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
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/user/infor')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
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


        const { data } = await axios.post('/user/access')

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

        await axios.get('/user/logout')

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



// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}