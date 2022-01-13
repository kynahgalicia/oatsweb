import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap';
import {BsGoogle} from 'react-icons/bs'
import { Row, Col} from 'react-bootstrap'
import study from '../../img/study.png'

const SignUpAsStudent = () => {
    return ( 
        <Fragment>
        <div className="wrapper">
        
        
        <Row>
            <Col>
            <img src={study} alt="logo" className="img-signup" />
            </Col>

            <Col>
            <Form className="form-group auth-signup" onSubmit="" encType='application/json'>
            <h1 className='text-center'>Sign Up as Student</h1>
            <Button className="w-100 btn-grey my-4" type="submit">
                <label><BsGoogle size={15} className='m-2'/> Sign with Google</label>
            </Button>

            <h5>Personal Information</h5>
            <Form.Group className="mb-3">
            <Form.Label>TUP ID</Form.Label>
                <Form.Control type="text" placeholder="TUPT-XX-XXXX" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Middle Name</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
                <Form.Select id="department_field" placeholder="">
                                    <option value="Action">Basic Art & Sciences</option>
                                    <option value="Sci-Fi">Civil & Allied</option>
                                    <option value="Romance">Electric & Allied</option>
                                    <option value="Survival">Mechanical & Allied</option>
                                    <option value="Fantasy">Bachelor of Engineering</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
                <Form.Select id="department_field" placeholder="">
                                    <option value="Action">Basic Art & Sciences</option>
                                    <option value="Sci-Fi">Civil & Allied</option>
                                    <option value="Romance">Electric & Allied</option>
                                    <option value="Survival">Mechanical & Allied</option>
                                    <option value="Fantasy">Bachelor of Engineering</option>
                </Form.Select>
            </Form.Group>


            <h5>Account Setup</h5>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="" value=""/>
            </Form.Group>

            <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="By creating an account you agree to our Terms of Service and Privacy Policy" />
            </Form.Group>

            <Button className="w-100 btn-login" type="submit">
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