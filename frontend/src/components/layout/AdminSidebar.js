import React from 'react'
import { Link } from 'react-router-dom'
import {Nav, Form} from 'react-bootstrap'
const AdminSidebar = () => {

    return (
        <div className="admin-sidebar">
            <Nav className=" col-md-12 d-none d-md-block bg-light"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Link to="/dashboard">Dashboard</Link>
            </Nav.Item>
            <hr/>
            
            <Nav.Item>
                <Link to="/admin/thesis">Thesis</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/admin/dept">Departments</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <Link to="/admin/users">Users</Link>
            </Nav.Item>
            <hr/>

            <Nav.Item>
                <div class=" admin-accordion accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Lending
                                </button>
                            </h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="list-group">
                                    <Link to="admin/borrowed" class="list-group-item list-group-item-action">Borrowed</Link>
                                    <Link to="admin/returned" class="list-group-item list-group-item-action">Returned</Link>
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
        </div>
    
    )
}

export default AdminSidebar

