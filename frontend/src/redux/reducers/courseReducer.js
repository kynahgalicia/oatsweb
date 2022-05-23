import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_SUCCESS,
    ALL_COURSE_FAIL,
    ADMIN_COURSE_REQUEST,
    ADMIN_COURSE_SUCCESS,
    ADMIN_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_RESET,
    NEW_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_RESET,
    DELETE_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,
    UPDATE_COURSE_RESET,
    RESTORE_COURSE_REQUEST,
    RESTORE_COURSE_SUCCESS,
    RESTORE_COURSE_FAIL,
    RESTORE_COURSE_RESET,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants'

export const courseReducer = (state = { course: [] }, action) => {
    switch (action.type) {
        case  ALL_COURSE_REQUEST:
        case  ADMIN_COURSE_REQUEST:
            return {
                loading: true,
                course: []
            }

        case  ALL_COURSE_SUCCESS: 
        case  ADMIN_COURSE_SUCCESS: 
            return {
                loading: false,
                course: action.payload.course,
                dept: action.payload.dept,
                courseCount: action.payload.courseCount,
                resPerPage: action.payload.resPerPage,
                filteredCourseCount: action.payload.filteredCourseCount
            }

        case ALL_COURSE_FAIL:
        case ADMIN_COURSE_FAIL:
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

export const courseUpdateReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_COURSE_REQUEST:
        case RESTORE_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success, 
                msg: action.payload.msg
            }

        case RESTORE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isRestored: action.payload.success, 
                msg: action.payload.msg
            }

        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_COURSE_FAIL:
        case RESTORE_COURSE_FAIL:
        case UPDATE_COURSE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_COURSE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case RESTORE_COURSE_RESET:
            return {
                ...state,
                isRestored: false
            }

        case UPDATE_COURSE_RESET:
            return {
                ...state,
                isUpdated: false
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

export const CourseDetailsReducer = (state = { course: {} }, action) => {
    switch (action.type) {

        case COURSE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case COURSE_DETAILS_SUCCESS:
            return {
                loading: false,
                course: action.payload
            }

        case COURSE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
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