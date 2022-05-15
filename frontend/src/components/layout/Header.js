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
import { expireSubscribe } from '../../redux/actions/subscriptionActions';
import Notifications from "react-notifications-menu";
import moment from 'moment'
import logo from '../img/logo.png'
import bell from '../img/bell-solid.svg'
import expire from '../img/exclamation-circle-solid.svg'
const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const [thisUser, setThisUser] = useState('')
    const [thisAdmin, setThisAdmin] = useState('')
    const [thisGuest, setThisGuest] = useState('')
    const {isLoggedIn, user, subType, overdueCount} = useSelector(state => state.authUser)
    const {isLogged, isUser} = useSelector(state => state.authToken)
    const {isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {isLoggedAdmin} = useSelector(state => state.authAdminToken)
    const {isLoggedInGuest, guest, subTypeGuest} = useSelector(state => state.authGuest)
    const { isLoggedGuest} = useSelector(state => state.authGuestToken)

    useEffect(() => {
        
            if(isLoggedIn){
                setThisUser(user.user_tupid)
            }

            if(isLoggedInAdmin){
                setThisAdmin(admin.admin_tupid)        
            }

            if(isLoggedInGuest){
                setThisGuest(guest.guest_fname)
        }
        
    }, [ dispatch,isLoggedIn, isLoggedInAdmin, isLoggedInGuest,isUser, user, admin,guest, subType, overdueCount]);

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
            history.push('/user/login')
            window.location.reload();
            alert.success('Logged out successfully.')
        }
    
        
    }

    
    const notifData = () => {
        const data = []

        if(isLoggedIn && subType){
            if(subType.status === 'Expired'){
                data.push({
                    image: expire,
                    message: 'Your Subscription has expired',
                    detailPage: '/',
                })
            }
        }
        if(isLoggedIn && overdueCount > 0){
                data.push({
                    image: expire,
                    message: `You have ${overdueCount} Overdue Books `,
                    detailPage: '/',
                })
        }
        

        return data;
        
    }
    const notifDataGuest = () => {
        const data = []

        if(isLoggedInGuest && subTypeGuest){
            if(subTypeGuest.status === 'Expired'){
                data.push({
                    image: expire,
                    message: 'Your Subscription has expired',
                    detailPage: '/',
                })
            }
        }
        return data;
        
    }

    const setProfile = () => {

        return (
            <>       
            <div className='m-2 p-1'>   
            <Notifications 
            data={notifData()}
            icon={bell}
            height='200px'
            width='400px'
            header={{
                title: '',
                option: { text: '', onClick: () => console.log('Clicked') },
            }}
            cardOption={true}
            />
            </div>

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
            <div className='m-2 p-1'>   
            <Notifications 
            data={notifDataGuest()}
            icon={bell}
            height='200px'
            // width='400px'
            header={{
                title: '',
                option: { text: '', onClick: () => console.log('Clicked') },
            }}
            
            />
            </div>
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
            <Link to="/" className='white'>Home</Link> 
            <Link to="/About" className='white'>About</Link> 
            <Link to="/Contact" className='white'>Contact</Link> 
            <div className='user-link'>
            </div>
            </>
        )
    }


    return ( 
        <Fragment>
        <div className="default-header">
        <Navbar collapseOnSelect expand="lg">
        <Container>
        {isLoggedInAdmin? <Navbar.Brand ><Link to="/" className="title white"><img src={logo} alt="logo" className="img-logo" /></Link></Navbar.Brand>  : <Navbar.Brand ><Link to="/" className="title white"><img src={logo} alt="logo" className="img-logo" /></Link></Navbar.Brand>}
        
    
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