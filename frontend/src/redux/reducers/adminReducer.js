import { 
    ALL_ADMINS_REQUEST,
    ALL_ADMINS_SUCCESS,
    ALL_ADMINS_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants'

export const adminsReducer = (state = { admins: [] }, action) => {
    switch (action.type) {
        case  ALL_ADMINS_REQUEST:
            return {
                loading: true,
                admins: []
            }

        case  ALL_ADMINS_SUCCESS:
            return {
                loading: false,
                admins: action.payload.admins,
                msg:action.paload
            }

        case ALL_ADMINS_FAIL:
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
