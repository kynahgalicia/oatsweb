import React, {Fragment, useEffect} from 'react'
import { Link, useHistory, useParams} from 'react-router-dom' 
// import { useAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
import {activateEmail} from '../../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux';

const ActivationEmail = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { success, error} = useSelector(state => state.authUserRegister)
    const {activation_token} = useParams()

    useEffect(() => {
        
        if(activation_token){
            dispatch(activateEmail(activation_token))
        }
    }, [ dispatch, history,activation_token]);
    

    function successMsg(success) {
        return (
            <div className="activationMsg">
            <h4>{success} <i className="fas fa-check-circle"></i></h4>
            <Button className="btn btn-dark"><Link to="/user/login">Login Now</Link></Button>
            </div>
        );
    }

    function errorMsg(error) {
        return (
            <div className="activationMsg">
            <h4>{error}</h4>
            <Button className="btn btn-dark"><Link to="/user/login">Redirect</Link></Button>
            </div>
        );
    }

    return (
        <Fragment>

            <div className="wrapper">
                {success && successMsg(success) }
                {error && errorMsg(error) }
            </div>
        </Fragment>
        );
}

export default ActivationEmail;