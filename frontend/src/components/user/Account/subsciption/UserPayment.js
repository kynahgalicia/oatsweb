import React, {useEffect, useState, Fragment} from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import FileBase64 from 'react-file-base64';
import { Row, Col, Button, Form, CardGroup, Card} from 'react-bootstrap'
import UserSidebar from "../../../layout/UserSidebar";
import gcash from '../../../img/gcash.png'
import fifty from '../../../img/fifty.jpg'
import fivefifty from '../../../img/fivefifty.jpg'

import { userSubscribe } from '../../../../redux/actions/subscriptionActions';

const ThesisDetails = () => {
    const monthly = true
    const yearly = false
    
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const [id, setId] = useState('')
    const[name,setName] = useState('')
    const[contact,setContact] = useState('')
    const[reference, setReference] = useState('')
    const[reciept,setReciept] = useState([])
    const[sub_type,setSubType] = useState('')

    const { isLoggedIn, user} = useSelector(state => state.authUser)
    const { isLoggedInGuest, guest} = useSelector(state => state.authGuest)

    const { loading, msg, error, success} = useSelector

    const {sub} = useParams()

    useEffect(() => {

        if(user){
            setId(user._id)
            setSubType(sub)
        }

        if(guest){
            setId(guest._id)
            setSubType(sub)
        }

        if (success) {
            alert.success(msg);
        }

    }, [dispatch, alert, error, success,history, msg]);

    const onChange = e => {

        const files = Array.from(e.target.files)
        setReciept([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setReciept(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('user_id', id);
        formData.set('sender_name', name);
        formData.set('sender_no', contact);
        formData.set('reference_no', reference);
        formData.set('sub_type', sub_type);
        formData.set('recieptImage', reciept);

        dispatch(userSubscribe(formData))
    }

    

    return ( 
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <UserSidebar/>
                </Col>
                <Col sm={10}>

                    <div className='payment-wrapper'>
                        <div className="payment-plan">
                            <h5>Your Plan</h5>
                            <Card className= {"mx-4 sub-card text-start " + ( monthly ? null : 'd-none')} >
                                    <Card.Header> <h1 className="text-start">₱50/mo.</h1></Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                            <p>
                                            Access all of the thesis titles available for 1 month.
                                            </p>
                                            </Col>
                                            <Col>
                                            <ul >
                                            <li><i class="fas fa-check"></i> View Full Text</li>
                                            <li><i class="fas fa-check"></i> Download Full PDF</li>
                                            </ul>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                            </Card>

                            <Card className= {"sub-card text-start w-100 " + ( yearly ? null : 'd-none')} >
                                <Card.Header><h1 className="text-start">₱550/yr.</h1></Card.Header>
                                <Card.Body>
                                    
                                    <Row>
                                        <Col>
                                        <p>
                                        Open access to ALL archived research in OATS for a whole year
                                        </p>
                                        </Col>
                                        <Col>
                                        <ul >
                                        <li><i class="fas fa-check"></i> View Full Text</li>
                                        <li><i class="fas fa-check"></i> Download Full PDF</li>
                                        </ul>
                                        </Col>
                                    </Row>
                                    
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="payment-process text-start">
                            <Row>
                                <h5>Payment</h5>
                                <Col className="p-5">
                                <img src={gcash} alt="logo" className="p-3 w-50" />
                                <img src={fifty} alt="logo" className={"p-3 w-75 " + ( monthly ? null : 'd-none')} />
                                <img src={fivefifty} alt="logo" className={"p-3 w-75 "+ ( yearly ? null : 'd-none')} />
                                <p><strong>Open GCash &gt; Send Money &gt; Send via QR &gt; Confirmation details &gt; Screenshot Reciept</strong></p>
                                <label>Note: Please use the GCash account of the number that is registered in your account</label>
                                </Col>

                                <Col className='text-start payment-details'>
                                        <h4>Sender Details</h4>
                                <Form onSubmit={submitHandler} encType='multipart/form-data'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Sender Name</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Gcash Number</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="text"
                                                id="contact"
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className='mb-3'>
                                            <Form.Label>Reference no.</Form.Label>
                                            <Form.Control
                                                className=' my-1'
                                                type="text"
                                                id="reference"
                                                value={reference}
                                                onChange={(e) => setReference(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Please attach GCash reciept below:</Form.Label>
                                            <Form.Control type="file"  onChange={onChange} multiple />
                                        </Form.Group>
                                    
                                                <Button 
                                                        className='my-3 w-100 '
                                                        variant="success" 
                                                        type="submit" disabled={loading ? true : false}
                                                        
                                                    >
                                            Subscribe
                                        </Button>
                                </Form>

                                </Col>
                            </Row>
                                        
                        </div>
                        

                    </div>
                </Col>
            </Row>
        </Fragment>
    );
}

export default ThesisDetails;