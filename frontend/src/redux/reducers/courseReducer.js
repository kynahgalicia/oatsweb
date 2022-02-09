import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_RESET,
    NEW_COURSE_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants'

export const coursesReducer = (state = { course: [] }, action) => {
    switch (action.type) {
        case  ALL_COURSE_REQUEST:
            return {
                loading: true,
                courses: []
            }

        case  ALL_COURSE_SUCCESS:
            return {
                loading: false,
                courses: action.payload.course,
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

export const newCourseReducer = (state = { course: {} }, action) => {
    switch (action.type) {

        case NEW_COURSE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_COURSE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                course: action.payload.course
            }

        case NEW_COURSE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_COURSE_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}