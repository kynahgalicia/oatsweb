import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer, newThesisReducer, thesisDetailsReducer, studentThesisReducer } from "./reducers/thesisReducer";

import { departmentsReducer, newDepartmentReducer, departmentReducer, DepartmentDetailsReducer } from "./reducers/departmentReducer"

import { courseReducer, newCourseReducer, courseUpdateReducer, CourseDetailsReducer } from "./reducers/courseReducer"

import { bookmarksReducer, newBookmarkReducer, bookmarkReducer} from "./reducers/bookmarkReducer"
import {borrowsReducer, newBorrowReducer, borrowReducer} from "./reducers/borrowReducer"

import {authUserReducer,authUserRegisterReducer,authTokenReducer, authForgotPassReducer} from './reducers/authReducer'

import {authGuestReducer, authGuestRegisterReducer, authGuestTokenReducer} from './reducers/authGuestReducer'

import { authAdminReducer,authAdminTokenReducer } from "./reducers/authAdminReducer"

import { usersReducer , userReducer, userDetailsReducer } from './reducers/userReducer'

import {guestsReducer , guestReducer, guestDetailsReducer } from './reducers/guestReducer'

import { adminsReducer , adminReducer, adminDetailsReducer} from './reducers/adminReducer'

import { subscriptionReducer , subscriptionsReducer } from "./reducers/subscriptionReducer"

import { loggingReducer, logsReducer, dataCountReducer, homeCountReducer, featuredCountReducer, studentCountReducer, guestCountReducer } from "./reducers/loggingReducer"

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    newThesis: newThesisReducer,
    thesisDetails: thesisDetailsReducer,
    studentThesis: studentThesisReducer,
    // Department
    department: departmentsReducer, 
    newDepartment: newDepartmentReducer,
    departments: departmentReducer,
    departmentDetails: DepartmentDetailsReducer,
    //Course
    courses: courseReducer,
    newCourse: newCourseReducer,
    course: courseUpdateReducer,
    courseDetails: CourseDetailsReducer,
    //Bookmark
    bookmarks: bookmarksReducer,
    newBookmark: newBookmarkReducer,
    bookmark: bookmarkReducer,
    //Borrow
    borrows: borrowsReducer,
    newBorrow: newBorrowReducer,
    borrow: borrowReducer,
    //Users
    users:usersReducer,
    user:userReducer,
    userDetails: userDetailsReducer,
    //Guests
    guests:guestsReducer,
    guest:guestReducer,
    guestDetails: guestDetailsReducer,
    //Admin
    admins:adminsReducer,
    admin:adminReducer,
    adminDetails: adminDetailsReducer,
    // Authentication
    authUser: authUserReducer,
    authUserRegister: authUserRegisterReducer,
    authToken:authTokenReducer,
    authForgot:authForgotPassReducer,
    //Authentication Admin
    authAdmin:authAdminReducer,
    authAdminToken: authAdminTokenReducer,
    //Authentication Guest
    authGuest: authGuestReducer,
    authGuestRegister: authGuestRegisterReducer,
    authGuestToken: authGuestTokenReducer,

    subscribed: subscriptionReducer,
    subscribes: subscriptionsReducer,

    logging: loggingReducer,
    logs: logsReducer,
    dataCount: dataCountReducer,
    homeCount: homeCountReducer,
    featuredCount: featuredCountReducer,
    studentCount: studentCountReducer,
    guestCount: guestCountReducer

})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;