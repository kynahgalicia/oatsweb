import React, { Fragment, useEffect } from 'react'
import {Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AdminSidebar from '../layout/AdminSidebar'
import ThesisList from './thesis/ThesisList'
import DeptList from './departments/DeptList'
import UserList from './users/UserList'
import PaymentList from './payment/PaymentList'
import CreateDept from './departments/CreateDept'

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
                    <Route path="/admin/dept" component={DeptList} exact/>
                    <Route path="/admin/dept/new" component={CreateDept} exact/>
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
