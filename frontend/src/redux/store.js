import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer, thesisDetailsReducer } from "./reducers/thesisReducer";
import { departmentsReducer, newDepartmentReducer, departmentReducer, DepartmentDetailsReducer } from "./reducers/departmentReducer";
import { courseReducer } from "./reducers/courseReducer1";
import {authReducer} from './reducers/authReducer'

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    thesisDetails: thesisDetailsReducer,
    // Department
    department: departmentsReducer, 
    newDepartment: newDepartmentReducer,
    departments: departmentReducer,
    departmentDetails: DepartmentDetailsReducer,
    //Course
    course: courseReducer,
    // Authentication
    auth: authReducer
})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;