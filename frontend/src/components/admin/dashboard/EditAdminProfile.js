import React, { useState, useEffect, Fragment } from 'react';
import AdminSidebar from '../../layout/AdminSidebar';
import LoaderAdmin from '../../utils/LoaderAdmin';
import {Row, Col, Form, Button} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { showErrMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { updateAdmin , clearErrors} from '../../../redux/actions/adminActions';
import { UPDATE_ADMIN_RESET } from '../../../redux/constants/adminConstants';

const EditAdminProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [admin_id, setAdminID] = useState('')
    const [admin_tupid, setID] = useState('')
    const [admin_fname, setFname] = useState('')
    const [admin_lname, setLname] = useState('')
    const [admin_contact, setContact] = useState('')

    const {isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const{isUpdated,error, loading} =useSelector(state=>state.admin)
    useEffect(() => {
        
        if(isLoggedInAdmin){
            setAdminID(admin._id)
            setID(admin.admin_tupid)
            setFname(admin.admin_fname)
            setLname(admin.admin_lname)
            setContact('0' + admin.admin_contact)
        }

        if (isUpdated) {
            history.push('/');
            alert.success('Profile updated successfully!');
            dispatch({ type: UPDATE_ADMIN_RESET })
        }

        if(!isLoggedInAdmin){
            history.push('/admin/login')
        }
        
    }, [dispatch, history, alert, error, isLoggedInAdmin,isUpdated, adminToken])
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('admin_fname', admin_fname);
        formData.set('admin_lname', admin_lname);
        formData.set('admin_contact', admin_contact);
        dispatch(updateAdmin(admin_id, formData, adminToken))
    }

    return ( 
        <Fragment>
            <Row>
            <Col sm= {2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col> 
                
                <Col sm={10}>
                        <div className='back-button text-start px-3 py-2'>
                            <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                    <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                                <h1>Edit Profile</h1>
                            </div>

                            <Form className="edit-profile" onSubmit={submitHandler} encType='application/json'>
                            {error && showErrMsg(error)}

                        <Form.Group className="mb-2">
                            <Form.Label>TUP ID</Form.Label>
                            <Form.Control type="text" placeholder="TUPT-XX-XXXX" value={admin_tupid} onChange={(e) => setID(e.target.value)} disabled/>
                            </Form.Group>
                            <Row>
                                <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control className=" w-100" type="text" placeholder="" value={admin_fname} onChange={(e) => setFname(e.target.value)}/>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="mb-2 mx-1">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control  className=" w-100" type="text" placeholder="" value={admin_lname} onChange={(e) => setLname(e.target.value)}/>
                                </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-2">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" placeholder="09XXXXXXXXX" value={admin_contact} onChange={(e) => setContact(e.target.value)}/>
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

export default EditAdminProfile;