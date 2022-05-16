import axios from "axios"

import {
    ALL_THESIS_REQUEST,
    ALL_THESIS_SUCCESS,
    ALL_THESIS_FAIL,

    ALL_STUDENT_THESIS_REQUEST,
    ALL_STUDENT_THESIS_SUCCESS,
    ALL_STUDENT_THESIS_FAIL,

    ALL_ADMIN_THESIS_REQUEST,
    ALL_ADMIN_THESIS_SUCCESS,
    ALL_ADMIN_THESIS_FAIL,

    THESIS_COUNT_REQUEST,
    THESIS_COUNT_SUCCESS,
    THESIS_COUNT_FAIL,

    NEW_THESIS_REQUEST,
    NEW_THESIS_SUCCESS,
    NEW_THESIS_FAIL,

    THESIS_DETAILS_REQUEST,
    THESIS_DETAILS_SUCCESS,
    THESIS_DETAILS_FAIL,

    DEACTIVATE_THESIS_REQUEST,
    DEACTIVATE_THESIS_SUCCESS,
    DEACTIVATE_THESIS_FAIL,

    ACTIVATE_THESIS_REQUEST,
    ACTIVATE_THESIS_SUCCESS,
    ACTIVATE_THESIS_FAIL,

    DELETE_THESIS_REQUEST,
    DELETE_THESIS_SUCCESS,
    DELETE_THESIS_FAIL,

    RESTORE_THESIS_REQUEST,
    RESTORE_THESIS_SUCCESS,
    RESTORE_THESIS_FAIL,

    CLEAR_ERRORS
} from '../constants/thesisConstants'

export const getThesis = (keyword='',department, startDate,endDate) => async (dispatch) => {
    try {
        dispatch({ type: ALL_THESIS_REQUEST })

        let link = ''
        if(department){
            link = process.env.REACT_APP_URL + `/api/thesis?keyword=${keyword}&department.deptname=${department}&publishedAt[gte]=${startDate}&publishedAt[lte]=${endDate}`
        }else{
            link = process.env.REACT_APP_URL + `/api/thesis?keyword=${keyword}&publishedAt[gte]=${startDate}&publishedAt[lte]=${endDate}`
        }
        
        if(!startDate && !endDate && !department){
            link = process.env.REACT_APP_URL + `/api/thesis?keyword=${keyword}`
        }
        
        
        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_THESIS_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type: ALL_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getAdminThesis = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ADMIN_THESIS_REQUEST })

        let link = process.env.REACT_APP_URL + `/api/thesis/admin`
        
        
        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_ADMIN_THESIS_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        dispatch({
            type: ALL_ADMIN_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getStudentThesis = (id) => async (dispatch) => {

    try {

        dispatch({ type: ALL_STUDENT_THESIS_REQUEST })

        const {data}= await axios.get( process.env.REACT_APP_URL + `/api/thesis/student/${id}`)

        dispatch({
            type: ALL_STUDENT_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_STUDENT_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }

};

export const getThesisCount = () => async (dispatch) => {
    try {
        dispatch({ type: THESIS_COUNT_REQUEST })

        let link = process.env.REACT_APP_URL + `/api/thesisCount`
        
        const { data } = await axios.get(link)
        dispatch({
            type: THESIS_COUNT_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: THESIS_COUNT_FAIL,
            payload: error
        })
    }
}

export const getThesisDetails = (thesisId) => async (dispatch) => {

    try {

        dispatch({ type: THESIS_DETAILS_REQUEST })

        const {data}= await axios.get( process.env.REACT_APP_URL + `/api/thesis/${thesisId}`)

        dispatch({
            type: THESIS_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: THESIS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

};

//Create Thesis
export const newThesis = (thesisData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_THESIS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post( process.env.REACT_APP_URL + `/api/thesis/new`, thesisData, config)

        dispatch({
            type: NEW_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const deactivateThesis = (id, thesisData, adminToken) => async (dispatch) => {

    try {

        dispatch({ type: DEACTIVATE_THESIS_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const {data}= await axios.put( process.env.REACT_APP_URL + `/api/thesis/deactivate/${id}`, thesisData, config)

        dispatch({
            type: DEACTIVATE_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DEACTIVATE_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }

};
export const activateThesis = (id, thesisData, adminToken) => async (dispatch) => {

    try {

        dispatch({ type: ACTIVATE_THESIS_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const {data}= await axios.put( process.env.REACT_APP_URL + `/api/thesis/activate/${id}`, thesisData, config)

        dispatch({
            type: ACTIVATE_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }

};
export const deleteThesis = (id,thesisData, adminToken) => async (dispatch) => {

    try {

        dispatch({ type: DELETE_THESIS_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const {data}= await axios.put( process.env.REACT_APP_URL + `/api/thesis/delete/${id}`, thesisData, config)

        dispatch({
            type: DELETE_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }

};
export const restoreThesis = (id,thesisData, adminToken) => async (dispatch) => {

    try {

        dispatch({ type: RESTORE_THESIS_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const {data}= await axios.put( process.env.REACT_APP_URL + `/api/thesis/restore/${id}`, thesisData, config)

        dispatch({
            type: RESTORE_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RESTORE_THESIS_FAIL,
            payload: error.response.data.msg
        })
    }

};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}