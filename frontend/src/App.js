import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"

import React, {useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Terms from './components/layout/Terms'

//Admin
import LoginasAdmin from './components/admin/auth/LoginasAdmin'
import AdminDashboard from './components/admin/dashboard/AdminDashboard'

import ThesisList from './components/admin/thesis/ThesisList'
import DeletedThesisList from './components/admin/thesis/DeletedThesisList'

import CreateThesis from './components/admin/thesis/CreateThesis'
import DepartmentList from './components/admin/departments/DepartmentList'
import CreateDepartment from './components/admin/departments/CreateDepartment'
import Updatedepartment from './components/admin/departments/EditDepartment'
import DeletedDepartment from './components/admin/departments/DeletedDepartment'

import CourseList from './components/admin/courses/CourseList'
import CreateCourse from './components/admin/courses/CreateCourse'
import Updatecourse from './components/admin/courses/EditCourse'
import DeletedCourseList from './components/admin/courses/DeletedCourseList'


import SubscriptionList from './components/admin/subscribers/SubscriptionList'
import SubscriptionRequest from './components/admin/subscribers/SubscriptionRequest'

import UserList from './components/admin/users/UserList'
import DeletedUserList from './components/admin/users/DeletedUserList'
import EditUser from './components/admin/users/EditUser'

import AdminList from './components/admin/admin/AdminList'
import EditAdmin from './components/admin/admin/EditAdmin'
import CreateAdmin from './components/admin/admin/CreateAdmin';
import ActivationEmailAdmin from './components/admin/admin/ActivationEmailAdmin';
import DeletedAdminList from './components/admin/admin/DeletedAdminList';

import GuestList from './components/admin/guest/GuestList'
import DeletedGuestList from './components/admin/guest/DeletedGuestList'

import BorrowList from './components/admin/borrow/BorrowList'
import OverdueBorrowList from './components/admin/borrow/OverdueBorrowList'
import BorrowRequest from './components/admin/borrow/BorrowRequest'
import CreateBorrow from './components/admin/borrow/CreateBorrow'
import ReturnList from './components/admin/borrow/ReturnList'

//Home
import Home from './components/user/Home/Home'
import About from './components/user/Home/About'
import Category from './components/user/Home/Category'
import Contact from './components/user/Home/Contact'
import ScanToText from './components/utils/ScanToText';

//Auth User
import LoginasUser from './components/user/Auth/LoginasUser'
import SignUp from './components/user/Auth/SignUp'
import SignUpAsStudent from './components/user/Auth/SignUpAsStudent'
import ActivationEmail from './components/user/Auth/ActivationEmail';
import Redirect from './components/user/Auth/Redirect'
import ForgotPassword from './components/user/Auth/ForgotPassword'
import ResetPassword from './components/user/Auth/ResetPassword';

// Auth Guest
import LoginasGuest from './components/guest/Auth/LoginasGuest'
import SignUpAsOrg from './components/guest/Auth/SignUpAsOrg'
import ActivationEmailGuest from './components/guest/Auth/ActivationEmailGuest';
import RedirectGuest from './components/guest/Auth/RedirectGuest'
import ForgotPasswordGuest from './components/guest/Auth/ForgotPasswordGuest';
import ResetPasswordGuest from './components/guest/Auth/ResetPasswordGuest';

//Thesis User
import Search from './components/user/Search/Search'
import ThesisDetails from './components/user/Search/ThesisDetails'
import ViewPDF from './components/user/Search/ViewPDF'

//User Account
import UserProfile from './components/user/Account/UserProfile';
import UserBorrow from './components/user/Account/UserBorrow';
import UserBookmark from './components/user/Account/UserBookmark';
import UserSubscription from './components/user/Account/subsciption/UserSubscription';
import UserPayment from './components/user/Account/subsciption/UserPayment';
import UserThesisList from './components/user/Account/Thesis/UserThesisList';
import UserCreateThesis from './components/user/Account/Thesis/UserCreateThesis';
import EditUserProfile from './components/user/Account/EditUserProfile';
//Guest Account
import GuestProfile from './components/guest/Account/GuestProfile';
import GuestBookmark from './components/guest/Account/GuestBookmark';
import GuestSubscription from './components/guest/Account/subscription/GuestSubscription';
import GuestPayment from './components/guest/Account/subscription/GuestPayment';
import EditGuestProfile from './components/guest/Account/EditGuestProfile';

import NotFound from './components/img/404.png'

import { getToken, loadUser } from './redux/actions/authActions'
import { getAdminToken, loadAdmin} from './redux/actions/authAdminActions'
import { getGuestToken, loadGuest} from './redux/actions/authGuestActions'


function App() {

  const dispatch = useDispatch()
  const [thisToken, setThisToken] = useState('')
  const [thisAdminToken, setThisAdminToken] = useState('')
  const [thisGuestToken, setThisGuestToken] = useState('')

  const {token} = useSelector(state => state.authToken)
  const {adminToken} = useSelector(state => state.authAdminToken)
  const {guestToken} = useSelector(state => state.authGuestToken)
  useEffect(() => {

    // console.log(token)
    if(!thisToken){
      dispatch(getToken())
      setThisToken(token)
    }

    if(!thisAdminToken){
      dispatch(getAdminToken())
      setThisAdminToken(adminToken)
    }

    if(!thisGuestToken){
      dispatch(getGuestToken())
      setThisGuestToken(guestToken)
    }

    
      dispatch(loadUser(token))
    dispatch(loadAdmin(adminToken))
    dispatch(loadGuest(guestToken))
  }, [dispatch, token,adminToken, guestToken, thisAdminToken, thisGuestToken, thisToken])
  

  return (
    <Router>
      {/* {loading ? <Loader /> : (  */}
      <div className="App">
      <Header/>

      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/About" component={About} exact/>
        <Route path="/Category" component={Category} exact/>
        <Route path="/Contact" component={Contact} exact/>
        <Route path="/Terms" component={Terms} exact/>
        <Route path="/scan-to-text" component={ScanToText} exact/>


        <Route path="/user/login" component={LoginasUser} exact/>
        <Route path="/SignUp" component={SignUp} exact/>
        <Route path="/user/student" component={SignUpAsStudent} exact/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
        <Route path="/admin/activate/:activation_token" component={ActivationEmailAdmin} exact/>
        <Route path="/user/forgot" component={ForgotPassword} exact/>
        <Route path="/user/reset/:token" component={ResetPassword} exact/>
        <Route path="/Redirect" component={Redirect} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path="/search/:keyword" component={Search} exact/>
        <Route path="/thesis/:thesisId" component={ThesisDetails} exact/>
        <Route path="/view/:thesisId" component={ViewPDF} exact/>


        <Route path="/guest/login" component={LoginasGuest} exact/>
        <Route path="/RedirectGuest" component={RedirectGuest} exact/>
        <Route path="/user/guest" component={SignUpAsOrg} exact/>
        <Route path="/guest/activate/:activation_token" component={ActivationEmailGuest} exact/>
        <Route path="/guest/forgot" component={ForgotPasswordGuest} exact/>
        <Route path="/guest/reset/:token" component={ResetPasswordGuest} exact/>

        <Route path="/user/profile" component={UserProfile} exact/>
        <Route path="/user/profile/edit" component={EditUserProfile} exact/>
        <Route path="/user/borrow" component={UserBorrow} exact/>
        <Route path="/user/bookmark" component={UserBookmark} exact/>
        <Route path="/user/subscription" component={UserSubscription} exact/>
        <Route path="/user/payment/:sub" component={UserPayment} exact/>
        <Route path="/user/thesis" component={UserThesisList} exact/>
        <Route path="/user/thesis/new" component={UserCreateThesis} exact/>

        <Route path="/guest/profile" component={GuestProfile} exact/>
        <Route path="/guest/profile/edit" component={EditGuestProfile} exact/>
        <Route path="/guest/bookmark" component={GuestBookmark} exact/>
        <Route path="/guest/subscription" component={GuestSubscription} exact/>
        <Route path="/guest/payment/:sub" component={GuestPayment} exact/>

        <Route path="/admin/dashboard" component={AdminDashboard} exact/>
        <Route path="/admin/login" component={LoginasAdmin} exact/>
        <Route path="/admin/thesis" component={ThesisList} exact/>
        <Route path="/admin/thesis/deleted" component={DeletedThesisList} exact/>
        <Route path="/admin/thesis/new" component={CreateThesis} exact/>
        <Route path="/admin/department" component={DepartmentList} exact/>
        <Route path="/admin/department/new" component={CreateDepartment} exact/>
        <Route path="/admin/department/edit/:departmentId" component={Updatedepartment} exact/>
        <Route path="/admin/department/deleted" component={DeletedDepartment} exact/>
        <Route path="/admin/course" component={CourseList} exact/>
        <Route path="/admin/course/new" component={CreateCourse} exact/>
        <Route path="/admin/course/edit/:courseId" component={Updatecourse} exact/>
        <Route path="/admin/course/deleted" component={DeletedCourseList} exact/>
        <Route path="/admin/users" component={UserList} exact/>
        <Route path="/admin/users/deleted" component={DeletedUserList} exact/>
        <Route path="/admin/users/edit/:userId" component={EditUser} exact/>
        <Route path="/admin/admins" component={AdminList} exact/>
        <Route path="/admin/admins/edit/:adminId" component={EditAdmin} exact/>
        <Route path="/admin/admins/new" component={CreateAdmin} exact/>
        <Route path="/admin/admins/deleted" component={DeletedAdminList} exact/>
        <Route path="/admin/guests" component={GuestList} exact/>
        <Route path="/admin/guests/deleted" component={DeletedGuestList} exact/>
        <Route path="/admin/subscription/list" component={SubscriptionList} exact/>
        <Route path="/admin/subscription/request" component={SubscriptionRequest} exact/>
        <Route path="/admin/borrow" component={BorrowList} exact/>
        <Route path="/admin/borrow/overdue" component={OverdueBorrowList} exact/>
        <Route path="/admin/borrow/new" component={CreateBorrow} exact/>
        <Route path="/admin/borrow/request" component={BorrowRequest} exact/>
        <Route path="/admin/return" component={ReturnList} exact/>
        <Route path="*">
          {NoMatch}
        </Route>
        </Switch>

    <div className="footer">
      <Footer/>
    </div>
    </div>
    {/* )} */}
    
    </Router>
    
  );
}

export default App;

// No Match Path (404 Not Found)
function NoMatch() {
  return (
      <div className="wrapper">
      <h1 className='m-5'>404 Not Found</h1>
      <img src={NotFound} alt="logo" className="img-404" />
      </div>
  );
}