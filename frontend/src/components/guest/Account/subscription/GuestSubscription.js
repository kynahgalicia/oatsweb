import { Fragment, useState, useEffect } from "react";
import { useSelector} from 'react-redux'
import { Link, useHistory} from 'react-router-dom'
import {Row, Col, Card, Button} from 'react-bootstrap'
import GuestSidebar from "../../../layout/GuestSidebar";

const GuestSubscription = () => {
    const {subTypeGuest, isLoggedInGuest} = useSelector(state => state.authGuest)

    const [day, setDay] = useState(false)
    const [weekly, setWeek] = useState(false)

    const oneDaySub = 'oneDay'
    const weeklySub = 'weekly'
    const history = useHistory()
    useEffect(() => {

        if(isLoggedInGuest){
            if( subTypeGuest && subTypeGuest.sub_type === 'oneDay'){
                setDay(true)
            }
            if( subTypeGuest && subTypeGuest.sub_type === 'weekly'){
                setWeek(true)
            }
        }

        if(!isLoggedInGuest){
            history.push('/guest/login')
        }

    }, [isLoggedInGuest, history, day ,weekly])
    

    return (
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <GuestSidebar/>
                </Col>

                <Col sm={10}>
                <div className="admin-wrapper">
                    <div className='d-flex align-items-start m-4'>
                        <h1 >Subscription</h1>
                    </div>

                    { isLoggedInGuest && subTypeGuest && subTypeGuest.status === 'Pending' ? <div className="notif-bar bg-rose text-start"> <p>Please wait for the confirmation of your subscription</p> </div> : null}
                    { isLoggedInGuest && subTypeGuest && subTypeGuest.status === 'Expired' ? <div className="notif-bar bg-rose text-start"> <p>Your subscription has expired.</p> </div> : null}
                    < div className="sub-cards">
                        
                        <Card className= {"sub-card text-start " + ( day ? 'border-current' : null)}>
                            <div className={( day ? 'sub-current' : 'd-none')}>
                                <Card.Header >Current  { isLoggedInGuest && subTypeGuest && subTypeGuest.status === 'Pending' ? '(Pending)': null}{ isLoggedInGuest && subTypeGuest && subTypeGuest.status === 'Expired' ? '(Expired)': null}</Card.Header> 
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
                                    <Link to={`/guest/payment/${oneDaySub}`}><Button className={( day && subTypeGuest.status !=='Expired' ? 'd-none' : '')}>Select</Button></Link>
                                </Card.Body>
                        </Card>

                        <Card className= {"sub-card text-start " + ( weekly ? 'border-current' : null)}>
                            <div className={( weekly ? 'sub-current' : 'd-none')}>
                                <Card.Header >Current { isLoggedInGuest && subTypeGuest && subTypeGuest.status === 'Pending' ? '(Pending)': null}{ isLoggedInGuest && subTypeGuest && subTypeGuest.status === 'Expired' ? '(Expired)': null}</Card.Header>
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
                                <Link to={`/guest/payment/${weeklySub}`}><Button className={( weekly && subTypeGuest.status !=='Expired' ? 'd-none' : '')}>Select</Button></Link>
                            </Card.Body>
                        </Card>
                        </div>  
                    </div>  
                    
                </Col>
            </Row>
        </Fragment>
    )
}

export default GuestSubscription;