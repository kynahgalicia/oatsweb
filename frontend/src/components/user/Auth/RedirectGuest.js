import React from 'react'
import {useSelector } from 'react-redux';
const RedirectGuest = () => {
    const {msg} = useSelector(state => state.authGuestRegister)


    return ( 
        <div className="wrapper">
            <div className="activationMsg">
            <h4>{msg}</h4>
            {/* <Button className="btn btn-dark"><Link to="/guest/login">Login Now</Link></Button> */}
            </div>
        </div>
    );
}

export default RedirectGuest;