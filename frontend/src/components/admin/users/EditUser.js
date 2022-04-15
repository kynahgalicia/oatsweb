import React, {Fragment, useState,useEffect} from 'react'
import { useHistory,useParams } from 'react-router-dom' 
import {Row, Col, Form, Button} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import AdminSidebar from '../../layout/AdminSidebar'

import { useDispatch, useSelector } from 'react-redux';
import {getDepartment} from '../../../redux/actions/departmentActions'
import {getCourse} from '../../../redux/actions/courseActions1'
import { getUserDetails,updateUser , clearErrors} from '../../../redux/actions/userActions';
import { UPDATE_USER_RESET } from '../../../redux/constants/userConstants';
const EditUser = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const [user_tupid, setID] = useState('')
    const [user_fname, setFname] = useState('')
    const [user_lname, setLname] = useState('')
    const [user_tupmail, setMail] = useState('')
    const [user_contact, setContact] = useState('')
    const [thisDepartment, setDepartment] = useState('')
    const [thisCourse, setCourse] = useState('')

    const{isUpdated,error} =useSelector(state=>state.user)
    const {user} =useSelector(state => state.userDetails)
    const {adminToken} = useSelector(state => state.authAdminToken)
    const {department} = useSelector(state => state.department)
    const {course} = useSelector(state => state.courses)

    const {userId} = useParams();

    useEffect(() => {
        if (isUpdated) {
            history.push('/admin/users');
            alert.success('User updated successfully!');
            dispatch({ type: UPDATE_USER_RESET })
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(( user && user._id) !== userId){
            dispatch(getUserDetails(userId,adminToken))
        }else {
            setID(user.user_tupid)
            setFname(user.user_fname)
            setLname(user.user_lname)
            setContact(user.user_contact)
            setMail(user.user_tupmail)
        }
        
        dispatch(getDepartment())
        dispatch(getCourse(thisDepartment))

        

    }, [dispatch, alert, history, isUpdated, thisDepartment, adminToken, userId, error, user])

    const submitHandler = (e) => {

        const formData = new FormData();
        formData.set('user_tupid', user_tupid);
        formData.set('user_fname', user_fname);
        formData.set('user_lname', user_lname);
        formData.set('user_tupmail', user_tupmail);
        formData.set('user_contact', user_contact);
        formData.set('departments', thisDepartment);
        formData.set('courses', thisCourse);
        dispatch(updateUser(user._id, formData,adminToken))
    }
    
    return(
        <Fragment>
        <Row>
        <Col sm= {2} className="admin-sidebar">
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="form-admin-wrapper">
            <h1>Edit User</h1>

            <Form className="form-group auth-signup" onSubmit={submitHandler} encType='application/json'>
            {/* {error && showErrMsg(error)} */}

            <h5>Personal Information</h5>
            <Form.Group className="mb-3">
                <Form.Label>TUP ID</Form.Label>
                <Form.Control type="text" placeholder="TUPT-XX-XXXX" value={user_tupid} onChange={(e) => setID(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="" value={user_fname} onChange={(e) => setFname(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="" value={user_lname} onChange={(e) => setLname(e.target.value)}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="" value={user_contact} onChange={(e) => setContact(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select id="department_field" placeholder="" value={thisDepartment} onChange={(e) => setDepartment(e.target.value)} >
                <option> -- SELECT DEPARTMENT --</option>
                    { department && department.map((departments) => (
                                
                            <option value={departments._id}>{departments.deptname}</option>
                                
                        ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Form.Select id="department_field" placeholder="" value={thisCourse} onChange={(e) => setCourse(e.target.value)}>
                
                {thisDepartment && course && course.map((courses) => (
                                
                                <option value={courses._id}>{courses.coursecode} ({courses.coursename})</option>
                                    
                ))}
                </Form.Select>
            </Form.Group>


            <Button className="w-100 btn-login" type="submit" id="submitButton">
                continue
            </Button>
            
            </Form> 
            </div>
            </Col>
        </Row>
        </Fragment>
    )
}

export default EditUser;