import {
    ALL_DEPARTMENT_REQUEST,
    ALL_DEPARTMENT_SUCCESS,
    ALL_DEPARTMENT_FAIL,
    NEW_DEPARTMENT_REQUEST,
    NEW_DEPARTMENT_SUCCESS,
    NEW_DEPARTMENT_RESET,
    NEW_DEPARTMENT_FAIL,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_RESET,
    DELETE_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT_RESET,
    DEPARTMENT_DETAILS_REQUEST,
    DEPARTMENT_DETAILS_SUCCESS,
    DEPARTMENT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/departmentConstants'

export const departmentsReducer = (state = { department: [] }, action) => {
    switch (action.type) {
        case  ALL_DEPARTMENT_REQUEST:
            return {
                loading: true,
                department: []
            }

        case  ALL_DEPARTMENT_SUCCESS:
            return {
                loading: false,
                department: action.payload.department,
                departmentCount: action.payload.departmentCount,
                resPerPage: action.payload.resPerPage,
                filteredDepartmentCount: action.payload.filteredDepartmentCount
            }

        case ALL_DEPARTMENT_FAIL:
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

export const newDepartmentReducer = (state = { department: {} }, action) => {
    switch (action.type) {

        case NEW_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_DEPARTMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                department: action.payload.department
            }

        case NEW_DEPARTMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_DEPARTMENT_RESET:
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

export const departmentReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_DEPARTMENT_REQUEST:
        case UPDATE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_DEPARTMENT_FAIL:
        case UPDATE_DEPARTMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_DEPARTMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_DEPARTMENT_RESET:
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

export const DepartmentDetailsReducer = (state = { department: {} }, action) => {
    switch (action.type) {

        case DEPARTMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DEPARTMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                department: action.payload
            }

        case DEPARTMENT_DETAILS_FAIL:
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