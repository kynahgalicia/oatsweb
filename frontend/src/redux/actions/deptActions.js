import axios from "axios"
import {
    ALL_DEPT_REQUEST,
    ALL_DEPT_SUCCESS,
    ALL_DEPT_FAIL,
    NEW_DEPT_REQUEST,
    NEW_DEPT_SUCCESS,
    NEW_DEPT_RESET,
    NEW_DEPT_FAIL,
    CLEAR_ERRORS
} from '../constants/deptConstants'

export const getDept = (keyword='',department, startDate,endDate) => async (dispatch) => {
    try {
        dispatch({ type: ALL_DEPT_REQUEST })

        let link = ''
        if(department){
            // link = `/api/dept?keyword=${keyword}&department=${department}&createdAt[gt]=${startDate}&createdAt[lt]=${endDate}`
            link = `/api/department`
        } else{
            // link = `/api/dept?keyword=${keyword}&createdAt[gt]=${startDate}&createdAt[lt]=${endDate}`
            link = `/api/department`

        }

        const { data } = await axios.get(link)
        console.log(link)
        console.log(data)
        dispatch({
            type: ALL_DEPT_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_DEPT_FAIL,
            payload: error
        })
    }
}

export const newDept = (deptData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DEPT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/department/new`, deptData, config)

        dispatch({
            type: NEW_DEPT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DEPT_FAIL,
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
