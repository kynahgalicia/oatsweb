import React, { useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap';
import { showErrMsg,showSuccessMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../redux/actions/authAdminActions';

const ForgotPasswordAdmin = () => {
    const dispatch = useDispatch()
    
    const [admin_tupmail, setEmail] = useState('');

    const {error, message, loading} = useSelector(state => state.authAdminForgot);
    
    useEffect(() => {
        
    }, [dispatch, error, message])
    
    const submitHandler = async e => {
        e.preventDefault()
        dispatch(forgotPassword(admin_tupmail))
    }
    return ( 
        <div className="wrapper">

        <Form className="form-group auth-login" onSubmit={submitHandler} encType='application/json'>
            
                    <h1 className='text-center'>Forgot Password <br />(Admin)</h1>

                    {error && showErrMsg(error)}
                    {message && showSuccessMsg(message)}
                    <Form.Group className="mb-3">
                    <Form.Label className="d-block">Enter your email address</Form.Label>
                        <Form.Control  type="email" placeholder="" name="user_tupmail" id="user_tupmail" value={admin_tupmail}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    {loading ? <>
                        <Button className="w-100 btn-grey" type="submit" disabled>
                        Enter
                    </Button>
                    </>:
                    <Button className="w-100 btn-grey" type="submit">
                            Enter
                        </Button>
                    }
                    

            </Form>
        </div>
    );
}

export default ForgotPasswordAdmin;