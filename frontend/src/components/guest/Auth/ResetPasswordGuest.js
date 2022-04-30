import React, {Fragment, useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom' 
// import { useAlert } from 'react-alert'
import { Form, Button } from 'react-bootstrap'
import { showErrMsg,showSuccessMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/actions/authGuestActions';

const ResetPasswordGuest = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    const {token} = useParams()
    const [thisError, setThisError] = useState('');
    const [guest_password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const {error, message} = useSelector(state => state.authGuestForgot);

    useEffect(() => {
        
    }, [dispatch, error, message])

    const submitHandler = async e => {
        e.preventDefault()
        if(guest_password !== confirm_password){
            setThisError("Password doesn't match")
        }

        if(guest_password === confirm_password){
            setThisError('')
            dispatch(resetPassword(guest_password,token))
        }
    }

    return ( 
        <div className="wrapper">

        <Form className="form-group auth-login" onSubmit={submitHandler} encType='application/json'>
            
                    <h1 className='text-center'>Reset Password</h1>

                    {thisError && showErrMsg(thisError)}
                    {message && showSuccessMsg(message)}
                    
                    <Form.Group className="mb-3">
                    <Form.Label className="d-block">Password</Form.Label>
                        <Form.Control  type="password" placeholder="" name="guest_tupmail" id="guest_tupmail" value={guest_password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className="d-block">Confirm Password</Form.Label>
                        <Form.Control  type="password" placeholder="" name="guest_tupmail" id="guest_tupmail" value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>

                    {message ? 
                    <>
                        <Link to="/guest/login">
                        <Button className="w-100 btn-grey" type="submit">
                                Login Now
                        </Button>
                        </Link>
                    </>
                    :
                    <>
                        <Button className="w-100 btn-grey" type="submit">
                        Enter
                        </Button>
                    </>
                    }
                    

            </Form>
        </div>
    );
}

export default ResetPasswordGuest;