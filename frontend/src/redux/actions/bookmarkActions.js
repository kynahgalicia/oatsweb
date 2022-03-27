import axios from "axios"
import {
    ALL_BOOKMARK_REQUEST,
    ALL_BOOKMARK_SUCCESS,
    ALL_BOOKMARK_FAIL,
    USER_BOOKMARK_REQUEST,
    USER_BOOKMARK_SUCCESS,
    USER_BOOKMARK_FAIL,
    NEW_BOOKMARK_REQUEST,
    NEW_BOOKMARK_SUCCESS,
    NEW_BOOKMARK_FAIL,
    DELETE_BOOKMARK_REQUEST,
    DELETE_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_FAIL,
    CLEAR_ERRORS
} from '../constants/bookmarkConstants'

export const getBookmark = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BOOKMARK_REQUEST })

        let link =`/api/bookmark`


        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_BOOKMARK_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_BOOKMARK_FAIL,
            payload: error
        })
    }
}

export const getUserBookmarks = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_BOOKMARK_REQUEST })

        const { data } = await axios.get(`/api/bookmark/${id}`)

        dispatch({
            type: USER_BOOKMARK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_BOOKMARK_FAIL,
            payload: error.response.error
        })
    }
}

//Create Bookmark
export const newBookmark = (bookmarkData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BOOKMARK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/bookmark/new`, bookmarkData, config)

        dispatch({
            type: NEW_BOOKMARK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BOOKMARK_FAIL,
            payload: error.response.data.msg
        })
    }
}

// Delete bookmark (Admin)
export const deleteBookmark = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BOOKMARK_REQUEST })

        const { data } = await axios.delete(`/api/bookmark/delete/${id}`)

        dispatch({
            type: DELETE_BOOKMARK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_BOOKMARK_FAIL,
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