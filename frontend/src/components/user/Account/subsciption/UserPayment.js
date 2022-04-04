import React, {useEffect, useState, Fragment} from 'react'
import { useHistory} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button, Form, CardGroup, Card} from 'react-bootstrap'
import UserSidebar from "../../../layout/UserSidebar";

const ThesisDetails = () => {
    
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    // useEffect(() => {
        
    // }, []);

    
    

    return ( 
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <UserSidebar/>
                </Col>
                <Col sm={10}>
                    <div className="progress-mark text-start">
                    </div> 
                </Col>
            </Row>
        </Fragment>
    );
}

export default ThesisDetails;