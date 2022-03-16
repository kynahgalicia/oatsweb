import axios from "axios"
import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants'

export const getCourse = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_COURSE_REQUEST })

        let link =`/api/course`


        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_COURSE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_COURSE_FAIL,
            payload: error
        })
    }
}

//Course Details
export const getCourseDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: COURSE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/course/${id}`)
        console.log(data.course)
        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data.course
        })

    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Create Course
export const newCourse = (courseData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COURSE_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/course/new`, courseData, config)

        dispatch({
            type: NEW_COURSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Course (ADMIN)
export const updateCourse = (id, courseData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_COURSE_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/course/edit/${id}`, courseData, config)

        dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete course (Admin)
export const deleteCourse = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_COURSE_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
            }
        }
        const { data } = await axios.delete(`/api/course/delete/${id}`, config)

        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_COURSE_FAIL,
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