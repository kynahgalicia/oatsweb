import React from 'react'
import { Link } from 'react-router-dom'
import {Nav} from 'react-bootstrap'
const UserSidebar = () => {

    return (
        <div className="admin-sidebar">
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
                <Link to="/user/payment"> <i class="fas fa-shopping-cart"></i> Payment</Link>
            </Nav.Item>
            <hr/>

    </Nav>
        </div>
    
    )
}

export default UserSidebar

