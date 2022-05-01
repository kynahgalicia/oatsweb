import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import moment from 'moment'
import { FaTrash} from 'react-icons/fa';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribe, verifySubscribe, declineSubscribe, clearErrors} from '../../../redux/actions/subscriptionActions';
import LoaderAdmin from '../../../components/utils/LoaderAdmin'
import AdminSidebar from '../../layout/AdminSidebar'
import {VERIFY_SUBSCRIBE_RESET, DECLINE_SUBSCRIBE_RESET } from '../../../redux/constants/subscriptionConstants'

const BorrowList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { loading, error, subs } = useSelector(state => state.subs)
    const { loadingButton, msg, isVerified, isDeclined } = useSelector(state => state.verifiedSub)

    useEffect(() => {
            dispatch(getSubscribe())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isVerified) {
            history.push('/admin/subscription/request');
            alert.success(msg);
            dispatch({ type: VERIFY_SUBSCRIBE_RESET })
        }
        if (isDeclined) {
            history.push('/admin/subscription/request');
            alert.success(msg);
            dispatch({ type: DECLINE_SUBSCRIBE_RESET })
        }
    }, [dispatch, alert, error, history, isVerified, isDeclined, msg])

    const openImage = (url) => {
        window.open(url);
    }

    const verifySub = (id) => {
        dispatch(verifySubscribe(id))
    }
    const declineSub = (id) => {
        dispatch(declineSubscribe(id))
    }

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'User',
                    field: 'user',
                    sort: 'desc'
                },
                {
                    label: 'Sender Name',
                    field: 'sender_name',
                    sort: 'desc'
                },
                {
                    label: 'Sender No.',
                    field: 'sender_no',
                    sort: 'desc'
                },
                {
                    label: 'Reference No.',
                    field: 'reference_no',
                    sort: 'asc'
                },
                {
                    label: 'Subscription Type',
                    field: 'sub_type',
                    sort: 'desc'
                },
                {
                    label: 'Paid At',
                    field: 'paidAt',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                },
                {
                    label: 'Reciept',
                    field: 'reciept',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        subs && subs.forEach(subs => {
            if(subs.status === 'Pending'){
                data.rows.push({
                    user: subs.user.user_name,
                    sender_name: subs.sender_name,
                    sender_no: subs.sender_no,
                    reference_no: subs.reference_no,
                    sub_type: subs.sub_type, 
                    status: subs.status,
                    paidAt: moment(subs.paidAt).format('MM/DD/YYYY'),
                    reciept:  <Link onClick={() => openImage(subs.reciept[0].url)}> Reciept Image</Link>,
                    actions: 
                    <Fragment>
                        <Button className="success" data-toggle="modal" data-target={'#acceptModal' + subs._id}  disabled={loadingButton ? true : false}>
                            Accept
                        </Button> 
                        <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + subs._id} disabled={loadingButton ? true : false}>
                            Decline
                        </Button> 
    
    
                        <div className="modal fade" id={'acceptModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to accept the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => verifySub(subs._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id={'deleteModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to deny the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal"  onClick={() => declineSub(subs._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>
    
                    </Fragment>
                    
                })
            }
        })

        return data;
    }
    const setDataDeny = () => { 
        const data = {
            columns: [
                {
                    label: 'User',
                    field: 'user',
                    sort: 'desc'
                },
                {
                    label: 'Sender Name',
                    field: 'sender_name',
                    sort: 'desc'
                },
                {
                    label: 'Sender No.',
                    field: 'sender_no',
                    sort: 'desc'
                },
                {
                    label: 'Reference No.',
                    field: 'reference_no',
                    sort: 'asc'
                },
                {
                    label: 'Subscription Type',
                    field: 'sub_type',
                    sort: 'desc'
                },
                {
                    label: 'Paid At',
                    field: 'paidAt',
                    sort: 'desc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc'
                },
                {
                    label: 'Reciept',
                    field: 'reciept',
                    sort: 'desc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        subs && subs.forEach(subs => {
            if(subs.status === 'Denied'){
                data.rows.push({
                    user: subs.user.user_name,
                    sender_name: subs.sender_name,
                    sender_no: subs.sender_no,
                    reference_no: subs.reference_no,
                    sub_type: subs.sub_type, 
                    status: subs.status,
                    paidAt: moment(subs.paidAt).format('MM/DD/YYYY'),
                    reciept:  <Link onClick={() => openImage(subs.reciept[0].url)}> Reciept Image</Link>,
                    actions: 
                    <Fragment>
                        <Button className="success" data-toggle="modal" data-target={'#acceptModal' + subs._id}  disabled={loadingButton ? true : false}>
                            Accept
                        </Button> 
                        <Button className='mx-1 danger' data-toggle="modal" data-target={'#deleteModal' + subs._id} disabled={loadingButton ? true : false}>
                            Delete
                        </Button> 
    
    
                        <div className="modal fade" id={'acceptModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to accept the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => verifySub(subs._id)}>Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id={'deleteModal' +  subs._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-body">
                                    Do you really want to decline the request?
                                </div>
                                <div className="modal-footer">
                                    <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                    <Button  className="btn btn-danger" data-dismiss="modal">Yes</Button>
                                </div>
                                </div>
                            </div>
                        </div>
    
                    </Fragment>
                    
                })
            }
        })

        return data;
    }


    return(
        <Fragment>
            <Row>
                <Col sm= {2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <div className="admin-wrapper">
                        { loading ? <LoaderAdmin /> :
                        <div className="table-admin">
                        <div className='d-flex align-items-start m-2'>
                            <h1>Request</h1>
                        </div> 
                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={5} 
                            pagesAmount={4}
                            data={setData()} 
                            className='table px-4'
                            container-sm="true"/>
                        <div className='d-flex align-items-start m-2'>
                            <h1>Denied</h1>
                        </div> 
                            <MDBDataTableV5 
                            hover 
                            entriesOptions={[5, 10, 15, 25]} 
                            entries={5} 
                            pagesAmount={4}
                            data={setDataDeny()} 
                            className='table px-4'
                            container-sm="true"/>
                        </div>
                    }
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default BorrowList;