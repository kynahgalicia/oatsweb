import React, { Fragment, useEffect, useState, useRef } from 'react'
import AdminSidebar from '../../layout/AdminSidebar'
import { Link, useHistory } from 'react-router-dom' 
import {Container,Row, Col, Button, Form} from 'react-bootstrap';
import ReactToPrint from "react-to-print";
require('../dashboard/dashboard.css');
const PrintData = () => {
    return ( 
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                <div className='align-items-start m-2 px-5'>
                    <h1>Print Data</h1>

                                <Row className="mx-5">
                                        <Col className="mx-1">
                                            <div className="card-box bg-peach">
                                                <div className="inner">
                                                    <h3></h3>
                                                    <p> Students </p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fas fa-id-card-alt"></i>
                                                </div>
                                                <Link to="/admin/print/users"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>

                                        <Col className="mx-1">
                                            <div className="card-box bg-peach2">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Guests </p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fa fa-users" aria-hidden="true" />
                                                </div>
                                                <Link to="/admin/print/guests"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mx-5">
                                        <Col className="mx-1">
                                            <div className="card-box bg-pink">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Admin </p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fas fa-user-lock"></i>
                                                </div>
                                                <Link to="/admin/print/admins"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                        <Col className="mx-1">
                                            <div className="card-box bg-rose">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Thesis </p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fas fa-scroll"></i>
                                                </div>
                                                <Link to="/admin/print/thesis"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mx-5">
                                        <Col className="mx-1">
                                            <div className="card-box bg-maroon">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Department </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-building"></i>
                                                </div>
                                                <Link to="/admin/print/department"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                        <Col className="mx-1">
                                            <div className="card-box bg-darkMaroon">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Course </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-chalkboard"></i>
                                                </div>
                                                <Link to="/admin/print/course"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mx-5">
                                    <h3>Borrow</h3>
                                        <hr />
                                        <Col className="mx-1">
                                            <div className="card-box bg-peach">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Request </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-spinner"></i>
                                                </div>
                                                <Link to="/admin/print/borrowrequest"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                        <Col className="mx-1">
                                            <div className="card-box bg-peach2">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Active </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-check-circle"></i>
                                                </div>
                                                <Link to="/admin/print/borrowlist"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mx-5">
                                        <Col className="mx-1">
                                            <div className="card-box bg-pink">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Overdue </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-exclamation-circle"></i>
                                                </div>
                                                <Link to="/admin/print/overdue"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                        <Col className="mx-1">
                                            <div className="card-box bg-rose">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Returned </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-exchange-alt"></i>
                                                </div>
                                                <Link to="/admin/print/returned"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mx-5">
                                    <h3>Subscriptions</h3>
                                        <hr />
                                        <Col className="mx-1">
                                            <div className="card-box bg-maroon">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Request </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-spinner"></i>
                                                </div>
                                                <Link to="/admin/print/subsrequest"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                        <Col className="mx-1">
                                            <div className="card-box bg-darkMaroon">
                                                <div className="inner">
                                                    <h3> </h3>
                                                    <p> Active Subscriptions </p>
                                                </div>
                                                <div className="icon">
                                                <i className="fas fa-check-circle"></i>
                                                </div>
                                                <Link to="/admin/print/subscriptions"><a href="#" className="card-box-footer">Print Table <i className="fa fa-arrow-circle-right" /></a></Link>
                                            </div>
                                        </Col>
                                    </Row>
                </div>
                </Col>
            </Row>
        </Fragment>

    );
}
export default PrintData;