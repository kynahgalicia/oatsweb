import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer } from "./reducers/thesisReducer";
import { deptReducer, newDeptReducer } from "./reducers/deptReducer";

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    //Dept
    dept: deptReducer, 
    newDept: newDeptReducer
})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;