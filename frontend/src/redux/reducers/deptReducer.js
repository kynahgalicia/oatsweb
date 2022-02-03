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

export const deptReducer = (state = { dept: [] }, action) => {
    switch (action.type) {
        case  ALL_DEPT_REQUEST:
            return {
                loading: true,
                dept: []
            }

        case  ALL_DEPT_SUCCESS:
            return {
                loading: false,
                dept: action.payload.dept,
                deptCount: action.payload.deptCount,
                resPerPage: action.payload.resPerPage,
                filteredDeptCount: action.payload.filteredDeptCount
            }

        case ALL_DEPT_FAIL:
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

export const newDeptReducer = (state = { dept: {} }, action) => {
    switch (action.type) {

        case NEW_DEPT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DEPT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                dept: action.payload.dept
            }

        case NEW_DEPT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_DEPT_RESET:
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
