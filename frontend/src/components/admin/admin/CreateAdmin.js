import React, { Fragment, useState, useEffect } from 'react'
import {useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'

import {Row, Col, Form, Container, Button} from 'react-bootstrap';
import {showErrMsg} from '../../utils/Notification'
import { register } from '../../../redux/actions/authAdminActions'
import { REGISTER_ADMIN_RESET } from '../../../redux/constants/authAdminConstants'
import {getDepartment} from '../../../redux/actions/departmentActions'
import AdminSidebar from '../../layout/AdminSidebar'

const CreateAdmin = () => {  
    const [admin_tupid, setID] = useState('')
    const [admin_fname, setFname] = useState('')
    const [admin_lname, setLname] = useState('')
    const [admin_contact, setContact] = useState('')
    const [admin_tupmail, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [thisDepartment, setThisDepartment] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    
    const { loading, error, success } = useSelector(state => state.authAdminRegister);
    const {department} = useSelector(state => state.department)
    const {isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    useEffect(() => {


        if (success) {
            history.push('/admin/admins');
            alert.success('Email has been sent to new administrator');
            dispatch({ type: REGISTER_ADMIN_RESET })
        }

        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
        
        if(admin.role === 'Moderator'){
            history.push('/');
            alert.error('Restricted');
        }
        dispatch(getDepartment())

    }, [dispatch, alert, history, error, success, isLoggedInAdmin, admin])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('admin_tupid', admin_tupid);
        formData.set('admin_fname', admin_fname);
        formData.set('admin_lname', admin_lname);
        formData.set('admin_contact', admin_contact);
        formData.set('admin_tupmail', admin_tupmail);
        formData.set('departments', thisDepartment);
        formData.set('passwords', password);

        dispatch(register(formData,adminToken))
    }

    return(
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <Container>
                        <div className='back-button text-start px-3 py-2'>
                        <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                        <div className='form-admin-wrapper'>
                            <div className='wrapper my-5'>
                                <Row>
                                    <h1 className='text-center'>New Administrator</h1>
                                    {error && showErrMsg(error)}
                                    <Form action="" onSubmit={submitHandler}>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>TUP ID</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="text"
                                                id="tupid"
                                                onChange={(e) => setID(e.target.value)}
                                            />
                                        </Form.Group>
                                    <Row>
                                        <Col>
                                        <Form.Group className='mb-3 mx-1'>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="text"
                                                id="fname"
                                                onChange={(e) => setFname(e.target.value)}
                                            />
                                        </Form.Group>

                                        </Col>
                                        <Col>
                                        <Form.Group className='mb-3 mx-1'>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="text"
                                                id="lname"
                                                onChange={(e) => setLname(e.target.value)}
                                            />
                                        </Form.Group>
                                        </Col>
                                    </Row>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Contact No.</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="number"
                                                id="contact"
                                                onChange={(e) => setContact(e.target.value)}
                                                placeholder='09XXXXXXXX'
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Select id="department_field" placeholder="" value={thisDepartment} onChange={(e) => setThisDepartment(e.target.value)} >
                                                <option> -- SELECT DEPARTMENT --</option>
                                                    { department && department.map((departments) => (
                                                        <option value={departments._id}>{departments.deptname}</option>
                                                    ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="email"
                                                id="borrowdue"
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='sampleEmailAddress@tup.edu.ph'
                                            />
                                        </Form.Group>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="password"
                                                id="borrowdue"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <div className='d-flex justify-content-end'>
                                        <Button 
                                            className='my-3 '
                                            variant="success" 
                                            type="submit"
                                            disabled={loading ? true : false}  
                                        >
                                            Submit
                                        </Button>
                                        </div>
                                    </Form>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}

export default CreateAdmin