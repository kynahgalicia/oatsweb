import axios from "axios"
import Cookies from "js-cookie"
import{
    LOGIN_ADMIN_REQUEST,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAIL,

    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,

    ACTIVATE_ADMIN_REQUEST,
    ACTIVATE_ADMIN_SUCCESS,
    ACTIVATE_ADMIN_FAIL,

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
    CLEAR_ERRORS,
} from '../constants/authAdminConstants'

export const register = (adminData, adminToken) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_ADMIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': adminToken
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/admin/register', adminData, config)

        dispatch({
            type: REGISTER_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_ADMIN_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const login = (admin_tupmail, admin_password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_ADMIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/admin/login' , {admin_tupmail,admin_password}, config)

        Cookies.set('refreshadmintoken', data.token , { expires: 7 })
        dispatch({
            type: LOGIN_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_ADMIN_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const activateEmail = (activation_token) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVATE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/admin/activation' , {activation_token}, config)

        dispatch({
            type: ACTIVATE_ADMIN_SUCCESS,
            payload: data.msg
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_ADMIN_FAIL,
            payload: error.response.data.msg
        })
    }
}

// // Load admin
export const loadAdmin = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: LOAD_ADMIN_REQUEST })

        const {data} = await axios.get(process.env.REACT_APP_URL + '/admin/infor', {
            headers: {Authorization: adminToken}
        })

        dispatch({
            type: LOAD_ADMIN_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: LOAD_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminToken = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ADMIN_TOKEN_REQUEST })
        const rf_token = Cookies.get('refreshadmintoken')
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + '/admin/access', {rf_token}, config)

        dispatch({
            type: GET_ADMIN_TOKEN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_ADMIN_TOKEN_FAIL,
            payload: error.response.data.msg
        })
    }
}

// // Logout admin
export const logoutAdmin = () => async (dispatch) => {
    try {

        dispatch({ type: LOGOUT_ADMIN_REQUEST
        })

        // await axios.get(process.env.REACT_APP_URL + '/admin/logout')
        Cookies.remove('refreshadmintoken')
        dispatch({
            type: LOGOUT_ADMIN_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// // Forgot Password
// export const forgotPassword = (admin_tupmail) => async (dispatch) => {
//     try {

//         dispatch({ type: FORGOT_PASSWORD_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const { data } = await axios.post(process.env.REACT_APP_URL + '/admin/forgot' , {admin_tupmail}, config)


//         dispatch({
//             type: FORGOT_PASSWORD_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: FORGOT_PASSWORD_FAIL,
//             payload: error.response.data.msg
//         })
//     }
// }

// // Reset Password
// export const resetPassword = (admin_password,token) => async (dispatch) => {
//     try {

//         dispatch({ type: RESET_PASSWORD_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': token
//             }
//         }

//         const { data } = await axios.post(process.env.REACT_APP_URL + '/admin/reset' , {admin_password}, config)


//         dispatch({
//             type: RESET_PASSWORD_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: RESET_PASSWORD_FAIL,
//             payload: error.response.data.msg
//         })
//     }
// }



// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}