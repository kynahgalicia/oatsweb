import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom' 
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import GuestSidebar from '../../layout/GuestSidebar'
import profile from '../../img/profile.png'
const GuestProfile = () => {

    const history = useHistory()

    const { isLoggedInGuest, guest} = useSelector(state => state.authGuest)


    useEffect(() => {

        if (!isLoggedInGuest) {
            history.push('/guest/login');
        }
    },[ history, isLoggedInGuest]);
    return (

        <Fragment>

            <Row>
                    <Col sm= {2} className="admin-sidebar">
                        <GuestSidebar/>
                    </Col>  
                    <Col sm={10}>
                <div className="guest-wrapper">
                { guest ? 
                <>
                <div className="user-card">
                        <div className="user-cards">
                    <Row>
                        <Col>
                        { guest.avatar ? null :<img src={profile} alt="logo" className="img-profile" />}
                        <br/>
                        {/* <h5 className='m-2'>{guest.guest_tupid}</h5> <br /> */}
                        </Col >
                        <Col className='text-start'>
                        <h4>{guest.guest_fname} {guest.guest_lname}</h4>
                        <label><i>{guest.guest_mail}</i></label>
                        <br />
                        <label> {guest.guest_contact}</label> <br />
                        <label> {guest.guest_profession}</label> <br />
                        <label> {guest.guest_company}</label><br />
                        <label> {guest.guest_company_address}</label><br />
                        <Button className="btn-guest">Edit Profile</Button>
                        </Col>
                    </Row>
                        </div>
                </div>
                </>: null}
            
                    <Row>
                        <Col>
                            <Card className="user-stats ">
                                <label>My Bookmarks</label>
                                <h1>1</h1>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="user-stats">
                                <label>Bought Thesis</label>
                                <h1>10</h1>
                            </Card>
                        </Col>
                    </Row>
                    
                </div>
            </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default GuestProfile;