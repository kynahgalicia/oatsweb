import { Fragment } from "react";
import {Row, Col} from 'react-bootstrap'
import UserSidebar from "../../layout/UserSidebar";

const UserPayment = () => {
    

    return (
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <UserSidebar/>
                </Col>

                <Col sm={10}>
                    <h1>User Payment</h1>
                </Col>
            </Row>
        </Fragment>
    )
}

export default UserPayment;