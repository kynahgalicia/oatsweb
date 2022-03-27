import axios from "axios"
import {
    ALL_BORROW_REQUEST,
    ALL_BORROW_SUCCESS,
    ALL_BORROW_FAIL,
    NEW_BORROW_REQUEST,
    NEW_BORROW_SUCCESS,
    NEW_BORROW_FAIL,
    UPDATE_BORROW_REQUEST,
    UPDATE_BORROW_SUCCESS,
    UPDATE_BORROW_FAIL,
    DELETE_BORROW_REQUEST,
    DELETE_BORROW_SUCCESS,
    DELETE_BORROW_FAIL,
    CLEAR_ERRORS
} from '../constants/borrowConstants'

//get
export const getBorrow = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BORROW_REQUEST })

        let link =`/api/borrow`


        const { data } = await axios.get(link)
        console.log(link)
        dispatch({
            type: ALL_BORROW_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_BORROW_FAIL,
            payload: error
        })
    }
}

//Create borrow
export const newBorrow = (borrowData,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BORROW_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/borrow/new`, borrowData, config)

        dispatch({
            type: NEW_BORROW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BORROW_FAIL,
            payload: error.response.data.message
        })
    }
}

//EDIT
export const updateBorrow = (id, borrowData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BORROW_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': adminToken,
        //         'Content-Type': 'application/json'
        //     }
        // }
        const { data } = await axios.put(`/api/borrow/edit/${id}`, borrowData)

        dispatch({
            type: UPDATE_BORROW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_BORROW_FAIL,
            payload: error.response.data.message
        })
    }
}

//DELETE
export const deleteBorrow = (id,adminToken) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BORROW_REQUEST })

        const config = {
            headers: {
                'Authorization': adminToken,
            }
        }
        const { data } = await axios.delete(`/api/borrow/delete/${id}`, config)

        dispatch({
            type: DELETE_BORROW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_BORROW_FAIL,
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