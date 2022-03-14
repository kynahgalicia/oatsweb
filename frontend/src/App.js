import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"

import React, {useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

//Admin
import LoginasAdmin from './components/admin/auth/LoginasAdmin'
import AdminDashboard from './components/admin/dashboard/AdminDashboard'
import ThesisList from './components/admin/thesis/ThesisList'
import DepartmentList from './components/admin/departments/DepartmentList'
import CourseList from './components/admin/courses/CourseList'
import PaymentList from './components/admin/payment/PaymentList'
import CreateDepartment from './components/admin/departments/CreateDepartment'
import Updatedepartment from './components/admin/departments/EditDepartment'
import CreateCourse from './components/admin/courses/CreateCourse'
import Updatecourse from './components/admin/courses/EditCourse'
import UserList from './components/admin/users/UserList'
import EditUser from './components/admin/users/EditUser'
import AdminList from './components/admin/admin/AdminList'

//Home
import Home from './components/user/Home/Home'
import About from './components/user/Home/About'
import Category from './components/user/Home/Category'
import Contact from './components/user/Home/Contact'

//Auth
import LoginasUser from './components/user/Auth/LoginasUser'
import LoginasGuest from './components/user/Auth/LoginasGuest'
import SignUp from './components/user/Auth/SignUp'
import SignUpAsStudent from './components/user/Auth/SignUpAsStudent'
import SignUpAsOrg from './components/user/Auth/SignUpAsOrg'
import ActivationEmail from './components/user/Auth/ActivationEmail';
import ActivationEmailGuest from './components/user/Auth/ActivationEmailGuest';
import Redirect from './components/user/Auth/Redirect'
import RedirectGuest from './components/user/Auth/RedirectGuest'
import ForgotPassword from './components/user/Auth/ForgotPassword'
import ResetPassword from './components/user/Auth/ResetPassword';

//Thesis User
import Search from './components/user/Search/Search'
import ThesisDetails from './components/user/Search/ThesisDetails'

//User Account
import UserProfile from './components/user/Account/UserProfile';
import UserBorrow from './components/user/Account/UserBorrow';
import UserBookmark from './components/user/Account/UserBookmark';

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
    console.log(token)

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
  }, [dispatch, token,adminToken, guestToken])
  

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
        <Route path="/user/login" component={LoginasUser} exact/>
        <Route path="/guest/login" component={LoginasGuest} exact/>
        <Route path="/SignUp" component={SignUp} exact/>
        <Route path="/user/student" component={SignUpAsStudent} exact/>
        <Route path="/user/guest" component={SignUpAsOrg} exact/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
        <Route path="/guest/activate/:activation_token" component={ActivationEmailGuest} exact/>
        <Route path="/user/forgot" component={ForgotPassword} exact/>
        <Route path="/user/reset/:token" component={ResetPassword} exact/>
        <Route path="/Redirect" component={Redirect} exact/>
        <Route path="/RedirectGuest" component={RedirectGuest} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path="/search/:keyword" component={Search} exact/>
        <Route path="/thesis/:thesisId" component={ThesisDetails} exact/>


        <Route path="/user/profile" component={UserProfile} exact/>
        <Route path="/user/borrow" component={UserBorrow} exact/>
        <Route path="/user/bookmark" component={UserBookmark} exact/>

        <Route path="/admin/dashboard" component={AdminDashboard} exact/>
        <Route path="/admin/login" component={LoginasAdmin} exact/>
        <Route path="/admin/thesis" component={ThesisList} exact/>
        <Route path="/admin/department" component={DepartmentList} exact/>
        <Route path="/admin/department/new" component={CreateDepartment} exact/>
        <Route path="/admin/department/edit/:departmentId" component={Updatedepartment} exact/>
        <Route path="/admin/course" component={CourseList} exact/>
        <Route path="/admin/course/new" component={CreateCourse} exact/>
        <Route path="/admin/course/edit/:courseId" component={Updatecourse} exact/>
        <Route path="/admin/users" component={UserList} exact/>
        <Route path="/admin/users/edit/:userId" component={EditUser} exact/>
        <Route path="/admin/admins" component={AdminList} exact/>
        <Route path="/admin/payment" component={PaymentList} exact/>
        <Route path="*">
          {NoMatch}
        </Route>
        </Switch>

      <Footer/>
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