import axios from "axios"
import {
    ALL_DEPARTMENT_REQUEST,
    ALL_DEPARTMENT_SUCCESS,
    ALL_DEPARTMENT_FAIL,
    ALL_DELETED_DEPARTMENT_REQUEST,
    ALL_DELETED_DEPARTMENT_SUCCESS,
    ALL_DELETED_DEPARTMENT_FAIL,
    NEW_DEPARTMENT_REQUEST,
    NEW_DEPARTMENT_SUCCESS,
    NEW_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAIL,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAIL,
    DEPARTMENT_DETAILS_REQUEST,
    DEPARTMENT_DETAILS_SUCCESS,
    DEPARTMENT_DETAILS_FAIL,
    RESTORE_DEPARTMENT_REQUEST,
    RESTORE_DEPARTMENT_SUCCESS,
    RESTORE_DEPARTMENT_FAIL,
    CLEAR_ERRORS
} from '../constants/departmentConstants'

export const getDepartment = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_DEPARTMENT_REQUEST })

        let link = process.env.REACT_APP_URL + `/api/department`
        
        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_DEPARTMENT_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_DEPARTMENT_FAIL,
            payload: error
        })
    }
}

export const getDepartmentDeleted = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_DELETED_DEPARTMENT_REQUEST })

        let link = process.env.REACT_APP_URL + `/api/department/deleted`
        
        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_DELETED_DEPARTMENT_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_DELETED_DEPARTMENT_FAIL,
            payload: error
        })
    }
}

//deparment details
export const getDepartmentDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: DEPARTMENT_DETAILS_REQUEST })

        const { data } = await axios.get(process.env.REACT_APP_URL + `/api/department/${id}`)

        dispatch({
            type: DEPARTMENT_DETAILS_SUCCESS,
            payload: data.department
        })

    } catch (error) {
        dispatch({
            type: DEPARTMENT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Create Department
export const newDepartment = (departmentData, adminToken) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DEPARTMENT_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(process.env.REACT_APP_URL + `/api/department/new`, departmentData, config)

        dispatch({
            type: NEW_DEPARTMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DEPARTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Department (ADMIN)
export const updateDepartment = (id, departmentData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DEPARTMENT_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(process.env.REACT_APP_URL + `/api/department/edit/${id}`, departmentData, config)

        dispatch({
            type: UPDATE_DEPARTMENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_DEPARTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete department (Admin)
export const deleteDepartment = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_DEPARTMENT_REQUEST })
        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(process.env.REACT_APP_URL + `/api/department/delete/${id}`, config)

        dispatch({
            type: DELETE_DEPARTMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_DEPARTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const restoreDepartment = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: RESTORE_DEPARTMENT_REQUEST })
        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(process.env.REACT_APP_URL + `/api/department/restore/${id}`, config)

        dispatch({
            type: RESTORE_DEPARTMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESTORE_DEPARTMENT_FAIL,
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
