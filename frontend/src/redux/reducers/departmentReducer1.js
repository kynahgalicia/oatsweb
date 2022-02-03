import {
    ALL_DEPARTMENT_REQUEST,
    ALL_DEPARTMENT_SUCCESS,
    ALL_DEPARTMENT_FAIL,
    CLEAR_ERRORS
} from '../constants/departmentConstants1'

export const departmentReducer = (state = { department: [] }, action) => {
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