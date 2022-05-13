import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer, newThesisReducer, thesisDetailsReducer, studentThesisReducer, removeThesisReducer } from "./reducers/thesisReducer";

import { departmentsReducer, newDepartmentReducer, departmentReducer, DepartmentDetailsReducer } from "./reducers/departmentReducer"

import { courseReducer, newCourseReducer, courseUpdateReducer, CourseDetailsReducer } from "./reducers/courseReducer"

import { bookmarksReducer, newBookmarkReducer, bookmarkReducer} from "./reducers/bookmarkReducer"
import {borrowsReducer, newBorrowReducer, borrowReducer, verifyBorrowsReducer} from "./reducers/borrowReducer"

import {authUserReducer,authUserRegisterReducer,authTokenReducer, authForgotPassReducer}  from './reducers/authReducer'

import {authGuestReducer, authGuestRegisterReducer, authGuestTokenReducer, authGuestForgotPassReducer} from './reducers/authGuestReducer'

import { authAdminReducer,authAdminTokenReducer, authAdminRegisterReducer } from "./reducers/authAdminReducer"

import { usersReducer , userReducer, userDetailsReducer } from './reducers/userReducer'

import {guestsReducer , guestReducer, guestDetailsReducer } from './reducers/guestReducer'

import { adminsReducer , adminReducer, adminDetailsReducer} from './reducers/adminReducer'

import { subscriptionReducer , subscriptionsReducer, fetchSubscriptionsReducer, verifySubscriptionsReducer } from "./reducers/subscriptionReducer"

import { loggingReducer, logsReducer, dataCountReducer, homeCountReducer, featuredCountReducer, studentCountReducer, guestCountReducer } from "./reducers/loggingReducer"

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    newThesis: newThesisReducer,
    thesisDetails: thesisDetailsReducer,
    studentThesis: studentThesisReducer,
    thesisAdmin:removeThesisReducer,
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
    verifyBorrow: verifyBorrowsReducer,
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
    authAdminRegister:authAdminRegisterReducer,
    authAdminToken: authAdminTokenReducer,
    //Authentication Guest
    authGuest: authGuestReducer,
    authGuestRegister: authGuestRegisterReducer,
    authGuestToken: authGuestTokenReducer,
    authGuestForgot: authGuestForgotPassReducer,

    subscribed: subscriptionReducer,
    subscribes: subscriptionsReducer,
    subs: fetchSubscriptionsReducer,
    verifiedSub: verifySubscriptionsReducer,

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