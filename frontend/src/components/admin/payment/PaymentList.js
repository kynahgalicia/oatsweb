import React, { Fragment} from 'react'
import {Row, Col, Button} from 'react-bootstrap';
import AdminSidebar from '../../layout/AdminSidebar'

const PaymentList = () => {

    return(
        <Fragment>
        <Row>
        <Col sm= {2}>
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                <h1>Payment</h1>
            </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default PaymentList;