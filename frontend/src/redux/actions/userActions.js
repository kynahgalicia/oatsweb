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
    CLEAR_ERRORS
} from '../constants/userConstants';

export const getUsers = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const {data} = await axios.get('/user/all_infor', {
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

        const { data } = await axios.get(`/user/inforAdmin/${id}`, {
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
export const updateUser = (id, userData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/user/edit/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
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