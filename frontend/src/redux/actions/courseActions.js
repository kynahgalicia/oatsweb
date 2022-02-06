import axios from "axios"
import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
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

//Create Course
export const newCourse = (courseData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COURSE_REQUEST })

        const config = {
            headers: {
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

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}