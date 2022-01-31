import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer, thesisDetailsReducer } from "./reducers/thesisReducer";
import { departmentReducer } from "./reducers/departmentReducer1";
import { courseReducer } from "./reducers/courseReducer1";

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    thesisDetails: thesisDetailsReducer,
    // Department
    department: departmentReducer,
    //Course
    course: courseReducer
})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;