import axios from 'axios';
import { 
    ALL_ADMINS_REQUEST,
    ALL_ADMINS_SUCCESS,
    ALL_ADMINS_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const getAdmins = (adminToken) => async (dispatch) => {
    try {

        dispatch({ type: ALL_ADMINS_REQUEST })

        const {data} = await axios.get('/admin/all_infor', {
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


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}