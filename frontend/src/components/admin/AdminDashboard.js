import React, { Fragment, useEffect } from 'react'
import {Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AdminSidebar from '../layout/AdminSidebar'
import ThesisList from './thesis/ThesisList'
import DepartmentList from './departments/DepartmentList'
import CourseList from './courses/CourseList'
import UserList from './users/UserList'
import PaymentList from './payment/PaymentList'
import CreateDepartment from './departments/CreateDepartment'
import Updatedepartment from './departments/EditDepartment'

const AdminDashboard = () => {
    return(
        <Fragment>

        <Router>
            <Row>
                    <Col sm= {2}>
                        <AdminSidebar/>
                    </Col>
                    <Col sm={10}>
                <div className="admin-wrapper">
                    <Switch>
                    <Route path="/admin/thesis" component={ThesisList} exact/>
                    <Route path="/admin/department" component={DepartmentList} exact/>
                    <Route path="/admin/department/new" component={CreateDepartment} exact/>
                    <Route path="/admin/department/edit/:departmentId" component={Updatedepartment} exact/>
                    {/* <Route path="/admin/course" component={CourseList} exact/> */}
                    <Route path="/admin/users" component={UserList} exact/>
                    <Route path="/admin/payment" component={PaymentList} exact/>
                
                    </Switch>
                </div>
            </Col>
        </Row>

    

    </Router>
    
            
                
        </Fragment>

        
    )
}

export default AdminDashboard
