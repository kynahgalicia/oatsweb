import React, { Fragment, useEffect } from 'react'
import {Row, Col, Card, CardGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import AdminSidebar from '../layout/AdminSidebar'

import ThesisList from './thesis/ThesisList'
import CreateThesis from './thesis/CreateThesis'

import DepartmentList from './departments/DepartmentList'
import CreateDepartment from './departments/CreateDepartment'
import Updatedepartment from './departments/EditDepartment'

import CourseList from './courses/CourseList'
import CreateCourse from './courses/CreateCourse'
import Updatecourse from './courses/EditCourse'

import UserList from './users/UserList'
import PaymentList from './payment/PaymentList'

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
                                <Route path="/admin/thesis/new" component={CreateThesis} exact/>
                                <Route path="/admin/department" component={DepartmentList} exact/>
                                <Route path="/admin/department/new" component={CreateDepartment} exact/>
                                <Route path="/admin/department/edit/:departmentId" component={Updatedepartment} exact/>
                                <Route path="/admin/course" component={CourseList} exact/>
                                <Route path="/admin/course/new" component={CreateCourse} exact/>
                                <Route path="/admin/course/edit/:courseId" component={Updatecourse} exact/>
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
