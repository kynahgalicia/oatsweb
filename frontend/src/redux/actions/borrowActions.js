import axios from 'axios'
import {
    ALL_BORROW_REQUEST,
    ALL_BORROW_SUCCESS,
    ALL_BORROW_FAIL,
    ALL_STUDENT_BORROW_REQUEST,
    ALL_STUDENT_BORROW_SUCCESS,
    ALL_STUDENT_BORROW_FAIL,
    NEW_BORROW_REQUEST,
    NEW_BORROW_SUCCESS,
    NEW_BORROW_FAIL,
    STUDENT_BORROW_REQUEST,
    STUDENT_BORROW_SUCCESS,
    STUDENT_BORROW_FAIL,
    UPDATE_BORROW_REQUEST,
    UPDATE_BORROW_SUCCESS,
    UPDATE_BORROW_FAIL,
    DELETE_BORROW_REQUEST,
    DELETE_BORROW_SUCCESS,
    DELETE_BORROW_FAIL,
    VERIFY_BORROW_REQUEST,
    VERIFY_BORROW_SUCCESS,
    VERIFY_BORROW_FAIL,
    DECLINE_BORROW_REQUEST,
    DECLINE_BORROW_SUCCESS,
    DECLINE_BORROW_FAIL,
    CLEAR_ERRORS
} from '../constants/borrowConstants'

//get
export const getBorrow = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BORROW_REQUEST })

        let link = process.env.REACT_APP_URL + `/api/borrow`


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
export const getStudentBorrow = (userData) => async (dispatch) => {
    try {
        dispatch({ type: ALL_STUDENT_BORROW_REQUEST })

        let link = process.env.REACT_APP_URL + `/api/borrow/request/all`


        const { data } = await axios.get(link, userData)
        console.log(link)
        dispatch({
            type: ALL_STUDENT_BORROW_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_STUDENT_BORROW_FAIL,
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

        const { data } = await axios.post(process.env.REACT_APP_URL + `/api/borrow/new`, borrowData, config)

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

export const studentBorrow = (borrowData) => async (dispatch) => {
    try {

        dispatch({ type: STUDENT_BORROW_REQUEST })


        const { data } = await axios.post(process.env.REACT_APP_URL + `/api/borrow/request`, borrowData)

        dispatch({
            type: STUDENT_BORROW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STUDENT_BORROW_FAIL,
            payload: error.response.data
        })
    }
}

//EDIT
export const returnBorrow = (borrowData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BORROW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const {data} = await axios.put( process.env.REACT_APP_URL + `/api/borrow/return`, borrowData, config)

        dispatch({
            type: UPDATE_BORROW_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: UPDATE_BORROW_FAIL,
            payload: error.response.data.msg
        })
    }
}

//DELETE
export const deleteBorrow = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BORROW_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': adminToken,
        //     }
        // }
        const { data } = await axios.delete(process.env.REACT_APP_URL + `/api/borrow/delete/${id}`)

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

export const verifyBorrow = (borrowData) => async (dispatch) => {
    try {

        dispatch({ type: VERIFY_BORROW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const {data} = await axios.put( process.env.REACT_APP_URL + `/api/borrow/verify`, borrowData, config)

        dispatch({
            type: VERIFY_BORROW_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: VERIFY_BORROW_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const declineBorrow = (id) => async (dispatch) => {
    try {

        dispatch({ type: DECLINE_BORROW_REQUEST })


        const {data} = await axios.put( process.env.REACT_APP_URL + `/api/borrow/decline/${id}`)

        dispatch({
            type: DECLINE_BORROW_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DECLINE_BORROW_FAIL,
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