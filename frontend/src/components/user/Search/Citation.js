import React, { Fragment, useEffect, useState } from 'react'
import {Row, Col, Card, Form} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'

const Citation = () => {

    // const dispatch = useDispatch()
    // const alert = useAlert()

    return(
        <Fragment>
            <Row>
                <Col>
                    <Card className='mx-auto' style={{width: '14rem'}}>
                        <Card.Header as="h5" className="text-center" >Tools</Card.Header>

                        <Card.Body>
                            <Card.Title><Link data-toggle="modal" data-target={"#citationModal"}>Citation Tool</Link></Card.Title>
                        </Card.Body>
                    </Card>

                    <div className="modal fade" id="citationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Citation Generator Tool</h5>
                                    
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body text-start">
                                    <Form.Group className="mb-2">
                                        <Form.Select id="format_field" placeholder="Chooose a format">
                                            <option> Select a format </option>
                                            <option> IEEE</option>
                                            <option> APA</option>
                                            <option> MLA</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )

}

export default Citation;