import React, { Fragment,useState,  useEffect } from 'react'
import { Link as Link2, animateScroll as scroll } from "react-scroll"
import {Link as Link1, useParams} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import moment from 'moment'
import Loader from '../../utils/Loader'
import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'
const ThesisDetails = () => {
    
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, thesis } = useSelector(state => state.thesisDetails);

    let {thesisId} = useParams()

    useEffect(() => {
        console.log(thesisId)
        
        dispatch(getThesisDetails(thesisId))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, thesisId]);

    return ( 
        
        <div className="wrapper">
            {loading ? <Loader /> : (
                <Row>
                <Col sm={9}>
                <div className="details-title text-start mx-5">
                <h5 className="m-3">Integer consequat sed quam sit amet scelerisque. Sed vestibulum vfacilisis diam non auctor</h5>
                <Link1 to="/"> <label className="m-3">  Author</label></Link1>
                <div className="m-3">
                    <label> Year: <Link1 to="/">2022</Link1> | Department: <Link1 to="/">Electrical & Allied </Link1> | Course: <Link1 to="/">BSIT</Link1></label>
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
                    <p>{thesis.abstract}</p>
                </div>
                <div className='p-3'>
                    <div class="user-accordion accordion" id="accordionExample">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button id="authors" class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Authors
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body text-start">
                            { thesis.authors.map((x) => (
                                <li>{x.author}</li>
                            ))}
                            </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button id="keywords" class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Keywords
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body text-start">
                            { thesis.keywords.map((x) => (
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