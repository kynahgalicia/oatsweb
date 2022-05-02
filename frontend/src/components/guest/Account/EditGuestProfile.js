import React, { useState, useEffect, Fragment } from 'react';
import GuestSidebar from '../../layout/GuestSidebar';
import LoaderAdmin from '../../utils/LoaderAdmin';
import {Row, Col, Form, Button} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { showErrMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { updateGuest , clearErrors} from '../../../redux/actions/guestActions';
import { UPDATE_GUEST_RESET } from '../../../redux/constants/guestConstants';

const EditGuestProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [guest_id, setGuestID] = useState('')
    const [guest_fname, setFname] = useState('')
    const [guest_lname, setLname] = useState('')
    const [guest_profession, setProfession] = useState('')
    const [guest_company, setCompany] = useState('')
    const [guest_company_address, setCompanyAddress] = useState('')
    const [guest_contact, setContact] = useState('')

    const {isLoggedInGuest, guest} = useSelector(state => state.authGuest)
    const{isUpdated,error} =useSelector(state=>state.guest)
    useEffect(() => {
        
        if(isLoggedInGuest){
            setGuestID(guest._id)
            setFname(guest.guest_fname)
            setLname(guest.guest_lname)
            setProfession(guest.guest_profession)
            setCompany(guest.guest_company)
            setCompanyAddress(guest.guest_company_address)
            setContact(guest.guest_contact)

        }

        if (isUpdated) {
            history.push('/guest/profile');
            alert.success('Profile updated successfully!');
            dispatch({ type: UPDATE_GUEST_RESET })
        }
    }, [dispatch, history, alert, error, isLoggedInGuest,isUpdated])
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('guest_fname', guest_fname);
        formData.set('guest_lname', guest_lname);
        formData.set('guest_profession', guest_profession);
        formData.set('guest_company', guest_company);
        formData.set('guest_company_address', guest_company_address);
        formData.set('guest_contact', guest_contact);

        dispatch(updateGuest(guest_id, formData))
    }

    return ( 
        <Fragment>
            <Row>
            <Col sm= {2} className="admin-sidebar">
                    <GuestSidebar/>
                </Col> 
                
                <Col sm={10}>

                    <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                                <h1>Edit Profile</h1>
                            </div>

                            <Form className="edit-profile" onSubmit={submitHandler} encType='application/json'>
                            {error && showErrMsg(error)}
                        <Row>
                            <Col>
                            <Form.Group className="mb-2 mr-1">
                            <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={guest_fname} onChange={(e) => setFname(e.target.value)}/>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-2">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={guest_lname} onChange={(e) => setLname(e.target.value)}/>
                            </Form.Group>
                            </Col>
                        </Row>
                
                        <Form.Group className="mb-2">
                        <Form.Label>Profession</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_profession} onChange={(e) => setProfession(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_company} onChange={(e) => setCompany(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Label>Company Address</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_company_address} onChange={(e) => setCompanyAddress(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_contact} onChange={(e) => setContact(e.target.value)}/>
                        </Form.Group>

                                <Button className="w-100 btn-login" type="submit" id="submitButton">
                                    Save Changes
                                </Button>
                        </Form>
                    </div>
                        
                </Col>
                </Row>
    
            
                
        </Fragment>
    );
}

export default EditGuestProfile;