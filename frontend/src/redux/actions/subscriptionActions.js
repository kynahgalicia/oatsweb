import axios from 'axios'
import { 
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAIL,
    DELETE_SUBSCRIBE_REQUEST,
    DELETE_SUBSCRIBE_SUCCESS,
    DELETE_SUBSCRIBE_FAIL,

    CLEAR_ERRORS
} from '../constants/subscriptionConstants';

export const userSubscribe = (subData) => async (dispatch) => {
    try {

        dispatch({ type: SUBSCRIBE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post( process.env.REACT_APP_URL + '/api/subscription/new', subData, config )

        dispatch({
            type: SUBSCRIBE_USER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SUBSCRIBE_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const deleteSubscribe = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBSCRIBE_REQUEST })


        const {data} = await axios.delete( process.env.REACT_APP_URL + `/api/subscription/delete/${id}`)

        dispatch({
            type: DELETE_SUBSCRIBE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DELETE_SUBSCRIBE_FAIL,
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