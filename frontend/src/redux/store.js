import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer } from "./reducers/thesisReducer";
import { departmentsReducer, newDepartmentReducer, departmentReducer, DepartmentDetailsReducer } from "./reducers/departmentReducer";
import { coursesReducer, newCourseReducer } from "./reducers/courseReducer";

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    //Department
    department: departmentsReducer, 
    newDepartment: newDepartmentReducer,
    departments: departmentReducer,
    departmentDetails: DepartmentDetailsReducer,
    //Course
    courses: coursesReducer,
    newCourse: newCourseReducer,
})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;