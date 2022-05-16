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

    SUPER_ADMIN_REQUEST,
    SUPER_ADMIN_SUCCESS,
    SUPER_ADMIN_FAIL,

    MODERATOR_REQUEST,
    MODERATOR_SUCCESS,
    MODERATOR_FAIL,

    DEACTIVATE_ADMIN_REQUEST,
    DEACTIVATE_ADMIN_SUCCESS,
    DEACTIVATE_ADMIN_FAIL,

    ACTIVATE_ADMIN_REQUEST,
    ACTIVATE_ADMIN_SUCCESS,
    ACTIVATE_ADMIN_FAIL,
    
    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAIL,

    RESTORE_ADMIN_REQUEST,
    RESTORE_ADMIN_SUCCESS,
    RESTORE_ADMIN_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const getAdmins = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_ADMINS_REQUEST })

        const {data} = await axios.get( process.env.REACT_APP_URL + '/admin/all_infor', {
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

        const { data } = await axios.get(process.env.REACT_APP_URL + `/admin/inforAdmin/${id}`, {
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
        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/edit/${id}`, adminData, config)

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
export const superAdmin = (id,adminData, adminToken) => async (dispatch) => {
    try {

        dispatch({ type: SUPER_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/super/${id}`, adminData, config)



        dispatch({
            type: SUPER_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUPER_ADMIN_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Admin Edit
export const moderatorAdmin = (id,adminData, adminToken) => async (dispatch) => {
    try {

        dispatch({ type: MODERATOR_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/moderator/${id}`, adminData, config)



        dispatch({
            type: MODERATOR_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MODERATOR_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Admin Edit
export const deactivateAdmin = (id,adminData, adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DEACTIVATE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/deactivate/${id}`, adminData, config)



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

export const activateAdmin = (id,adminData, adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVATE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/activate/${id}`, adminData, config)



        dispatch({
            type: ACTIVATE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Admin Delete Admin
export const deleteAdmin = (id,adminData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/delete/${id}`, adminData, config)

        dispatch({
            type: DELETE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADMIN_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Admin Restore Deleted
export const restoreDelete = (id,adminData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: RESTORE_ADMIN_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/admin/restore/${id}`, adminData, config)

        dispatch({
            type: RESTORE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESTORE_ADMIN_FAIL,
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