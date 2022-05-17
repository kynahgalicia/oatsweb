import axios from 'axios';
import { 
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

    DEACTIVATE_USER_REQUEST,
    DEACTIVATE_USER_SUCCESS,
    DEACTIVATE_USER_FAIL,
    
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    
    RESTORE_USER_REQUEST,
    RESTORE_USER_SUCCESS,
    RESTORE_USER_FAIL,
    
    CLEAR_ERRORS
} from '../constants/userConstants';

export const getUsers = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const {data} = await axios.get(process.env.REACT_APP_URL + '/user/all_infor', {
            headers: {Authorization: adminToken}
        })

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.msg
        })
    }
}

//User Details
export const getUserDetails = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(process.env.REACT_APP_URL + `/user/inforAdmin/${id}`, {
            headers: {Authorization: adminToken}
        })

        console.log(data)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
//User Edit
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/user/edit/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data
        })
    }
}
//User Edit
export const deactivateUser = (id, userData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DEACTIVATE_USER_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/user/deactivate/${id}`, userData, config)

        dispatch({
            type: DEACTIVATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DEACTIVATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//User Delete Admin
export const deleteUser = (id,userData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/user/delete/${id}`, userData,config)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//User Restore Deleted Admin
export const restoreUser = (id,userData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: RESTORE_USER_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/user/restore/${id}`, userData,config)

        dispatch({
            type: RESTORE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESTORE_USER_FAIL,
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