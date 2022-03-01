import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Row, Col} from 'react-bootstrap';
import AdminSidebar from '../../layout/AdminSidebar'

const ThesisList = () => {

    return(
        <Fragment>
        <Row>
        <Col sm= {2}>
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
            <h1>Thesis</h1>
            </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default ThesisList;