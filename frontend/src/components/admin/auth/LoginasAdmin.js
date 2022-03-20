import React, {Fragment, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { showErrMsg } from '../../utils/Notification';
import {login} from '../../../redux/actions/authAdminActions'
import { useDispatch, useSelector } from 'react-redux';

const LoginasAdmin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    const [admin_tupmail, setEmail] = useState('');
    const [admin_password, setPassword] = useState('');

    const {error, msg, isLoggedInAdmin} = useSelector(state => state.authAdmin);

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (isLoggedInAdmin) {
            if(msg){
                history.push('/admin/dashboard')
                alert.success(msg)
            }else{
            history.push(redirect) 
            }
        }

    }, [dispatch, alert, isLoggedInAdmin, error, history, redirect,msg])

    const submitHandler = async e => {
        e.preventDefault()
        localStorage.setItem('firstLogin', true)

        dispatch(login(admin_tupmail,admin_password));

    }
        
    return (
        <Fragment>
            <div className="wrapper">
            <div className="m-5">
            

            <Form className="form-group auth-login" onSubmit={submitHandler} encType='application/json'>
            <h1 className='text-center'>Sign In as Admin</h1>

            {error && showErrMsg(error)}
            <Form.Group className="mb-3">
            <Form.Label className="d-block">Email</Form.Label>
                <Form.Control  type="text" placeholder="" name="admin_tupmail" id="admin_tupmail" value={admin_tupmail}
                    onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" name="admin_password" id="admin_password" value={admin_password}
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <div className='text-center my-3'>
            <label> <Link to="/admin/forgot"> Forgot your password?
            </Link></label>
            </div>

            <Button className="w-100 btn-login" type="submit">
                Sign In
            </Button>
            </Form> 
            
            </div>    
        </div>
        </Fragment>
    );
}

export default LoginasAdmin;