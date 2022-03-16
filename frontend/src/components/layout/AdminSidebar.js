import React from 'react'
import { Link } from 'react-router-dom'
import {Nav, Form} from 'react-bootstrap'
const AdminSidebar = () => {

    return (
        
            <Nav className=" col-md-12 d-none d-md-block bg-light"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Link to="/admin/dashboard">Dashboard</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/admin/admins">Administrators</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/admin/thesis">Thesis</Link>
            </Nav.Item>
            <hr/>
            
            <Nav.Item>
                <Link to="/admin/users">Users</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/admin/guests">Guests</Link>
            </Nav.Item>
            <hr/>


            <Nav.Item>  
                <Link to="/admin/department">Departments</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>  
                <Link to="/admin/course">Courses</Link>
            </Nav.Item>
            <hr/>

            
            <Nav.Item>
                <div className=" admin-accordion accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Lending
                                </button>
                            </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="list-group">
                                    <Link to="admin/borrowed" className="list-group-item list-group-item-action">Borrowed</Link>
                                    <Link to="admin/returned" className="list-group-item list-group-item-action">Returned</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/admin/payment">Payment</Link>
            </Nav.Item>
            <hr/>
    </Nav>
    
    )
}

export default AdminSidebar

