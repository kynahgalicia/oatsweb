import React, {Fragment, useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap';
import {BsGoogle} from 'react-icons/bs'
import { Row, Col} from 'react-bootstrap'
import { useAlert } from 'react-alert'
import study from '../../img/study.png'
import { showErrMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux';
import {getDepartment} from '../../../redux/actions/departmentActions'
import {getCourse} from '../../../redux/actions/courseActions1'
import {register, clearErrors} from '../../../redux/actions/authActions'


const SignUpAsStudent = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const [user_tupid, setID] = useState('')
    const [user_fname, setFname] = useState('')
    const [user_lname, setLname] = useState('')
    const [user_tupmail, setMail] = useState('')
    const [user_contact, setContact] = useState('')
    const [user_password, setPassword] = useState('')
    const [thisDepartment, setDepartment] = useState('')
    const [thisCourse, setCourse] = useState('')
    const [agree, setAgree] = useState(false);

    const {department} = useSelector(state => state.department)
    const {courses} = useSelector(state => state.courses)
    const { msg, error} = useSelector(state => state.authUserRegister)

    useEffect(() => {
        if (msg) {
            history.push('/Redirect')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        canBeSubmitted()
        dispatch(getDepartment())
        dispatch(getCourse(thisDepartment))

        

    }, [dispatch, alert, error, history, thisDepartment, msg,agree])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('user_tupid', user_tupid);
        formData.set('user_fname', user_fname);
        formData.set('user_lname', user_lname);
        formData.set('user_tupmail', user_tupmail);
        formData.set('user_contact', user_contact);
        formData.set('passwords', user_password);
        formData.set('departments', thisDepartment);
        formData.set('courses', thisCourse);


        dispatch(register(formData));
    }
    
    const canBeSubmitted = () => {
        const isValid =
        user_tupid.trim().length && // TextInput
        user_fname.trim().length && // TextInput
        user_lname.trim().length && // TextInput
        user_tupmail.trim().length && // TextInput
        user_contact.trim().length && // TextInput
        user_password.trim().length && // TextInput
        thisDepartment.trim().length && // Dropdown
        thisCourse.trim().length && // Dropdown
          agree; // checkbox for terms
    
        if (isValid) {
            document.getElementById("submitButton").removeAttribute("disabled");
        } else {
            document.getElementById("submitButton").setAttribute("disabled", true);
        }
    };

    return ( 
        <Fragment>
        <div className="wrapper">

        <Row>
            <Col>
            <img src={study} alt="logo" className="img-signup" />
            </Col>
            <Col>
            <Form className="form-group auth-signup" onSubmit={submitHandler} encType='application/json'>
            <h1 className='text-center'>Sign Up as Student</h1>
            
            <Button className="w-100 btn-grey my-4" type="submit">
                <label><BsGoogle size={15} className='m-2'/> Sign with Google</label>
            </Button>

            {error && showErrMsg(error)}

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
            {/* <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group> */}
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
                {thisDepartment && courses && courses.map((course) => (
                                
                                <option value={course._id}>{course.coursecode} ({course.coursename})</option>
                                    
                ))}
                </Form.Select>
            </Form.Group>

            <h5>Account Setup</h5>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" value={user_tupmail} onChange={(e) => setMail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value={user_password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="By creating an account you agree to our Terms of Service and Privacy Policy" 
            onClick={(e) => setAgree(e.target.checked)} />
            </Form.Group>

            <Button className="w-100 btn-login" type="submit" id="submitButton">
                continue
            </Button>
            <div className='text-center my-3'>
            <label>Already have an account?   <Link to="/Login"> Sign In
            </Link></label>
            </div>
            </Form> 
            </Col>
            </Row>

            
        </div>    
    </Fragment>
    );
}

export default SignUpAsStudent;