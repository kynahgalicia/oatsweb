import React, {Fragment, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import { useAlert } from 'react-alert'
import { Nav, Navbar, Container,Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../redux/actions/authActions'
import {logoutAdmin} from '../../redux/actions/authAdminActions'

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const [thisUser, setThisUser] = useState('')
    const [thisAdmin, setThisAdmin] = useState('')
    const {isLoggedIn, user} = useSelector(state => state.authUser)
    const {token, isLogged, isUser} = useSelector(state => state.authToken)
    const {isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken, isLoggedAdmin, isAdmin} = useSelector(state => state.authAdminToken)

    useEffect(() => {
        
            if(isLoggedIn){
                setThisUser(user.user_tupid)
            }

            if(isLoggedInAdmin){
                setThisAdmin(admin.admin_tupid)        
            }
        
    }, [ dispatch,isLoggedIn, isLoggedInAdmin,isUser, user, admin]);

    const logoutHandler = () => {

        if(isLoggedInAdmin){
            dispatch(logoutAdmin());
            history.push('/admin/login')
            alert.success('Logged out successfully.')
        }
        if(isLoggedIn){
            dispatch(logout());
            window.location.reload();
            alert.success('Logged out successfully.')
        }
    
        
    }

    const setProfile = () => {

        return (
            <>
            <Link to="/Cart" className='white'><FaShoppingCart size={20} /></Link>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            {thisUser}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to="/user/profile"> Account</Link></Dropdown.Item>
                <Dropdown.Item><Link onClick={() => logoutHandler()}> Logout</Link></Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </>
        )
        
    }
    const setProfileAdmin = () => {

        return (
            <>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            {thisAdmin}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            
                <Dropdown.Item><Link to="/admin/dashboard"> Dashboard</Link></Dropdown.Item>
                <Dropdown.Item><Link onClick={() => logoutHandler()}> Logout</Link></Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </>
        )
        
    }
    
    const setUserLink = () =>{

        return(
            <>
            <Link to="/About" className='white'>About</Link> 
            <Link to="/Category" className='white'>Category</Link> 
            <Link to="/Contact" className='white'>Contact</Link> 
            </>
        )
    }

    return ( 
        <Fragment>
        <div className="header">
        <Navbar collapseOnSelect expand="lg">
        <Container>
        {isLoggedInAdmin? <Navbar.Brand ><Link to="/admin/dashboard" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>  : <Navbar.Brand ><Link to="/" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>}
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            </Nav>
            <Nav>
            {isLoggedInAdmin ? null  : setUserLink()}
            {isLoggedIn || isLogged ? setProfile() :null}
            {isLoggedInAdmin || isLoggedAdmin ? setProfileAdmin() : <Link to="/user/login" className='white'>{<BsPersonFill size={20}/>}</Link>  }
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>

        </Fragment >
    );
}

export default Header;