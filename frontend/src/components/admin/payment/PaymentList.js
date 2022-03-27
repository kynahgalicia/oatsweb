import React, { Fragment} from 'react'
import {Row, Col} from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../layout/AdminSidebar'


const PaymentList = () => {

    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
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