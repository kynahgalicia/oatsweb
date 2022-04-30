import { Fragment, useState, useEffect } from "react";
import { useSelector} from 'react-redux'
import { Link} from 'react-router-dom'
import {Row, Col, Card, Button} from 'react-bootstrap'
import UserSidebar from "../../../layout/UserSidebar";

const UserSubscription = () => {

    const {subType, isLoggedIn} = useSelector(state => state.authUser)

    const [day, setDay] = useState(false)
    const [weekly, setWeek] = useState(false)

    const oneDaySub = 'oneDay'
    const weeklySub = 'weekly'

    useEffect(() => {

        if(isLoggedIn){
            if(subType && subType.sub_type === 'oneDay'){
                setDay(true)
            }
            if(subType && subType.sub_type === 'weekly'){
                setWeek(true)
            }
        }

    }, [isLoggedIn, day ,weekly, subType])
    

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

                    { isLoggedIn && subType && subType.status === 'Pending' ? <div className="notif-bar bg-rose text-start"> <p>Please wait for the confirmation of your subscription</p> </div> : null}
                    < div className="sub-cards">
                        
                        <Card className= {"sub-card text-start " + ( day ? 'border-current' : null)}>
                            <div className={( day ? 'sub-current' : 'd-none')}>
                                <Card.Header >Current  { isLoggedIn && subType && subType.status === 'Pending' ? '(Pending)': null}</Card.Header> 
                            </div>
                                <Card.Header> <h1 className="text-start">₱50/day</h1></Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                        <p>
                                        Access all of the thesis titles available for 1 day.
                                        </p>
                                        </Col>
                                        <Col>
                                        <ul >
                                        <li><i class="fas fa-check"></i> View Full Text</li>
                                        <li><i class="fas fa-check"></i> Download Full PDF</li>
                                        </ul>
                                        </Col>
                                    </Row>
                                    <Link to={`/user/payment/${oneDaySub}`}><Button className={( day ? 'd-none' : '')}>Select</Button></Link>
                                </Card.Body>
                        </Card>

                        <Card className= {"sub-card text-start " + ( weekly ? 'border-current' : null)}>
                            <div className={( weekly ? 'sub-current' : 'd-none')}>
                            <Card.Header >Current  { isLoggedIn && subType && subType.status === 'Pending' ? '(Pending)': null}</Card.Header> 
                            </div>
                            <Card.Header><h1 className="text-start">₱325/week</h1></Card.Header>
                            <Card.Body>
                                
                                <Row>
                                    <Col>
                                    <p>
                                    Open access to ALL archived research in OATS for 7 days
                                    </p>
                                    </Col>
                                    <Col>
                                    <ul >
                                    <li><i class="fas fa-check"></i> View Full Text</li>
                                    <li><i class="fas fa-check"></i> Download Full PDF</li>
                                    </ul>
                                    </Col>
                                </Row>
                                <Link to={`/user/payment/${weeklySub}`}><Button className={( weekly ? 'd-none' : '')}>Select</Button></Link>
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