import { Fragment } from "react";
import { Link} from 'react-router-dom'
import {Row, Col, Card, Button} from 'react-bootstrap'
import UserSidebar from "../../../layout/UserSidebar";

const UserSubscription = () => {
    const monthly = false
    const yearly = false

    return (
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <UserSidebar/>
                </Col>

                <Col sm={10}>
                <div className="admin-wrapper">
                    <div className='d-flex align-items-start m-4'>
                        <h1 >Subscription</h1>
                    </div>
                    <div className="sub-cards">
                        
                        <Card className= {"sub-card text-start " + ( monthly ? 'border-current' : null)}>
                            <div className={( monthly ? 'sub-current' : 'd-none')}>
                                <Card.Header >Current</Card.Header>
                            </div>
                                <Card.Header> <h1 className="text-start">₱50/mo.</h1></Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                        <p>
                                        Access all of the thesis titles available for 1 month.
                                        </p>
                                        </Col>
                                        <Col>
                                        <ul >
                                        <li><i class="fas fa-check"></i> View Full Text</li>
                                        <li><i class="fas fa-check"></i> Download Full PDF</li>
                                        </ul>
                                        </Col>
                                    </Row>
                                    <Link to="/user/payment"><Button className={( monthly ? 'd-none' : '')}>Select</Button></Link>
                                </Card.Body>
                        </Card>

                        <Card className= {"sub-card text-start " + ( yearly ? 'border-current' : null)}>
                            <div className={( yearly ? 'sub-current' : 'd-none')}>
                                <Card.Header >Current</Card.Header>
                            </div>
                            <Card.Header><h1 className="text-start">₱550/yr.</h1></Card.Header>
                            <Card.Body>
                                
                                <Row>
                                    <Col>
                                    <p>
                                    Open access to ALL archived research in OATS for a whole year
                                    </p>
                                    </Col>
                                    <Col>
                                    <ul >
                                    <li><i class="fas fa-check"></i> View Full Text</li>
                                    <li><i class="fas fa-check"></i> Download Full PDF</li>
                                    </ul>
                                    </Col>
                                </Row>
                                <Button className={( yearly ? 'd-none' : '')}>Select</Button>
                            </Card.Body>
                        </Card>
                        </div>  
                    </div>  
                    
                </Col>
            </Row>
        </Fragment>
    )
}

export default UserSubscription;