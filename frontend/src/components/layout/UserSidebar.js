import React from 'react'
import { Link } from 'react-router-dom'
import {Nav} from 'react-bootstrap'
const UserSidebar = () => {

    return (
            <Nav className=" col-md-12 d-none d-md-block bg-light"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
            <Nav.Item>
                <Link to="/user/profile"><i class="fas fa-user"></i> Profile</Link>
            </Nav.Item>
            <hr/>
            
            <Nav.Item>
                <Link to="/user/borrow"><i class="fas fa-book"></i> Borrowed</Link>
            </Nav.Item>
            <hr/>
            
            <Nav.Item>
                <Link to="/user/bookmark"> <i class="fas fa-bookmark"></i> Bookmarks</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/user/subscription"><i class="fas fa-credit-card"></i> Subscription</Link>
            </Nav.Item>
            <hr/>

            </Nav>
    
    )
}

export default UserSidebar

