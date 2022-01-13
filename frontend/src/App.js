import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

//Home
import Home from './components/user/Home/Home'
import About from './components/user/Home/About'
import Category from './components/user/Home/Category'
import Contact from './components/user/Home/Contact'

//Auth
import Login from './components/user/Auth/Login'
import SignUp from './components/user/Auth/SignUp'
import SignUpAsStudent from './components/user/Auth/SignUpAsStudent'
import SignUpAsOrg from './components/user/Auth/SignUpAsOrg'
function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Route path="/" component={Home} exact/>
      <Route path="/About" component={About} exact/>
      <Route path="/Category" component={Category} exact/>
      <Route path="/Contact" component={Contact} exact/>
      <Route path="/Login" component={Login} exact/>
      <Route path="/SignUp" component={SignUp} exact/>
      <Route path="/student" component={SignUpAsStudent} exact/>
      <Route path="/organization" component={SignUpAsOrg} exact/>

      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
