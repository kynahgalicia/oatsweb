import React, { Fragment,useState,  useEffect } from 'react'
import { Link as Link2, animateScroll as scroll } from "react-scroll"
import {Link as Link1, useParams} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button} from 'react-bootstrap'
import moment from 'moment'
import Loader from '../../utils/Loader'
import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'
const ThesisDetails = () => {
    
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, thesis } = useSelector(state => state.thesisDetails);

    let {thesisId} = useParams()

    useEffect(() => {
        
        // if(thesisId){
            console.log(thesisId)
            dispatch(getThesisDetails(thesisId))
        // }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error ,thesisId]);

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
                <label> Published: <Link1>{moment(thesis.publishedAt).format('MMMM D YYYY')}</Link1> </label>
                {/* | Department: <Link1>{thesis.department.deptname}</Link1> | Course: <Link1>{thesis.course.coursecode}</Link1></label> */}
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