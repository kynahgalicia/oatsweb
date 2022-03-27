import axios from 'axios';
import { 
    ALL_ADMINS_REQUEST,
    ALL_ADMINS_SUCCESS,
    ALL_ADMINS_FAIL,

    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,

    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,

    DEACTIVATE_ADMIN_REQUEST,
    DEACTIVATE_ADMIN_SUCCESS,
    DEACTIVATE_ADMIN_FAIL,
    
    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const getAdmins = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_ADMINS_REQUEST })

        const {data} = await axios.get('/admin/all_infor', {
            headers: {Authorization: adminToken}
        })

        dispatch({
            type: ALL_ADMINS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_ADMINS_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Admin Details
export const getAdminDetails = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_DETAILS_REQUEST })

        const { data } = await axios.get(`/admin/inforAdmin/${id}`, {
            headers: {Authorization: adminToken}
        })

        console.log(data)
        dispatch({
            type: ADMIN_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
//Admin Edit
export const updateAdmin = (id, adminData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/admin/edit/${id}`, adminData, config)

        dispatch({
            type: UPDATE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}
//Admin Edit
export const deactivateAdmin = (id, adminData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DEACTIVATE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/admin/deactivate/${id}`, adminData, config)

        dispatch({
            type: DEACTIVATE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DEACTIVATE_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Admin Delete Admin
export const deleteAdmin = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
            }
        }
        const { data } = await axios.delete(`/admin/delete/${id}`, config)

        dispatch({
            type: DELETE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADMIN_FAIL,
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