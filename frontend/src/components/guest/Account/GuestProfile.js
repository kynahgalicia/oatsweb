import React, { Fragment, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom' 
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import GuestSidebar from '../../layout/GuestSidebar'
import profile from '../../img/profile.png'
import { fetchGuestCount } from '../../../redux/actions/loggingActions'
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
const GuestProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { isLoggedInGuest, guest} = useSelector(state => state.authGuest)
    const { bookmarksCount, loading} = useSelector(state => state.guestCount)

    useEffect(() => {

        if (!isLoggedInGuest) {
            history.push('/guest/login');
        }

        if(guest){
            dispatch(fetchGuestCount(guest._id))
        }
    },[ history, isLoggedInGuest]);
    return (

        <Fragment>

            <Row>
                    <Col sm= {2} className="admin-sidebar">
                        <GuestSidebar/>
                    </Col>  
                    <Col sm={10}>
                    { loading ? <LoaderAdmin/>:
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
                        <label> +63{guest.guest_contact}</label> <br />
                        <label> {guest.guest_profession}</label> <br />
                        <label> {guest.guest_company}</label><br />
                        <label> {guest.guest_company_address}</label><br />
                        <Link to='/guest/profile/edit'> <Button className="btn-guest">Edit Profile</Button> </Link>
                        </Col>
                    </Row>
                        </div>
                </div>
                </>: null}
            
                    <Row>
                        <Col>
                        </Col>
                        <Col >
                        <div className="card-box bg-peach">
                                <div className="inner">
                                <h3>{bookmarksCount}</h3>
                                <p> My Bookmarks </p>
                                </div>
                                <div className="icon">
                                <i className="fas fa-bookmark"></i>
                                </div>
                                <Link to="/guest/bookmark"><a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right" /></a></Link>
                            </div>
                        </Col>
                        <Col >
                        </Col>
                    </Row>
                    
                </div>
        }
            </Col>
        </Row>
    
            
                
        </Fragment>
    );
}

export default GuestProfile;