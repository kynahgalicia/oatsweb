import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap'
import {BsGoogle} from 'react-icons/bs'
import { Row, Col} from 'react-bootstrap'
import business from '../../img/business.png'
const SignUpAsOrg = () => {
    return (  
        <Fragment>
        <div className="wrapper">
        
        
        <Row>
            <Col>
            <img src={business} alt="logo" className="img-signup" />
            </Col>

            <Col>
            <Form className="form-group auth-signup" onSubmit="" encType='application/json'>
            <h1 className='text-center'>Sign Up</h1>
            <Button className="w-100 btn-grey my-4" type="submit">
                <label><BsGoogle size={15} className='m-2'/> Sign Up with Google</label>
            </Button>

            <h5>Personal Information</h5>
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
            <Form.Label>Profession</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Company Address</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="" value=""/>
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
                Continue
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
export default SignUpAsOrg;