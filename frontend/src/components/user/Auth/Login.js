import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap';
import {BsGoogle} from 'react-icons/bs'
const Login = () => {
    return (
        <Fragment>
            <div className="wrapper">
            <div className="m-5">
            

            <Form className="form-group auth-login" onSubmit="" encType='application/json'>
            <h1 className='text-center'>Sign In</h1>
            <Button className="w-100 btn-grey my-4" type="submit">
                <label><BsGoogle size={15} className='m-2'/> Sign with Google</label>
            </Button>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" value=""/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value=""/>
            </Form.Group>

            <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>

            <Button className="w-100 btn-login" type="submit">
                Sign In
            </Button>
            <div className='text-center my-3'>
            <label>Don't have an account?   <Link to="/SignUp"> Sign Up
            </Link></label>
            </div>
            </Form> 
            
            </div>    
        </div>
        </Fragment>
    );
}

export default Login;