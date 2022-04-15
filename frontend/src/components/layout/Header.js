import React, {Fragment, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import { useAlert } from 'react-alert'
import { Nav, Navbar, Container,Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../redux/actions/authActions'
import {logoutAdmin} from '../../redux/actions/authAdminActions'
import {logoutGuest} from '../../redux/actions/authGuestActions'
import { deleteSubscribe } from '../../redux/actions/subscriptionActions';
import moment from 'moment'

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const [thisUser, setThisUser] = useState('')
    const [thisAdmin, setThisAdmin] = useState('')
    const [thisGuest, setThisGuest] = useState('')
    const {isLoggedIn, user, subType} = useSelector(state => state.authUser)
    const {isLogged, isUser} = useSelector(state => state.authToken)
    const {isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {isLoggedAdmin} = useSelector(state => state.authAdminToken)
    const {isLoggedInGuest, guest, subTypeGuest} = useSelector(state => state.authGuest)
    const { isLoggedGuest} = useSelector(state => state.authGuestToken)
    const {isDeleted} = useSelector(state => state.subscribes)

    useEffect(() => {
        
            if(isLoggedIn){
                setThisUser(user.user_tupid)

                
                if(subType){
                const startDate = moment(subType.paidAt);
                const timeEnd = moment(Date.now());
                const diff = timeEnd.diff(startDate);
                const diffDuration = moment.duration(diff);

                const duration = diffDuration._data.days;
                
                console.log(duration)
                if(subType.status === "Active" && duration >= 1 ){
                    dispatch(deleteSubscribe(subType._id))
                    window.location.reload()
                }
            }}

            if(isLoggedInAdmin){
                setThisAdmin(admin.admin_tupid)        
            }

            if(isLoggedInGuest){
                setThisGuest(guest.guest_fname)

                if(subTypeGuest){
                    const startDate = moment(subTypeGuest.paidAt);
                    const timeEnd = moment(Date.now());
                    const diff = timeEnd.diff(startDate);
                    const diffDuration = moment.duration(diff);
    
                    const duration = diffDuration._data.days;
                    
                    console.log(duration)
                    if(subTypeGuest.status === "Active" && duration >= 1 ){
                        dispatch(deleteSubscribe(subTypeGuest._id))
                        window.location.reload()
                    }
            }
        }

            if(isDeleted){
                alert.error("Subscription has expired")
            }
        
    }, [ dispatch,isLoggedIn, isLoggedInAdmin, isLoggedInGuest,isUser, user, admin,guest, subType, subTypeGuest, isDeleted]);

    const logoutHandler = () => {

        if(isLoggedInGuest){
            dispatch(logoutGuest());
            history.push('/guest/login')
            window.location.reload();
            alert.success('Logged out successfully.')
        }
        if(isLoggedInAdmin){
            dispatch(logoutAdmin());
            history.push('/admin/login')
            window.location.reload();
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
                    <Dropdown className='m-2'>
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
    const setProfileGuest = () => {

        return (
            <>
            <Dropdown className='m-2'>
            <Dropdown.Toggle id="dropdown-basic">
            {thisGuest}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to="/guest/profile"> Account</Link></Dropdown.Item>
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
            {isLoggedInGuest || isLoggedGuest ? setProfileGuest() :null}
            {isLoggedInAdmin || isLoggedAdmin ? setProfileAdmin() : null  }
            {isLoggedInAdmin || isLoggedIn || isLoggedInGuest ? null :  <Link to="/user/login" className='white'>{<BsPersonFill size={20}/>}</Link>   }

            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>

        </Fragment >
    );
}

export default Header;