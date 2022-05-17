import axios from 'axios';
import { 
    ALL_GUESTS_REQUEST,
    ALL_GUESTS_SUCCESS,
    ALL_GUESTS_FAIL,

    GUEST_DETAILS_REQUEST,
    GUEST_DETAILS_SUCCESS,
    GUEST_DETAILS_FAIL,

    UPDATE_GUEST_REQUEST,
    UPDATE_GUEST_SUCCESS,
    UPDATE_GUEST_FAIL,

    DEACTIVATE_GUEST_REQUEST,
    DEACTIVATE_GUEST_SUCCESS,
    DEACTIVATE_GUEST_FAIL,
    
    DELETE_GUEST_REQUEST,
    DELETE_GUEST_SUCCESS,
    DELETE_GUEST_FAIL,

    RESTORE_GUEST_REQUEST,
    RESTORE_GUEST_SUCCESS,
    RESTORE_GUEST_FAIL,
    
    CLEAR_ERRORS
} from '../constants/guestConstants';

export const getGuests = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_GUESTS_REQUEST })

        const {data} = await axios.get(process.env.REACT_APP_URL + '/guest/all_infor', {
            headers: {Authorization: adminToken}
        })

        dispatch({
            type: ALL_GUESTS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_GUESTS_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Guest Details
export const getGuestDetails = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: GUEST_DETAILS_REQUEST })

        const { data } = await axios.get(process.env.REACT_APP_URL + `/guest/inforAdmin/${id}`, {
            headers: {Authorization: adminToken}
        })

        console.log(data)
        dispatch({
            type: GUEST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GUEST_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
//Guest Edit
export const updateGuest = (id, guestData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_GUEST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/guest/edit/${id}`, guestData, config)

        dispatch({
            type: UPDATE_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_GUEST_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Guest Edit
export const deactivateGuest = (id, guestData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DEACTIVATE_GUEST_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/guest/deactivate/${id}`, guestData, config)

        dispatch({
            type: DEACTIVATE_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DEACTIVATE_GUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

//Guest Delete Admin
export const deleteGuest = (id,userData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GUEST_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/guest/delete/${id}`, userData,config)

        dispatch({
            type: DELETE_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_GUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

//Guest Restore Deleted Admin
export const restoreGuest = (id,userData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: RESTORE_GUEST_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/guest/restore/${id}`, userData,config)

        dispatch({
            type: RESTORE_GUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESTORE_GUEST_FAIL,
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