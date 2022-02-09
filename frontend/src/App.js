import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"

import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import AdminDashboard from './components/admin/AdminDashboard'

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

import Search from './components/user/Search/Search'
import ThesisDetails from './components/user/Search/ThesisDetails'

import DashboardUser from './components/user/Dashboard/DashboardUser'

import NotFound from './components/img/404.png'

import { getToken } from './redux/actions/authActions'
function App() {


  useEffect(() => {
    store.dispatch(getToken())
  }, [])
  

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
        <Route path="/Redirect" component={Redirect} exact/>
        <Route path="/user/search" component={Search} exact/>
        <Route path="/user/search/:keyword" component={Search} exact/>
        <Route path="/user/search/details/:thesisId" component={ThesisDetails} exact/>
        <Route path="/user/dashboard" component={DashboardUser} exact/>

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