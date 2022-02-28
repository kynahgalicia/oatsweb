import React, { Fragment} from 'react'
import {Row, Col} from 'react-bootstrap'
import UserSidebar from '../../layout/UserSidebar'
const UserBookmark = () => {

    return (

        <Fragment>

            <Row>
                    <Col sm= {2}>
                        <UserSidebar/>
                    </Col>  
                    <Col sm={10}>
                        <h1>User Bookmark</h1>
                    </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default UserBookmark;