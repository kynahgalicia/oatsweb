import axios from "axios"
import{
    LOGIN_GUEST_REQUEST,
    LOGIN_GUEST_SUCCESS,
    LOGIN_GUEST_FAIL,

    REGISTER_GUEST_REQUEST,
    REGISTER_GUEST_SUCCESS,
    REGISTER_GUEST_FAIL,

    ACTIVATE_GUEST_REQUEST,
    ACTIVATE_GUEST_SUCCESS,
    ACTIVATE_GUEST_FAIL,

    LOAD_GUEST_REQUEST,
    LOAD_GUEST_SUCCESS,
    LOAD_GUEST_FAIL,

    LOGOUT_GUEST_REQUEST,
    LOGOUT_GUEST_SUCCESS,
    LOGOUT_GUEST_FAIL,

    FORGOT_PASSWORD_GUEST_REQUEST,
    FORGOT_PASSWORD_GUEST_SUCCESS,
    FORGOT_PASSWORD_GUEST_FAIL,

    RESET_PASSWORD_GUEST_REQUEST,
    RESET_PASSWORD_GUEST_SUCCESS,
    RESET_PASSWORD_GUEST_FAIL,

    GET_TOKEN_GUEST_REQUEST,
    GET_TOKEN_GUEST_SUCCESS,
    GET_TOKEN_GUEST_FAIL,
    CLEAR_ERRORS,
} from '../constants/authGuestConstants'

export const register = (guestData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_GUEST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/guest/register', guestData, config)

        dispatch({
            type: REGISTER_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_GUEST_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const login = (guest_mail, guest_password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_GUEST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/guest/login' , {guest_mail,guest_password}, config)

        dispatch({
            type: LOGIN_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_GUEST_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const activateEmail = (activation_token) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVATE_GUEST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/guest/activation' , {activation_token}, config)

        dispatch({
            type: ACTIVATE_GUEST_SUCCESS,
            payload: data.msg
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_GUEST_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Load guest
export const loadGuest = (guestToken) => async (dispatch) => {
    try {

        dispatch({ type: LOAD_GUEST_REQUEST })

        const {data} = await axios.get('/guest/infor', {
            headers: {Authorization: guestToken}
        })

        dispatch({
            type: LOAD_GUEST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: LOAD_GUEST_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getGuestToken = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TOKEN_GUEST_REQUEST })


        const { data } = await axios.post('/guest/access')

        dispatch({
            type: GET_TOKEN_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_TOKEN_GUEST_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Logout guest
export const logoutGuest = () => async (dispatch) => {
    try {

        dispatch({ type: LOGOUT_GUEST_REQUEST
        })

        await axios.get('/guest/logout')

        dispatch({
            type: LOGOUT_GUEST_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_GUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot Password
export const forgotPassword = (guest_mail) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_GUEST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/guest/forgot' , {guest_mail}, config)


        dispatch({
            type: FORGOT_PASSWORD_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_GUEST_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Reset Password
export const resetPassword = (guest_password,token) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_GUEST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const { data } = await axios.post('/guest/reset' , {guest_password}, config)


        dispatch({
            type: RESET_PASSWORD_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_GUEST_FAIL,
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