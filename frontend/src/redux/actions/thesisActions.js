import axios from "axios"

import {
    ALL_THESIS_REQUEST,
    ALL_THESIS_SUCCESS,
    ALL_THESIS_FAIL,

    THESIS_COUNT_REQUEST,
    THESIS_COUNT_SUCCESS,
    THESIS_COUNT_FAIL,

    NEW_THESIS_REQUEST,
    NEW_THESIS_SUCCESS,
    NEW_THESIS_FAIL,

    THESIS_DETAILS_REQUEST,
    THESIS_DETAILS_SUCCESS,
    THESIS_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/thesisConstants'

export const getThesis = (keyword='',department, startDate,endDate) => async (dispatch) => {
    try {
        dispatch({ type: ALL_THESIS_REQUEST })

        let link = ''
        if(department){
            link = `/api/thesis?keyword=${keyword}&department.deptname=${department}&publishedAt[gte]=${startDate}&publishedAt[lte]=${endDate}`
        } else{
            link = `/api/thesis?keyword=${keyword}&publishedAt[gte]=${startDate}&publishedAt[lte]=${endDate}`
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
            payload: error
        })
    }
}
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

        const {data}= await axios.get(`/api/thesis/${thesisId}`)

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

        const { data } = await axios.post(`/api/thesis/new`, thesisData, config)

        dispatch({
            type: NEW_THESIS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_THESIS_FAIL,
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