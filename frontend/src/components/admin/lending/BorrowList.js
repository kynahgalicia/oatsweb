import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Row, Col} from 'react-bootstrap';

import AdminSidebar from '../../layout/AdminSidebar'
const BorrowList = () => {

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
            <div className="admin-wrapper">
            <h1>Borrowed</h1>
            </div>
                    
            </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default BorrowList;