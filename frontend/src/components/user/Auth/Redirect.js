import React from 'react'
import {useSelector } from 'react-redux';
const Redirect = () => {
    const {msg} = useSelector(state => state.authUserRegister)


    return ( 
        <div className="wrapper">
            <div className="activationMsg">
            <h4>{msg}</h4>
            {/* <Button className="btn btn-dark"><Link to="/Login">Login Now</Link></Button> */}
            </div>
        </div>
    );
}

export default Redirect;