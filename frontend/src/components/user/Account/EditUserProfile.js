import React, { useState, useEffect, Fragment } from 'react';
import UserSidebar from '../../layout/UserSidebar';
import LoaderAdmin from '../../utils/LoaderAdmin';
import {Row, Col, Form, Button} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { showErrMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { updateUser , clearErrors} from '../../../redux/actions/userActions';
import { UPDATE_USER_RESET } from '../../../redux/constants/userConstants';

const EditUserProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [user_id, setUserID] = useState('')
    const [user_tupid, setID] = useState('')
    const [user_fname, setFname] = useState('')
    const [user_lname, setLname] = useState('')
    const [user_contact, setContact] = useState('')

    const {isLoggedIn, user} = useSelector(state => state.authUser)
    const{isUpdated,error, loading} =useSelector(state=>state.user)
    useEffect(() => {
        
        if(isLoggedIn){
            setUserID(user._id)
            setID(user.user_tupid)
            setFname(user.user_fname)
            setLname(user.user_lname)
            setContact('0' + user.user_contact)
        }

        if (isUpdated) {
            history.push('/user/profile');
            alert.success('Profile updated successfully!');
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, history, alert, error, isLoggedIn,isUpdated])
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('user_fname', user_fname);
        formData.set('user_lname', user_lname);
        formData.set('user_contact', user_contact);
        dispatch(updateUser(user_id, formData))
    }

    return ( 
        <Fragment>
            <Row>
            <Col sm= {2} className="admin-sidebar">
                    <UserSidebar/>
                </Col> 
                
                <Col sm={10}>

                    <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                                <h1>Edit Profile</h1>
                            </div>

                            <Form className="edit-profile" onSubmit={submitHandler} encType='application/json'>
                            {error && showErrMsg(error)}

                        <Form.Group className="mb-2">
                            <Form.Label>TUP ID</Form.Label>
                            <Form.Control type="text" placeholder="TUPT-XX-XXXX" value={user_tupid} onChange={(e) => setID(e.target.value)} disabled/>
                            </Form.Group>
                            <Row>
                                <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control className=" w-100" type="text" placeholder="" value={user_fname} onChange={(e) => setFname(e.target.value)}/>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="mb-2 mx-1">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control  className=" w-100" type="text" placeholder="" value={user_lname} onChange={(e) => setLname(e.target.value)}/>
                                </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-2">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" placeholder="+639" value={user_contact} onChange={(e) => setContact(e.target.value)}/>
                                </Form.Group>

                                <Button className="w-100 btn-login" type="submit" id="submitButton" disabled={loading ? true : false}>
                                    Save Changes
                                </Button>
                        </Form>
                    </div>
                        
                </Col>
                </Row>
    
            
                
        </Fragment>
    );
}

export default EditUserProfile;