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
                <Link to="/guest/profile"><i class="fas fa-user"></i> Profile</Link>
            </Nav.Item>
            <hr/>
            
            <Nav.Item>
                <Link to="/guest/bookmark"> <i class="fas fa-bookmark"></i> Bookmarks</Link>
            </Nav.Item>
            <hr/>
            <Nav.Item>
                <Link to="/guest/paid"> <i class="fas fa-book"></i> Paid Thesis</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/user/subscription"><i class="fas fa-credit-card"></i> Subscription</Link>
            </Nav.Item>
            <hr/>

    </Nav>
        </div>
    
    )
}

export default UserSidebar

