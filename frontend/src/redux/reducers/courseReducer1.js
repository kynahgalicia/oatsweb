import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants1'

export const courseReducer = (state = { course: [] }, action) => {
    switch (action.type) {
        case  ALL_COURSE_REQUEST:
            return {
                loading: true,
                course: []
            }

        case  ALL_COURSE_SUCCESS:
            return {
                loading: false,
                course: action.payload.course,
                courseCount: action.payload.courseCount,
                resPerPage: action.payload.resPerPage,
                filteredCourseCount: action.payload.filteredCourseCount
            }

        case ALL_COURSE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}