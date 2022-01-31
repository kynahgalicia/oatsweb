import axios from "axios"
import {
    ALL_DEPARTMENT_REQUEST,
    ALL_DEPARTMENT_SUCCESS,
    ALL_DEPARTMENT_FAIL,

} from '../constants/departmentConstants1'

export const getDepartment = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_DEPARTMENT_REQUEST })

        let link =`/api/department`


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