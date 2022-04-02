import React, { useState,  useEffect } from 'react'
import { Link as Link2} from "react-scroll"
import {Link as Link1, useParams} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button, Card, CardGroup, InputGroup, Form} from 'react-bootstrap'
// import moment from 'moment'
import Loader from '../../utils/Loader'
import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'

const ThesisDetails = () => {
    
    const dispatch = useDispatch()
    const alert = useAlert()

    const [thisDepartment,setThisDepartment] = useState('')
    const [thisCourse,setThisCourse] = useState('')
    const { loading, error, thesis } = useSelector(state => state.thesisDetails);

    let {thesisId} = useParams()

    useEffect(() => {
        
        if(thesisId){
            // console.log(thesisId)
            dispatch(getThesisDetails(thesisId))

            
            // setThisDepartment(thesis.department.deptname)
            // setThisCourse(thesis.course.coursecode)
            // console.log(thisCourse,thisDepartment)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error ,thesisId, thisDepartment]);

    return ( 
        <div className="wrapper">
            {loading ? <Loader /> : (
                <Row>
                <Col sm={9}>
                <div className="details-title text-start mx-5">
                <h5 className="m-3">{thesis.title}</h5>
                {/* { thesis.authors && thesis.authors.map((x) => (
                    <Link1 className='d-inline'><i> {x.author}</i></Link1>
                ))} */}
                
                <div className="m-3">
                <label> Published: <Link1>{thesis.publishedAt}</Link1> </label>
                {/* | Department: <Link1>{thisDepartment}</Link1> | Course: <Link1>{thisCourse}</Link1> */}
                </div>
                <div className='details-button'>
                        <Button data-toggle="tooltip" data-placement="bottom" title="Download PDF">
                        <i className="fas fa-file-pdf"></i> PDF  
                        </Button>
                        
                </div>
                        
            </div>
            
            
            <Row>
                <Col sm={3}>
                <ul className="list-group p-5">
                <li className="list-group-item">
                    <Link2
                        activeClass="active"
                        to="abstract"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Abstract
                    </Link2>
                    </li>
                    <li className="list-group-item">
                    <Link2
                        activeClass="active"
                        to="authors"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                    Authors
                    </Link2>
                    </li>
                    <li className="list-group-item">
                    <Link2
                        activeClass="active"
                        to="keywords"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Keywords
                    </Link2>
                    </li>
                
                </ul>
                </Col>
                <Col sm={9}>
                <div className="text-start m-1 my-5">
                    <h5 id="abstract">Abstract</h5>
                    <p className="text-justify">{thesis.abstract}</p>
                </div>

                <Button variant="danger" className='mx-1' data-toggle="modal" data-target={'#subscriptionModal'}>
                    Purchase Subscription
                </Button>

                <div className="modal fade" id="subscriptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">OATS Thesis Archive Subscription</h5>
                                
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body text-start">
                                <CardGroup>
                                    <Card>
                                        <Card.Body>
                                            <div className='cardTitle'>
                                                <h1 className='d-inline'>₱50</h1><h3 className='d-inline'>/mo.</h3>
                                            </div>
                                            <br/>
                                            <Card.Text>
                                                Avail the subscription to access all of the thesis available in OATS.
                                            </Card.Text>
                                        </Card.Body>

                                        <Card.Footer className='cardTitle'>
                                            <Button type='submit'  data-backdrop="false" ><Link1 data-backdrop="" to="/user/payment" >Subscribe</Link1></Button>
                                        </Card.Footer>
                                    </Card>

                                    <Card>
                                        <Card.Body>
                                            <div className='cardTitle'>
                                                <h1 className='d-inline'>₱140</h1><h3 className='d-inline'>/qtr.</h3>
                                            </div>
                                            <br/>
                                            <Card.Text>
                                                For 4 months, you can have access to the theses that has been archived in OATS.
                                            </Card.Text>
                                        </Card.Body>

                                        <Card.Footer className='cardTitle'>
                                            <Button>Subscribe</Button>
                                        </Card.Footer>
                                    </Card>

                                    <Card>
                                        <Card.Body>
                                            <div className='cardTitle'>
                                                <h1 className='d-inline'>₱550</h1><h3 className='d-inline'>/yr.</h3>
                                            </div>
                                            <br/>
                                            <Card.Text>
                                                Open access to ALL archived research in OATS for a whole year!
                                            </Card.Text>
                                        </Card.Body>

                                        <Card.Footer className='cardTitle'>
                                            <Button>Subscribe</Button>
                                        </Card.Footer>
                                    </Card>
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-3'>
                    <div className="user-accordion accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button id="authors" className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Authors
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body text-start">
                            { thesis.authors && thesis.authors.map((x) => (
                                <li>{x.author}</li>
                            ))}
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button id="keywords" className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Keywords
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body text-start">
                            { thesis.keywords && thesis.keywords.map((x) => (
                                <li>{x.keyword}</li>
                            ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
                </Col>
                <Col sm={2}></Col>
            </Row>

    
            )}
            
        </div>
        
    );
}

export default ThesisDetails;