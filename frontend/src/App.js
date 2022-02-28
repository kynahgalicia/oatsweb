import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"

import React, {Fragment, useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

//Admin
import AdminDashboard from './components/admin/AdminDashboard'
import ThesisList from './components/admin/thesis/ThesisList'
import DepartmentList from './components/admin/departments/DepartmentList'
import CourseList from './components/admin/courses/CourseList'
import UserList from './components/admin/users/UserList'
import PaymentList from './components/admin/payment/PaymentList'
import CreateDepartment from './components/admin/departments/CreateDepartment'
import Updatedepartment from './components/admin/departments/EditDepartment'
import CreateCourse from './components/admin/courses/CreateCourse'
import Updatecourse from './components/admin/courses/EditCourse'

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
import Redirect from './components/user/Auth/Redirect'
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
function App() {

  const dispatch = useDispatch()
  const [thisToken, setThisToken] = useState('')

  const {token} = useSelector(state => state.authToken)
  useEffect(() => {
    console.log(token)

    if(!thisToken){
      dispatch(getToken())
      setThisToken(token)
    }

    dispatch(loadUser(token))
  }, [dispatch, token])
  

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
        <Route path="/user/organization" component={SignUpAsOrg} exact/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
        <Route path="/user/forgot" component={ForgotPassword} exact/>
        <Route path="/user/reset/:token" component={ResetPassword} exact/>
        <Route path="/Redirect" component={Redirect} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path="/search/:keyword" component={Search} exact/>
        <Route path="/thesis/:thesisId" component={ThesisDetails} exact/>


        <Route path="/user/profile" component={UserProfile} exact/>
        <Route path="/user/borrow" component={UserBorrow} exact/>
        <Route path="/user/bookmark" component={UserBookmark} exact/>

        <Route path="/admin/dashboard" component={AdminDashboard} exact/>
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