import React, { Fragment} from 'react'
import {Row, Col} from 'react-bootstrap'
import GuestSidebar from '../../layout/GuestSidebar'
const GuestBookmark = () => {

    return (

        <Fragment>

            <Row>
                    <Col sm= {2} className="admin-sidebar">
                        <GuestSidebar/>
                    </Col>  
                    <Col sm={10}>
                        <h1>Bookmark</h1>
                    </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default GuestBookmark;