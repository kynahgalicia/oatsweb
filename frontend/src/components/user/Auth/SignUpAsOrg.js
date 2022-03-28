import React, {Fragment, useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom' 
import {Form, Button} from 'react-bootstrap'
// import {BsGoogle} from 'react-icons/bs'
import { Row, Col} from 'react-bootstrap'
import business from '../../img/reading.png'
import { useAlert } from 'react-alert'
import { showErrMsg } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux';
import {register, clearErrors} from '../../../redux/actions/authGuestActions'
const SignUpAsOrg = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const [guest_fname, setFname] = useState('')
    const [guest_lname, setLname] = useState('')
    const [guest_profession, setProfession] = useState('')
    const [guest_company, setCompany] = useState('')
    const [guest_company_address, setCompanyAddress] = useState('')
    const [guest_contact, setContact] = useState('')
    const [guest_mail, setEmail] = useState('')
    const [guest_password, setPassword] = useState('')
    const [agree, setAgree] = useState(false);

    const {msg, error} = useSelector(state => state.authGuestRegister)

    useEffect(() => {
        if (msg) {
            history.push('/RedirectGuest')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        canBeSubmitted()

        

    }, [dispatch, alert, error, history, msg, agree,canBeSubmitted])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('guest_fname', guest_fname);
        formData.set('guest_lname', guest_lname);
        formData.set('guest_profession', guest_profession);
        formData.set('guest_company', guest_company);
        formData.set('guest_company_address', guest_company_address);
        formData.set('guest_contact', guest_contact);
        formData.set('guest_mail', guest_mail);
        formData.set('passwords', guest_password);


        dispatch(register(formData));
    }

    const canBeSubmitted = () => {
        const isValid =
        guest_fname.trim().length && // TextInput
        guest_lname.trim().length && // TextInput
        guest_profession.trim().length && // TextInput
        guest_company.trim().length && // TextInput
        guest_company_address.trim().length && // TextInput
        guest_contact.trim().length && // TextInput
        guest_mail.trim().length && // TextInput
        guest_password.trim().length && // TextInput
          agree; // checkbox for terms
    
        if (isValid) {
            document.getElementById("submitGuestButton").removeAttribute("disabled");
        } else {
            document.getElementById("submitGuestButton").setAttribute("disabled", true);
        }
    }

    return (  
        <Fragment>
        <div className="wrapper">
        
        <Row>
            <Col>
            <img src={business} alt="logo" className="img-signup m-3" />
            </Col> 

            <Col className="auth-signup-form">
                <h1 className='text-center'>Sign Up as Guest</h1>
                {/* <Button className="w-100 btn-grey my-4" type="submit">
                    <label><BsGoogle size={15} className='m-2'/> Sign Up with Google</label>
                </Button> */}
                <Form className="form-group auth-signup" onSubmit={submitHandler} encType='application/json'>
                    <Row>
                    {error && showErrMsg(error)}  
                    <Col className="mx-3">
                    <h5>Personal Information</h5>
                
                    <Row>
                            <Col>
                            <Form.Group className="mb-2 mr-1">
                            <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={guest_fname} onChange={(e) => setFname(e.target.value)}/>
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-2">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={guest_lname} onChange={(e) => setLname(e.target.value)}/>
                            </Form.Group>
                            </Col>
                        </Row>
                
                        <Form.Group className="mb-2">
                        <Form.Label>Profession</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_profession} onChange={(e) => setProfession(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_company} onChange={(e) => setCompany(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Label>Company Address</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_company_address} onChange={(e) => setCompanyAddress(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" placeholder="" value={guest_contact} onChange={(e) => setContact(e.target.value)}/>
                        </Form.Group>

                </Col>
                <Col className="mx-3">

                <h5>Account Setup</h5>
                    <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="" value={guest_mail} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" value={guest_password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    {/* <Form.Group className="mb-2">
                    <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="" value=""/>
                    </Form.Group> */}

            
                </Col>

                <Form.Group className="mb-2 px-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="By creating an account you agree to our Terms of Service and Privacy Policy" 
            onClick={(e) => setAgree(e.target.checked)} />
            </Form.Group>

            <Button className="w-100 btn-login" type="submit" id="submitGuestButton">
                Continue
            </Button>
            <Link to ="/user/student">
            <Button className="w-100 btn-grey">
                Sign Up as Student
            </Button>
            </Link>
            <div className='text-center my-3'>
            <label>Already have an account?   <Link to="/guest/login"> Sign In
            </Link></label>
            </div>
                    </Row>
            </Form> 
                </Col>
                {/* <Col>
                    

                </Col> */}
            </Row>

            
        </div>    
    </Fragment>
    );
}
export default SignUpAsOrg;