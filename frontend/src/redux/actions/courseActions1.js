import axios from "axios"
import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,

} from '../constants/courseConstants1'

export const getCourse = (department) => async (dispatch) => {
    try {
        dispatch({ type: ALL_COURSE_REQUEST })

        let link =''
        if(department){
            link =`/api/course?department.id=${department}`
        } else {
            link =`/api/course`
        }
    


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