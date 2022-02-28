import React, {Fragment, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap';
import {BsGoogle} from 'react-icons/bs'
import { useAlert } from 'react-alert'
import { showErrMsg } from '../../utils/Notification';
import {login, clearErrors} from '../../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux';

const LoginasUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    const [user_tupmail, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

    const {error, msg, isLoggedIn} = useSelector(state => state.authUser);

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (isLoggedIn) {
            if(msg){
                history.push('/')
                alert.success(msg)
            }else{
            history.push(redirect) 
            }
        }

        // if(error){
        //     dispatch(clearErrors())
        // }

    }, [dispatch, alert, isLoggedIn, error, history, redirect,msg])

    const submitHandler = async e => {
        e.preventDefault()
        localStorage.setItem('firstLogin', true)

        dispatch(login(user_tupmail,user_password));

    }
        
    return (
        <Fragment>
            <div className="wrapper">
            <div className="m-5">
            

            <Form className="form-group auth-login" onSubmit={submitHandler} encType='application/json'>
            <h1 className='text-center'>Sign In as User</h1>

            {error && showErrMsg(error)}
            {/* <Button className="w-100 btn-grey my-4" type="submit">
                <label><BsGoogle size={15} className='m-2'/> Sign with Google</label>
            </Button> */}
            <Form.Group className="mb-3">
            <Form.Label className="d-block">Email</Form.Label>
                <Form.Control  type="text" placeholder="" name="user_tupmail" id="user_tupmail" value={user_tupmail}
                    onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" name="user_password" id="user_password" value={user_password}
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <div className='text-center my-3'>
            <label> <Link to="/user/forgot"> Forgot your password?
            </Link></label>
            </div>

            <Button className="w-100 btn-login" type="submit">
                Sign In
            </Button>
            <Link to ="/guest/login">
            <Button className="w-100 btn-grey">
                Sign In as Guest
            </Button>
            </Link>
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

export default LoginasUser;