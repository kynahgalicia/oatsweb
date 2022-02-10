import React, {Fragment, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import { useAlert } from 'react-alert'
import { Nav, Navbar, Container,Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../redux/actions/authActions'

const Header = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    const alert = useAlert()

    const {isLoggedIn} = useSelector(state => state.authUser)
    const {token, isLogged, isUser} = useSelector(state => state.authToken)

    const isAdmin = false

    useEffect(() => {

            // const firstLogin = localStorage.getItem('firstLogin')
            if(isLoggedIn){
                // dispatch(getToken())   
                console.log('token')
            }
        
    }, [ dispatch,isLoggedIn, isUser]);

    const logoutHandler = () => {
        dispatch(logout());
        window.location.reload();
        alert.success('Logged out successfully.')
        
    }

    const setProfile = () => {

        return (
            <>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            <BsPersonFill size={20}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to="/"> Profile</Link></Dropdown.Item>
                { isAdmin ? <Dropdown.Item><Link to="/admin/dashboard"> Dashboard</Link></Dropdown.Item>:<Dropdown.Item><Link to="/user/dashboard"> Dashboard</Link></Dropdown.Item>}
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
            <Link to="/Cart" className='white'><FaShoppingCart size={20} /></Link>
            </>
        )
    }

    return ( 
        <Fragment>
        <div className="header">
        <Navbar collapseOnSelect expand="lg">
        <Container>
        {isAdmin? <Navbar.Brand ><Link to="/admin/dashboard" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>  : <Navbar.Brand ><Link to="/" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>}
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            </Nav>
            <Nav>
            
            {isAdmin ? null  : setUserLink()}
            {isLoggedIn || isLogged ? setProfile() : <Link to="/user/login" className='white'><BsPersonFill size={20}/></Link>  }
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>

        </Fragment >
    );
}

export default Header;