import axios from "axios"
import {
    ALL_THESIS_REQUEST,
    ALL_THESIS_SUCCESS,
    ALL_THESIS_FAIL
} from '../constants/thesisConstants'

export const getThesis = (keyword='',department, startDate,endDate) => async (dispatch) => {
    try {
        dispatch({ type: ALL_THESIS_REQUEST })

        let link = ''
        if(department){
            link = `/api/thesis?keyword=${keyword}&department=${department}&createdAt[gt]=${startDate}&createdAt[lt]=${endDate}`
        } else{
            link = `/api/thesis?keyword=${keyword}&createdAt[gt]=${startDate}&createdAt[lt]=${endDate}`
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
