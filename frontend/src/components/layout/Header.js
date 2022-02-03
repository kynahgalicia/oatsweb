import React, {Fragment, useState} from 'react'
import { Link } from 'react-router-dom' 
import { Nav, Navbar, Container,Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';

// import {Link} from 'react-router-dom';

const Header = () => {

    const [user, setUser] = useState([
    {id: 1, role: 'admin'}
    ])
    const setProfile = () => {

        return (
            <>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            <BsPersonFill size={20}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item><Link to="/"> Profile</Link></Dropdown.Item>
                { user[0].id && user[0].role === 'admin' ? <Dropdown.Item><Link to="/admin/dashboard"> Dashboard</Link></Dropdown.Item>:<Dropdown.Item><Link to="/user/dashboard"> Dashboard</Link></Dropdown.Item>}
                <Dropdown.Item><Link to="/" onClick={() => setUser(false)}> Logout</Link></Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </>
        )
        
    }
    
    const setUserLink = () =>{

        console.log(user);
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
        {user[0].id && user[0].role === 'admin' ? <Navbar.Brand ><Link to="/none" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>  : <Navbar.Brand ><Link to="/" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>}
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            </Nav>
            <Nav>
            
            {user[0].id && user[0].role === 'admin' ? null  : setUserLink()}
            {user[0]?.id ? setProfile() : <Link to="/Login" className='white'><BsPersonFill size={20}/></Link>  }
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>

        </Fragment >
    );
}

export default Header;