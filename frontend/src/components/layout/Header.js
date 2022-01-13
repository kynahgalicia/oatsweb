import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 
import { Nav, Navbar, Container,Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';

// import {Link} from 'react-router-dom';

const Header = () => {

    let user = false
    const setProfile = () => {

        return (
            <>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            <BsPersonFill size={20}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </>
        )
        
    }
    

    return ( 
        <Fragment>
        <div className="header">
        <Navbar collapseOnSelect expand="lg">
        <Container>
        <Navbar.Brand ><Link to="/" className="title white">Online Archiving Thesis System</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            </Nav>
            <Nav>
            <Link to="/About" className='white'>About</Link> 
            <Link to="/Category" className='white'>Category</Link> 
            <Link to="/Contact" className='white'>Contact</Link> 
            {user? <Link to="/Cart" className='white'><FaShoppingCart size={20} /></Link> : <Link to="/Login" className='white'><FaShoppingCart size={20} /></Link>  }
            {user? setProfile() : <Link to="/Login" className='white'><BsPersonFill size={20}/></Link>  }
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>

        </Fragment >
    );
}

export default Header;