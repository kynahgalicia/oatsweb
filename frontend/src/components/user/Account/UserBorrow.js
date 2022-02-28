import React, { Fragment} from 'react'
import {Row, Col} from 'react-bootstrap'
import UserSidebar from '../../layout/UserSidebar'
const UserBorrow = () => {

    return (

        <Fragment>

            <Row>
                    <Col sm= {2}>
                        <UserSidebar/>
                    </Col>  
                    <Col sm={10}>
                        <h1>User Borrow</h1>
                    </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default UserBorrow;