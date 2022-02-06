import React, {Fragment, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap';
import {BsGoogle} from 'react-icons/bs'
import { useAlert } from 'react-alert'
import { showErrMsg } from '../../utils/Notification';
import {login, clearErrors} from '../../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    // const [user, setUser] = useState()
    const [user_tupmail, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

    const { isAuthenticated, error,  msg} = useSelector(state => state.auth);

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (isAuthenticated) {
            if(msg){
                history.push('/')
                alert.success(msg)
            }else{
            history.push(redirect) 
            }
        }

        if(error){
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history, redirect,msg])

    const submitHandler = async e => {
        e.preventDefault()
        dispatch(login(user_tupmail,user_password));
    }

    return (
        <Fragment>
            <div className="wrapper">
            <div className="m-5">
            

            <Form className="form-group auth-login" onSubmit={submitHandler} encType='application/json'>
            <h1 className='text-center'>Sign In</h1>

            {error && showErrMsg(error)}
            <Button className="w-100 btn-grey my-4" type="submit">
                <label><BsGoogle size={15} className='m-2'/> Sign with Google</label>
            </Button>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" name="user_tupmail" id="user_tupmail" value={user_tupmail}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" name="user_password" id="user_password" value={user_password}
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {/* <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group> */}
            <div className='text-center my-3'>
            <label> <Link to="/forgotpassword"> Forgot your password?
            </Link></label>
            </div>

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