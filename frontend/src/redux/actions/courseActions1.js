import axios from "axios"
import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,

} from '../constants/courseConstants1'

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